---
layout: example
title: plate12
permalink: /lib/plate12/
description: 12 well plate
author: Tomasz Konopka
dependencies: <a href='https://d3js.org/'>d3 (v4)</a>,
    makealive-lib.js
---

<script src="https://d3js.org/d3.v4.min.js"></script>



### Example 1

A basic plate without any data.

<pre class="example"><code class="makealive plate12">{
  "title": "Simple plate",  
  "data": [] 
}
</code></pre>



### Example 2

Coloring of individual wells.

<pre class="example"><code class="makealive plate12">{
  "title": "Experiment #2 - setup",  
  "size": [180, 160],
  "data": [ 
      {"well": "A1", "value": "#bbbbbb", "label": "control"},
      {"well": "A2", "value": "#ff77dd", "label": "A rep 1"},
      {"well": "A3", "value": "#ff77dd", "label": "A rep 2"},
      {"well": "A4", "value": "#ff77dd", "label": "A rep 3"},
      {"well": "B1", "value": "#ffdd77", "label": "B rep 1"},
      {"well": "B2", "value": "#ffdd77", "label": "B rep 2"},
      {"well": "B3", "value": "#ff77dd", "label": "A rep 4"},
      {"well": "B4", "value": "#ff77dd", "label": "A rep 5"},
      {"well": "C1", "value": "#ffdd77", "label": "B rep 3"}, 
      {"well": "C2", "value": "#ffdd77", "label": "B rep 4"},
      {"well": "C3", "value": "#ffdd77", "label": "B rep 5"},
      {"well": "C4", "value": "#bbbbbb", "label": "control"}
  ]  
}
</code></pre>



### Example 3

Coloring by numeric values.

<pre class="example"><code class="makealive plate12">{
  "title": "Experiment #3 - results",  
  "size": [166, 160],
  "wellcolor": "#dd0000",
  "data": [ 
     {"well": "A1", "value": "#bbbbbb", 
        "label": "control"},         
     {"well": "A4", "value": 0.2, 
        "label": "condition A4 - weak hit"},   
     {"well": "B1", "value": 1, 
        "label": "condition B1 - strong hit"},           
     {"well": "B3", "value": 0.6, 
        "label": "condition B3 - hit"},             
     {"well": "C4", "value": "#bbbbbb", "label": "control"}
  ]  
}
</code></pre>



### Example 4

It is also possible to adjust the well spacing and coloring.

<pre class="example"><code class="makealive plate12">{
  "title": "Nonstandard plate",  
  "padding": 0.8,
  "platecolor": "#0033ee",
  "data": [] 
}
</code></pre>

