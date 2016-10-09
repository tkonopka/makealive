/** 
 * makealive.js
 * 
 * Make html alive with javascript
 * 
 * Author: Tomasz Konopka
 * 
 */


var makealive = {};


/*
 * namespace for conversion functions. 
 * 
 * Functions defined here can be auto-detected
 * upon page load and added to the makealive.types array.
 * 
 */
makealive.lib = {};


/*
 * Array with types of conversion functions. 
 * 
 * Now empty, it will be populated later automatically or manually. Strings
 * in this array will determine what kind of conversions will be allowed.
 * 
 */ 
makealive.types = []; 


/*
 * Auto-detection script that is activated upon page load.
 * 
 * It scans elements in makealive.lib and adds function names to the makealive.types array.
 * 
 */
document.addEventListener("DOMContentLoaded", function() {
    makealive.types = [];
    for (var name in makealive.lib) {
        if (makealive.lib.hasOwnProperty(name)) {
            if (typeof makealive["lib"][name] === "function") {
                makealive.types.push(name);
            }            
        }
    }     
});


/*
 * Manual reset of the conversion types. 
 * 
 * After invoking this function, makeAlive() will not make any changes to its input.
 * 
 */
makealive.clearTypes = function() {
    makealive.types = [];
}


/*
 * Manually add a conversion type and conversion function.
 * 
 * This can be useful if a conversion function is defined through some package
 * and not through the makealive.lib namespace.
 * 
 * @param name
 * 
 * string code
 * 
 * @param fn
 * 
 * function of structure function(obj, x), where obj is a DOM element and x is 
 * an object with all the settings and data. Each function should document how the
 * relevant data should be encoded therein.
 * 
 * Note: existing name, function relationships will be overwritten.
 * 
 */
makealive.addType = function(name, fn) { 
    if (this.types.indexOf(name)<0) {
        this.types.push(name);
    }
    this["lib"][name] = fn;    
}


/*
 * Manually set the conversion types and conversion functions.
 * 
 * This is equivalent to clearing auto-detected types using clearTypes() and then
 * calling addType() several times.
 *
 * @param typelist
 * 
 * object defining the conversion types. Each element in typelist should be a 
 * key:value pair. 
 *  
 */
makealive.setTypes = function(typelist) {    
    this.clearTypes();
    for (var key in typelist) {
        if (typelist.hasOwnProperty(key)) {
            this.addType(key, typelist[key]);
        }
    }
}


/*
 * Turns a static html into an html document with pre-specified and controlled javascript.
 *
 * @param x
 * 
 * string with html. 
 * 
 * The function looks for <pre><code class="makealive [type]"></code></pre> blocks, 
 * identifies classes in the <code> elements, and turns the contents into an 
 * input for javascript functions. 
 * 
 */
makealive.convert = function(x) {   
     
    // create a dom element with the desired initial html (does not display)
    var newdiv = document.createElement('div');
    newdiv.innerHTML = x;    
           
    // identify all the <pre><code> blocks, process each one individually
    var allcodes = newdiv.querySelectorAll('pre code.makealive');    
    for (var i = 0; i < allcodes.length; i++) {            
        var nowcode = allcodes[i]; 
        var nowpre = nowcode.parentNode;
        var fn = null;
        // loop through the available chart functions and see if one applies        
        for (var cc = 0; cc<makealive.types.length; cc++) {            
            var nowtype = makealive.types[cc];            
            if (nowcode.classList.contains(nowtype)) {
                fn = nowtype;
            }            
        }
        // validate the input
        if (fn != null) {            
            // check a proper function is defined
            if (typeof this["lib"][fn]!=="function") {
                nowpre.innerHTML += "\nmakealive error: undeclared function "+fn;  
                fn = null;                
            }            
        }
        if (fn!=null){                
            try {                
                var data = JSON.parse(nowcode.innerHTML);
            } catch(e) {
                nowpre.innerHTML += "\nmakealive error: cannot parse JSON";
                fn = null;               
            }               
        }     
        // try to apply the conversion function
        if (fn != null) {            
            var newobj = document.createElement('div');
            newobj.className += "makealive";         
            try {
                this["lib"][fn](newobj, data);
                nowpre.parentNode.replaceChild(newobj, nowpre);                                     
            } catch(e) {  
                // report the error into the preview box
                nowpre.innerHTML += "\nmakealive error during conversion: "+e;                    
            }            
        }        
    }    
    
    return newdiv;   
}


/*
 * Check if an object x has the specified keys required
 *
 * This is a helper function that can be used within a library function to 
 * validate input
 * 
 * @param x object with key:value pairs
 * @param req array with strings (required keys)
 * 
 * @return string
 * 
 * If all the required arguments are present, the string will be empty ("").
 * If some parameters are missing, the string will contain their names.
 * 
 */
makealive.checkArguments = function(x, req) { 
    var result = "";   
    for (var i=0; i<req.length; i++) {
        if (!(req[i] in x)) {
            result += " "+req[i];
        }        
    }   
    return result;
}


/*
 * Fill in missing property values with default values.
 * 
 * @param x object with key:value pairs
 * @param defaults objects holding key:value pairs
 * 
 * @result
 * 
 * if x contains a key defined in defaults, nothing happens and x.key remains unchanged.
 * if x does not contain key, then the object is modified so that x.key = defaults.key
 * 
 * After executing this functions, it is safe to assume that x.key is defined, either
 * explicitly from the original x or through default values set in defaults.
 * 
 */
makealive.fillArguments = function(x, defaults) {
    for (var key in defaults) {
        if (defaults.hasOwnProperty(key)) {            
            if (!x.hasOwnProperty(key)) {
                x[key] = defaults[key];
            }            
        }
    }
    return x;
}


/* ==========================================================================
 * 
 * End of makealive.js
 * 
 * Any code appearing below represents separate contributions.
 * A collection of conversion function compatible with makeAlive()
 *
 * ========================================================================== */

