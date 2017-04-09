---
layout: example
title: matrix01
permalink: /lib/matrix01/
description: Rectangular matrix heatmap
author: Tomasz Konopka
dependencies: <a href='https://d3js.org/'>d3 (v4)</a>,
    makealive-lib.js    
---

<script src="https://d3js.org/d3.v4.min.js"></script>



### Example 1

Basic one-color heatmap (all values positive).

<pre class="example"><code class="makealive matrix01">{
  "title": "Square box matrix",
  "xlab": "Names",
  "ylab": "Values",  
  "data": [ {"x": "a", "y": "alpha", "value": 0}, 
            {"x": "a", "y": "bravo", "value": 0.2}, 
            {"x": "a", "y": "charlie", "value": 0.1}, 
            {"x": "b", "y": "alpha", "value": 1}, 
            {"x": "b", "y": "bravo", "value": 0.5}, 
            {"x": "b", "y": "charlie", "value": 0.8}, 
            {"x": "c", "y": "alpha", "value": 0.2}, 
            {"x": "c", "y": "bravo", "value": 0}, 
            {"x": "c", "y": "charlie", "value": 0}, 
            {"x": "d", "y": "alpha", "value": 0}, 
            {"x": "d", "y": "bravo", "value": 0.2}, 
            {"x": "d", "y": "charlie", "value": 0.3}            
          ]  
}
</code></pre>


### Example 2

Similar to example 1, but here the boxes are not required to be square. The 
padding between matrix elements is different.

Note also omission of data rows with zero values. Missing values generate white
spaces, which is visually convenient. However, note that the keys can become 
reordered (alpha, bravo, charlie changed to bravo, charlie, alpha).

<pre class="example"><code class="makealive matrix01">{
  "title": "Standard heatmap",
  "xlab": "",
  "ylab": "",
  "square": 0,
  "padding": 0.05,
  "xangle": 0,
  "data": [ {"x": "a", "y": "bravo", "value": 0.2}, 
            {"x": "a", "y": "charlie", "value": 0.1}, 
            {"x": "b", "y": "alpha", "value": 1}, 
            {"x": "b", "y": "bravo", "value": 0.5}, 
            {"x": "b", "y": "charlie", "value": 0.8}, 
            {"x": "c", "y": "alpha", "value": 0.2},                                     
            {"x": "d", "y": "bravo", "value": 0.2}, 
            {"x": "d", "y": "charlie", "value": 0.3}            
          ]  
}
</code></pre>


### Example 3

A two-color map with positive and negative values.

<pre class="example"><code class="makealive matrix01">{
  "title": "Two-color map",  
  "xlab": "",
  "ylab": "",
  "size": [230, 170],
  "axisstyle": ["top", "right"],
  "margin": [70, 60, 10, 10],
  "offset": ["-3em", "-1em", "-3em"],
  "xangle": -45,
  "padding": 0.15,
  "data": [ {"x": "a", "y": "alpha", "value": 0.3},
            {"x": "a", "y": "bravo", "value": 0.2}, 
            {"x": "a", "y": "charlie", "value": 0.1},             
            {"x": "a", "y": "delta", "value": 0.8},             
            {"x": "b", "y": "alpha", "value": 1}, 
            {"x": "b", "y": "bravo", "value": -0.3}, 
            {"x": "b", "y": "charlie", "value": 0.8}, 
            {"x": "b", "y": "delta", "value": -0.4}, 
            {"x": "c", "y": "alpha", "value": -0.2}, 
            {"x": "c", "y": "charlie", "value": 0.2}, 
            {"x": "d", "y": "bravo", "value": 0.2}, 
            {"x": "d", "y": "charlie", "value": -0.3},
            {"x": "d", "y": "delta", "value": -0.7},
            {"x": "e", "y": "bravo", "value": -0.3},
            {"x": "e", "y": "delta", "value": -0.8},
            {"x": "f", "y": "alpha", "value": 0.4},
            {"x": "f", "y": "bravo", "value": 0.1},
            {"x": "g", "y": "bravo", "value": -0.3},
            {"x": "g", "y": "charlie", "value": -0.8},
            {"x": "g", "y": "delta", "value": -0.6},
            {"x": "h", "y": "alpha", "value": 0.1},
            {"x": "h", "y": "delta", "value": -0.5}
          ]  
}
</code></pre>
