---
layout: example
title: stackedbarplot01
description: Stacked vertical bar plot
author: Tomasz Konopka
dependencies: <a href='https://d3js.org/'>d3 (v4)</a>, 
    <a href='http://www.underscorejs.org'>underscore.js</a>
---

<script src="https://d3js.org/d3.v4.min.js"></script>


### Example 1

<pre class="example"><code class="makealive stackedbarplot01">{
  "title": "Two-color bars",
  "xlab": "",
  "ylab": "Values (units)",
  "series": [ 
    {"series": "A", "label": "Dark", "fill": "#13315c"},
    {"series": "B", "label": "Light", "fill": "#8da9c4"}],
  "data": [ {"name": "a",  "series": "A", "value": 7}, 
            {"name": "a",  "series": "B", "value": 8}, 
            {"name": "b",  "series": "B", "value": 6}, 
            {"name": "b",  "series": "A", "value": 14}
          ],
  "legend": [125, 20, 20]  
}
</code></pre>


### Example 2

<pre class="example"><code class="makealive stackedbarplot01">{
  "title": "Multi-color bars",
  "xlab": "",
  "ylab": "Proportions (%)",
  "series": [ 
    {"series": "A", "label": "Lowest", "fill": "#582b11"}, 
    {"series": "B", "label": "Lower-mid", "fill": "#af125a"},
    {"series": "C", "label": "Upper-mid", "fill": "#bd8b9c"}, 
    {"series": "D", "label": "Highest", "fill": "#c0f5fa"}],
  "data": [ {"name": "Abc",  "series": "A", "value": 40}, 
            {"name": "Abc",  "series": "B", "value": 50},
            {"name": "Abc",  "series": "C", "value": 10},
            {"name": "Def",  "series": "A", "value": 25}, 
            {"name": "Def",  "series": "B", "value": 20}, 
            {"name": "Def",  "series": "C", "value": 50}, 
            {"name": "Def",  "series": "D", "value": 5},             
            {"name": "Ghi",  "series": "A", "value": 10}, 
            {"name": "Ghi",  "series": "B", "value": 65},
            {"name": "Ghi",  "series": "C", "value": 10},
            {"name": "Ghi",  "series": "D", "value": 15}
          ],
  "size": [340, 220],
  "legend": [160, 20, 20],
  "axisstyle": ["bottom", "left grid"]  
}
</code></pre>
