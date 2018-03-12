Dynamically Updating Table Solution Overview
=================================================

Two new files has been added to es6 folder.
1. websocetHandler.js
2. currencyTableHandler.js

#### websocketHandler.js

	It handles everything related to websocket.
	It connects with the websocket and also subscribes for '/fx/prices' topic for getting the price updates.
	It also instantiates the 'CurrencyTableHandler'.
	On every price updates recieved, it calls three functions of 'CurrencyTableHandler' class.
		1. updateCurrencyList (which updates the list of currencies)
		2. render (which renders the currency table, using currencyList)
		3. insertSparkLines (which insert the sparklines to all the rows of the table)


#### currencyTableHandler.js

	It has a class called "CurrencyTableHandler", which has a prop called "currencyList" and various methods which are used to render the table and sparlines.
	All the methods are self explanatory and well commented.


A new folder has been added to the root of the directory called "test", which includes the test cases written for the task. I have added 'mocha' and 'chai' in devDependencies for the testing purpose.

I have written only 2 test cases, whihc does not have 100% coverage of the code.


===============================================================================
To run the application, just run the following commands :-
npm install
npm start

To run the test just run the following command :-
npm test 
