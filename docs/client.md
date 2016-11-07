---
layout: doc
title: makealive in the browser
---

Let\'s say that we visit a website that supports `makealive` and encounter a textarea
for data entry. This could be a wiki box or a comment box that supports markdown. 
To generate a dynamic component, we write a markdown code-block decorated
with the keyword `makealive` together with a conversion function name. The example
on the main documentation page is as follows

<pre><code>```makealive isprime 
{
  "number": 1271
}
```
</code></pre>

which is converted into

<pre><code class="makealive isprime">
{
  "number": 1271
}
</code></pre>

However, this may not always work. In those situations, it may be necessary
to write the input in an alternative format 

<pre><code>&lt;pre&gt;&lt;code class="makealive isprime"&gt;
{
  "number": 1271
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

Thus, instead of the shorthand syntax with three backticks, it may be necessary 
to write `pre` and `code` tags. Note how the `code` tags should include classes with
the makealive keyword and the name of the conversion function.

The need for the alternative format comes about because the `makealive` conversion
from markdown to dynamic content is actually carried out in two steps. First, the 
text input is turned into html using a markdown-to-html converter. Second, the static
html is further processed using the `makealive` function, which assumes a certain 
formating for the intermediate html. The conversion has been tested with the 
[showdown](https://github.com/showdownjs/showdown) converter with standard options, 
but other markdown-to-html converters may vary. In those cases, it is necessary to
bypass the markdown-to-code block conversion and write out the `pre` and `code` 
tags by hand.



