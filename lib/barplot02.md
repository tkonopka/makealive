---
layout: example
title: barplot02
description: Simple horizontal bar plot
author: Tomasz Konopka
dependencies: <a href='https://d3js.org/'>d3 (v4)</a>,
    <a href='http://www.underscorejs.org'>underscore.js</a>
---

<script src="https://d3js.org/d3.v4.min.js"></script>


### Example 1

<pre class="example"><code class="makealive barplot02">{
  "title": "Chart title",
  "xlab":  "axis label (with units)",
  "ylab":  "Letters",
  "data": [ {"name": "a", "value": 18}, 
            {"name": "b", "value": 13},
            {"name": "c", "value": 6}
          ]  
}
</code></pre>



### Example 2

<pre class="example"><code class="makealive barplot02">{
  "title": "Chart title",
  "xlab":  "axis label (with units)",
  "ylab":  "",
  "data": [ {"name": "long names", "value": 3.2, 
             "fill": "#0000aa"}, 
            {"name": "are easy to read on", "value": 5 , 
             "fill": "#0000aa"},
            {"name": "a horizontal chart", "value": 2, 
             "fill": "#0000aa"}, 
            {"name": "(short ones too)", "value": 2.4, 
             "fill": "#bb0000"}                        
          ],
  "size": [400, 180],
  "offset": ["-3em", "-1.8em", "-2em"],
  "margin": [70, 10, 20, 110],
  "padding": 0.5 
}
</code></pre>



### Example 3

<pre class="example"><code class="makealive barplot02">{
  "title": "A different axis style",
  "xlab":  "axis label (with units)",
  "ylab":  "Letters",
  "data": [ {"name": "a", "value": 18}, 
            {"name": "b", "value": 13},
            {"name": "c", "value": 6, "fill": "#00dd22"}
          ],
  "axisstyle": ["top grid", "left"],
  "axiscolor": "#888"    
}
</code></pre>
