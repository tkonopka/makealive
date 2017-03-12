---
layout: example
title: stackedbarplot02
permalink: /lib/stackedbarplot02/
description: Stacked horizontal bar plot
author: Tomasz Konopka
dependencies: <a href='https://d3js.org/'>d3 (v4)</a>,
    <a href='http://www.underscorejs.org'>underscore.js</a>
---

<script src="https://d3js.org/d3.v4.min.js"></script>


### Example 1

<pre class="example"><code class="makealive stackedbarplot02">{
  "title": "Two-color bars",  
  "xlab": "Arbitrary Numbers",
  "ylab": "",
  "series": [ 
    {"series": "A", "label": "Dark", "fill": "#13315c"},
    {"series": "B", "label": "Light", "fill": "#8da9c4"}],
  "data": [ {"name": "a",  "series": "A", "value": 3}, 
            {"name": "a",  "series": "B", "value": 12}, 
            {"name": "b",  "series": "B", "value": 4}, 
            {"name": "b",  "series": "A", "value": 17}
          ],
  "legend": [200, 20, 20]  
}
</code></pre>


<pre class="example"><code class="makealive stackedbarplot02">{
  "title": "Multi-color bars",  
  "xlab": "Proportions (%)",
  "ylab": "",
  "series": [ 
    {"series": "A", "label": "Lowest", "fill": "#582b11"}, 
    {"series": "B", "label": "Lower-mid", "fill": "#af125a"},
    {"series": "C", "label": "Upper-mid", "fill": "#bd8b9c"}
    ],    
  "data": [ {"name": "Abc",  "series": "A", "value": 40}, 
            {"name": "Abc",  "series": "B", "value": 50},
            {"name": "Abc",  "series": "C", "value": 10},
            {"name": "Def",  "series": "A", "value": 25}, 
            {"name": "Def",  "series": "B", "value": 20}, 
            {"name": "Def",  "series": "C", "value": 55},             
            {"name": "Ghi",  "series": "A", "value": 10}, 
            {"name": "Ghi",  "series": "B", "value": 65},
            {"name": "Ghi",  "series": "C", "value": 25}            
          ],
  "size": [370, 185],
  "legend": [210, 30, 20],
  "axisstyle": ["top grid", "left"],
  "axiscolor": "#444444",
  "padding": 0.3  
}
</code></pre>