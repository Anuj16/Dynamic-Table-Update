import CurrencyTableHandler from './currencyTableHandler';

const url = "ws://localhost:8011/stomp";
const client = Stomp.client(url);

client.debug = (msg) => {
	if (global.DEBUG) {
		console.info(msg)
	}
}

const CurrencyTable = new CurrencyTableHandler([]);

const priceUpdateCallback = (message) => {
	// Called when the client receives a price update message from the server
	if (message.body) {
		const currency = JSON.parse(message.body);
		// For maintaining the currency list
		CurrencyTable.updateCurrencyList(currency);
		// For rendering the currency table with all the recieved currency pairs.
		CurrencyTable.render();
		// For adding the mid price (over last 30 secs) represented through sparklines.
		CurrencyTable.insertSparkLines();
	} else {
		console.log("got empty message");
	}
};

const connectCallback = () => {
	// Subscribing the 'fx/prices' topic to get the currency price updates
	client.subscribe('/fx/prices', priceUpdateCallback, {});
};

client.connect({}, connectCallback, (error) => {
	alert(error.headers.message)
});