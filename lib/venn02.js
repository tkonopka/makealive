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
    
    // the data in x need not be checked (it is passed on to venn01)
    // However, we need to set x.names[1]. So must handle that here                
    var optional = {
        "names": ["A", "B"]
    };
    makealive.fillArguments(x, optional);        
    x.names[1] = "[custom set]";
    
    // make sure A and B are arrays
    x.A = [].concat(x.A);
    x.B = [];
    
    
    // ***********************************************************************
    // create user interface using two divs side by side
    
    var venndiv = document.createElement('div');
    var formdiv = document.createElement('div');
    
    // add a form into the formdiv
    var formhtml = '<label>Custom set</label><br/><textarea rows="'+x.rows+'" style="line-height:1.1"></textarea>';
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
