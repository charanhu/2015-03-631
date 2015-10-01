# CSS Assignment: Customer Relations Mgt.

*This assignment is adapted from Connolly and Hoar's "Fundamentals of Web Development", Pearson, 2014.*

To complete this assignment, first download and decompress [CSS_assgn.zip][1].

## Part 1

Using HTML and some basic CSS, create a web page for an imaginary book publisher to help them maintain information about their customers.

1. Use `chapter03-project02.html` as a starting point.
1. You'll need to download the images folder.
1. Create an external style sheet, `reset.css`, that resets the tags (html, body, header, footer, hgroup, nav, article, section, figure, figcaption, h1, h2, h3, ul, li, body, div, p, img) so that their *margin*, *padding*, and *border* to 0, and the *font-size* to 100%, and the *vertical-align* to *baseline*. Link that style sheet to your page.
1. Create an external style sheet named `chapter03-project02.css` and link to it as well.
1. Add styles to `chapter03-project02.css` so that the html file yields a page that looks similar to that shown in the Figure below. Do not modify the markup within the <body> element. This means defining styles for the header, footer, section, and other tags.

Hint: Notice the backgrounds for each of the section headers. Use attribute selectors for the mail and telephone link icons as shown below:

```
a[href^="mailto"] {
  background: url( images/email.png) no-repeat 0 3px;
  padding-left: 1em;
}
a[href^="tel"] {
  background: url( images/call.png) no-repeat 0 3px;
  padding-left: 1em;
}
```

(By the way, the attribute selector href^="tel" matches any href attribute in an a element that starts with "tel".)

Your output should be similar to that shown in the figure below.

![image of page 1][2]

## Part 2

In this exercise you will use absolute positioning and floats to modify `chapter05-project02.css` so that `chapter05-project02.html` will yield a page that looks similar to the figure below.

Instructions:

1. Examine `chapter05-project02.html` in the browser. The HTML, itself, does not need to be modified for this project. (Instead, you'll be modifying the CSS file it links to.)
1. Create the three-column layout using absolute positioning and margin settings as we discussed in class.
1. Within the main column, the company and client addresses should be placed using floats rather than positioning.
1. Within the boxes for recent messages, weekly changes, and top sellers, you will need to use floats, block display, and padding values.

Testing: Be sure to test by increasing/decreasing the browser zoom level. If you have used *em* units for font sizes and most margin and padding values, it should scale with the different zoom levels.

![image of page 2][3]


## To Submit:

A zip file containing your html and css files.  So long as your html documents only refer to the images provided in the assignment, you won't need to provide them.  Your html files should reference only images in a folder/directory named "images".  If you want, you may also submit a document providing URLs to your pages on a server.  I'd still like you to submit the zip file as well, though.

[1]: src/CSS_assgn.zip
[2]: src/sample_01.jpg
[3]: src/sample_02.jpg
