/* makealive-lib.js. Copyright 2017 Tomasz Konopka */

/** 
 * Miscellaneous tools & helpers for makealive lib functions.
 * e.g. d3 wrappers that create re-usable components like axis+label 
 */

/* global makealive, d3, Infinity */


/**
 * Namespace for helper functions
 */
if (typeof makealive.libtools === 'undefined') {
    makealive.libtools = {};
}


/**
 * Augment x with outer and inner dimensions
 * 
 * @param x object with x.size, x.margin
 */
makealive.libtools.dims = function (x) {
    x.w = +x.size[0];
    x.h = +x.size[1];
    x.hinner = x.h - x.margin[0] - x.margin[2];
    x.winner = x.w - x.margin[1] - x.margin[3];
};


/**
 * Get 2-decimal place representation of a number
 * @param x number
 */
makealive.libtools.dec2 = function (x) {
    return Math.round(x * 100) / 100;
};


/**
 * Test for a valid color
 * @param x color
 */
makealive.libtools.isColor = function (x) {
    var six = /^#[0-9A-F]{6}$/i.test(x);
    var three = /^#[0-9A-F]{3}$/i.test(x);
    return six | three;
};


/**
 * create a d3 svg within the "obj"
 * 
 * @param obj - target div
 * @param x - object with settings  
 */
makealive.libtools.d3svg = function (obj, x) {
    // set the svg space
    d3.select(obj).attr("style", "width: " + x.w + "px; height: " + x.h + "px");
    // create an svg inside the target object
    var svg = d3.select(obj).append("svg")
            .attr("class", "makealive " + x.makealive)
            .attr("width", x.w + "px").attr("height", x.h + "px")
            .append("g").attr("transform",
            "translate(" + x.margin[3] + "," + x.margin[0] + ")");
    return svg;
};


/**
 * Add a text label on y axis
 * 
 * @param svg - svg object
 * @param x - object with x.size, x.margin, x.offset, x.ylab 
 */
makealive.libtools.d3ylab = function (svg, x) {
    svg.append("text").text(x.ylab).attr("transform", "rotate(-90)")
            .attr("class", "ylab")
            .attr("x", 0 - (x.h - x.margin[0] - x.margin[2]) / 2)
            .attr("y", 0).attr("dy", x.offset[2]);
};


/**
 * Add a text label on x axis
 * 
 * @param svg - svg object
 * @param x - object with x.size, x.margin, x.offset, x.ylab 
 * @param where - either "top" or "bottom"
 */
makealive.libtools.d3xlab = function (svg, x, where) {
    if (/bottom/.test(where)) {
        svg.append("text").text(x.xlab)
                .attr("class", "xlab bottom")
                .attr("x", x.winner / 2).attr("y", x.hinner).attr("dy", x.offset[1]);
    } else if (/top/.test(where)) {
        svg.append("text").text(x.xlab)
                .attr("class", "xlab top")
                .attr("x", 0).attr("y", 0).attr("dy", x.offset[1]);
    }
};


/**
 * Add a title 
 * 
 * @param svg - svg object
 * @param x - object with x.title, x.offset
 */
makealive.libtools.d3title = function (svg, x) {
    svg.append("text").text(x.title)
            .attr("class", "title")
            .attr("x", 0).attr("y", 0).attr("dy", x.offset[0]);
};


/**
 * Add an x axis (also creates the xlab)
 * 
 * @param svg - svg object
 * @param x - object with x.size, x.margin, x.offset, x.ylab, x.axisstyle  
 * @param xscale - d3 object determining scale
 * @param ticks - integer, number of ticks to show
 */
makealive.libtools.d3xaxis = function (svg, x, xscale, ticks) {

    var where = x.axisstyle[0];

    // determine whether to place axis on top or bottom
    var yshift = 0;
    var xaxis = d3.axisTop(xscale);
    if (/bottom/.test(where)) {
        yshift = x.hinner;
        xaxis = d3.axisBottom(xscale);
    }
    xaxis = xaxis.ticks(ticks);

    // create the svg element
    var gg = svg.append("g").attr("class", "xaxis " + where)
            .attr("transform", "translate(0," + yshift + ")").call(xaxis);

    // remove annoying ticks at the end of the domain...    
    gg.selectAll("path.domain").attr("d", "M" + x.winner + ",0.5H-0.5");

    // perhaps adjust the axis (e.g. remove the line, leave the text labels)    
    if (!/line/.test(where) && !/grid/.test(where)) {
        gg.selectAll(".domain, .tick > line").remove();
    }

    // perhaps display axis as horizontal lines 
    if (/grid/.test(where)) {
        gg.selectAll(".domain").remove();
        gg.selectAll(".tick > line").each(function () {
            d3.select(this).attr("y1", 0).attr("y2", x.hinner);
        });
    }

    // adjust the color of the axis (line and ticks)
    gg.selectAll("line, path").each(function () {
        d3.select(this).attr("stroke", x.axiscolor);
    });

    // add label
    makealive.libtools.d3xlab(svg, x, where);
};


