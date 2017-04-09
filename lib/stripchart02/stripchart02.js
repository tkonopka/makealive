/* stripchart02.js. Copyright 2017 Tomasz Konopka. */

/* global makealive, d3 */

/*
 * Horizontal category plot (like a boxplot) using d3 (v4)
 * 
 * Authors: Tomasz Konopka
 * 
 * @param obj - target DOM element that will contain output
 * @param x - object with configuration and data
 * 
 */
makealive.lib.stripchart02 = function (obj, x) {

    // define accepted arguments
    var xargs = [
        makealive.defArg("title", "string", "chart title", null),
        makealive.defArg("xlab", "string", "x-axis label", null),
        makealive.defArg("ylab", "string", "y-axis label", null),
        makealive.defArg("data", "array:name:series:value", "contents of plot", null),
        makealive.defArg("series", "array:series:label:fill", "definition of series", null),
        makealive.defArg("size", "integer:2", "size (width, height)", [200, 200]),
        makealive.defArg("margin", "number:4", "margins (top, right, bottom, left)", [60, 20, 30, 50]),
        makealive.defArg("offset", "length:3", "label offsets from axis (top, x, y)", ["-3.0em", "-1.8em", "-2.5em"]),
        makealive.defArg("radius", "number", "point size", 3),
        makealive.defArg("padding", "number", "space between bars", 0.2),
        makealive.defArg("axisstyle", "string:2", "type of axis (x, y)", ["top line", "left"]),
        makealive.defArg("axiscolor", "string", "color of grid lines", "#000000")
    ];

    // provide info on arguments
    if (obj === null)
        return xargs;

    // check required arguments, check/fill optional arguments
    makealive.checkArgs(x, xargs);
    x.makealive = "stripchart01";

    // ***********************************************************************
    // done prep, start drawing barplot

    var libtools = makealive.libtools;

    // compute dimensions of entire svg and of the plot area        
    libtools.dims(x);

    // create svg inside the object
    var svg = libtools.d3svg(obj, x);

    // create a title
    libtools.d3title(svg, x);

    // turn the series into an associative object (object with names)
    var seriesinfo = libtools.indexBy(x.series, "series");

    // create y-axis and labels     
    var yscale = d3.scaleBand().range([0, x.hinner]).padding(x.padding)
            .domain(libtools.pluck(x.series, "label"));    
    libtools.d3yaxis(svg, x, yscale);

    // create x-axis and labels
    var xvals = libtools.pluck(x.data, "value");
    var xlim = libtools.extlim([libtools.min(xvals), libtools.max(xvals)], x.padding / 3);
    var xscale = d3.scaleLinear().range([0, x.winner]).domain(xlim);    
    libtools.d3xaxis(svg, x, xscale, 4);

    // create tooltips
    var tooltip = d3.select(obj).append("div").attr("class", "makealive tooltip");

    // functions to show/hide the tooltip div
    var tooltipshow = function (d) {
        var thisbar = d3.select(this);
        thisbar.attr("fill", thisbar.attr("fillcolor"));
        var dlab = seriesinfo[d.series]["label"] + ": " + d.name;
        tooltip.html("<b>" + dlab + ":</b> " + d.value)
                .style("left", (+x.margin[3] + xscale(d.value)) + 6 + "px")
                .style("top", (-x.h + x.margin[2] + yscale(seriesinfo[d.series].label)) + 6 + "px")
                .style("opacity", .9);
    };
    var tooltiphide = function (d) {
        var thisbar = d3.select(this);
        thisbar.attr("fill", libtools.l2(thisbar.attr("fillcolor")));
        tooltip.style("opacity", 0).style("left", "0px").style("top", "0px");
    };

    // create the strip markers
    svg.selectAll(".marker").data(x.data).enter().append("circle")
            .attr("class", "marker")
            .attr("fill", function (d) {
                if (d.fill) {
                    return libtools.l2(d.fill);
                } else {
                    return libtools.l2(seriesinfo[d.series].fill);
                }
            })
            .attr("fillcolor", function (d) {
                if (d.fill) {
                    return d.fill;
                } else {
                    return seriesinfo[d.series].fill;
                }
            })
            .attr("cy", function (d) {
                return yscale(seriesinfo[d.series].label) + (yscale.bandwidth() * Math.random());
            })
            .attr("cx", function (d) {
                return xscale(d.value);
            })
            .attr("r", function (d) {
                return x.radius;
            })
            .on('mouseover', tooltipshow)
            .on('mouseout', tooltiphide);

};
