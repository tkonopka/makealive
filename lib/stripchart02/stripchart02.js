/*
 * Horizontal category plot (like a boxplot) using d3 (v4)
 * 
 * Authors: Tomasz Konopka
 * 
 * @param obj - target DOM element that will contain output
 * @param x - object with configuration and data
 * 
 */
makealive.lib.stripchart02 = function(obj, x) {
    
    // define accepted arguments
    var xargs = [
    makealive.defArg("title", "string", "chart title", null),
    makealive.defArg("xlab", "string", "x-axis label", null), 
    makealive.defArg("ylab", "string", "y-axis label", null), 
    makealive.defArg("data", "array:name:value:fill", "contents of plot", null),
    makealive.defArg("size", "integer:2", "size (width, height)", [200,200]),
    makealive.defArg("margin", "number:4", "margins (top, right, bottom, left)", [60, 20, 30, 50]),
    makealive.defArg("offset", "length:3", "label offsets from axis (top, x, y)", ["-3.0em", "-1.8em", "-2.5em"]),
    makealive.defArg("radius", "number", "point size", 3),
    makealive.defArg("padding", "number", "space between bars", 0.2),
    makealive.defArg("axisstyle", "string", "type of axis", ["top line", "left"]),
    makealive.defArg("axiscolor", "string", "color of grid lines", "#000000")
    ];
    
    // provide info on arguments
    if (obj===null) return xargs;        
    
    // check required arguments, check/fill optional arguments
    makealive.checkArgs(x, xargs);                      
    x.makealive = "stripchart01";   
       
    // ***********************************************************************
    // done prep, start drawing barplot

    // compute dimensions of entire svg and of the plot area        
    makealive.libtools.dims(x);
        
    // create svg inside the object
    var svg = makealive.libtools.d3svg(obj, x);
    
    // create a title
    makealive.libtools.d3title(svg, x);    
    
    // turn the series into an associative object (object with names)
    var seriesinfo = _.indexBy(x.series, "series");            
        
    // create y-axis and labels     
    var yscale = d3.scaleBand().range([0, x.hinner]).padding(x.padding)
    .domain( _.pluck(x.series, "label") );
    var yaxis = d3.axisLeft(yscale);  
    makealive.libtools.d3yaxis(svg, x, yaxis);
         
    // create x-axis and labels
    var xvals = _.pluck(x.data, "value");
    var xlim = makealive.libtools.extlim([_.min(xvals), _.max(xvals)], x.padding/3);
    var xscale = d3.scaleLinear().range([0, x.winner]).domain(xlim);    
    var xaxis = d3.axisTop(xscale).ticks(4);        
    makealive.libtools.d3xaxis(svg, x, xaxis);
      
    // create tooltips
    var tooltip = d3.select(obj).append("div").attr("class", "makealive tooltip");
            
    // functions to show/hide the tooltip div
    var tooltipshow = function(d) { 
        var thisbar = d3.select(this);
        thisbar.attr("fill", thisbar.attr("fillcolor"));                
        var dlab = seriesinfo[d.series]["label"]+": "+d.name;
        tooltip.html("<b>"+dlab+":</b> " + d.value)
        .style("left", (+x.margin[3]+xscale(d.value))+6 + "px")		        
        .style("top", (-x.h+x.margin[2]+yscale(seriesinfo[d.series].label))+6 + "px")
        .style("opacity", .9);	
    }
    var tooltiphide = function(d) {   
        var thisbar = d3.select(this);
        thisbar.attr("fill", makealive.libtools.l2(thisbar.attr("fillcolor")));
        tooltip.style("opacity", 0).style("left", "0px").style("top", "0px");		        
    }
    
    // create the strip markers
    svg.selectAll(".marker").data(x.data).enter().append("circle")
    .attr("class", "marker")
    .attr("fill", function(d) {
        if (d.fill) {
            return makealive.libtools.l2(d.fill);
        } else {
            return makealive.libtools.l2(seriesinfo[d.series].fill);
        }  
    })
    .attr("fillcolor", function(d) {
        if (d.fill) {
            return d.fill;
        } else {
            return seriesinfo[d.series].fill;
        }
    })    
    .attr("cy", function(d) {
        return yscale(seriesinfo[d.series].label) + (yscale.bandwidth()*Math.random());
    })    
    .attr("cx", function(d) {
        return xscale(d.value);
    })
    .attr("r", function(d) {
        return x.radius;         
    })
    .on('mouseover', tooltipshow)
    .on('mouseout', tooltiphide);  
                    
}
