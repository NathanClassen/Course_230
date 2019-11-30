// Use an element selector to find all h1 elements.

$("h1");

// Use an ID selector to find the first h1 element.

$("#site_title");

// Use a descendant selector to find all the list items in the article element.

$("article li");

// Find the third list item from the article element.

$("article li").eq(2);

// Find the table element, then find all the odd-numbered table rows in that element.

$("tr:odd");

// Find the list item that contains the text ac ante, then locate the parent li element.

$("li li:contains('ac ante')").parent();

// Find the list item that contains the text ac ante, then find and return the next element.

$("li li:contains('ac ante')").next();

// Find all the table cells in the table, then find the last cell from the collection.

$("td").last();

// Find all the table cells that do not have a class of "protected".

$("td:not('td.protected')");

// Find all the anchor elements that have an href value that begins with #.

$("a[href|='#']");

// Find all elements that have a class name that contains "block".

$("*[class*='block']");