# jquery.plusmore
A jQuery plugin for collapsing a list down into a "+ X more" format.

## Installation Via bower

	bower --save install jquery-plusmore

## Usage

Include `jquery.plusmore.js` on the page and call the plugin on your list:

	<html>
		<head>
			<link rel="stylesheet" type="text/css" href="jquery.resizeandcrop.css">
		</head>
		<body>
			<ul class="plusmore">
               <li class="plusmore-item">List Item 1</li>
               <li class="plusmore-item">List Item 2</li>
               <li class="plusmore-item">List Item 3</li>
               <li class="plusmore-item">List Item 4</li>
               <li class="plusmore-item">List Item 5</li>
               <li class="plusmore-item">List Item 6</li>
               <li class="plusmore-item">List Item 7</li>
            </ul>
			<script type="text/javascript" src="jquery.plusmore.js"></script>
			<script>
				$(".plusmore").plusmore();
			</script>
		</body>
	</html>

By default, the plugin will take the above DOM elements with the class `plusmore-item` and reduce them down to a list
of the first three items followed by a link saying "+ X more". Clicking the link will un-hide the other items.

## Options

You can set plugin options via a key-value object parameter:

	$('.plusmore').plusmore( { itemSelector: ".list-item", show: 5 } );

Or by directly overriding them:

    $.fn.plusmore.defaults.itemSelector = ".list-item";
    $.fn.plusmore.defaults.show = 5;

Available Options:

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Default Value</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>itemSelector</code></td>
			<td>string</td>
			<td><code>.plusmore-item</code></td>
			<td>jQuery selector that will find all the list elements to collapse</td>
		</tr>
		<tr>
			<td><code>hiddenClass</code></td>
			<td>string</td>
			<td><code>plusmore-hidden</code></td>
			<td>
			    CSS class applied to the items hidden in the list; this class should typically be set to
			    <code>display: none;</code> in your CSS.
			</td>
		</tr>
		<tr>
			<td><code>show</code></td>
			<td>integer</td>
			<td>3</td>
			<td>The number of items in the list to show before adding "+ X more"</td>
		</tr>
		<tr>
			<td><code>moreItemsClass</code></td>
			<td>string</td>
			<td><code>plusmore-more-items</code></td>
			<td>CSS class applied to the "+ X more" list item</td>
		</tr>
		<tr>
			<td><code>formatList</code></td>
			<td>callback</td>
			<td>Renders a "+ X more" link and sets up a click event that calls <code>showMore</code></td>
			<td>
			    Callback function that will handle collapsing the list to the visible set of items and render the
			    " + X more" item. You attach any events for interacting with the "+ X more" item here.
			</td>
		</tr>
		<tr>
			<td><code>showMore</code></td>
			<td>callback</td>
			<td>Shows the remainder of the list when the "+ X more" item is clicked</td>
			<td>Callback function to setup handling the interaction with the "+ X more" item</td>
		</tr>
	</tbody>
</table>

## License

Copyright (c) 2015 Traackr Licensed under the MIT license.