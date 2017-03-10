/** 
 * makealive.js
 * 
 * Turn json into interactive content
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
 * Scans elements in makealive.lib and adds function names to the 
 * makealive.types array.
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
 * Check if an object x contains values for all required and optional function arguments.
 *
 * This is a helper function that can be used within a library function to 
 * validate input
 * 
 * @param x object with key:value pairs
 * @param expected object holding argument definitions
 * 
 * If all the required arguments are present, the function passes x to fillArgs
 * and thus fills-in all the optional values.
 * 
 * If some required parameters are missing, the function throws an error listing
 * the missing arguments.
 * 
 */
makealive.checkArgs = function(x, expected) { 
    // first check 
    var result = "";   
    for (var i=0; i<expected.length; i++) {        
        if (expected[i].value===null) {            
            var einame = expected[i].name;
            if (!(einame in x)) 
                result += " "+einame;            
        }
    } 
    if (result != '') {
        throw "missing arguments: "+result;
    } 
    return makealive.fillArgs(x, expected);
}


/*
* Fill in missing property values with default values.
* 
* @param x object with key:value pairs
* @param expected array holding expected argument definitions
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
makealive.fillArgs = function(x, expected) {    
    for (var i=0; i<expected.length; i++) {        
        // make sure the object x has a default value
        var ikey = expected[i].name;        
        if (!x.hasOwnProperty(ikey)) {
            x[ikey] = expected[i]["value"];
        }        
        // for expected integers and numbers, parse and cast the input
        var itype = expected[i]["type"].split(":")[0];        
        if (itype=="integer") {
            for (var j=0; j<x[ikey].length; j++) {
                x[ikey][j] = +parseInt(x[ikey][j]);
            }
        } else if (itype=="number") {
            for (var j=0; j<x[ikey].length; j++) {
                x[ikey][j] = 0.0+parseFloat(x[ikey][j]);
            }
        }
    }
    return x;
}


/**
* Defines an object with a definition for an argument 
* (can be used within makealive conversion functions)
* 
* @param name string
* @param type string
* @param description string
* @param value object default value (set null to mark the argument as required)
* 
* @return object with the above elements
* 
*/
makealive.defArg = function(name, type, description, value) {
    var result = {};
    result["name"] = name;
    result["type"] = type;
    result["description"] = description;
    result["value"] = value;
    return result;
}


/* ==========================================================================
* 
* End of makealive.js
* 
* Any code appearing below represents separate contributions.
* A collection of conversion function compatible with makeAlive()
*
* ========================================================================== */

