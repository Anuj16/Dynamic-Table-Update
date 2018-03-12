class CurrencyTableHandler {
	constructor(currencyList=[]) {
		/*	
			List of unique currency objects.
			
			Here is an example of what will a currency object look like :-
			{
				name: 'abc',
				bestBid: 123,
				bestAsk: 90,
				openBid: 60,
				openAsk: 75,
				lastChangeBid: 5,
				lastChangeAsk: -2,

				bestBidArr: [123, 120, 110],
				bestAskArr: [90, 92, 95],
				bestBidTimestampMapping: [{'bestBid': 123, timestampInSecs: 42424242}]
				bestAskTimestampMapping: [{'bestAsk': 90, timestampInSecs: 77546442}]
			}

			The first 7 properties are recieved from websocket for each currency.
			The last 4 properties are the additional properties which are required and populated based on the value's of other 7 properties.
		*/
        this.currencyList = currencyList;
    }

    updateCurrencyList(currency) {
    	/*
			For each incoming currency update on websocket this function checks:-
			1. Whether the currency already exists in the "currencyList". 
			If yes then it updates that currency object with the new values received and also with the additional properties required.
			2. If the currency does not exist in the "currencyList",
			then it simply appends that currency to the "currencyList" and also adds the additionl properties required.
		*/
		
		let currencyAlreadyExist = false;
		// Checking if the currency already exists inside the "currencyList"
		for(let i = 0; i < this.currencyList.length; i++) {
			
			if(this.currencyList[i].name === currency.name) {
				this.currencyList[i].bestBid = currency.bestBid;
				this.currencyList[i].bestAsk = currency.bestAsk;
				this.currencyList[i].openBid = currency.openBid;
				this.currencyList[i].openAsk = currency.openAsk;
				this.currencyList[i].lastChangeAsk = currency.lastChangeAsk;
				this.currencyList[i].lastChangeBid = currency.lastChangeBid;

				// Additional properties required
				this.currencyList[i].bestBidArr.push(currency.bestBid);
				this.currencyList[i].bestAskArr.push(currency.bestAsk);
				this.currencyList[i].bestBidTimestampMapping.push({'bestBid': currency.bestBid, 'timestampInSecs' : Date.now() / 1000});
				this.currencyList[i].bestAskTimestampMapping.push({'bestAsk': currency.bestAsk, 'timestampInSecs': Date.now() / 1000});
				
				currencyAlreadyExist = true;
				break;
			}
		}

		// If it's a new currency, append it to the "currencyList"
		if(!currencyAlreadyExist) {
			// Additional properties required
			currency.bestBidArr = [currency.bestBid];
			currency.bestAskArr = [currency.bestAsk];
			currency.bestBidTimestampMapping = [{'bestBid': currency.bestBid, 'timestampInSecs': Date.now() / 1000}];
			currency.bestAskTimestampMapping = [{'bestAsk': currency.bestAsk, 'timestampInSecs': Date.now() / 1000}];

			this.currencyList.push(currency);
		}
    }

    render() {
    	// sort the currency list based on lastChangeBid value
    	this.currencyList.sort(this.compareLastChangeBid);

    	let tableRows = '';
    	this.currencyList.forEach((curr) => {
    		let row = this.getCurrencyTableRow(curr);
    		tableRows += row;
    	});

    	document.getElementById('currencyTableBody').innerHTML = tableRows;
    }

    insertSparkLines() {
    	let tableRows = document.querySelectorAll('table tbody tr');
    	this.currencyList.forEach((curr, index) => {
    		const midPriceArr = this.getMidPriceArr(curr);
    		let sparklineCol = tableRows[index].childNodes[5];
    		Sparkline.draw(sparklineCol, midPriceArr);
    	});
    }

    getMidPriceArr(currency) {
    	let midPriceArr = [];

    	currency.bestBidTimestampMapping.forEach((obj, index) => {
    		// Remove all the best bid's which are older than 30 seconds
    		if(((Date.now() / 1000) - obj.timestampInSecs) > 30 ) {
    			currency.bestBidArr.splice((currency.bestBidArr.indexOf(obj.bestBid)), 1);
    			currency.bestBidTimestampMapping.splice(index, 1);
    		}
    	});

    	currency.bestAskTimestampMapping.forEach((obj, index) => {
    		// Remove all the best ask's which are older than 30 seconds
    		if(((Date.now() / 1000) - obj.timestampInSecs) > 30 ) {
    			currency.bestAskArr.splice((currency.bestAskArr.indexOf(obj.bestAsk)), 1);
    			currency.bestAskTimestampMapping.splice(index, 1);
    		}
    	});

    	// Calculate the mid price using the formula (bestBid + bestAsk) / 2 and push it to the midPriceArr
    	for(let i = 0; i < currency.bestBidArr.length; i++) {
    		const midPrice = (currency.bestBidArr[i] + currency.bestAskArr[i] ) / 2;
    		midPriceArr.push(midPrice);
    	}

    	return midPriceArr;
    }

    compareLastChangeBid(a, b) {
    	const lastChangeBidA = a.lastChangeBid;
    	const lastChangeBidB = b.lastChangeBid;

    	let comparison = 0;
    	if (lastChangeBidA > lastChangeBidB) {
    		comparison = 1;
    	} else if (lastChangeBidA < lastChangeBidB) {
    		comparison = -1;
    	}

      	return comparison;
    }

    getCurrencyTableRow(currency) {
    	let currencyPair = currency.name.substring(0, 3) + '/' + currency.name.substring(3, 6);
    	
    	let row = '<tr class="currency-table-row">';
    	// currency pair
    	row += '<td class="currency-table-col col-name">' + currencyPair.toUpperCase() + '</td>';
    	// currency best bid
    	row += '<td class="currency-table-col col-best-bid">' + currency.bestBid + '</td>';
    	// currency best ask
    	row += '<td class="currency-table-col col-best-ask">' + currency.bestAsk + '</td>';
    	// currency last changed bid price
    	row += '<td class="currency-table-col col-bid-last-change">' + currency.lastChangeBid + '</td>';
    	// currency last changed ask price
    	row += '<td class="currency-table-col col-ask-last-change">' + currency.lastChangeAsk + '</td>';
    	// currency mid price (represented through sparkline)
    	row += '<td class="currency-table-col col-sparkline"></td>';
    	row += '</tr>';

    	return row;
    }
}

module.exports = CurrencyTableHandler;