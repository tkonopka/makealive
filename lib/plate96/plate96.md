---
layout: example
title: plate96
permalink: /lib/plate96/
description: 96 well plate
author: Tomasz Konopka
dependencies: <a href='https://d3js.org/'>d3 (v4)</a>,
    <a href='http://www.underscorejs.org'>underscore.js</a>,
    plate12.js
---

<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="../plate12/plate12.js"></script>



### Example 1

A basic plate without any data.

<pre class="example"><code class="makealive plate96">{
  "title": "Simple plate",  
  "size": [320, 230],
  "data": [] 
}
</code></pre>


### Example 2

Coloring by numeric values.

<pre class="example"><code class="makealive plate96">{
  "title": "Experiment #2 - hits",  
  "size": [320, 230],
  "wellcolor": "#f1a208",
  "padding": 0.2,
  "data": [       
      {"well": "A4", "value": 0.5},
      {"well": "A9", "value": 0.3},
      {"well": "B2", "value": 0.23},
      {"well": "C6", "value": 0.82},
      {"well": "C12", "value": 1, "label": "best hit"},
      {"well": "E4", "value": 0.5},
      {"well": "E9", "value": 0.65},
      {"well": "H1", "value": 0.15},
      {"well": "H11", "value": 0.74},
      {"well": "G2", "value": 0.89}
  ]  
} 
</code></pre>



### Example 3

Coloring of individual wells. Here, the code becomes quite long... 96 well lines of data!

