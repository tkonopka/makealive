/**
 * Simple horizontal barplot using d3 (v4)
 * 
 * Authors:
 * Tomasz Konopka
 * (with help from d3 tutorials)
 * 
 * @param obj - target DOM element that will contain output
 * @param x - object with configuration and data
 * 
 */
makealive.lib.barplot02 = function(obj, x) {
             
    // define accepted arguments
    var xargs = [
    makealive.defArg("title", "string", "chart title", null),
    makealive.defArg("xlab", "string", "x-axis label", null), 
    makealive.defArg("ylab", "string", "y-axis label", null), 
    makealive.defArg("data", "array", "contents of bar plot; label, value, fill", null),
    makealive.defArg("size", "integer:2", "size (width, height)", [360,200]),
    makealive.defArg("margin", "number:4", "margins (top, right, bottom, left)", [70, 20, 30, 50]),
    makealive.defArg("offset", "length:3", "label offsets from axis (top, x, y)", ["-3.3em", "-2.0em", "-2.0em"]),
    makealive.defArg("padding", "number", "space between bars", 0.2)
    ];
    
    // provide info on arguments
    if (obj===null) return xargs;        
    
    // check required arguments, check/fill optional arguments
    makealive.checkArgs(x, xargs); 
    
    
    // ***********************************************************************
    // done prep, start drawing barplot

    // dimensions of entire svg
    var w = +x.size[0];
    var h = +x.size[1];
    // dimensions of the plot area
    var hinner = h-x.margin[0]-x.margin[2];
    var winner = w-x.margin[1]-x.margin[3];
    
    // set the svg space
    d3.select(obj).attr("style", "width: "+w+"px; height: "+h+"px");
         
    // create an svg inside the target object
    var svg = d3.select(obj).append("svg")
    .attr("width", w+"px").attr("height", h+"px")    
    .append("g").attr("transform",
        "translate(" + x.margin[3] + "," + x.margin[0] + ")");
         
    // create a title
    svg.append("text").html(x.title).style("text-anchor", "left")
    .attr("y", 0).attr("dy", x.offset[0])
    .attr("x", 0);          
         
    // create x-axis and labels
    var xvalues = x.data.map(function(d) {
        return d.value
    });
    svg.append("text").html(x.xlab).style("text-anchor", "left")
    .attr("y", 0).attr("dy", x.offset[1])
    .attr("x", 0);             
    var xscale = d3.scaleLinear().range([0, winner])
    .domain([0, Math.max.apply(null, xvalues)]);    
    var xaxis = d3.axisTop(xscale).ticks(5);    
    svg.append("g").attr("transform", "translate(0,0)").call(xaxis);    
    //.selectAll(".domain, .tick > line").remove();    
    
    // create the y axis and labels
    svg.append("text").attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("x",0 - (h-x.margin[0]-x.margin[2])/2)
    .attr("dy", x.offset[2])
    .style("text-anchor", "middle")
    .html(x.ylab);
    var yscale = d3.scaleBand().range([0, hinner]).padding(x.padding)
    .domain(x.data.map(function(d) {
        return d.name;
    }));
    var yaxis = d3.axisLeft(yscale);  
    svg.append("g").attr("transform", "translate(0,0)").call(yaxis)
    .selectAll(".domain, .tick > line").remove();    
      
    // create tooltips
    var tooltip = d3.select(obj).append("div").style("opacity",0)
    .style("background-color", "#333333").style("border-radius", "4px")
    .style("position", "relative").style("color","#fff4f4").style("padding", "4px 8px")
    .style("font-size", "80%").style("display","inline-block")
    .style("text-align", "center");
    
    // functions to show/hide the tooltip div
    var tooltipshow = function(d) {          
        d3.select(this).style("opacity",1);        
        tooltip.html("<b>"+d.name+":</b> "+d.value)
        .style("left", (+x.margin[3]+xscale(d.value)) + "px")		
        .style("top", (-h+x.margin[2]+yscale(d.name)+yscale.bandwidth()) + "px")
        .style("opacity", .9);	
    }
    var tooltiphide = function(d) {
        d3.select(this).style("opacity",0.8);
        tooltip.style("opacity", 0);		        
    }
          
    // create the barplots rectangles    
    svg.selectAll(".bar").data(x.data).enter().append("rect")
    .attr("class", "bar").attr("fill", function(d) {
        return d.fill;
    }).style("opacity", 0.8)
    .attr("x", function(d) {
        return xscale(0);
    })
    .attr("width", function(d) {
        return xscale(d.value);
    })
    .attr("y", function(d) {
        return yscale(d.name);
    })
    .attr("height", yscale.bandwidth())    
    .on('mouseover', tooltipshow)
    .on('mouseout', tooltiphide)  
       
}

