

// let stockSymbol = 'ups'
// currentDate = '2020-02-04'
// function stockInfo(stockSymbol, currentDate) {
// $("#makeApiCall").on('click', function () {
//   let stockSymbol = $("#searchBox").val()
//   let currentTime = moment()
//   let currentDate = currentTime.format('YYYY-MM-DD')
//   console.log(currentDate)
//   console.log(stockSymbol)

//   let stockData = {}
//   $.getJSON(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&interval=5min&apikey=MF50LI0Q6H9V0VWV`, function (data) {
//     stockData = {
//       open: data['Time Series (Daily)'][currentDate]['1. open'],
//       high: data['Time Series (Daily)'][currentDate]['2. high'],
//       low: data['Time Series (Daily)'][currentDate]['3. low'],
//       close: data['Time Series (Daily)'][currentDate]['4. close']
//     }




//     console.log(stockData)
//   })
//     .catch(e => console.log(e))
  // }
  // stockInfo(stockSymbol, currentDate)
// })