# tab-cycle.js
Module for handling tab and back-tab. Prevent entering the addressbar, tab from last to first element and backtab from first to last.
Try demo.html via a http server (for example https://github.com/indexzero/http-server), it does not work locally because of the ES6 module
It works in at least the newest versions of Chrome, a html dialog attribute is used, ES6 and the ES6 module.

Caveats:
- On every keydown event is checked whether the current element is the last (when tab is pressed) or the first
  (when back tab is pressed) focusable one. After that the element is filtered that should get focus. In this
  way changes to enabling or dynamically deleted / added elements during actions after load are accounted for.
- Radiogroups - <input> elements of type radio in a collection identified with a name - are treated as a whole. 
- HTML Dialog elemets are accounted for.
