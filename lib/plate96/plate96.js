/* plate96.js. Copyright 2017 Tomasz Konopka. */

/* global makealive, d3 */

/*
 * 96-well plate, using d3 (v4)
 * 
 * Authors: Tomasz Konopka
 * 
 * @param obj - target DOM element that will contain output
 * @param x - object with configuration and data
 * 
 */
makealive.lib.plate96 = function (obj, x) {
    // this is just a wrapper for bioplate01.    
    // prevent the wrapper from reporting the wells parameter
    if (obj === null) {
        var temp = makealive.lib.bioplate01(obj, x);
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].name === "wells") {
                temp.splice(i, 1);
            }
        }
        return temp;
    }
    x.makealive = "plate96";
    x.wells = 96;
    return makealive.lib.bioplate01(obj, x);
};
