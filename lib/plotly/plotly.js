/* global makealive, Plotly */

/*
 * Simple scatter plot using d3 (v4)
 *
 * Authors: Tomasz Konopka 
 * 
 * @param obj - target DOM element that will contain output
 * @param x - object with configuration and data
 * 
 */
makealive.lib.plotly = function (obj, x) {

    // define accepted arguments
    var xargs = [
        makealive.defArg("data", "array", "data input for Plotly.newPlot", null),
        makealive.defArg("layout", "array", "layout settings for Plotly.newPlot", null)
    ];

    if (obj === null)
        return xargs;

    // ***********************************************************************
    // done prep, set up a function that calls Plotly.newPlot

    // generate a random id number for the target div
    var rn = "plotly-" + Math.floor(Math.random() * 1e9);
    obj.setAttribute('id', rn);

    var cc = 0;
    // define a function that checks the dom and calls plotly when the div is ready
    var checkAndDraw = function () {
        var plotlydiv = document.getElementById(rn);
        if (typeof (plotlydiv) !== 'undefined' && plotlydiv !== null) {
            Plotly.newPlot(rn, x.data, x.layout);
            return;
        }

        // if reached here, the element does not exist yet in dom
        cc++;
        if (cc < 20) {
            setTimeout(checkAndDraw, 100);
        } else {
            throw "Error during plotly conversion: timeout";
        }
    };

    checkAndDraw();
};


