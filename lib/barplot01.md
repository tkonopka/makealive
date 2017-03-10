---
layout: example
title: barplot01
description: Simple bar plot
author: Tomasz Konopka
dependencies: <a href='https://d3js.org/'>d3 (v4)</a>,
    <a href='http://www.underscorejs.org'>underscore.js</a>
---

<script src="https://d3js.org/d3.v4.min.js"></script>



### Example 1

<pre class="example"><code class="makealive barplot01">{
  "title": "Chart title",
  "xlab": "another label",
  "ylab": "with units",
  "data": [ {"name": "a",  "value": 12}, 
            {"name": "b", "value": 18},
            {"name": "c", "value": 12}
          ]  
}
</code></pre>

### Example 2

<pre class="example"><code class="makealive barplot01">{
  "title": "Chart title",
  "xlab": "",
  "ylab": "with units",
  "data": [ {"name": "a", "value": 3.2, "fill": "#777777"}, 
            {"name": "b", "value": 5 ,  "fill": "#777777"},
            {"name": "c", "value": 2,   "fill": "#777777"},
            {"name": "d", "value": 3,   "fill": "#777777"},
            {"name": "e", "value": 4.2, "fill": "#777777"},
            {"name": "",  "value": 0,   "fill": "#777777"},
            {"name": "x", "value": 14,  "fill": "#bb3300"},
            {"name": "y", "value": 18,  "fill": "#bb0033"},
            {"name": "z", "value": 19,  "fill": "#bb0000"}
          ],
  "size": [300,180],
  "offset": ["-1em", "0em", "-2em"],
  "margin": [50,10,40,80],
  "padding": 0.10  
}
</code></pre>



### Example 3

<pre class="example"><code class="makealive barplot01">{
  "title": "A different axis style",
  "xlab": "",
  "ylab": "with units",
  "data": [ {"name": "a",  "value": 12}, 
            {"name": "b", "value": 18},
            {"name": "c", "value": 12}
          ],
  "size": [260, 260],
  "axisstyle": ["bottom", "left grid"],
  "axiscolor": "#888888"  
}
</code></pre>