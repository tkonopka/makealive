/*
 * Simple bar plot using d3 (v4)
 * 
 * Authors:
 * Tomasz Konopka
 * (with help from d3 tutorials)
 * 
 * @param obj - target DOM element that will contain output
 * @param x - object with configuration and data
 * 
 */
makealive.lib.barplot01 = function(obj, x) {
       
    // check required arguments
    var missing = makealive.checkArguments(x, ["title", "xlab", "ylab", "data"]);   
    if (missing!="") {
        throw "missing arguments: "+missing;
    }
    
    // add in optional arguments  
    var optional = {
        "size": [200, 200], 
        "margin": [40, 20, 40, 50],
        "offset": ["-1.5em", "2.5em", "-2.5em"],
        "padding": 0.2
    };
    makealive.fillArguments(x, optional);        
    for (var i=0; i<4; i++) {
        x.margin[i] = +x.margin[i];
    }
    
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
    svg.append("text").text(x.xlab).style("text-anchor", "middle")
    .attr("y", hinner).attr("dy", x.offset[1])
    .attr("x", winner/2);         
    var xscale = d3.scaleBand().range([0, winner]).padding(x.padding)
    .domain(x.data.map(function(d) {
        return d.name;
    }));
    var xaxis = d3.axisBottom(xscale);    
    svg.append("g").attr("transform", "translate(0," + hinner + ")").call(xaxis)
    .selectAll(".domain, .tick > line").remove();    
    
    var yvalues = x.data.map(function(d) {
        return d.value
    });    
    // create the y axis and labels
    var yscale = d3.scaleLinear()
    .range([hinner, 0])        
    .domain([0, Math.max.apply(null, yvalues)]);
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
        tooltip.html("<b>"+d.name+":</b> "+d.value)
        .style("left", (+x.margin[3]+xscale(d.name)) + "px")		
        .style("top", -h +(yscale(d.value)) + "px")
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
        return xscale(d.name);
    })
    .attr("width", xscale.bandwidth())
    .attr("y", function(d) {
        return yscale(d.value);
    })
    .attr("height", function(d) {
        return hinner - yscale(d.value);
    })
    .on('mouseover', tooltipshow)
    .on('mouseout', tooltiphide)  
        
    // create a title
    svg.append("text").text(x.title).style("text-anchor", "left")
    .attr("y", 0).attr("dy", x.offset[0])
    .attr("x", 0);     
}