/**
 * Add a y axis (also creates the ylab)
 * 
 * @param svg - svg object
 * @param x - object with x.size, x.margin, x.offset, x.ylab  
 * @param yscale - d3 object determining scale
 * @param ticks - integer, number of ticks to show
 */
makealive.libtools.d3yaxis = function (svg, x, yscale, ticks) {

    var where = x.axisstyle[1];

    var yaxis = d3.axisLeft(yscale);
    var xshift = 0;
    if (/right/.test(where)) {
        xshift = x.winner;
        yaxis = d3.axisRight(yscale);
    }
    yaxis = yaxis.ticks(ticks);

    // crete the axis by d3
    var gg = svg.append("g").attr("class", "yaxis " + where)
            .attr("transform", "translate(" + xshift + ",0)").call(yaxis);

    // remove annoying ticks at the end of the domain...    
    gg.selectAll("path.domain").attr("d", "M0.5," + x.hinner + "V0.5");

    // perhaps adjust (e.g. remove the line and ticks)
    if (!/line/.test(where) & !/grid/.test(where)) {
        gg.selectAll(".domain, .tick > line").remove();
    }

    // perhaps display axis as horizontal lines 
    if (/grid/.test(where)) {
        gg.selectAll(".domain").remove();
        gg.selectAll(".tick > line").each(function () {
            d3.select(this).attr("x1", 0).attr("x2", x.winner);
        });
    }

    // adjust the color of the axis (line and ticks)
    gg.selectAll("line, path").each(function () {
        d3.select(this).attr("stroke", x.axiscolor);
    });

    // add label
    makealive.libtools.d3ylab(svg, x, where);
};


/**
 * Applies transformation on the x-axis text labels. This can increase legibility
 * for long text labels.
 * 
 * @param svg - svg object
 * @param angle - number, rotation angle 
 */
makealive.libtools.d3rotateXtext = function(svg, angle) {
    if (angle===0) {
        return;
    }        
    svg.selectAll(".xaxis text").each(function(x) {
        var xd3 = d3.select(this);
        var xpos = [xd3.attr("x"), xd3.attr("y")];        
        var newt = "translate("+xpos[0]+","+xpos[1]+")rotate("+angle+")";        
        xd3.attr("x", 0).attr("y", 0).attr("transform", newt)
                .classed("rotated", true);
    });
};


/**
 * This is function shadeColor2 from:
 * 
 * http://stackoverflow.com/questions/5560248/
 * programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 * 
 * @param color - hex color in #RRGGBB
 * @param percent - misnomer, actually a value [-1, 1]
 */
makealive.libtools.shadeColor = function (color, percent) {
    var f = parseInt(color.slice(1), 16),
            t = percent < 0 ? 0 : 255,
            p = percent < 0 ? percent * -1 : percent,
            R = f >> 16,
            G = f >> 8 & 0x00FF,
            B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
};


/**
 * Shortcut for shadeColor with fixed percent leve 
 * @param x
 */
makealive.libtools.l2 = function (x) {
    if (!x) {
        x = "#000000";
    }
    return makealive.libtools.shadeColor(x, 0.25);
};


/**
 * Modify an interval using padding
 * 
 * @param d interval, e.g. [-1, 1]
 * @param pad float, amount by which to extend the interval
 * 
 */
makealive.libtools.extlim = function (d, pad) {
    var drange = +d[1] - d[0];
    d[0] = d[0] - (drange * pad);
    d[1] = d[1] + (drange * pad);
    return d;
};


/**
 * 
 * @param {type} d
 * @param {type} key
 * @returns {unresolved}
 */
makealive.libtools.pluck = function (d, key) {
    return d.map(function (x) {
        return x[key];
    });
};


/**
 * Identify maximal number in array
 * 
 * @param a
 * @returns 
 */
makealive.libtools.max = function (a) {
    var result = -Infinity;
    a.forEach(function (x) {
        result = Math.max(result, x);
    });
    return result;
};


/**
 * Identify minimal number in array
 * 
 * @param a
 * @returns 
 */
makealive.libtools.min = function (a) {
    var result = Infinity;
    a.forEach(function (x) {
        result = Math.min(result, x);
    });
    return result;
};


/**
 * Get an sub-array of a that holds only distinct elements
 * @param a
 * @returns {undefined}
 */
makealive.libtools.uniq = function (a) {
    var result = [];
    var aset = {};
    a.forEach(function (x) {
        if (!aset.hasOwnProperty(x)) {
            aset[x] = 1;
            result.push(x);
        }
    });
    return result;
};


/**
 * Turn an array of objects with .key into an object that is indexed by the key
 * 
 * @param a array of objects
 * @param key string, key to index by 
 */
makealive.libtools.indexBy = function (a, key) {
    var result = {};
    a.forEach(function (x) {
        result[x[key]] = x;
    });
    return result;
};
