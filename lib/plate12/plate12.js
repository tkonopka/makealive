/*
 * 12-well plate, using d3 (v4)
 * 
 * Authors: Tomasz Konopka
 * 
 * @param obj - target DOM element that will contain output
 * @param x - object with configuration and data
 * 
 */
makealive.lib.plate12 = function(obj, x) {        
    // this is just a wrapper for bioplate01.
    // prevent the wrapper from reporting the wells parameter
    if (obj==null) {
        var temp = makealive.lib.bioplate01(obj, x);
        for (var i=0; i<temp.length; i++) {
            if (temp[i].name=="wells") {
                temp.splice(i, 1);
            }
        }        
        return temp;
    }        
    x.makealive = "plate12";
    x.wells = 12;
    return makealive.lib.bioplate01(obj, x);
}



/* ==========================================================================
 * 
 * Below, a generic function for drawing plates (12, 24, 48, 96).
 * Functions are added to the makealive.libtools namespace
 * 
 * ========================================================================== */

makealive.lib.bioplate01 = function(obj, x) {
    
    // define accepted arguments
    var xargs = [
    makealive.defArg("title", "string", "chart title", null),
    makealive.defArg("wells", "ineger", "number of wells", null),
    makealive.defArg("data", "array:name:value:fill", "contents of bar plot", null),
    makealive.defArg("size", "integer:2", "size (width, height)", [200,200]),
    makealive.defArg("margin", "number:4", "margins (top, right, bottom, left)", [20, 12, 12, 12]),
    makealive.defArg("offset", "length:1", "label offset from axis (top)", ["-0.5em"]),
    makealive.defArg("padding", "number", "space between wells", 0.153),    
    makealive.defArg("platecolor", "string", "color of plate lines", "#000000"),
    makealive.defArg("wellcolor", "color", "colors of wells", "#dd77dd"),
    ];
    
    // provide info on arguments
    if (obj===null) return xargs;        
    
    // check required arguments, check/fill optional arguments
    makealive.checkArgs(x, xargs);                      
    
       
    // ***********************************************************************
    // done prep, start drawing barplot

    // compute dimensions of entire svg and of the plot area        
    makealive.libtools.dims(x);
        
    // create svg inside the object
    var svg = makealive.libtools.d3svg(obj, x);
    
    // create a title
    makealive.libtools.d3title(svg, x);    
            
    // dimensions of plate    
    switch (x.wells) {
        case 24:
            var hh = 4, ww = 6;
            break;
        case 48:
            var hh = 6, ww = 8;
            break;
        case 96:
            var hh = 8, ww = 12;
            break;
        case 384:
            var hh = 12, ww = 24;
            break;
        default:
            var hh = 3, ww = 4;
    }
    // radius of each well
    var rr = (x.winner)/((2*ww+1.5)+((ww-1)*x.padding)) ;
    // absolute padding
    var pp = (rr*x.padding);    
    
    // readjust inner dimensions (force plate to fit width, ignore height)
    var dec2 = makealive.libtools.dec2;
    x.winner -= 0.5
    x.hinner = dec2((2*hh+1)*rr + (hh-1)*pp) + 0.5;    
        
    // draw the outer plate shape
    svg.append("polygon")
    .attr("fill", "#ffffff")
    .attr("stroke", x.platecolor)
    .attr("points", "-0.5,-0.5 "+x.winner+",-0.5 "+
        x.winner+","+x.hinner+" -0.5,"+x.hinner);
    
    // helper function to assign a color based on a well value
    var getWellColor = function(d) {            
        if (!(d.well in x.data)) {
            return "#ffffff";
        }        
        var well = x.data[d.well];        
        if (!well.value) {
            return "#ffffff";
        }
        // explicit color values override        
        if (makealive.libtools.isColor(well.value)) {
            return well.value;
        }        
        // if value is not a color, try to interpret as a shading values
        return makealive.libtools.shadeColor(x.wellcolor, 1-well.value);
    }      
      
    // create tooltips
    var tooltip = d3.select(obj).append("div").attr("class", "makealive tooltip");
            
    // functions to show/hide the tooltip div
    var tooltipshow = function(d) { 
        var thiswell = d3.select(this);
        thiswell.attr("fill", thiswell.attr("fillcolor"));  
        if (!(d.well in x.data)) {
            return;
        }        
        var well = x.data[d.well];  
        //alert("thiswell: "+thiswell.attr("cx")+", "+thiswell.attr("cy"));
        tooltip.html("<b>"+d.well+": "+well.label+":</b> "+well.value)
        .style("left", (+x.margin[3]+(+thiswell.attr("cx"))+(rr*0.8)) + "px")		
        .style("top", -x.size[1] +(+thiswell.attr("cy")) + "px")
        .style("opacity", .9);	
    }
    var tooltiphide = function(d) {   
        var thiswell = d3.select(this);
        thiswell.attr("fill", makealive.libtools.l2(thiswell.attr("fillcolor")));
        tooltip.style("opacity", 0);		        
    }
    
    // alphabet for naming rows
    var ab = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K",
    "L", "M", "N", "O", "P"];
    
    // create the individual wells and labels           
    var wellpositions = [];                
    for (var i=1; i<=ww; i++) {        
        for (var j=1; j<=hh; j++) {
            var onewell = {
                "well": ab[j]+""+i,
                "cx": dec2( 2*i*rr + (i-1)*pp ),
                "cy": dec2( 0.75*rr + (2*j-1)*rr + (j-1)*pp)
            }
            wellpositions.push(onewell);            
        }
    }               
    x.data = _.indexBy(x.data, "well");     
    svg.selectAll(".well").data(wellpositions).enter().append("circle")
    .attr("class", "well")
    .attr("fill", function(d) {                       
        return makealive.libtools.l2(getWellColor(d));
    })
    .attr("fillcolor", getWellColor)
    .attr("stroke", x.platecolor)
    .attr("cx", function(d) {
        return d.cx;
    })
    .attr("cy", function(d) {
        return d.cy;
    })
    .attr("r", rr)
    .on('mouseover', tooltipshow)
    .on('mouseout', tooltiphide)              
    
    // create alphabetical labels (vertical) 
    var ylab = [];    
    for (var j=1; j<=hh; j++) {
        ylab.push({
            "t": ab[j], 
            "j": j
        });        
    }    
    svg.selectAll(".ylab").data(ylab).enter().append("text")
    .attr("font-size", 10).attr("font-weight", 600)
    .attr("x", dec2(rr/2))
    .attr("y", function(d) {
        return dec2( 0.75*rr + (2*d.j-1)*rr + (d.j-1)*pp);
    }).attr("dy", "0.4em").attr("dx", "-0.4em")
    .html(function(d) {
        return d.t;
    })      
        
    // create numeric labels (horizontal)
    var xlab = [];
    for (var i=1; i<=ww; i++) {
        xlab.push({
            "t": i, 
            "i": i
        });        
    }     
    svg.selectAll(".xlab").data(xlab).enter().append("text")
    .attr("font-size", 10).attr("font-weight", 400)
    .attr("x", function(d) {
        return dec2( 2*d.i*rr + (d.i-1)*pp )
    })
    .attr("y", dec2( 0.75*rr/2))
    .attr("dy", "0.3em")
    .attr("text-anchor", "middle")
    .html(function(d) {
        return d.t;
    })        
    
}
