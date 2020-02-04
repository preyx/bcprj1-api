function stockInfo(stockSymbol, currentDate) {
  let stockData
  $.getJSON(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&interval=5min&apikey=MF50LI0Q6H9V0VWV`, function (data) {

    stockData = {
      open: data['Time Series (Daily)'][`${currentDate}`]['1. open'],
      high: data['Time Series (Daily)'][`${currentDate}`]['2. high'],
      low: data['Time Series (Daily)'][`${currentDate}`]['3. low'],
      close: data['Time Series (Daily)'][`${currentDate}`]['4. close']
    }
    console.log(stockData)

  })

    .catch(e => console.log(e))
}
  