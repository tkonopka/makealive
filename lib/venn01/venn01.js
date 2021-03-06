/* venn01.js. Copyright 2017 Tomasz Konopka. */

/* global makealive, d3 */

/**
 * Produce a two-circle venn diagram
 * 
 * (calculation code adapted from Rpipelines)
 * 
 * Authors: Tomasz Konopka
 * 
 * @param obj - target DOM element that will contain output
 * @param x - object with configuration and data
 * 
 */
makealive.lib.venn01 = function (obj, x) {

    // define accepted arguments
    var xargs = [
        makealive.defArg("A", "array", "set A", null),
        makealive.defArg("B", "array", "set B", null),
        makealive.defArg("size", "integer:2", "size (width, height)", [180, 140]),
        makealive.defArg("margin", "number:4", "margins (top, right, bottom, left)", [25, 15, 10, 15]),
        makealive.defArg("title", "string", "chart title", ""),
        makealive.defArg("offset", "length", "offset of title from sets", "-0.5em"),
        makealive.defArg("names", "string:2", "set names", ["A", "B"]),
        makealive.defArg("opacity", "number", "opacity", 0.5),
        makealive.defArg("color", "color:2", "set colors", ["#dd0000", "#dd9900"])
    ];

    // provide info on arguments
    if (obj === null)
        return xargs;

    // check required arguments, check/fill optional arguments
    makealive.checkArgs(x, xargs);
    x.makealive = "venn01";

    // make sure A and B are arrays
    x.A = [].concat(x.A);
    x.B = [].concat(x.B);

    // ***********************************************************************
    // helper functions 

    var libtools = makealive.libtools;

    // area of cut off by a chord    
    // r circle radius, d perpendicular distance from center to chord
    var getChordArea = function (d, r) {
        d = Math.abs(d);
        var alpha = Math.acos(d / r);
        var aslice = r * r * alpha;
        var atriangle = d * Math.sqrt((r * r) - (d * d));
        return (aslice - atriangle);
    };

    // helper function finds centers of two circles a distance d apart
    // returns [cx1, cx2, alpha, beta] where cx1, cx2 are center positions 
    // and alpha, beta are angles in {d, r1, r2} triangle
    var getCXs = function (d, r1, r2) {
        if (d === 0) {
            return [0, 0];
        }
        if (d >= r1 + r2) {
            var gap = Math.sqrt(r1 * r2) / 4;
            return [-r1 - gap, r2 + gap];
        }
        // use cosine rule using triangle with sides [r1, r2, d]
        temp = ((d * d) + (r1 * r1) - (r2 * r2)) / (2 * d);
        return [-temp, d - temp,
            Math.abs(Math.acos(Math.abs(temp) / r1)),
            Math.abs(Math.acos(Math.abs(d - temp) / r2))];
    };

    // helper function to compute overlap of two circles
    // d - distance between centers, r1, r2 are radii
    var commonArea = function (d, r1, r2) {
        var rmin = (r1 < r2 ? r1 : r2);
        var rmax = (r1 >= r2 ? r1 : r2);
        if (d + rmin <= rmax)
            return rmin * rmin * Math.PI;
        if (d >= r1 + r2)
            return 0;
        // get estimates for circle positions
        var cxs = getCXs(d, r1, r2);
        // compute overlap area (different case depending on geometry)
        if (Math.sign(cxs[0]) * Math.sign(cxs[1]) < 0) {
            return getChordArea(cxs[0], r1) + getChordArea(cxs[1], r2);
        } else {
            var imin = (r1 < r2 ? 0 : 1);
            var imax = (imin + 1) % 2;
            return getChordArea(cxs[imin], rmin) - getChordArea(cxs[imax], rmax) + (rmin * rmin * Math.PI);
        }
    };

    // ***********************************************************************
    // prep calculations

    // clean up input and find intersection
    x.A = x.A.map(function (v) {
        return sanitizeHtml(v);
    });
    x.B = x.B.map(function (v) {
        return sanitizeHtml(v);
    });
    x.A = libtools.uniq(x.A);
    x.B = libtools.uniq(x.B);
    x.AB = x.A.filter(function (v) {
        return x.B.indexOf(v) !== -1;
    });

    // gets lengths of A, B, and intersection    
    var rootA = Math.sqrt(x.A.length), rootB = Math.sqrt(x.B.length),
            areaAB = x.AB.length * Math.PI;

    // get text representations for A only, B only, and AB    
    x.Aonly = x.A.filter(function (v) {
        return x.B.indexOf(v) === -1;
    });
    x.Bonly = x.B.filter(function (v) {
        return x.A.indexOf(v) === -1;
    });
    // create captions (holding set names and composition data)
    var partlengths = [x.Aonly.length, x.Bonly.length, x.AB.length];
    var longcaptions = [x.Aonly.join(", "), x.Bonly.join(", "), x.AB.join(", ")];
    for (var k = 0; k < 3; k++) {
        var withs = (partlengths[k] === 1 ? '' : 's');
        longcaptions[k] = '(' + partlengths[k] + ' item' + withs + ')<br/>' + longcaptions[k];
    }

    // get positions of circles
    var cxs = getCXs(rootA + rootB + 2, rootA, rootB);  // assumes not overlapping
    if (areaAB > 0) {
        // but if overlapping, get optimal distance. 
        // Look in range from close together to far apart
        var drange = [Math.abs(rootA - rootB), rootA + rootB];
        var err = [1, 1];
        var cc = 0;
        while (err[0] + err[1] > 1e-5 && cc < 200) {
            // compute overlaps of min and max, find errors with expected
            var temp = [commonArea(drange[0], rootA, rootB), commonArea(drange[1], rootA, rootB)];
            //alert("area is "+temp[0]+" with ab "+areaAB);
            err[0] = Math.abs((temp[0] - areaAB) / areaAB);
            err[1] = Math.abs((temp[1] - areaAB) / areaAB);
            // adjust the ranges based on which error is smaller  
            if (err[1] < err[0]) {
                drange[0] = drange[0] + (drange[1] - drange[0]) / 10;
            } else {
                drange[1] = drange[1] - (drange[1] - drange[0]) / 10;
            }
            cc++;
        }
        cxs = getCXs(drange[0], rootA, rootB);
    }


    // ***********************************************************************
    // create graphics

    // compute dimensions of entire svg & plot area
    libtools.dims(x);

    // create svg inside the object
    var svg = libtools.d3svg(obj, x);

    // scale the cxs and radii lenA and lenB to fit in the [winner, hinner] box
    var wdata = (cxs[1] + rootB) - (cxs[0] - rootA);
    var hdata = (rootA > rootB ? 2 * rootA : 2 * rootB);
    var scale = [x.winner / wdata, x.hinner / hdata];
    scale = (scale[0] > scale[1] ? scale[1] : scale[0]);

    // create tooltip div
    var tooltip = d3.select(obj).append("div").attr("class", "makealive tooltip");

    // compute the distance between a set with .cx and .cy and a mouse pointer 
    var inSet = function (set, mp) {
        var temp = [(set.cx - mp[0]), (set.cy - mp[1])];
        var dd = Math.sqrt((temp[0] * temp[0]) + (temp[1] * temp[1]));
        return dd < set.r;
    };

    // functions to show/hide the tooltip div
    var tooltipshow = function (d) {
        var mp = d3.mouse(this);
        // calculate whether the mouse is only in A, only in B, or both                
        var insets = [inSet(svgdata[0], mp), inSet(svgdata[1], mp)];
        var nowcaption = "";
        var midop = (x.opacity + 1) / 2;
        svg.selectAll('circle[notmask="1"]').style("opacity", x.opacity);
        if (insets[0] && insets[1]) {
            nowcaption = "<b>" + svgdata[0].name + " AND " + svgdata[1].name + "</b><br/>" + longcaptions[2];
            svg.select('[val="AB"]').style("opacity", midop);
        } else if (insets[0] && !insets[1]) {
            nowcaption = "<b>" + svgdata[0].name + " NOT " + svgdata[1].name + "</b><br/>" + longcaptions[0];
            svg.select('[val="Aonly"]').style("opacity", midop);
        } else if (insets[1] && !insets[0]) {
            nowcaption = "<b>" + svgdata[1].name + " NOT " + svgdata[0].name + "</b><br/>" + longcaptions[1];
            svg.select('[val="Bonly"]').style("opacity", midop);
        }        
        tooltip.html(nowcaption)
                .style("left", mp[0] + "px")
                .style("top", (-(+x.size[1] / 2) - x.margin[0] + mp[1]) + "px")
                .style("opacity", 0.9);
    };
    var tooltiphide = function () {
        svg.selectAll('circle[notmask="1"]').style("opacity", x.opacity);
        tooltip.style("opacity", 0);
    };

    // create data arrays for d3, later vectorize definitions of circles    
    var svgdata = [
        {
            "name": sanitizeHtml(x.names[0]),
            "color": x.color[0],
            "r": rootA * scale,
            "cx": rootA * scale,
            "cy": x.hinner / 2
        },
        {
            "name": sanitizeHtml(x.names[1]),
            "color": x.color[1],
            "r": rootB * scale,
            "cx": (rootA + cxs[1] - cxs[0]) * scale,
            "cy": x.hinner / 2
        }];
    // special case when one of the circles has zero size
    if (rootA === 0 || rootB === 0) {
        svgdata[1].cx = svgdata[0].cx = (rootA + rootB) * scale;
    }

    // manually create masks
    var svgdefs = svg.append("defs");

    // masks need ids. use with random numbers
    var nowrn = "mask" + Math.round(Math.random() * 1e9);

    // masks for only A            
    var maskA = svgdefs.append("mask").attr("id", nowrn + "A");
    maskA.append("rect").attr("y", -x.margin[0]).attr("x", -x.margin[3])
            .attr("width", "200%").attr("height", "200%").attr("fill", "white");
    maskA.append("circle").attr("cx", svgdata[1].cx).attr("cy", svgdata[1].cy)
            .attr("r", svgdata[1].r).attr("fill", "black");

    // mask for only B
    var maskB = svgdefs.append("mask").attr("id", nowrn + "B");
    maskB.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", "white");
    maskB.append("circle").attr("cx", svgdata[0].cx).attr("cy", svgdata[0].cy)
            .attr("r", svgdata[0].r).attr("fill", "black");

    // maks for AB intersection
    var maskAB = svgdefs.append("mask").attr("id", nowrn + "AB");
    maskAB.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", "black");
    maskAB.append("circle").attr("cx", svgdata[0].cx).attr("cy", svgdata[0].cy)
            .attr("r", svgdata[0].r).attr("fill", "white");

    // create the first circle shape (with a bite)
    svg.append("circle").attr("cx", svgdata[0].cx).attr("cy", svgdata[0].cy)
            .attr("r", svgdata[0].r).attr("mask", "url(#" + nowrn + "A)").attr("val", "Aonly")
            .style("opacity", x.opacity).attr("fill", svgdata[0].color).attr("notmask", "1");

    // create the second circle shape (with a bite)
    svg.append("circle").attr("cx", svgdata[1].cx).attr("cy", svgdata[1].cy)
            .attr("r", svgdata[1].r).attr("mask", "url(#" + nowrn + "B)").attr("val", "Bonly")
            .style("opacity", x.opacity).attr("fill", svgdata[1].color).attr("notmask", "1");

    // create the intersection (draw twice, to mix colors)
    svg.append("circle").attr("cx", svgdata[1].cx).attr("cy", svgdata[1].cy)
            .attr("r", svgdata[1].r).attr("mask", "url(#" + nowrn + "AB)")
            .style("opacity", x.opacity).attr("fill", svgdata[1].color)
            .attr("val", "AB").attr("notmask", "1");
    svg.append("circle").attr("cx", svgdata[1].cx).attr("cy", svgdata[1].cy)
            .attr("r", svgdata[1].r).attr("mask", "url(#" + nowrn + "AB)")
            .style("opacity", x.opacity).attr("fill", svgdata[0].color)
            .attr("val", "AB").attr("notmask", "1");

    svg.on('mousemove', tooltipshow).on('mouseout', tooltiphide);

    // set a default title
    if (x.title === '') {
        x.title = x.names[0] + " vs. " + x.names[1];
    }

    // create a title
    svg.append("text").html(x.title).style("text-anchor", "middle")
            .attr("y", 0).attr("dy", x.offset).attr("x", (svgdata[0].cx + svgdata[1].cx) / 2);
};
