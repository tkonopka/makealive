/*
 * Define a makealive component through a remote url
 *
 * Authors:
 * Tomasz Konopka 
 * 
 * @param obj - target DOM element that will contain output
 * @param x - object with configuration and data
 * 
 */
makealive.lib.url = function(obj, x) {
    
    // define accepted arguments
    var xargs = [
    makealive.defArg("url", "string", "uniform resource locator (URL) holding makealive component data", null),
    makealive.defArg("makealive", "string", "makealive conversion function", "")
    ];
    
    if (obj===null) return xargs;
    
    // check required arguments
    makealive.checkArgs(x, xargs);
    
    // ***********************************************************************
    // load the resource from the url
    
    var xurldata = {};
    var xhr = new XMLHttpRequest();
    xhr.open('get', x.url, true);        
    xhr.onload = function() {                
        if (xhr.status != 200) {
            throw "Error receiving data: "+xhr.statusText;            
        } else {    
            xurldata = JSON.parse(xhr.responseText);            
            // add components from x into the data from the url
            // this allows x to override some settings in xurldata
            for (var name in x) {
                if (x.hasOwnProperty(name)) {
                    if (name=="makealive") {
                        if (x.makealive!="") {
                            xurldata[name] = x[name];
                        }
                    } else {
                        xurldata[name] = x[name];
                    }                 
                }
            }            
            // run the new converter function
            makealive.lib[xurldata.makealive](obj, xurldata);            
        }
    };
    xhr.send();
            
}