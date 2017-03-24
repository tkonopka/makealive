---
layout: example
title: scatterplot01
permalink: /lib/scatterplot01/
description: Simple scatter plot
author: Tomasz Konopka
dependencies: <a href='https://d3js.org/'>d3 (v4)</a>,
    makealive-lib.js  
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


### Example 3

<pre class="example"><code class="makealive scatterplot01">{
  "title": "scatterplot01",
  "xlab": "xyz (units)",
  "ylab": "abc (units)",
  "size": [270, 160],
  "data": [ {"x":1.8,"y":1.6}, {"x":-2.2,"y":-2.2},
            {"x":-1.5,"y":-1.3}, {"x":0.27,"y":0.64}, 
            {"x":0.91,"y":1.2}, {"x":-0.35,"y":-0.92}, 
            {"x":-0.65,"y":-0.51}, {"x":-0.13,"y":-0.2}, 
            {"x":-0.04,"y":0.31}, {"x":0.78,"y":1.5}, 
            {"x":0.46,"y":0.1}, {"x":0.8,"y":1},
            {"x":0.19,"y":0.99}, {"x":-1.6,"y":-1.3},
            {"x":2.24, "y":1.71}, {"x":-0.78, "y":-1.53},
            {"x":0.54, "y":0.58}, {"x":-1.41, "y":-1.01}]
}
</code></pre>