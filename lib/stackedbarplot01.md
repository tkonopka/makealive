---
layout: example
title: stackedbarplot01
description: Stacked vertical bar plot
author: Tomasz Konopka
dependencies: <a href='https://d3js.org/'>d3 (v4)</a>, <a href='http://www.underscorejs.org'>underscore.js</a>
---

<script src="https://d3js.org/d3.v4.min.js"></script>


### Example 1

<pre class="example"><code class="makealive stackedbarplot01">{
  "title": "Two-color bars",
  "xlab": "",
  "ylab": "Values (units)",
  "series": [ {"series": "A", "label": "Aseries", "fill": "#13315c"}, 
              {"series": "B", "label": "Bseries",   "fill": "#8da9c4"} ],
  "data": [ {"name": "a",  "series": "A", "value": 5}, 
            {"name": "a",  "series": "B", "value": 10}, 
            {"name": "b",  "series": "B", "value": 6}, 
            {"name": "b",  "series": "A", "value": 12}
          ]  
}
</code></pre>
