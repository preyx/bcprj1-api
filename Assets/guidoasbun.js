function stockInfo(stockSymbol, currentDate) {
  let stockData
  $.getJSON(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=ups&interval=5min&apikey=MF50LI0Q6H9V0VWV`, function (data) {

    stockData = {
      open: data['Time Series (Daily)']['2020-02-04']['1. open'],
      high: data['Time Series (Daily)']['2020-02-04']['2. high'],
      low: data['Time Series (Daily)']['2020-02-04']['3. low'],
      close: data['Time Series (Daily)']['2020-02-04']['4. close']
    }
    console.log(stockData)

  })

    .catch(e => console.log(e))
}
  