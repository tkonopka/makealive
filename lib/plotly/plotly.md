---
layout: example
title: plotly
permalink: /lib/plotly/
description: wrapper for plotly.js graphs
author: 
dependencies: <a href='https://plot.ly/javascript/'>plotly.js</a>
---

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

<div class="row">
<div class="col-md-8">
<p>
<a href='https://plot.ly/javascript/'>Plotly.js</a> is a full-featured javascript library for creating graphs and charts. 
This conversion function provides a wrapper that enables use of its features in 
<code>makealive</code> code blocks. This single conversion function provides access to the full
range of plotly capabilities (see examples).
</p>

<p>
Most plotly examples and tutorials use the library from javascript code and mix 
programmatic data processing with the visual presentation. The plotly <code>makealive</code>
conversion function provides a way to produce plotly graphs 
from pure-data input, i.e. without the need to execute any user-generated input. 
This introduces some limitations - all data must be written out explicitly in the 
<code>makealive</code>
definition - but it makes the library available to end-users.
</p>

<p>
The plotly library provides plentiful ways to customize a chart. While powerful, 
this means that chart definitions can become quite long. The plotly 
<a href="https://plot.ly/alpha/workspace/">web editor</a> contains tools to 
customize charts and the code generated there can be written into a 
<code>makealive</code> box here.
</p>
</div>
</div>


### Example 1

This example is adapted from the [bubble charts turorial](https://plot.ly/javascript/bubble-charts/).

<pre class="example"><code class="makealive plotly">{
  "data": [{ 
    "x": [1, 2, 3, 4],
    "y": [10, 11, 12, 13],
    "mode": "markers",
    "marker": {
      "size": [20, 30, 40, 50]
    }
  }],
  "layout": {
    "title": "Marker Size",
    "showlegend": false,
    "height": 400,
    "width": 400
  }
}  
</code></pre>


### Example 2

This example is adapted from the [line charts turorial](https://plot.ly/javascript/line-charts/).

<pre class="example"><code class="makealive plotly">{
  "data": [
    {
      "x": [1, 2, 3, 4],
      "y": [10, 15, 13, 17],
      "mode": "markers",
      "name": "Scatter"
    },
    {
      "x": [2, 3, 4, 5],
      "y": [16, 5, 11, 9],
      "mode": "lines",
      "name": "Lines"
    },
    {
      "x": [1, 2, 3, 4],
      "y": [12, 9, 15, 12],
      "mode": "lines+markers",
      "name": "Scatter and Lines"
    }
  ],
  "layout": {
    "title": "Title of the Graph",
    "xaxis": {
      "title": "x-axis title"
    },
    "yaxis": {
      "title": "y-axis title"
    }
  }
}
</code></pre>


### Example 3

This example is adapted from the [time series tutorial](https://plot.ly/javascript/time-series/).

<pre class="example"><code class="makealive plotly">{
  "data": [
    {
      "x": ["2013-10-04 22:23:00", 
            "2013-11-04 22:23:00", 
            "2013-12-04 22:23:00"],
      "y": [1, 3, 6],
      "type": "scatter"
    }
  ],
  "layout": {}
}
</code></pre>

