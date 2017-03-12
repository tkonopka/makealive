/**
 * A demo conversion function
 * It is plain-js and provides a decomposition of a number into factors
 * 
 * Authors: Tomasz Konopka
 * 
 * @param obj - target DOM element that will contain output
 * @param x - object with configuration and data
 * 
 */
makealive.lib.isprime = function(obj, x) {
     
    // define accepted arguments
    var xargs = [ makealive.defArg("number", "integer", "query number", null) ];
    
    if (obj===null) return xargs;
    
    // check required arguments
    makealive.checkArgs(x, xargs);   
    x.makealive = "isprime";
    
    // turn the input into a number
    x.number = Math.abs(parseInt(x.number));    
    
    // find a divisor (factor) for x.number
    var xfactor = 0;
    for (var i=2; i<x.number; i++) {        
        if (x.number % i==0) {
            xfactor = i;
            break;
        }
    }
    
    // produce output
    var blarge = '<b style="font-size:130%">';
    var result = '<div style="font-size: 130%; padding: 10px; text-align: center">'+blarge+x.number+'</b> is';    
    if (xfactor==0) {
        result += ' a prime number.';
    } else {
        result += ' not prime. It is divisible by '+blarge+xfactor+'</b>.';
    }
    result += '</div>';

    obj.innerHTML = result;
    
}
