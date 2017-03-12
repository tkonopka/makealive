/*
 * Simple bar plot using d3 (v4)
 * 
 * Authors: Tomasz Konopka
 * 
 * @param obj - target DOM element that will contain output
 * @param x - object with configuration and data
 * 
 */
makealive.lib.barplot01 = function(obj, x) {
    
    // define accepted arguments
    var xargs = [
    makealive.defArg("title", "string", "chart title", null),
    makealive.defArg("xlab", "string", "x-axis label", null), 
    makealive.defArg("ylab", "string", "y-axis label", null), 
    makealive.defArg("data", "array:name:value:fill", "contents of bar plot", null),
    makealive.defArg("size", "integer:2", "size (width, height)", [200,200]),
    makealive.defArg("margin", "number:4", "margins (top, right, bottom, left)", [40, 20, 40, 50]),
    makealive.defArg("offset", "length:3", "label offsets from axis (top, x, y)", ["-1.5em", "2.5em", "-2.5em"]),
    makealive.defArg("padding", "number", "space between bars", 0.2),
    makealive.defArg("axisstyle", "string", "type of axis", ["bottom", "left line"]),
    makealive.defArg("axiscolor", "string", "color of grid lines", "#000")
    ];
    
    // provide info on arguments
    if (obj===null) return xargs;        
    
    // check required arguments, check/fill optional arguments
    makealive.checkArgs(x, xargs);                      
    x.makealive = "barplot01";   
       
    // ***********************************************************************
    // done prep, start drawing barplot

    // compute dimensions of entire svg and of the plot area        
    makealive.libtools.dims(x);
        
    // create svg inside the object
    var svg = makealive.libtools.d3svg(obj, x);
    
    // create a title
    makealive.libtools.d3title(svg, x);    
    
    // create x-axis and labels     
    var xscale = d3.scaleBand().range([0, x.winner]).padding(x.padding)
    .domain( _.pluck(x.data, "name") );
    var xaxis = d3.axisBottom(xscale);  
    makealive.libtools.d3xaxis(svg, x, xaxis);
         
    // create y axis and labels
    var yvalues = _.pluck(x.data, "value");
    yvalues.push(0);    
    var yscale = d3.scaleLinear()
    .range([x.hinner, 0]).domain([_.min(yvalues), _.max(yvalues)]);    
    var yaxis = d3.axisLeft(yscale).ticks(4);        
    makealive.libtools.d3yaxis(svg, x, yaxis);
      
    // create tooltips
    var tooltip = d3.select(obj).append("div").attr("class", "makealive tooltip");
            
    // functions to show/hide the tooltip div
    var tooltipshow = function(d) { 
        var thisbar = d3.select(this);
        thisbar.attr("fill", thisbar.attr("fillcolor"));        
        tooltip.html("<b>"+d.name+":</b> "+d.value)
        .style("left", (+x.margin[3]+xscale(d.name)) + "px")		
        .style("top", -x.size[1] +(yscale(_.max([0,d.value]))) + "px")
        .style("opacity", .9);	
    }
    var tooltiphide = function(d) {   
        var thisbar = d3.select(this);
        thisbar.attr("fill", makealive.libtools.l2(thisbar.attr("fillcolor")));
        tooltip.style("opacity", 0);		        
    }
          
    // create the barplots rectangles
    svg.selectAll(".bar").data(x.data).enter().append("rect")
    .attr("class", "bar")
    .attr("fill", function(d) {                       
        return makealive.libtools.l2(d.fill);        
    })
    .attr("fillcolor", function(d) {        
        return d.fill;        
    })    
    .attr("x", function(d) {
        return xscale(d.name);
    })
    .attr("width", xscale.bandwidth())
    .attr("y", function(d) {        
        return yscale(_.max([0, d.value]));        
    })
    .attr("height", function(d) {                   
        return Math.sign(d.value)*(yscale(0) - yscale(d.value));
    })
    .on('mouseover', tooltipshow)
    .on('mouseout', tooltiphide)              
}
