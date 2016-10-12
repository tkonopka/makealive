---
layout: example
title: venn02
description: produce a venn diagram (using input form)
author: Tomasz Konopka
dependencies: <a href='https://d3js.org/'>d3 (v4)</a>, <a href='https://github.com/punkave/sanitize-html'>sanitize-html</a>, <a href="venn01.html">venn01</a>
required: A, B
optional: size, margin, title, offset, names, opacity, color
---

<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="venn01.js"></script>

This conversion function produces a venn diagram of two sets. One of the sets
is preconfigured at setup. The other set is parsed from an input form.



## Example 1

Sets with small overlap.

<pre class="example"><code class="makealive venn02">{
  "A": ["a", "b", "c", "d", "e", "f", "g", "h"]  
}
</code></pre>


## Example 2

Larger diagram, different colors.

<pre class="example"><code class="makealive venn02">{
  "A": ["a", "b", "c", "d", "e", "f", "g", "h"],
  "size": [220, 150],
  "color": ["#0000bb", "#0099bb"]   
}
</code></pre>
