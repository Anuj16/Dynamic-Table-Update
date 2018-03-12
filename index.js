/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
// Apply the styles in style.css to the page.
require('./site/style.css')

// Websocket handler handles all the things related to websocket and instantiation for currencyTableHandler
require('./es6/websocketHandler')

// currencyTableHandler handles everything related to table. (updating currency list, rendering the table, adding the sparklines etc)
require('./es6/currencyTableHandler')

// Change this to get detailed logging from the stomp library
global.DEBUG = false