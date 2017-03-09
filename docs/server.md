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

Let\'s see how to use the library. 

Let\'s suppose our webpage receives some text from a website visitor (perhaps directly 
from a comment box, or perhaps from a database request). If this text is in `html`,
we are almost ready to apply `makealive`. But if this text is in markdown, 
we must first convert it into html and sanitize it, for example using 
[showdown](https://github.com/showdownjs/showdown) and 
[sanitize-html](https://github.com/punkave/sanitize-html). 

Let\'s say the input is in a variable `myhtml`. We can process convert it into 
a dynamic object by executing the `convert` function

```
var alivediv = makealive.convert(myhtml);
```

The new variable `alivediv` contains a new div. We can then add it into the 
appropriate location on the target web page. That's it!


### Dependencies

There are no dependencies - makealive.js is written in plain javascript.
However, makealive.js is intended to work together with other components. 
The `makealive.convert` function has been tested with html converted from markdown by the 
[showdown](https://github.com/showdownjs/showdown) converter.
The plugin functions can make use of third-party libraries to generate rich content. 
