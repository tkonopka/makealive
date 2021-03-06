/* drc01.js. Copyright 2017 Tomasz Konopka. */

/* global makealive, d3 */

/**
 * Dose-response curves using d3 (v4)
 * 
 * Authors: Tomasz Konopka
 * 
 * @param obj - target DOM element that will contain output
 * @param x - object with configuration and data
 * 
 */
makealive.lib.drc01 = function (obj, x) {

    // define accepted arguments
    var xargs = [
        makealive.defArg("title", "string", "chart title", null),
        makealive.defArg("xlab", "string", "x-axis label", null),
        makealive.defArg("ylab", "string", "y-axis label", null),
        makealive.defArg("data", "array:series:dose:value", "dose-response values", null),
        makealive.defArg("series", "array:series:label:color:radius:linewidth", "series definitions", null),
        makealive.defArg("size", "integer:2", "size (width, height)", [420, 240]),
        makealive.defArg("margin", "number:4", "margins (top, right, bottom, left)", [40, 100, 50, 50]),
        makealive.defArg("offset", "length:3", "label offsets from axis (top, x, y)", ["-1.0em", "2.5em", "-2.3em"]),
        makealive.defArg("padding", "number", "space around points", 0.2),
        makealive.defArg("background", "number", "background level (subtracted from data values)", 0),
        makealive.defArg("bandwidth", "number", "bandwidth for curve smoothing ([0, 1])", 0.15),
        makealive.defArg("points", "integer", "display points (0:hide, 1:show)", 1),
        makealive.defArg("legend", "integer:3", "legend position (x, y, spacing)", [240, 20, 16]),
        makealive.defArg("axisstyle", "string:2", "type of axis (x, y)", ["bottom line", "left line"]),
        makealive.defArg("axiscolor", "string", "color of grid lines", "#000")
    ];
    // provide info on arguments
    if (obj === null)
        return xargs;

    // check required arguments, check/fill optional arguments
    makealive.checkArgs(x, xargs);
    x.makealive = "drc01";

    // ***********************************************************************
    // prep, find out about the dose ranges, etc. 

    var libtools = makealive.libtools;

    // split data into normalization level and drc values
    var refdata = x.data.filter(function (d) {
        return (+d.dose) === 0;
    });
    var drcdata = x.data.filter(function (d) {
        return (+d.dose) > 0;
    });

    // get codes for series    
    var series = libtools.uniq(libtools.pluck(refdata, "series"));

    // move data from x.series into objects indexed by the series code
    var seriesr = {}, serieslab = {}, seriescol = {}, serieslwd = {};
    for (var i = 0; i < x.series.length; i++) {
        seriesr[x.series[i].series] = x.series[i].radius;
        seriescol[x.series[i].series] = x.series[i].color;
        serieslwd[x.series[i].series] = x.series[i].linewidth;
        serieslab[x.series[i].series] = x.series[i].label;
        x.series[i].id = i;
    }

    // get reference values for each series
    var refseries = {};
    var amean = function (z) {
        var zsum = 0;
        z.forEach(function (x) {
            zsum += x;
        });        
        return zsum / z.length;
    };
    for (var i = 0; i < series.length; i++) {
        // get reference values for this series
        var ivalues = refdata.filter(function (d) {
            return d.series === series[i];
        }).map(function (d2) {
            return d2.value;
        });
        refseries[series[i]] = amean(ivalues);
    }


    // ***********************************************************************
    // prep, axis scaling

    // get non-zero doses
    var concs = x.data.map(function (d) {
        return +d.dose;
    });
    concs = concs.filter(function (cc) {
        return cc > 0;
    });
    var xlim = [Math.min.apply(null, concs), Math.max.apply(null, concs)];
    // adjust the scale with padding    
    xlim[0] = xlim[0] / (1 + x.padding);
    xlim[1] = xlim[1] * (1 + x.padding);

    // get all values (subtract background)
    var bgval = +x.background;
    var values = x.data.map(function (d) {
        return (+d.value - bgval) / (refseries[d.series] - bgval);
    });
    var ylim = [Math.min.apply(null, values), Math.max.apply(null, values)];
    if (ylim[0] > 0) {
        ylim[0] = 0;
    }


    // ***********************************************************************
    // helper functions for highlighting/unhighlighting curves and dots

    var highlightcurve = function () {
        var dthis = d3.select(this);
        dthis.style("opacity", 1);
        var dthisval = dthis.attr("val");
        svg.selectAll('[val="' + dthisval + '"]').style("opacity", 1);
    };
    var unhighlightcurve = function () {
        var dthis = d3.select(this);
        dthis.style("opacity", 0.8 * x.points);
        var dthisval = dthis.attr("val");
        svg.selectAll('circle[val="' + dthisval + '"]').style("opacity", 0.8 * x.points);
        svg.selectAll('path[val="' + dthisval + '"]').style("opacity", 0.8);
        svg.selectAll('circle.legend').style("opacity", 0.8);
        svg.selectAll('text.legend').style("opacity", 1);
    };


    // ***********************************************************************
    // start drawing

    // compute dimensions of entire svg & inner plot area
    libtools.dims(x);

    // create svg inside the object
    var svg = libtools.d3svg(obj, x);

    // create the y axis and labels
    var yscale = d3.scaleLinear().range([x.hinner, 0]).domain(ylim);    
    libtools.d3yaxis(svg, x, yscale, 4);

    // create the x axis and labels
    var xscale = d3.scaleLog().base(10).range([0, x.winner]).domain(xlim);
    //var xaxis = d3.axisBottom(xscale).tickFormat(d3.format(".0r"));
    libtools.d3xaxis(svg, x, xscale);
    // modify the axis (remove too many text labels)
    var xticks = svg.selectAll(".xaxis .tick text");
    var xratio = xlim[1]/xlim[0];    
    // filter, takes one value and determine whether to show it given x range
    // @param v text in a tick label
    var showTick = function(v) {
        var first = +v.match("[1-9]");        
        if (xratio<20) {            
            return first===1 || first%2===0;
        } else if (xratio<200) {
            return first===1 || first===5;
        } else {
            return first===1;
        }        
    };
    xticks.filter(function() {
        var tickvalue = d3.select(this).text();
        return !showTick(tickvalue);
    }).remove();    

    // create a title
    libtools.d3title(svg, x);


    // ***********************************************************************
    // start drawing the dose-response curves

    // draw the markers (but hide them)
    // create the scatterplot markers
    svg.selectAll(".values").data(drcdata).enter().append("circle")
            .attr("class", "scatterdot").attr("fill", x.color)
            .style("opacity", function (d) {
                return 0.8 * x.points;
            })
            .attr("cx", function (d) {
                return xscale(d.dose);
            })
            .attr("cy", function (d) {
                var dserref = refseries[d.series] - bgval;
                return yscale((d.value - bgval) / dserref);
            })
            .attr("r", function (d) {
                return seriesr[d.series];
            })
            .attr("fill", function (d) {
                return seriescol[d.series];
            })
            .attr("val", function (d) {
                return d.series;
            });


    // draw the fitted lines    
    var drcline = d3.line().curve(d3.curveBasis)
            .x(function (d) {
                return xscale(d.dose);
            })
            .y(function (d) {
                var dserref = refseries[d.series] - bgval;
                return yscale((d.value - bgval) / dserref);
            });
    // helper function, performs loess smoothing on drcseries array 
    // (inefficient but does the job for small drc datasets)
    var smoothseries = function (dseries, logbandwidth) {
        var result = [];
        for (var j = 0; j < dseries.length; j++) {
            var lognowconc = Math.log(dseries[j].dose);
            //get subset of points with a bandwidth of dose
            var temp = dseries.filter(function (d) {
                var logdconc = Math.log(d.dose);
                return logdconc > lognowconc - logbandwidth & logdconc < lognowconc + logbandwidth;
            });
            // get values (overcount elements with central dose
            var temp2 = [];
            for (var k = 0; k < temp.length; k++) {
                temp2.push(temp[k].value);
                if (temp[k].dose === dseries[j].dose) {
                    temp2.push(temp[k].value);
                }
            }
            result.push({
                "series": dseries[j].series,
                "dose": dseries[j].dose,
                "value": amean(temp2)
            });
        }
        // ensure that the curve is ordered by dose
        result.sort(function (a, b) {
            if (a.dose < b.dose)
                return -1;
            if (a.dose > b.dose)
                return 1;
            return 0;
        });
        // avoid reporting duplicate doses
        var smoothresult = [];
        smoothresult.push(result[0]);
        for (var j = 1; j < result.length; j++) {
            if (result[j].dose !== result[j - 1].dose) {
                smoothresult.push(result[j]);
            }
        }
        return smoothresult;
    };

    var logbandwidth = +x.bandwidth * Math.log(xlim[1] / xlim[0]);
    for (var i = 0; i < series.length; i++) {
        var iseries = series[i];
        // get raw data for this series, then a smoothed version of the curve
        var iraw = drcdata.filter(function (d) {
            return d.series === series[i];
        });
        var ismooth = smoothseries(iraw, logbandwidth);

        // plot also with a smoothing
        svg.append("path")
                .data([ismooth])
                .attr("class", "line")
                .attr("d", drcline)
                .attr("stroke", seriescol[iseries])
                .attr("fill", "none")
                .attr("val", iseries)
                .attr("stroke-width", serieslwd[iseries])
                .style("opacity", function (d) {
                    return 0.8;
                })
                .on('mouseover', highlightcurve)
                .on('mouseout', unhighlightcurve);

        // write a text 
    }

    // add a legend 
    svg.selectAll(".legendtext").data(x.series).enter().append("text")
            .html(function (d) {
                return d.label;
            })
            .attr("x", x.legend[0])
            .attr("y", function (d) {
                return x.legend[1] + (d.id * x.legend[2]);
            })
            .attr("val", function (d) {
                return d.series;
            })
            .style("text-anchor", "left")
            .style("font-size", "10")
            .attr("dx", "0.5em").attr("dy", "0.25em").attr("class", "legend");

    svg.selectAll(".legendmarker").data(x.series).enter().append("circle")
            .attr("cx", x.legend[0])
            .attr("cy", function (d) {
                return x.legend[1] + (d.id * x.legend[2]);
            })
            .attr("val", function (d) {
                return d.series;
            })
            .attr("r", function (d) {
                return seriesr[d.series];
            })
            .attr("fill", function (d) {
                return seriescol[d.series];
            })
            .attr("class", "legend");

    svg.selectAll('.legend')
            .attr("opacity", 1)
            .on('mouseover', highlightcurve)
            .on('mouseout', unhighlightcurve);

};
