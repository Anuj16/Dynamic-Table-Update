let chai = require('chai'),
	path = require('path');

chai.should();

let CurrencyTableHandler = require(path.join(__dirname, '../es6/', 'CurrencyTableHandler'));

describe('CurrencyTableHandler', () => {

	describe('CurrencyTable', () => {
    	let CurrencyTable;

    	beforeEach(() => {
	    	// Create a new currencyTableHandler object before every test.
	      	CurrencyTable = new CurrencyTableHandler();
	    });

	    it('Appends a new currency to the currencyList', () => {
	    	const currency = {
				"name": "usdjpy",
				"bestBid": 106,
				"bestAsk": 107,
				"openBid": 107,
				"openAsk": 109,
				"lastChangeAsk": -4,
				"lastChangeBid": -2
			}
	    	CurrencyTable.updateCurrencyList(currency);
	    	CurrencyTable.currencyList[0].name.should.equal("usdjpy");
	    	CurrencyTable.currencyList[0].bestBid.should.equal(106);
	    	CurrencyTable.currencyList[0].bestAsk.should.equal(107);
	    	CurrencyTable.currencyList[0].openBid.should.equal(107);
	    	CurrencyTable.currencyList[0].openAsk.should.equal(109);
	    	CurrencyTable.currencyList[0].lastChangeAsk.should.equal(-4);
	    	CurrencyTable.currencyList[0].lastChangeBid.should.equal(-2);
	    });

	    it('Updates the existing currency in the currencyList', () => {

	    	const currencyList = [{
				"name": "usdjpy",
				"bestBid": 106,
				"bestAsk": 107,
				"openBid": 107,
				"openAsk": 109,
				"lastChangeAsk": -4,
				"lastChangeBid": -2,
				"bestBidArr": [],
				"bestAskArr": [],
				"bestBidTimestampMapping": [],
				"bestAskTimestampMapping": []
			}]
			CurrencyTable = new CurrencyTableHandler(currencyList);

			const currency = {
				"name": "usdjpy",
				"bestBid": 111,
				"bestAsk": 107.5,
				"openBid": 110,
				"openAsk": 109,
				"lastChangeAsk": 0.5,
				"lastChangeBid": 5
			}
	    	CurrencyTable.updateCurrencyList(currency);
	    	CurrencyTable.currencyList[0].name.should.equal("usdjpy");
	    	CurrencyTable.currencyList[0].bestBid.should.equal(111);
	    	CurrencyTable.currencyList[0].bestAsk.should.equal(107.5);
	    	CurrencyTable.currencyList[0].openBid.should.equal(110);
	    	CurrencyTable.currencyList[0].openAsk.should.equal(109);
	    	CurrencyTable.currencyList[0].lastChangeAsk.should.equal(0.5);
	    	CurrencyTable.currencyList[0].lastChangeBid.should.equal(5);
	    });
	});
});