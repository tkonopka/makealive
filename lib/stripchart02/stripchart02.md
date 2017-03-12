---
layout: example
title: stripchart02
permalink: /lib/stripchart02/
description: Horizontal category plot
author: Tomasz Konopka
dependencies: <a href='https://d3js.org/'>d3 (v4)</a>,
    <a href='http://www.underscorejs.org'>underscore.js</a>
---

<script src="https://d3js.org/d3.v4.min.js"></script>



### Example 1

<pre class="example"><code class="makealive stripchart02">{
  "title": "Chart title",  
  "xlab": "Values (a.u.)",
  "ylab": "",
  "size": [250, 175],
  "radius": 4,
  "series": [ 
        {"series": "A", "label": "Abc", "fill": "#6600dd"},
        {"series": "Z", "label": "Xyz", "fill": "#0066dd"} ],
  "data": [ {"name": "a", "series": "A", "value": 4}, 
            {"name": "b", "series": "A", "value": 6},
            {"name": "c", "series": "A", "value": 5},
            {"name": "d", "series": "A", "value": 9},
            {"name": "e", "series": "A", "value": 11.2},
            {"name": "f", "series": "A", "value": 10.4},
            {"name": "g", "series": "A", "value": 8.7},
            {"name": "t", "series": "Z", "value": 9.9}, 
            {"name": "u", "series": "Z", "value": 16.7}, 
            {"name": "v", "series": "Z", "value": 13.4}, 
            {"name": "w", "series": "Z", "value": 12}, 
            {"name": "x", "series": "Z", "value": 18},
            {"name": "y", "series": "Z", "value": 17},
            {"name": "z", "series": "Z", "value": 14}            
          ]  
}
</code></pre>



### Example 2

Note styling on an individual point, styling of vertical axis

<pre class="example"><code class="makealive stripchart02">{
  "title": "Chart title",
  "xlab": "Values (a.u.)",
  "ylab": "",  
  "size": [370, 190],
  "padding": 0.45,
  "radius": 5.5,
  "series": [ 
        {"series": "A", "label": "Abc", "fill": "#cc8800"},
        {"series": "G", "label": "Ghi", "fill": "#008844"},
        {"series": "Z", "label": "Xyz", "fill": "#cc00dd"} ],
  "data": [ {"name": "red dot", "series": "A", 
                "value": 13.7, "fill":"#ee2200"}, 
            {"series": "A", "value": 6},
            {"series": "A", "value": 5},
            {"series": "A", "value": 4.2},
            {"series": "A", "value": 6.2},
            {"series": "A", "value": 9.4},
            {"series": "G", "value": 11.2},
            {"series": "G", "value": 8.4},
            {"series": "G", "value": 12.6},
            {"series": "G", "value": 9.4},
            {"series": "Z", "value": 16.7}, 
            {"series": "Z", "value": 13.4}, 
            {"series": "Z", "value": 12}, 
            {"series": "Z", "value": 21},
            {"series": "Z", "value": 17},
            {"series": "Z", "value": 19}            
          ],
  "axisstyle": ["top grid", "left"],
  "axiscolor": "#bbbbbb"  
}
</code></pre>
