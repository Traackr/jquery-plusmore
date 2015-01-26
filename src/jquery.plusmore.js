/**
 * jQuery Plugin - Plus More
 * Version: 2.0.0
 *
 * Contributor(s):
 *    Luis A. Cruz <lcruz+github@traackr.com>
 *    Paul Kist <pkist+github@traackr.com>
 *
 * License: Copyright (c) 2015 Traackr Licensed under the MIT license.
 *
 * By default, takes a list of DOM elements with the class "plusmore-item" and reduces it down to a list
 * of the first three items followed by a link saying "+ X more". Clicking the link will un-hide the other items.
 *
 * Example:
 *    <ul class="plusmore">
 *        <li class="plusmore-item">List Item 1</li>
 *        <li class="plusmore-item">List Item 2</li>
 *        <li class="plusmore-item">List Item 3</li>
 *        <li class="plusmore-item">List Item 4</li>
 *        <li class="plusmore-item">List Item 5</li>
 *        <li class="plusmore-item">List Item 6</li>
 *        <li class="plusmore-item">List Item 7</li>
 *    </ul>
 *    <div class="plusmore">
 *        <div class="plusmore-item">List Item 1</div>
 *        <div class="plusmore-item">List Item 2</div>
 *        <div class="plusmore-item">List Item 3</div>
 *        <div class="plusmore-item">List Item 4</div>
 *    </div>
 *    <script type="text/javascript">
 *    $(document).ready(function() {
 *       $(".plusmore").plusmore();
 *    });
 *    </script>
 *
 * Options:
 *    itemSelector:
 *       jQuery selector for the items that will have "Plus More" applied to them
 *       Defaults to ".plusmore-item"
 *
 *    hiddenClass:
 *       Class applied to the items hidden for the "Plus More" indication; this class should
 *       typically be set to "display: none;" in your CSS.
 *       Defaults to "plusmore-hidden"
 *
 *    show:
 *       How many items in the list to show before adding "+ X more"
 *       Defaults to 3
 *
 *    moreItemsClass:
 *       The class applied to the "+ X more" item
 *       Defaults to "plusmore-more-items"
 *
 *    formatList:
 *       Callback function that will handle collapsing the list to the visible set of items and render the " + X more" item.
 *       You attach any events for interacting with the "+ X more" item here.
 *       Defaults to rendering a "+ X more" link and sets up a click event that calls showMore
 *
 *    showMore:
 *       Callback function to setup handling the interaction with the "+ X more" item
 *       Defaults to showing the remainder of the list when the "+ X more" item is clicked
 *
 *  Events:
 *     plusmore.showMore:
 *        By triggering this event, the caller can programatically run the showMore function on the target element.
 *        Note: when triggering showMore, the function is executed within the context of the classname configured by 
 *        moreItemsClass
 *
 *     plusmore.formatList:
 *        By triggering this event, the caller can programatically  run the formatList function on the target element.
 */
(function( $ ) {

   $.fn.plusmore = function( options ) {
      var opts = $.extend( {}, $.fn.plusmore.defaults, options );

      return this.each(function() {
         var self = this,
             list = $(this).find(opts.itemSelector);

         if(opts.show < list.length) {
            var hiddenItems = list.slice(opts.show);
            _formatList(hiddenItems);
            /*
             * Event handlers
             */
            $(this).on('plusmore.showMore', function(ev, data) {
               var event = jQuery.Event;
               event.data = { hiddenItems : hiddenItems, hiddenClass : opts.hiddenClass };
               // Apply the showMore function to the context of the moreItemsClass element
               opts.showMore.apply($(self).find('.'+opts.moreItemsClass), [event]);
            });
            
            $(this).on('plusmore.formatList', function(ev,data) {
               _formatList(hiddenItems);
            });
         }
      });

      /*
       * Private functions
       */
      function _formatList(hiddenItems) {
         hiddenItems.addClass(opts.hiddenClass);
         if ($.isFunction(opts.formatList)) {
            opts.formatList(hiddenItems);
         }         
      }
   };

   $.fn.plusmore.defaults = {
      itemSelector: ".plusmore-item",

      hiddenClass: "plusmore-hidden",
      moreItemsClass: "plusmore-more-items",

      show: 3,

      formatList: function(hiddenItems) {
         var firstHiddenItem = hiddenItems.first();
         var moreItem = firstHiddenItem.clone();
         moreItem.removeClass(this.hiddenClass).addClass(this.moreItemsClass).html(" <a href=\"#\">+ " + hiddenItems.length + " more</a>");
         moreItem.click({hiddenItems: hiddenItems, hiddenClass: this.hiddenClass}, this.showMore);
         firstHiddenItem.before(moreItem);
      },

      showMore: function(event) {
         $(this).remove();
         event.data.hiddenItems.removeClass(event.data.hiddenClass);
         return false;
      }
   };

})( jQuery );