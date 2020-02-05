

// let stockSymbol = 'ups'
// currentDate = '2020-02-04'
// function stockInfo(stockSymbol, currentDate) {
$("#makeApiCall").on('click', function () {
  let stockSymbol = $("#searchBox").val()
  let currentTime = moment()
  let currentDate = currentTime.format('YYYY-MM-DD')
  console.log(currentDate)
  console.log(stockSymbol)

  let stockData = {}
  $.getJSON(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&interval=5min&apikey=MF50LI0Q6H9V0VWV`, function (data) {
    stockData = {
      symbol: data['Meta Data']['2. Symbol'],
      open: data['Time Series (Daily)'][currentDate]['1. open'],
      high: data['Time Series (Daily)'][currentDate]['2. high'],
      low: data['Time Series (Daily)'][currentDate]['3. low'],
      close: data['Time Series (Daily)'][currentDate]['4. close']
    }
    $("#stockCard").html(`
      <div class="card card-back">
        <div class="card-content white-text">
          <span class="right right-align">
            <h5 class="no-margin">Amt in Bitcoin: </h5>
            <p>${stockData.open} to Bitcoin: </p>
            <p>${stockData.high} to Bitcoin: </p>
            <p>${stockData.low} to Bitcoin: </p>
            <p>${stockData.close} to Bitcoin: </p>
          </span>
          <span class="card-title">${stockData.symbol}</span>
          <p>Open: $${stockData.open}</p>
          <p>High: $${stockData.high}</p>
          <p>Low: $${stockData.low}</p>
          <p>Close: $${stockData.close}</p>
        </div>
        <div class="card-action">
          <a href="#" class="right add-btn"><i class="material-icons">add_circle</i></a>
          <br/>
        </div>
      </div>
    `)
    console.log(stockData)
  })
    .catch(e => console.log(e))
  $("#searchBox").val('')
  // }
  // stockInfo(stockSymbol, currentDate)
})