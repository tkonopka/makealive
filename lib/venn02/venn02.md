---
layout: example
title: venn02
permalink: /lib/venn02/
description: Venn diagram with input form
author: Tomasz Konopka
dependencies: <a href='https://d3js.org/'>d3 (v4)</a>, 
    <a href='https://github.com/punkave/sanitize-html'>sanitize-html</a>, 
    <a href="http://www.underscorejs.org">underscore.js</a>, 
    <a href="venn01.html">venn01</a>
---

<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="../venn01/venn01.js"></script>

### Example 1

Sets with small overlap.

<pre class="example"><code class="makealive venn02">{
  "A": ["a", "b", "c", "d", "e", "f", "g", "h"]  
}
</code></pre>


### Example 2

Larger diagram, different colors.

<pre class="example"><code class="makealive venn02">{
  "A": ["a", "b", "c", "d", "e", "f", "g", "h"],
  "size": [220, 150],
  "color": ["#0000bb", "#0099bb"],
  "size": [150, 120],
  "margin": [25, 15, 10, 25]   
}
</code></pre>
