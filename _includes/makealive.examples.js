/** 
 * makealive.examples.js
 * 
 * Javascript handling example pages
 * 
 * Author: Tomasz Konopka
 * 
 */



if (typeof makealive == "undefined") {
    throw new Error("makealive is undefined");
}

// create namespace for examples pages
var examples = {};


// markdown converter (uses showdown)
examples.mdconverter = new showdown.Converter();
    

// convertion from markdown to html (convert, sanitize, process with makealive)
examples.md2html = function(x) {  
    var xclean = sanitizeHtml(examples.mdconverter.makeHtml(x),
    {
        allowedTags: ['code', 'pre'],
        allowedAttributes: {
            code: ['class']            
        }
    });       
    return makealive.convert(xclean);   
}



// helper function converts one code block into a side-by-side display:
// one copy for reading code, one copy to convert by makealive
examples.examplealive = function(x) {        
    // create a dom element with the desired initial html (does not display)
    var newdiv = document.createElement('div');
    newdiv.innerHTML = x;    
           
    // identify all the <pre> blocks dedicated to examples
    var allpres = newdiv.querySelectorAll('pre.example');    
    for (var i = 0; i < allpres.length; i++) {                    
        var nowpre = allpres[i];
        var nowcode = nowpre.querySelectorAll('code')[0];
        var nowjson = nowcode.innerHTML;
        var nowclass = nowcode.className;        
        
        var newobj = document.createElement('div');       
        var newleft = '<pre><code>```'+nowclass+'\n'+nowjson+'```</code></pre>';
        var newright = '<pre><code class="'+nowclass+'">'+nowjson+'</code></pre>';
        
        var temp = '<div class="row codepreview"><div class="col-lg-6">'+newleft+'</div>';
        temp += '<div class="col-lg-6">'+newright+'</div></div>';
        newobj.innerHTML = temp;
                
        nowpre.parentNode.replaceChild(newobj, nowpre);                
    }    
    
    return newdiv;
}


// handling of author-submitted code snippets
document.addEventListener("DOMContentLoaded", function() {        
    var authorcontent = document.getElementById("body");    
    if (authorcontent==null) return;    
    // convert examples into code+preview
    var authoralive = examples.examplealive(authorcontent.innerHTML);    
    // convert prevew boxes
    authoralive = makealive.convert(authoralive.innerHTML);        
    while (authorcontent.hasChildNodes()) {
        authorcontent.removeChild(authorcontent.lastChild);
    }
    authorcontent.appendChild(authoralive);
})


// handling of live user-generated input
document.addEventListener("DOMContentLoaded", function() {                
    var tryarea = document.getElementById("tryit");
    if (tryarea==null) {
        return;
    }
    var prevdiv = document.getElementById("preview");  
    tryarea.addEventListener('input', function() {
        // get text from textarea and convert into DOM element        
        var trytext = tryarea.value;        
        var tryelement = examples.md2html(trytext);
        // clear the preview div
        while( prevdiv.hasChildNodes() ){
            prevdiv.removeChild(prevdiv.lastChild);
        }
        // assign the new element to the preview
        prevdiv.appendChild(tryelement);      
    }, false);
});



//makealive convert function to create a table with argument definitions
makealive.lib.argtable = function(obj, x) {
    
    // the converter only accepts a function name
    var xargs = [ makealive.defArg("function", "string", "function name", null) ];
    makealive.checkArgs(x, xargs);
    
    // execute the makealive function to get its xargs
    var fargs = makealive["lib"][x["function"]](null, null);
    
    // create a table with descriptions of the arguments
    var req = '<b>[required] </b>';
        
    var result = '<table class="arguments">';
    result += '<tr><th>Name</th><th>Type</th><th>Description</th></tr>';
    for (var i=0; i<fargs.length; i++) {
        var fi = fargs[i];
        result += '<tr><td>'+fi.name+'</td>';
        result += '<td>'+fi.type+'</td><td>';
        if (fi.value===null) {
            result+= req;                        
        } 
        result +=fi.description+'</td></tr>';
    }    
    result += '</table>';
    // make sure the table is good html
    result = sanitizeHtml(result);
    
    // add the table to the page
    obj.innerHTML = result;
}


// convert index page thumbnails
document.addEventListener("DOMContentLoaded", function() {  
    // fetch content of library page
    var libcontent = document.getElementById("library");    
    if (libcontent==null) return;    
    var libalive = makealive.convert(libcontent.innerHTML);            
    libcontent.innerHTML = libalive.innerHTML;
})



// makealive conversion function to create a thumbanail
makealive.lib.exthumbnail = function(obj, x) {
        
    // the converter accepts a set of function names and descriptors
    var xargs = [ 
    makealive.defArg("data", "array:function:description", "set of functions", null),         
    ];
    makealive.checkArgs(x, xargs);
    
    // helper function to create html for one example    
    // f - function name (appears in thumbnail title and used to link)
    // desc - a short description (appears in thumbnail below title)
    var onethumbnail = function(f, desc) {
        f = sanitizeHtml(f);
        desc = sanitizeHtml(desc);        
        var result = '<div class="col-sm-4 col-md-3">';
        result += '<div class="thumbnail" onclick="location.href=\''+f+'.html\'"><div class="caption">';
        result += '<h3>'+f+'</h3><p>'+desc+'</p>';        
        result += '</div></div></div>';          
        return result;
    }
    
    // loop over components in data and generate thumbnail code    
    var result = '<div class="row">';
    for (var i=0; i<x.data.length; i++) {
        result += onethumbnail(x.data[i]["function"], x.data[i]["description"]);
    }
    result += '</div>';
            
    obj.innerHTML = result;               
}
