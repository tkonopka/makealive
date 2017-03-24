---
layout: example
title: table01
permalink: /lib/table01/
description: Styled, sortable table
author: Tomasz Konopka
dependencies: <a href='https://github.com/punkave/sanitize-html'>sanitize-html</a>, 
    (bootstrap optional)
---



### Example 1

Minimal table. 

<pre class="example"><code class="makealive table01">{
  "header": ["Item", "Genre", "Condition"],
  "data": [{ 
             "Item": "bicycle", 
             "Genre": "sport", 
             "Condition": "good"
           },
           { 
             "Item": "couch", 
             "Genre": "furniture", 
             "Condition": "poor"
           },
           { 
             "Item": "chair", 
             "Genre": "furniture", 
             "Condition": "good"
           }]
}
</code></pre>

### Example 2

Table with background color styling through regular expressions. Note also handling
of missing ('Genre' for 'couch') and redundant ('Color' for 'couch') data elements.

<pre class="example"><code class="makealive table01">{
  "header": ["Item", "Genre", "Condition"],
  "data": [{ 
             "Item": "bicycle", 
             "Genre": "sport", 
             "Condition": "good"
           },
           { 
             "Item": "couch", 
             "Color": "black", 
             "Condition": "poor"
           },
           { 
             "Item": "chair", 
             "Genre": "furniture", 
             "Condition": "good"
           }],
  "patterns": [["furn", "#ffd0d0"], 
               ["poor", "#d0d0d0"]]
}
</code></pre>


### Example 3

Table with styling and sortable columns (click on the column headers) 

<pre class="example"><code class="makealive table01">{
  "header": ["Item", "Genre", "Condition", "Price"],
  "data": [{ 
             "Item": "bicycle", 
             "Genre": "sport", 
             "Condition": "good",
             "Price": 100
           },
           { 
             "Item": "couch", 
             "Owner": "furniture", 
             "Condition": "poor",
             "Price": 400
           },
           { 
             "Item": "chair", 
             "Genre": "furniture", 
             "Condition": "good",
             "Price": 40
           },
           { 
             "Item": "chair 2", 
             "Genre": "furniture", 
             "Condition": "good",
             "Price": 40.5
           },
           { 
             "Item": "pencil", 
             "Condition": "used",
             "Price": 0.5
           }],
  "patterns": [["poor", "#f0f0f0"],["furn", "#fff0f0"]],
  "sortable": ["Genre", "Condition", "Price"]
}
</code></pre>


