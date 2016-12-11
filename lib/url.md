---
layout: example
title: url
description: a makealive components defined by a remote url resource
author: Tomasz Konopka
dependencies: none 
---

<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="barplot01.js"></script>
<script src="barplot02.js"></script>


This conversion function enables loading makealive data from URLs. This enables 
at least to interesting use cases:

 - reuse data and settings in multiple makealive components
 - keep makealive snippets concise by avoiding bulky data entry

**Note:** While this conversion function does not carry direct dependencies, it
does have indirect dependencies. When the data is loaded from the URL, that data
determines what makealive converter function to use. That conversion function 
and it's dependencies are indirect dependencies.


### Example 1

It is possible to defer all settings and data to the remote resource.

**Note:** for this to work, the remote resource must specify the makealive
conversion function through attribute "makealive".

<pre class="example"><code class="makealive url">{
  "url": "https://gist.githubusercontent.com/tkonopka/b2ce73f6101edeebc88ebcff85aed63c/raw/be9a26c3e24ed7ab73c8426618c1f4ec823a233b/makealive.url.ex1.json"  
}
</code></pre>


### Example 2

Another example wherein all settings and data are specified by the remote resource.

<pre class="example"><code class="makealive url">{
  "url": "https://gist.githubusercontent.com/tkonopka/b2ce73f6101edeebc88ebcff85aed63c/raw/be9a26c3e24ed7ab73c8426618c1f4ec823a233b/makealive.url.ex2.json"
}
</code></pre>



### Example 3

It is possible to over-ride some of the data or settings specified in the remote 
resource.

Compared to example 1 above, note the switch of conversion function from vertical 
to horizontal barplot. In order for the labels and sizing to make sense, note also
adjustments in size, margins, and labels.

<pre class="example"><code class="makealive url">{
  "url": "https://gist.githubusercontent.com/tkonopka/b2ce73f6101edeebc88ebcff85aed63c/raw/be9a26c3e24ed7ab73c8426618c1f4ec823a233b/makealive.url.ex1.json",
  "makealive": "barplot02",
  "size": [400, 240],
  "margin": [60, 10, 40,60],
  "xlab": "Some values (au)",
  "ylab": "",
  "offset": ["-2.7em", "-1.5em", "-2em"]  
}
</code></pre>
