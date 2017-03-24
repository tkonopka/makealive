---
layout: example
title: plate24
permalink: /lib/plate24/
description: 24 well plate
author: Tomasz Konopka
dependencies: <a href='https://d3js.org/'>d3 (v4)</a>,    
    plate12.js,
    makealive-lib.js
---

<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="../plate12/plate12.js"></script>



### Example 1

A basic plate without any data.

<pre class="example"><code class="makealive plate24">{
  "title": "Simple plate",  
  "data": [] 
}
</code></pre>



### Example 2

Coloring of individual wells.

<pre class="example"><code class="makealive plate24">{
  "title": "Experiment #2 - setup",  
  "size": [180, 160],
  "wellcolor": "#006ba6",
  "data": [ 
      {"well": "A1", "value": "#e6e6e6", "label": "control"},
      {"well": "A2", "value": 1, "label": "treat"},
      {"well": "A3", "value": "#e6e6e6", "label": "control"},
      {"well": "A4", "value": 1, "label": "treat"},
      {"well": "A5", "value": "#e6e6e6", "label": "control"},
      {"well": "A6", "value": 1, "label": "treat"},
      {"well": "B1", "value": "#e6e6e6", "label": "control"},
      {"well": "B2", "value": 1, "label": "treat"},
      {"well": "B3", "value": "#e6e6e6", "label": "control"},
      {"well": "B4", "value": 1, "label": "treat"},
      {"well": "B5", "value": "#e6e6e6", "label": "control"},
      {"well": "B6", "value": 1, "label": "treat"},
      {"well": "C1", "value": "#e6e6e6", "label": "control"}, 
      {"well": "C2", "value": 1, "label": "treat"},
      {"well": "C3", "value": "#e6e6e6", "label": "control"},
      {"well": "C4", "value": 1, "label": "treat"},
      {"well": "C5", "value": "#e6e6e6", "label": "control"},
      {"well": "C6", "value": 1, "label": "treat"},
      {"well": "D1", "value": "#e6e6e6", "label": "control"}, 
      {"well": "D2", "value": 1, "label": "treat"},
      {"well": "D3", "value": "#e6e6e6", "label": "control"},
      {"well": "D4", "value": 1, "label": "treat"},
      {"well": "D5", "value": "#e6e6e6", "label": "control"},
      {"well": "D6", "value": 1, "label": "treat"}
  ]  
}
</code></pre>



### Example 3

Coloring by numeric values.

<pre class="example"><code class="makealive plate24">{
  "title": "Experiment #3 - results",  
  "size": [240, 200],
  "wellcolor": "#db5461",
  "data": [ 
     {"well": "A1", "value": "#bbbbbb", "label": "control"},         
     {"well": "A4", "value": 0.2},
     {"well": "B1", "value": 1},
     {"well": "B3", "value": 0.6},
     {"well": "C1", "value": 0.15},
     {"well": "C2", "value": 0.3},
     {"well": "C3", "value": 0.45},
     {"well": "C4", "value": 0.6},
     {"well": "C5", "value": 0.75},
     {"well": "C6", "value": 0.9},
     {"well": "D6", "value": "#bbbbbb", "label": "control"}
  ]  
}
</code></pre>



