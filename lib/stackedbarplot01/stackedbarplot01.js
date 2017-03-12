/*
 * Stacked vertical bar plot using d3 (v4)
 * 
 * Authors: Tomasz Konopka 
 * 
 * @param obj - target DOM element that will contain output
 * @param x - object with configuration and data
 * 
 */
makealive.lib.stackedbarplot01 = function(obj, x) {
    
    // define accepted arguments
    var xargs = [
    makealive.defArg("title", "string", "chart title", null),
    makealive.defArg("xlab", "string", "x-axis label", null), 
    makealive.defArg("ylab", "string", "y-axis label", null),     
    makealive.defArg("data", "array:name:series:value", "contents of bar plot", null),
    makealive.defArg("series", "array:series:label:fill", "series labels", null),    
    makealive.defArg("size", "integer:2", "size (width, height)", [300,200]),
    makealive.defArg("margin", "number:4", "margins (top, right, bottom, left)", [40, 140, 45, 55]),
    makealive.defArg("offset", "length:3", "label offsets from axis (top, x, y)", ["-1.5em", "2.5em", "-2.5em"]),
    makealive.defArg("padding", "number", "space between bars", 0.2),
    makealive.defArg("legend", "integer:3", "legend position (x, y, spacing)", [125, 20, 16]),
    makealive.defArg("legendmarker", "integer:2", "legend marker (width, height, offset)", [15, 8, -2]),
    makealive.defArg("axisstyle", "string", "type of axis", ["bottom", "left line"]),
    makealive.defArg("axiscolor", "string", "color of grid lines", "#000")
    ];
    
    // provide info on arguments
    if (obj===null) return xargs;        
    
    // check required arguments, check/fill optional arguments
    makealive.checkArgs(x, xargs);                      
    x.makealive = "stackedbarplot01";           
         

    // ***********************************************************************
    // done prep, start drawing barplot

    // dimensions of entire svg & plot area
    makealive.libtools.dims(x);
    
    // create svg inside the object
    var svg = makealive.libtools.d3svg(obj, x);
      
    // create a title
    makealive.libtools.d3title(svg, x);
    
    // create x-axis and labels 
    var barnames = _.uniq(_.pluck(x.data, "name"));    
    var xscale = d3.scaleBand().range([0, x.winner]).padding(x.padding)
    .domain( barnames );
    var xaxis = d3.axisBottom(xscale);    
    makealive.libtools.d3xaxis(svg, x, xaxis);    
           
    // turn the series into an associative object (object with names)
    var seriesinfo = _.indexBy(x.series, "series");            
    // add an id code to the series info    
    for (var i=0; i<x.series.length; i++) {
        x.series[i]["id"] = i;
    }
    
    // split the x.data by name (bar) and impute rectangle upper/lower bounds
    var namedata = [];
    for (var i=0; i<barnames.length; i++) {
        var idata = x.data.filter(function(d) {
            return d.name==barnames[i];
        });
        idata.sort(function(a,b) {
            return a.series > b.series;
        })
        var itemp = 0;
        for (var j=0; j<idata.length; j++) {
            idata[j].lower = itemp;
            itemp += idata[j].value;
            idata[j].upper = itemp;            
        }
        namedata[i] = idata;
    }    
    
    // convert the namedata into one large x.data again
    x.data = [];
    for (var i=0; i<namedata.length; i++) {        
        x.data = x.data.concat(namedata[i]);
    }    
    
    // create the y axis and labels
    var barmax = _.max(_.pluck(x.data, "upper"));
    var yscale = d3.scaleLinear().range([x.hinner, 0]).domain([0, barmax]);
    var yaxis = d3.axisLeft(yscale).ticks(4);        
    makealive.libtools.d3yaxis(svg, x, yaxis);    
      
    // create tooltips
    var tooltip = d3.select(obj).append("div").attr("class", "makealive tooltip");
        
    // functions to show/hide the tooltip div
    var tooltipshow = function(d) { 
        var thisbar = d3.select(this);
        thisbar.attr("fill", thisbar.attr("fillcolor"));               
        var dlab = seriesinfo[d.series].label;
        tooltip.html("<b>"+d.name+": "+dlab+": </b> "+d.value)
        .style("left", (+x.margin[3]+xscale(d.name)) + "px")		
        .style("top", -x.h +(yscale(d.upper)) + "px")
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
        return makealive.libtools.l2(seriesinfo[d.series].fill);
    })
    .attr("fillcolor", function(d) {
        return seriesinfo[d.series].fill;
    })
    .attr("x", function(d) {
        return xscale(d.name);
    })
    .attr("width", xscale.bandwidth())
    .attr("y", function(d) {
        return yscale(d.upper);
    })
    .attr("height", function(d) {        
        return -yscale(d.upper) + yscale(d.lower);
    })
    .on('mouseover', tooltipshow)
    .on('mouseout', tooltiphide);  
                
    // add a legend 
    svg.selectAll(".legendtext").data(x.series).enter().append("text")    
    .html(function(d){ 
        return d.label; 
    })
    .attr("x", x.legend[0]+x.legendmarker[0]+x.legendmarker[2])    
    .attr("y", function(d) {        
        var dpos = x.series.length - d.id - 1;
        return x.legend[1]+(dpos*x.legend[2]);       
    })
    .attr("val", function(d) {
        return d.series;
    })
    .style("text-anchor", "left")
    .style("font-size", "10")
    .attr("dx", "0.5em").attr("dy", "0.25em").attr("class", "makealive legend");        
       
    svg.selectAll(".legendmarker").data(x.series).enter().append("rect")        
    .attr("x", x.legend[0])    
    .attr("y", function(d) {       
        var dpos = x.series.length - d.id - 1;
        return x.legend[1]+(dpos*x.legend[2])-(x.legendmarker[1]/2);               
    })
    .attr("width", x.legendmarker[0])
    .attr("height", x.legendmarker[1])
    .attr("val", function(d) {
        return d.series;
    })    
    .attr("fill", function(d) {
        return seriesinfo[d.series]["fill"];
    })    
    .attr("class", "makealive legend")       
    
    svg.selectAll('.legend').attr("opacity", 1);
        
}
