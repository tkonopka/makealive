/* matrix01.js. Copyright 2017 Tomasz Konopka. */

/* global makealive, d3 */

/*
 * Rectangular matrix chart (heatmap) using d3 (v4)
 * 
 * Authors: Tomasz Konopka
 * 
 * @param obj - target DOM element that will contain output
 * @param x - object with configuration and data
 * 
 */
makealive.lib.matrix01 = function (obj, x) {

    // define accepted arguments
    var xargs = [
        makealive.defArg("title", "string", "chart title", null),
        makealive.defArg("xlab", "string", "x-axis label", null),
        makealive.defArg("ylab", "string", "y-axis label", null),
        makealive.defArg("data", "array:x:y:value:label", "contents of heatmap", null),
        makealive.defArg("size", "integer:2", "size (width, height)", [200, 200]),
        makealive.defArg("margin", "number:4", "margins (top, right, bottom, left)", [40, 20, 40, 50]),
        makealive.defArg("offset", "length:3", "label offsets from axis (top, x, y)", ["-1.5em", "2.5em", "-2.5em"]),
        makealive.defArg("padding", "number", "space between rectangles", 0.2),
        makealive.defArg("axisstyle", "string:2", "type of axis (x, y)", ["bottom", "left"]),
        makealive.defArg("square", "integer", "logical to make matrix components square", 1),
        makealive.defArg("color", "color:2", "color of boxes (negative, positive) values", ["#171a9a", "#dd0000"]),
        makealive.defArg("xangle", "number", "rotation angle for x labels", -90)        
    ];

    // provide info on arguments
    if (obj === null)
        return xargs;

    // check required arguments, check/fill optional arguments
    makealive.checkArgs(x, xargs);
    x.makealive = "matrix01";

    // ***********************************************************************
    // done prep, start drawing barplot

    var libtools = makealive.libtools;

    // compute dimensions of entire svg and of the plot area        
    libtools.dims(x);

    // create svg inside the object
    var svg = libtools.d3svg(obj, x);

    // create a title
    libtools.d3title(svg, x);

    // create a array of all the keys for x and y axes    
    var xkeys = libtools.pluck(x.data, "x");
    xkeys = libtools.uniq(xkeys);
    var ykeys = libtools.pluck(x.data, "y");
    ykeys = libtools.uniq(ykeys);

    // compute the size of one matrix component
    var elsize = [x.winner / xkeys.length, x.hinner / ykeys.length];
    if (x.square) {
        var elmin = elsize[0] < elsize[1] ? elsize[0] : elsize[1];
        elsize = [elmin, elmin];
    }
    // perhaps adjust the x.hinner and x.winner if the 
    x.mwidth = elsize[0] * xkeys.length;
    x.mheight = elsize[1] * ykeys.length;
    x.winner = x.mwidth;
    x.hinner = x.mheight;

    // create x-axis and labels         
    var xscale = d3.scaleBand().range([0, x.mwidth]).padding(x.padding)
            .domain(xkeys);
    libtools.d3xaxis(svg, x, xscale);
    libtools.d3rotateXtext(svg, x.xangle);

    // create y axis and labels              
    var yscale = d3.scaleBand().range([0, x.mheight]).padding(x.padding)
            .domain(ykeys);
    libtools.d3yaxis(svg, x, yscale);

    // create tooltips
    var tooltip = d3.select(obj).append("div").attr("class", "makealive tooltip");

    // functions to show/hide the tooltip div
    var tooltipshow = function (d) {
        var thisbar = d3.select(this);
        thisbar.attr("fill", thisbar.attr("fillcolor"));
        tooltip.html("<b>" + d.x + "," + d.y + ":</b> " + d.value)
                .style("left", (+x.margin[3] + xscale(d.x)) + "px")
                .style("top", -x.size[1] + yscale(d.y) + "px")
                .style("opacity", .9);
    };
    var tooltiphide = function (d) {
        var thisbar = d3.select(this);
        thisbar.attr("fill", libtools.l2(thisbar.attr("fillcolor")));
        tooltip.style("opacity", 0);
    };

    // modify the x.data so that it only has
    var getElementColor = function (d) {
        // if value is not defined, use default
        if (!d.value) {
            return "#ffffff";
        }
        // if value is a color, just use that
        if (libtools.isColor(d.value)) {
            return d.value;
        }
        // alternatively, interpret the value as a number and use shading
        var basecolor = +d.value > 0 ? x.color[1] : x.color[0];
        return libtools.shadeColor(basecolor, 1 - Math.abs(d.value));
    };

    // create the barplots rectangles    
    svg.selectAll(".matrixelment").data(x.data).enter().append("rect")
            .attr("class", "matrixelement")
            .attr("fill", function (d) {
                return libtools.l2(getElementColor(d));
            })
            .attr("fillcolor", getElementColor)
            .attr("x", function (d) {
                return xscale(d.x);
            })
            .attr("width", xscale.bandwidth())
            .attr("y", function (d) {
                return yscale(d.y);
            })
            .attr("height", yscale.bandwidth())
            .on('mouseover', tooltipshow)
            .on('mouseout', tooltiphide);

};
