/*
 * Stacked vertical bar plot using d3 (v4)
 * 
 * Authors:
 * Tomasz Konopka 
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
    makealive.defArg("size", "integer:2", "size (width, height)", [200,200]),
    makealive.defArg("margin", "number:4", "margins (top, right, bottom, left)", [40, 20, 45, 50]),
    makealive.defArg("offset", "length:3", "label offsets from axis (top, x, y)", ["-1.5em", "2.5em", "-2.5em"]),
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
         
    // create an svg inside the object
    var svg = d3.select(obj).append("svg")
    .attr("width", w+"px").attr("height", h+"px")    
    .append("g").attr("transform",
        "translate(" + x.margin[3] + "," + x.margin[0] + ")");
   
    // create x-axis and labels 
    var barnames = _.uniq(_.pluck(x.data, "name"));
    svg.append("text").text(x.xlab).style("text-anchor", "middle")
    .attr("y", hinner).attr("dy", x.offset[1])
    .attr("x", winner/2);         
    var xscale = d3.scaleBand().range([0, winner]).padding(x.padding)
    .domain(barnames);
    var xaxis = d3.axisBottom(xscale);    
    svg.append("g").attr("transform", "translate(0," + hinner + ")").call(xaxis)
    .selectAll(".domain, .tick > line").remove();    
           
    // augment the series array with indexes    
    var seriesinfo = _.indexBy(x.series, "series");        
    
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

    // need to compute maximal bar length. Find all upper values, then max    
    var barupper = _.pluck(x.data, "upper");
    
    var barmax = Math.max.apply(null, barupper);
    
    // create the y axis and labels
    var yscale = d3.scaleLinear().range([hinner, 0]).domain([0, barmax]);
    var yaxis = d3.axisLeft(yscale).ticks(4);    
    svg.append("g").call(yaxis);
    svg.append("text").attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("x",0 - (h-x.margin[0]-x.margin[2])/2)
    .attr("dy", x.offset[2])
    .style("text-anchor", "middle")
    .text(x.ylab);
      
    // create tooltips
    var tooltip = d3.select(obj).append("div").style("opacity",0)
    .style("background-color", "#333333").style("border-radius", "4px")
    .style("position", "relative").style("color","#fff4f4").style("padding", "4px 8px")
    .style("font-size", "80%").style("display","inline-block").style("text-align", "center");    
    
    // functions to show/hide the tooltip div
    var tooltipshow = function(d) {          
        d3.select(this).style("opacity",1);        
        var dlab = seriesinfo[d.series].label;
        tooltip.html("<b>"+d.name+": "+dlab+": </b> "+d.value)
        .style("left", (+x.margin[3]+xscale(d.name)) + "px")		
        .style("top", -h +(yscale(d.upper)) + "px")
        .style("opacity", .9);	
    }
    var tooltiphide = function(d) {
        d3.select(this).style("opacity",0.8);
        tooltip.style("opacity", 0);		        
    }
          
    // create the barplots rectangles
    svg.selectAll(".bar").data(x.data).enter().append("rect")
    .attr("class", "bar").attr("fill", function(d) {
        return seriesinfo[d.series].fill;
    }).style("opacity", 0.8)
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
    .on('mouseout', tooltiphide)  
        
    // create a title
    svg.append("text").text(x.title).style("text-anchor", "left")
    .attr("y", 0).attr("dy", x.offset[0])
    .attr("x", 0);     
}
