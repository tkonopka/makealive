---
layout: example
title: venn01
description: Venn diagram
author: Tomasz Konopka
dependencies: <a href='https://d3js.org/'>d3 (v4)</a>, <a href='https://github.com/punkave/sanitize-html'>sanitize-html</a>
---

<script src="https://d3js.org/d3.v4.min.js"></script>



### Example 1

Sets with small overlap.

<pre class="example"><code class="makealive venn01">{
  "A": ["a", "b", "c", "d"],
  "B": ["a", "b", "x", "y", "z"]  
}
</code></pre>


### Example 2

Sets with large overlap.

<pre class="example"><code class="makealive venn01">{
  "A": ["a", "b", "c", "d", "e", "f"],
  "B": ["a", "b", "c", "d", "z"],
  "names": ["(a..f)", "(a..d,z)" ]  
}
</code></pre>


### Example 3

Sets with no overlap.

<pre class="example"><code class="makealive venn01">{
  "A": ["a", "b", "c", "d", "e"],
  "B": ["w","x", "y", "z"],
  "title": "Nonstandard title"  
}
</code></pre>


### Example 4

Sets with complete overlap.

<pre class="example"><code class="makealive venn01">{
  "A": ["a", "b", "c"],
  "B": ["a", "b", "c"],
  "title": "They overlap"  
}
</code></pre>


### Example 5

One empty set (a space in the title makes it invisible).

<pre class="example"><code class="makealive venn01">{
  "A": ["a", "b", "c"],
  "B": [], 
  "title": " "  
}
</code></pre>
