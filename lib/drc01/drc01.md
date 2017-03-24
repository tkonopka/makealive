---
layout: example
title: drc01
permalink: /lib/drc01/
description: Dose-response curve
author: Tomasz Konopka
dependencies: <a href='https://d3js.org/'>d3 (v4)</a>,
    makealive-lib.js
---

<script src="https://d3js.org/d3.v4.min.js"></script>


Dose-response curves (DRCs) are a type of line chart. The horizontal axis 
is logarithmic, representing doses or concentrations. The vertical axis 
shows dimensionless values, often in [0,1], representing measurements relative 
to a control.

What makes DRCs different from simple line charts is how the raw data are 
presented. In DRCs, raw data are absolute measurements made at dose>0
and control measurements made at dose=0. Thus, the drc01 makealive component 
uses values at dose=0 as controls and displays other values relative to the 
controls. 

The drc01 component also fits a smooth line through the points. Although in
some applications it is reasonable to fit specific functions 
(e.g. logistic, tanh), drc01 uses a model-agnostic, data-driven loess smoothing.
The smoothing can be tuned by the bandwidth argument. 



### Example 1

Single dose response curve. 

<pre class="example"><code class="makealive drc01">{
  "title": "Simple DRC",
  "xlab": "Dose (&micro;M)",
  "ylab": "Rel. cell count",
  "series": [{
                "series": "A",
                "label": "Drug name A",
                "color": "#ff0000",
                "radius": 3,
                "linewidth": 4
            }],
  "data": [
        {"series": "A", "dose": 0, "value": 98 },
        {"series": "A", "dose": 0, "value": 105},
        {"series": "A", "dose": 0.01, "value": 100 },
        {"series": "A", "dose": 0.01, "value": 110 },
        {"series": "A", "dose": 0.02, "value": 90 },
        {"series": "A", "dose": 0.02, "value": 95 },
        {"series": "A", "dose": 0.2, "value": 5 },
        {"series": "A", "dose": 0.05, "value": 70 },
        {"series": "A", "dose": 0.05, "value": 80 },
        {"series": "A", "dose": 0.2, "value": 18 },
        {"series": "A", "dose": 0.5, "value": 12.3 },
        {"series": "A", "dose": 1, "value": 10.6 }
        ]
}
</code></pre>


### Example 2

Two dose-response curves.

<pre class="example"><code class="makealive drc01">{
  "title": "Comparison of two DRCs",
  "xlab": "Dose (&micro;M)",
  "ylab": "Rel. cell count",
  "series": [{
                "series": "A",
                "label": "Drug name A",
                "color": "#ff0000",
                "radius": 4,
                "linewidth": 4
            },
            {
                "series": "B",
                "label": "Drug name B",
                "color": "#0000ff",
                "radius": 4,
                "linewidth": 4
            }],
  "data": [
        {"series": "A", "dose": 0, "value": 98 },
        {"series": "A", "dose": 0, "value": 105 },
        {"series": "A", "dose": 0.01, "value": 100 },
        {"series": "A", "dose": 0.01, "value": 110 },
        {"series": "A", "dose": 0.02, "value": 90 },
        {"series": "A", "dose": 0.02, "value": 95 },
        {"series": "A", "dose": 0.2, "value": 5 },
        {"series": "A", "dose": 0.05, "value": 70 },
        {"series": "A", "dose": 0.05, "value": 80 },
        {"series": "A", "dose": 0.2, "value": 18 },
        {"series": "A", "dose": 0.5, "value": 12.3 },
        {"series": "A", "dose": 1, "value": 10.6 },
           
        {"series": "B", "dose": 0, "value": 104 },
        {"series": "B", "dose": 0, "value": 101 },
        {"series": "B", "dose": 0.01, "value": 97 },
        {"series": "B", "dose": 0.01, "value": 104 },
        {"series": "B", "dose": 0.02, "value": 92 },
        {"series": "B", "dose": 0.02, "value": 96 },            
        {"series": "B", "dose": 0.05, "value": 98 },
        {"series": "B", "dose": 0.05, "value": 80 },
        {"series": "B", "dose": 0.2, "value": 80 },
        {"series": "B", "dose": 0.2, "value": 86 },                      
        {"series": "B", "dose": 0.5, "value": 28 },
        {"series": "B", "dose": 1, "value": 16 }
        ]
}
</code></pre>



### Example 3

Multiple dose-response curves.

<pre class="example"><code class="makealive drc01">{
  "title": "Comparison of several DRCs",
  "xlab": "Dose (&micro;M)",
  "ylab": "Rel. cell count",
  "points": 0,
  "legend": [14, 60, 14],
  "size": [336, 188],
  "series": [{
                "series": "A",
                "label": "Drug A",
                "color": "#ff0000",
                "radius": 4,
                "linewidth": 4
            },
            {
                "series": "B",
                "label": "Drug B",
                "color": "#0000ff",
                "radius": 4,
                "linewidth": 4
            },
            {
                "series": "C",
                "label": "Compound C",
                "color": "#9900ee",
                "radius": 4,
                "linewidth": 4
            }],
  "data": [
        {"series": "A", "dose": 0, "value": 98 },
        {"series": "A", "dose": 0, "value": 105 },
        {"series": "A", "dose": 0.01, "value": 100 },                
        {"series": "A", "dose": 0.02, "value": 95 },
        {"series": "A", "dose": 0.2, "value": 11 },        
        {"series": "A", "dose": 0.05, "value": 80 },        
        {"series": "A", "dose": 0.5, "value": 12.3 },
        {"series": "A", "dose": 1, "value": 10.6 },
           
        {"series": "B", "dose": 0, "value": 104 },
        {"series": "B", "dose": 0, "value": 101 },
        {"series": "B", "dose": 0.01, "value": 104 },
        {"series": "B", "dose": 0.02, "value": 92 },        
        {"series": "B", "dose": 0.05, "value": 98 },        
        {"series": "B", "dose": 0.2, "value": 80 },                             
        {"series": "B", "dose": 0.5, "value": 28 },
        {"series": "B", "dose": 1, "value": 16 },

        {"series": "C", "dose": 0.0, "value": 100 },
        {"series": "C", "dose": 0.0, "value": 102 },
        {"series": "C", "dose": 0.01, "value": 100 },
        {"series": "C", "dose": 0.02, "value": 105 },
        {"series": "C", "dose": 0.05, "value": 96 },
        {"series": "C", "dose": 0.2, "value": 97 },        
        {"series": "C", "dose": 0.5, "value": 75 },
        {"series": "C", "dose": 1, "value": 42 }
          ]
}
</code></pre>
