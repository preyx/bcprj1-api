

  function stockInfo(stockSymbol) {
    
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=UPS&interval=5min&apikey=MF50LI0Q6H9V0VWV')
          .then(r => r.json())
          .then(r =>
            console.log(r['Time Series (Daily)']['2020-02-04']['1. open']))
         .catch(e => console.log(e))
   }
  stockInfo(stockSymbol)

  