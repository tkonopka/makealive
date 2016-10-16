---
layout: example
title: scatterplot01
description: A simple scatter plot
author: Tomasz Konopka
dependencies: <a href='https://d3js.org/'>d3 (v4)</a>
---

<script src="https://d3js.org/d3.v4.min.js"></script>


### Example 1

<pre class="example"><code class="makealive scatterplot01">{
  "title": "hello",
  "xlab": "xyz (units)",
  "ylab": "abc (units)",
  "data": [ {"name": "a",  "x": 12, "y": 11}, 
            {"name": "b",  "x": 13, "y": 3}, 
            {"name": "c", "x": 18, "y": -1}
          ]
}
</code></pre>

### Example 2

<pre class="example"><code class="makealive scatterplot01">{
  "title": "Note the abundant padding",
  "xlab": "xyz (units)",
  "ylab": "abc (units)",
  "data": [ {"name": "p1", "x": 12, "y": 11}, 
            {"name": "p2", "x": 11, "y": 8}, 
            {"name": "p3", "x": 8, "y": 7}, 
            {"name": "p4", "x": 6, "y": 4}, 
            {"name": "p5", "x": 5, "y": 2}, 
            {"name": "p6", "x": 2, "y": -4}, 
            {"name": "p7", "x": 1, "y": -1}
          ],
  "size": [480, 280],
  "margin": [40,20,40,80],
  "offset": ["-1em", "2.2em", "-2.2em"],
  "color": "#d70",
  "radius": 6,
  "padding": 0.5
}
</code></pre>
