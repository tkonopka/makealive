---
layout: doc
title: Setting up makealive on the server
---

The repository <a href="https://github.com/tkonopka/makealive">README</a> contains 
instructions on how to prepare a javascript file containing the core package
together with a set of conversion functions. This file should be loaded in the
head of the target web page.

```
<script src="makealive-lib.min.js"></script>
```


### Dependencies

There are no dependencies - makealive.js is written in plain javascript.
However, mdalive.js is intended to work together with other components. 
The `makeAlive` function has been tested with html converted from markdown by the 
[showdown](https://github.com/showdownjs/showdown) converter.
The plugin functions can make use of third-party libraries to generate rich content. 
