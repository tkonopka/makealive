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

    //var allcode = document.querySelectorAll('code.makealive');
    var authorcontent = document.getElementById("maincontent");
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


