---
layout: doc
title: makealive
---

`makealive` brings static html documents to life through controlled use of javascript.

- [Background](#background)
- [Strategy](#strategy)
- [Example](#library)
- [Summary](#summary)
- [Acknowledgements](#thanks)


<a id="background"></a>

## Background

Websites built from user-generated content strive to provide simple and secure 
interfaces for data entry, but also seek to present rich and diverse content. 
These aims call for different approaches which have their pros and cons.


### Markup

Simplifying data entry suggests using a markup language such as markdown.

<table class="table intro">
<thead>
<tr><th width="50%">Pros</th>
    <th width="50%">Cons</th></tr>
</thead>
<tr><td>simple to read and write</td>
    <td>primarily text-based</td></tr>
<tr><td>can be converted into styled html</td>
    <td>static</td></tr>
<tr><td>converted html can be sanitized</td>
    <td></td></tr>
</table>


### Javascript

Providing rich content calls for some programming, i.e. using javacsript. 

<table class="table intro">
<thead>
<tr><th width="50%">Pros</th>
    <th width="50%">Cons</th></tr>
</thead>
<tr><td>can perform calculations based on user input</td>
    <td>user-generated code can be a security risk</td></tr>
<tr><td>can generate visual elements, e.g. through charts</td>
    <td>requires coding skills from the users</td></tr>
<tr><td>open-ended</td>
    <td>mixes code (<em>how</em> to present) with content (<em>what</em> to present)</td></tr>
</table>


<a id="strategy"></a>

## Strategy

`makealive` provides a \'bridge\' between markup and scripting. It provides 
a means for users to invoke pre-defined javascript functions. 
Thus, the framework offers the advantages of javascript without the hassle 
of coding from scratch.

The server-side setup involves loading the core package and a set 
of compatible conversion functions. 

On the client side, a user creates content using html or markdown syntax. Data
meant to be converted/processed into a richer component is placed in a
JSON object enclosed within `<pre><code>` tags or backticks. 
When the markup is converted to html, the data is transformed into a new object.


<a id="library"></a>

## Example

Let\'s suppose we have an interest in the number 1271. And let's suppose we have 
a conversion function `isprime` that checks if a given number is prime and 
displays an output message. We can write markdown as follows

<pre><code>```makealive isprime
{
  "number": 1271
}
```
</code></pre>

When the markdown is converted into html, the block is turned into the following 
new page element

<pre><code class="makealive isprime">{
  "number": 1271
}
</code></pre>

The conversion function thus transforms the JSON input into another representation. 
In this case, the new representation is a styled written message that reports on 
a computation.

The <a href="lib/index.html">library</a> page provides other conversion functions 
that are of practical use, including functions for common plots and charts.



<a id="summary"></a>

## Summary

`makealive` can be viewed as an extension of standard markdown. It provides
additional capabilities that enable users to generate interactive content
without explicitly writing executable code. 

<table class="table intro">
<thead>
<tr><th class="makealive-pro" width="50%">Pros</th>
    <th width="50%">Cons</th></tr>
</thead>
<tr><td class="makealive-pro">interactive content without coding</td>
    <td>content is constrained by the conversion functions (determined by site
admins)</td></tr>
<tr><td class="makealive-pro">suitable for message boards or comment boxes</td>
    <td>site admins must vet individual conversion functions</td></tr>
<tr><td class="makealive-pro">site admins can implement custom, domain-specific conversion functions</td>
    <td></td></tr>
<tr><td class="makealive-pro">extremely light (just 2KB!)</td>
    <td></td></tr>
</table>

To emphasize, in contrast to traditional \'plugins\' that provide web developers 
interesting features to add to a website core, `makealive` components can be
created by end-users.

Other documentation pages describe additional points regarding 
<a href="docs/server.html">setup</a> and <a href="docs/client.html">usage</a>.


<a id="thanks"></a>

## Acknowledgements

`makealive` has been inspired collectively by all technologies that make the web 
experience interactive through plugins and visualizations. Special mentions:

<table class="table intro">

<tr><td><a href="https://d3js.org">d3.js</a></td>
    <td><p>The d3 library provides great tools to manipulate web documents and 
        build visualizations. </p>
        <p>However, d3 is a tool for web developers and is not directly 
        accessible to end-users (e.g. on comment boards). One of the aims of 
        makealive is to provide a means for end-users to create d3 content, too. </p>
</td></tr>

<tr><td><a href="https://plot.ly/javascript/">plotly.js</a></td>
    <td><p>Plotly implements a diverse array of charts with a unified and well-documented 
        interface.</p>        
        <p>Like d3, plotly is a tool for web developers, not end-users. An application
        of makealive might be to provide a restricted set of plotly's features
        through sanitized content (e.g. through a wrapper for `Plotly.plot`.)</p>
</td></tr>

<tr><td><a href="https://jsfiddle.net/">jsfiddle.net</a></td>
    <td><p>Jsfiddle is a platform for testing code snippets, live. It is not in 
        direct relation to makealive, but it is an example of a technology that 
        enables users opportunities to create dynamic web components that work.</p>
    </td></tr>

</table>

Thanks to all, and to others.
