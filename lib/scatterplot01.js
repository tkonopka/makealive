/*
 * Simple scatter plot using d3 (v4)
 *
 * Authors:
 * Tomasz Konopka
 * (with help from d3 tutorials)
 * 
 * @param obj - target DOM element that will contain output
 * @param x - object with configuration and data
 * 
 */
makealive.lib.scatterplot01 = function(obj, x) {
    
    // define accepted arguments
    var xargs = [
    makealive.defArg("title", "string", "chart title", null),
    makealive.defArg("xlab", "string", "x-axis label", null), 
    makealive.defArg("ylab", "string", "y-axis label", null), 
    makealive.defArg("data", "array:x:y:name", "contents of scatter plot", null),
    makealive.defArg("size", "integer:2", "size (width, height)", [200,200]),
    makealive.defArg("margin", "number:4", "margins (top, right, bottom, left)", [30, 30, 50, 50]),
    makealive.defArg("offset", "length:3", "label offsets from axis (top, x, y)", ["-1em", "2.5em", "-2.5em"]),
    makealive.defArg("radius", "number", "point size", 3),
    makealive.defArg("color", "color", "point color", "#0000cc"),    
    makealive.defArg("padding", "number", "space around points", 0.1),
    makealive.defArg("axisstyle", "string", "type of axis", ["bottom line", "left line"]),
    makealive.defArg("axiscolor", "string", "color of grid lines", "#000")
    ];
    
    if (obj===null) return xargs;
    
    // check required arguments
    makealive.checkArgs(x, xargs);
    x.makealive = "scatterplot01";
    
    
    // ***********************************************************************
    // done prep, start drawing scatterplot

    // compute dimensions of entire svg & inner plot area
    makealive.libtools.dims(x);
    
    // create svg inside the object
    var svg = makealive.libtools.d3svg(obj, x);

    var getXYlim = function(rawlim) {
        var rawrange = +rawlim[1]-rawlim[0];
        rawlim[0] = rawlim[0]-(rawrange*x.padding);
        rawlim[1] = rawlim[1]+(rawrange*x.padding);
        return rawlim;        
    }
    
    // get simple array representations of the x and y coordinates    
    var xvalues = _.pluck(x.data, "x");
    var yvalues = _.pluck(x.data, "y");    
    var xlim = getXYlim([_.min(xvalues), _.max(xvalues)]);            
    var ylim = getXYlim([_.min(yvalues), _.max(yvalues)]);        
    
    // create tooltip
    var tooltip = d3.select(obj).append("div").attr("class", "makealive tooltip");

    // functions to show/hide the tooltip div
    var tooltipshow = function(d) {          
        d3.select(this).style("opacity",1);
        tooltip.html("<b>"+d.name+":</b> ("+d.x+", "+d.y+")")
        .style("left", (+x.margin[3]+xscale(d.x)) + "px")		
        .style("top", -h +(yscale(d.y)) + "px")
        .style("opacity", .9);
        if (tooltip.style("display")=="none") {
            tooltip.style("display", "inline-block");	
        }
    }
    var tooltiphide = function(d) {
        d3.select(this).style("opacity",0.8);
        tooltip.style("opacity", 0).style("display", "none");			        
    }
              
    // create the y axis and labels
    var yscale = d3.scaleLinear().range([x.hinner, 0]).domain(ylim);
    var yaxis = d3.axisLeft(yscale).ticks(4);        
    makealive.libtools.d3yaxis(svg, x, yaxis);
    
    // create the x axis and labels
    var xscale = d3.scaleLinear().range([0, x.winner]).domain(xlim);
    var xaxis = d3.axisBottom(xscale).ticks(4);  
    makealive.libtools.d3xaxis(svg, x, xaxis);
    
    // create the scatterplot markers
    svg.selectAll(".marker").data(x.data).enter().append("circle")
    .attr("class", "marker").attr("fill", x.color)
    .style("opacity", function(d) {
        return 0.8;        
    })
    .attr("cx", function(d) {
        return xscale(d.x);
    })    
    .attr("cy", function(d) {
        return yscale(d.y);
    })
    .attr("r", function(d) {
        return x.radius;         
    })
    .on('mouseover', tooltipshow)
    .on('mouseout', tooltiphide);  

    // create a title
    makealive.libtools.d3title(svg, x);
    
} 
