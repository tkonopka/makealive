/**
 * Produce a table with background color styling
 * 
 * 
 * Authors: Tomasz Konopka
 * 
 * @param obj - target DOM element for output
 * @param x - object with configuration and data
 * 
 */
makealive.lib.table01 = function(obj, x) {

    // define accepted arguments
    var xargs = [
    makealive.defArg("header", "array", "header", null),
    makealive.defArg("data", "array", "data", null), 
    makealive.defArg("patterns", "array", "patterns array (string, color)", ["", "#ffffff"]),
    makealive.defArg("sortable", "array", "sortable columns", [])
    ];
    
    // provide info on arguments
    if (obj===null) return xargs;        
    
    // check required arguments, check/fill optional arguments
    makealive.checkArgs(x, xargs); 
    x.makealive = "table01";        
    
    
    // ***********************************************************************
    // prep regular expression
    
    // get a set of regex expressions
    var regexes = [];
    var bgcols = [];
    for (var k=0; k<x.patterns.length; k++) {
        regexes.push(new RegExp(x.patterns[k][0]));
        bgcols.push(sanitizeHtml(x.patterns[k][1]));
    }
    
    // helper function tests a string against regexes array
    // returns value from corresponding bgcols
    var regbg = function(s) {
        var sbg = "";
        for (var k=0; k<regexes.length; k++) {
            if (regexes[k].test(s)){
                sbg = bgcols[k];
            }
        }
        if (sbg!="") {
            return ' style="background-color: '+sbg+'"';
        }
        return sbg;
    }
    
    
    // ***********************************************************************
    // prep for making table html
    
    /**
     * xdi - object (one row)
     * xcols - array with column names (must match keys in xdi)
     */
    var makeonerow = function(xdi, xcols) {
        var onerow = '<tr class="td">';                
        for (var j=0; j<xcols.length; j++) {            
            var xtd = (xcols[j] in xdi ? sanitizeHtml(xdi[xcols[j]]): "")                      
            onerow += '<td'+regbg(xtd)+'>'+xtd+'</td>';
        }        
        return onerow + '</tr>';
    }
    
    /**
     * xd - array with objects (one object per table row)
     * xcols - array with column names (strings, must match keys in xd[i])
     */
    var maketablebody = function(xd, xcols) {
        var tbody = '';        
        for (var i=0; i<xd.length; i++) {
            tbody += makeonerow(x.data[i], xcols);        
        }
        return tbody;
    }
            
            
    // ***********************************************************************
    // sorting handler
    
    // event is filed in by the eventListener
    var sortbycol = function(event) {  
        // toggle sort direction encoded in th[val]
        var sorttype = -1*parseInt(event.srcElement.getAttribute('val'));                
        event.srcElement.setAttribute('val', sorttype);        
        
        // get sort column
        var sortcol = event.srcElement.innerHTML;
        
        // apply sorting on x.data        
        x.data.sort(function(a,b) {
            if (sortcol in a && sortcol in b) {            
                if (a[sortcol]>b[sortcol]) return sorttype;
                if (a[sortcol]<b[sortcol]) return -sorttype;
                return 0;
            } else {
                return (sortcol in a ? -1: 1);
            }
        });        
        
        // scrap existing table and recreate it
        var trtds = obj.querySelectorAll('tr.td');
        for (var i=0; i<trtds.length; i++) {
            trtds[i].parentNode.removeChild(trtds[i]);
        }                        
        var objtab = obj.getElementsByTagName('table');        
        objtab[0].insertAdjacentHTML('beforeend', maketablebody(x.data, xcols));                
    }
    
    
    // ***********************************************************************
    // create html table (add class table for bootstrap, doesn't hurt)
        
    var result = '<table class="table">';    
    // write the header line
    result += '<tr>';
    var ncols = x.header.length;
    var xcols = []; // names of columns in x.data
    for (var j=0; j<ncols; j++) {
        xcols[j] = sanitizeHtml(x.header[j]);
        result += '<th val="-1">'+xcols[j]+'</th>';
    }
    result += '</tr>';
    // write the remainder of the table (data rows)   
    result += maketablebody(x.data, xcols) + '</table>';

    obj.innerHTML = result;

    // attach handlers for column sorting
    var allth = obj.getElementsByTagName('th');
    for (var i=0; i<x.sortable.length; i++) {        
        var sci = x.header.indexOf(x.sortable[i]);
        if (sci>=0) {
            allth[sci].addEventListener("click", sortbycol);
            allth[sci].style.cursor = "pointer";
        }        
    }
}
