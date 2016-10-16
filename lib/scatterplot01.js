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
    makealive.defArg("data", "array", "contents of scatter plot: x, y, name", null),
    makealive.defArg("size", "integer:2", "size (width, height)", [200,200]),
    makealive.defArg("margin", "number:4", "margins (top, right, bottom, left)", [30, 30, 50, 50]),
    makealive.defArg("offset", "length:3", "label offsets from axis (top, x, y)", ["-1em", "2.5em", "-2.5em"]),
    makealive.defArg("radius", "number", "point size", 3),
    makealive.defArg("color", "color", "point color", "#0000cc"),    
    makealive.defArg("padding", "number", "space between bars", 0.1)
    ];
    
    if (obj===null) return xargs;
    
    // check required arguments
    makealive.checkArgs(x, xargs);
    
    
    // ***********************************************************************
    // done prep, start drawing scatterplot
    
    // dimensions of entire svg
    var w = +x.size[0];
    var h = +x.size[1];
    // dimensions of the plot area
    var hinner = h-x.margin[0]-x.margin[2];
    var winner = w-x.margin[1]-x.margin[3];
    
    // set the svg space
    d3.select(obj).attr("style", "width: "+w+"px; height: "+h+"px");
     
    // create an svg inside the object
    var svg = d3.select(obj).append("svg")
    .attr("width", w+"px").attr("height", h+"px")    
    .append("g").attr("transform",
        "translate(" + x.margin[3] + "," + x.margin[0] + ")");
    
    var getXYlim = function(rawlim) {
        var rawrange = +rawlim[1]-rawlim[0];
        rawlim[0] = rawlim[0]-(rawrange*x.padding);
        rawlim[1] = rawlim[1]+(rawrange*x.padding);
        return rawlim;        
    }
    
    // get simple array representations of the x and y coordinates    
    var xvalues = x.data.map(function(d) {
        return +d.x;
    }); 
    var xlim = getXYlim([Math.min.apply(null, xvalues), Math.max.apply(null, xvalues)]);    
    var yvalues = x.data.map(function(d) {
        return +d.y;
    });    
    var ylim = getXYlim([Math.min.apply(null, yvalues), Math.max.apply(null, yvalues)]);
    var zvalues = x.data.map(function(d) {
        return +d.z;
    });
    var zmax = Math.max.apply(null, zvalues);    
    
    // create tooltip
    var tooltip = d3.select(obj).append("div").style("opacity",0)
    .style("background-color", "#333333").style("border-radius", "4px")
    .style("position", "relative").style("color","#fff4f4").style("padding", "4px 8px")
    .style("font-size", "80%").style("display", "inline-block").style("text-align", "center");    
    
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
    var yscale = d3.scaleLinear().range([hinner, 0]).domain(ylim);
    var yaxis = d3.axisLeft(yscale).ticks(4);    
    svg.append("g").call(yaxis);
    svg.append("text").attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("x",0 - (h-x.margin[0]-x.margin[2])/2)
    .attr("dy", x.offset[2])
    .style("text-anchor", "middle")
    .text(x.ylab);
    
    // create the x axis and labels
    var xscale = d3.scaleLinear().range([0, winner]).domain(xlim);
    var xaxis = d3.axisBottom(xscale).ticks(4);    
    svg.append("g")
    .attr("transform", "translate(0," + hinner + ")")
    .call(xaxis);    
    svg.append("text")
    .attr("y", 0+hinner)
    .attr("x",0 + (winner/2))
    .attr("dy", x.offset[1])
    .style("text-anchor", "middle")
    .text(x.xlab);
    
    // create the barplots rectangles
    svg.selectAll(".bar").data(x.data).enter().append("circle")
    .attr("class", "scatterdot").attr("fill", x.color)
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
    svg.append("text").text(x.title).style("text-anchor", "left")
    .attr("y", 0).attr("dy", x.offset[0])
    .attr("x", 0);    
} 


