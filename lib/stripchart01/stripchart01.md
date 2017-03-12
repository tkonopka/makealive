---
layout: example
title: stripchart01
permalink: /lib/stripchart01/
description: Vertical category plot
author: Tomasz Konopka
dependencies: <a href='https://d3js.org/'>d3 (v4)</a>,
    <a href='http://www.underscorejs.org'>underscore.js</a>
---

<script src="https://d3js.org/d3.v4.min.js"></script>



### Example 1

<pre class="example"><code class="makealive stripchart01">{
  "title": "Chart title",
  "xlab": "Categories",
  "ylab": "Values (a.u.)",
  "size": [170, 220],
  "margin": [40, 20, 44, 54],
  "radius": 4,
  "series": [ 
        {"series": "A", "label": "Abc", "fill": "#dd0000"},
        {"series": "Z", "label": "Xyz", "fill": "#dd00dd"} ],
  "data": [ {"name": "a", "series": "A", "value": 4}, 
            {"name": "b", "series": "A", "value": 6},
            {"name": "c", "series": "A", "value": 5},
            {"name": "d", "series": "A", "value": 9},
            {"name": "e", "series": "A", "value": 6.4},
            {"name": "f", "series": "A", "value": 10.4},
            {"name": "g", "series": "A", "value": 7.4},
            {"name": "t", "series": "Z", "value": 11.1}, 
            {"name": "u", "series": "Z", "value": 16.3}, 
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

<pre class="example"><code class="makealive stripchart01">{
  "title": "Chart title",
  "xlab": "",
  "ylab": "Values (a.u.)",
  "size": [200, 320],
  "padding": 0.4,
  "radius": 5,
  "series": [ 
        {"series": "A", "label": "Abc", "fill": "#cc8800"},
        {"series": "G", "label": "Ghi", "fill": "#008844"},
        {"series": "Z", "label": "Xyz", "fill": "#aa33dd"} ],
  "data": [ {"name": "red dot", "series": "A", 
                "value": 14.3, "fill":"#ee2200"}, 
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
  "offset": ["-0.5em", "0em", "-2.5em"],
  "axisstyle": ["bottom", "left grid"],
  "axiscolor": "#bbb"  
}
</code></pre>



### Example 3

<pre class="example"><code class="makealive stripchart01">{
  "title": "Example 3",
  "xlab": "",
  "ylab": "Values (a.u.)",
  "size": [260, 165],
  "padding": 0.4,
  "radius": 4.5,
  "series": [ 
        {"series": "A", "label": "Abc", "fill": "#cc8800"},
        {"series": "G", "label": "Ghi", "fill": "#008844"},
        {"series": "M", "label": "Mno", "fill": "#4488dd"},
        {"series": "Z", "label": "Xyz", "fill": "#aa33dd"} ],
  "data": [ {"name": "red dot", "series": "A", 
                "value": 16.8, "fill":"#ee2200"}, 
            {"series": "A", "value": 6},
            {"series": "A", "value": 5},
            {"series": "A", "value": 4.2},
            {"series": "A", "value": 6.2},
            {"series": "A", "value": 9.4},
            {"series": "G", "value": 11.2},
            {"series": "G", "value": 8.4},
            {"series": "G", "value": 12.6},
            {"series": "G", "value": 9.4},
            {"series": "M", "value": 8.2},
            {"series": "M", "value": 9.4},
            {"series": "M", "value": 7.6},
            {"series": "M", "value": 11.4},
            {"series": "Z", "value": 16.7}, 
            {"series": "Z", "value": 13.4}, 
            {"series": "Z", "value": 12}, 
            {"series": "Z", "value": 21},
            {"series": "Z", "value": 17},
            {"series": "Z", "value": 19}            
          ],
  "offset": ["-0.5em", "0em", "-2.5em"],
  "axisstyle": ["bottom", "left grid"],
  "axiscolor": "#bbb"  
}
</code></pre>