<pre class="example"><code class="makealive plate96">{
  "title": "Experiment #3 - setup",  
  "size": [180, 160],
  "data": [ 
      {"well": "A1", "value": "#bbbbbb", "label": "water"},
      {"well": "A2", "value": "#bbbbbb", "label": "water"},
      {"well": "A3", "value": "#bbbbbb", "label": "water"},
      {"well": "A4", "value": "#bbbbbb", "label": "water"},
      {"well": "A5", "value": "#bbbbbb", "label": "water"},
      {"well": "A6", "value": "#bbbbbb", "label": "water"},
      {"well": "A7", "value": "#bbbbbb", "label": "water"},
      {"well": "A8", "value": "#bbbbbb", "label": "water"},
      {"well": "A9", "value": "#bbbbbb", "label": "water"},
      {"well": "A10", "value": "#bbbbbb", "label": "water"},
      {"well": "A11", "value": "#bbbbbb", "label": "water"},
      {"well": "A12", "value": "#bbbbbb", "label": "water"},
      {"well": "B1", "value": "#bbbbbb", "label": "water"},
      {"well": "B2", "value": "#d44d5c", "label": "drug A"},
      {"well": "B3", "value": "#d44d5c", "label": "drug A"},
      {"well": "B4", "value": "#d44d5c", "label": "drug A"},
      {"well": "B5", "value": "#d44d5c", "label": "drug A"},
      {"well": "B6", "value": "#d44d5c", "label": "drug A"},
      {"well": "B7", "value": "#d44d5c", "label": "drug A"},
      {"well": "B8", "value": "#d44d5c", "label": "drug A"},
      {"well": "B9", "value": "#d44d5c", "label": "drug A"},
      {"well": "B10", "value": "#d44d5c", "label": "drug A"},
      {"well": "B11", "value": "#d44d5c", "label": "drug A"},
      {"well": "B12", "value": "#bbbbbb", "label": "water"},
      {"well": "C1", "value": "#bbbbbb", "label": "water"},
      {"well": "C2", "value": "#d44d5c", "label": "drug A"},
      {"well": "C3", "value": "#d44d5c", "label": "drug A"},
      {"well": "C4", "value": "#d44d5c", "label": "drug A"},
      {"well": "C5", "value": "#d44d5c", "label": "drug A"},
      {"well": "C6", "value": "#d44d5c", "label": "drug A"},
      {"well": "C7", "value": "#d44d5c", "label": "drug A"},
      {"well": "C8", "value": "#d44d5c", "label": "drug A"},
      {"well": "C9", "value": "#d44d5c", "label": "drug A"},
      {"well": "C10", "value": "#d44d5c", "label": "drug A"},
      {"well": "C11", "value": "#d44d5c", "label": "drug A"},
      {"well": "C12", "value": "#bbbbbb", "label": "water"},
      {"well": "D1", "value": "#bbbbbb", "label": "water"},
      {"well": "D2", "value": "#d44d5c", "label": "drug A"},
      {"well": "D3", "value": "#d44d5c", "label": "drug A"},
      {"well": "D4", "value": "#d44d5c", "label": "drug A"},
      {"well": "D5", "value": "#d44d5c", "label": "drug A"},
      {"well": "D6", "value": "#d44d5c", "label": "drug A"},
      {"well": "D7", "value": "#d44d5c", "label": "drug A"},
      {"well": "D8", "value": "#d44d5c", "label": "drug A"},
      {"well": "D9", "value": "#d44d5c", "label": "drug A"},
      {"well": "D10", "value": "#d44d5c", "label": "drug A"},
      {"well": "D11", "value": "#d44d5c", "label": "drug A"},
      {"well": "D12", "value": "#bbbbbb", "label": "water"},
      {"well": "E1", "value": "#bbbbbb", "label": "water"},
      {"well": "E2", "value": "#631a86", "label": "drug B"},
      {"well": "E3", "value": "#631a86", "label": "drug B"},
      {"well": "E4", "value": "#631a86", "label": "drug B"},
      {"well": "E5", "value": "#631a86", "label": "drug B"},
      {"well": "E6", "value": "#631a86", "label": "drug B"},
      {"well": "E7", "value": "#631a86", "label": "drug B"},
      {"well": "E8", "value": "#631a86", "label": "drug B"},
      {"well": "E9", "value": "#631a86", "label": "drug B"},
      {"well": "E10", "value": "#631a86", "label": "drug B"},
      {"well": "E11", "value": "#631a86", "label": "drug B"},
      {"well": "E12", "value": "#bbbbbb", "label": "water"},
      {"well": "F1", "value": "#bbbbbb", "label": "water"},
      {"well": "F2", "value": "#631a86", "label": "drug B"},
      {"well": "F3", "value": "#631a86", "label": "drug B"},
      {"well": "F4", "value": "#631a86", "label": "drug B"},
      {"well": "F5", "value": "#631a86", "label": "drug B"},
      {"well": "F6", "value": "#631a86", "label": "drug B"},
      {"well": "F7", "value": "#631a86", "label": "drug B"},
      {"well": "F8", "value": "#631a86", "label": "drug B"},
      {"well": "F9", "value": "#631a86", "label": "drug B"},
      {"well": "F10", "value": "#631a86", "label": "drug B"},
      {"well": "F11", "value": "#631a86", "label": "drug B"},
      {"well": "F12", "value": "#bbbbbb", "label": "water"},
      {"well": "G1", "value": "#bbbbbb", "label": "water"},
      {"well": "G2", "value": "#631a86", "label": "drug B"},
      {"well": "G3", "value": "#631a86", "label": "drug B"},
      {"well": "G4", "value": "#631a86", "label": "drug B"},
      {"well": "G5", "value": "#631a86", "label": "drug B"},
      {"well": "G6", "value": "#631a86", "label": "drug B"},
      {"well": "G7", "value": "#631a86", "label": "drug B"},
      {"well": "G8", "value": "#631a86", "label": "drug B"},
      {"well": "G9", "value": "#631a86", "label": "drug B"},
      {"well": "G10", "value": "#631a86", "label": "drug B"},
      {"well": "G11", "value": "#631a86", "label": "drug B"},
      {"well": "G12", "value": "#bbbbbb", "label": "water"},
      {"well": "H1", "value": "#bbbbbb", "label": "water"},
      {"well": "H2", "value": "#bbbbbb", "label": "water"},
      {"well": "H3", "value": "#bbbbbb", "label": "water"},
      {"well": "H4", "value": "#bbbbbb", "label": "water"},
      {"well": "H5", "value": "#bbbbbb", "label": "water"},
      {"well": "H6", "value": "#bbbbbb", "label": "water"},
      {"well": "H7", "value": "#bbbbbb", "label": "water"},
      {"well": "H8", "value": "#bbbbbb", "label": "water"},
      {"well": "H9", "value": "#bbbbbb", "label": "water"},
      {"well": "H10", "value": "#bbbbbb", "label": "water"},
      {"well": "H11", "value": "#bbbbbb", "label": "water"},
      {"well": "H12", "value": "#bbbbbb", "label": "water"}      
  ]  
}
</code></pre>





