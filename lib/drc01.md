---
layout: example
title: drc01
description: Dose-response curve
author: Tomasz Konopka
dependencies: <a href='https://d3js.org/'>d3 (v4)</a>, <a href="http://www.underscorejs.org">underscore.js</a>
---

<script src="https://d3js.org/d3.v4.min.js"></script>


### Example 1

Single dose response curve. 

<pre class="example"><code class="makealive drc01">{
  "title": "Simple DRC",
  "xlab": "Dose (&micro;M)",
  "ylab": "Viability",
  "series": [{
                "series": "A",
                "label": "Drug name A",
                "color": "#ff0000",
                "radius": 3,
                "linewidth": 4
            }],
  "data": [{ 
             "series": "A", "dose": 0, "value": 98
           },
           { 
             "series": "A", "dose": 0, "value": 105
           },
           { 
             "series": "A", "dose": 0.01, "value": 100
           },
           { 
             "series": "A", "dose": 0.01, "value": 110
           },
           { 
             "series": "A", "dose": 0.02, "value": 90
           },
           { 
             "series": "A", "dose": 0.02, "value": 95
           },
            { 
             "series": "A", "dose": 0.2, "value": 5
           },
            { 
             "series": "A", "dose": 0.05, "value": 70
           },
           { 
             "series": "A", "dose": 0.05, "value": 80
           },
           { 
             "series": "A", "dose": 0.2, "value": 18
           },
           { 
             "series": "A", "dose": 0.5, "value": 12.3
           },
           { 
             "series": "A", "dose": 1, "value": 10.6
           }]
}
</code></pre>


### Example 2

Two dose-response curves.

<pre class="example"><code class="makealive drc01">{
  "title": "Comparison of two DRCs",
  "xlab": "Dose (&micro;M)",
  "ylab": "Viability",
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
  "data": [{ 
             "series": "A", "dose": 0, "value": 98
           },
           { 
             "series": "A", "dose": 0, "value": 105
           },
           { 
             "series": "A", "dose": 0.01, "value": 100
           },
           { 
             "series": "A", "dose": 0.01, "value": 110
           },
           { 
             "series": "A", "dose": 0.02, "value": 90
           },
           { 
             "series": "A", "dose": 0.02, "value": 95
           },
            { 
             "series": "A", "dose": 0.2, "value": 5
           },
            { 
             "series": "A", "dose": 0.05, "value": 70
           },
           { 
             "series": "A", "dose": 0.05, "value": 80
           },
           { 
             "series": "A", "dose": 0.2, "value": 18
           },
           { 
             "series": "A", "dose": 0.5, "value": 12.3
           },
           { 
             "series": "A", "dose": 1, "value": 10.6
           },
           
           { 
             "series": "B", "dose": 0, "value": 104
           },
           { 
             "series": "B", "dose": 0, "value": 101
           },
           { 
             "series": "B", "dose": 0.01, "value": 97
           },
           { 
             "series": "B", "dose": 0.01, "value": 104
           },
           { 
             "series": "B", "dose": 0.02, "value": 92
           },
           { 
             "series": "B", "dose": 0.02, "value": 96
           },            
           { 
             "series": "B", "dose": 0.05, "value": 98
           },
           { 
             "series": "B", "dose": 0.05, "value": 80
           },
           { 
             "series": "B", "dose": 0.2, "value": 80
           },
           { 
             "series": "B", "dose": 0.2, "value": 86
           },                      
           { 
             "series": "B", "dose": 0.5, "value": 28
           },
           { 
             "series": "B", "dose": 1, "value": 16
           }]
}
</code></pre>



### Example 3

Multiple dose-response curves.

<pre class="example"><code class="makealive drc01">{
  "title": "Comparison of several DRCs",
  "xlab": "Dose (&micro;M)",
  "ylab": "Viability",
  "points": 0,
  "legend": [20, 100, 16],
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
  "data": [{ 
             "series": "A", "dose": 0, "value": 98
           },
           { 
             "series": "A", "dose": 0, "value": 105
           },
           { 
             "series": "A", "dose": 0.01, "value": 100
           },
           { 
             "series": "A", "dose": 0.01, "value": 110
           },
           { 
             "series": "A", "dose": 0.02, "value": 90
           },
           { 
             "series": "A", "dose": 0.02, "value": 95
           },
            { 
             "series": "A", "dose": 0.2, "value": 5
           },
            { 
             "series": "A", "dose": 0.05, "value": 70
           },
           { 
             "series": "A", "dose": 0.05, "value": 80
           },
           { 
             "series": "A", "dose": 0.2, "value": 18
           },
           { 
             "series": "A", "dose": 0.5, "value": 12.3
           },
           { 
             "series": "A", "dose": 1, "value": 10.6
           },
           
           { 
             "series": "B", "dose": 0, "value": 104
           },
           { 
             "series": "B", "dose": 0, "value": 101
           },
           { 
             "series": "B", "dose": 0.01, "value": 97
           },
           { 
             "series": "B", "dose": 0.01, "value": 104
           },
           { 
             "series": "B", "dose": 0.02, "value": 92
           },
           { 
             "series": "B", "dose": 0.02, "value": 96
           },            
           { 
             "series": "B", "dose": 0.05, "value": 98
           },
           { 
             "series": "B", "dose": 0.05, "value": 80
           },
           { 
             "series": "B", "dose": 0.2, "value": 80
           },
           { 
             "series": "B", "dose": 0.2, "value": 86
           },                      
           { 
             "series": "B", "dose": 0.5, "value": 28
           },
           { 
             "series": "B", "dose": 1, "value": 16
           },
           { 
             "series": "C", "dose": 0.0, "value": 100
           },
           { 
             "series": "C", "dose": 0.01, "value": 100
           },
           { 
             "series": "C", "dose": 0.2, "value": 97
           },
           { 
             "series": "C", "dose": 0.5, "value": 85
           },
           { 
             "series": "C", "dose": 0.5, "value": 75
           },
           { 
             "series": "C", "dose": 1, "value": 42
           }

          ]
}
</code></pre>



