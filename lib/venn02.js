/**
 * Produce a two-circle venn diagram
 * 
 * This function uses venn01. One of the sets is preconfigured using the 
 * input object x. The other set is 
 * 
 * Authors:
 * Tomasz Konopka
 * 
 * @param obj - target DOM element that will contain output
 * @param x - object with configuration and data
 * 
 */
makealive.lib.venn02 = function(obj, x) {
    
    // fetch the required arguments from venn01
    var xargs = makealive.lib.venn01(null, x);
    // remove definition for argument B
    xargs = xargs.filter(function(x) {
        return x.name!="B";
    });

    if (obj===null) return xargs;

    // check the arguments in x and make sure one of the sets is called custom    
    x.B = [];    
    makealive.checkArgs(x, xargs);             
    x.names[1] = "[custom set]";    
    
    // make sure A and B are arrays (B is empty)        
    x.A = [].concat(x.A);    
    
    
    // ***********************************************************************
    // create user interface using two divs side by side
    
    var venndiv = document.createElement('div');
    var formdiv = document.createElement('div');
    
    // add a form into the formdiv
    var formhtml = '<label>Custom set</label><br/><textarea rows="'+x.rows+'" style="line-height:1.1; height: '+(x.size[1]-20)+'px"></textarea>';
    formdiv.innerHTML = formhtml;
    
    obj.appendChild(venndiv);
    obj.appendChild(formdiv);
    
    
    // ***********************************************************************
    // handling of user interactions in the form
    
    var tarea = formdiv.getElementsByTagName('textarea')[0];
    tarea.addEventListener('input', function() {
        // get text from textarea and convert into an array (split by \n)        
        var newset = tarea.value.split(/\n/);
        // do not sanitize - that's already in venn01
        // get rid of elements that are empty strings        
        x.B = newset.filter(function(v) {
            return v != '';
        }); 
        // make sure the drawing area is empty, then draw a new diagram        
        while( venndiv.hasChildNodes() ){
            venndiv.removeChild(venndiv.lastChild);
        }
        makealive.lib.venn01(venndiv, x);
        venndiv.style["float"] = "left";            
    }, false);
      
      
    // trigger drawing the diagram 
    // ideally this would be through .on(input) but that's not available. 
    // Just repeat two lines of code
    makealive.lib.venn01(venndiv, x);
    venndiv.style["float"] = "left";            
      
}
