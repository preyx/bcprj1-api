

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

    console.log(stockData)

    // $("#cryptoSelector").on('change', function () {

    let cryptoData = {}
    cryptoName = $("#cryptoSelector").val()
    $.getJSON(`https://min-api.cryptocompare.com/data/price?fsym=${cryptoName}&tsyms=USD&api_key=0190464490a4a78ca623e065b1766167f8810d127b191c98a032bb28a9aa1604`)
      .then(({ cryptyName, USD }) => {
        console.log("cryptyName = " + cryptyName)
        console.log("dollarValue = " + USD)
        dollarValue = USD
        let coinType = dollarValue

        //TODO: MATH.ROUND SECTION
        let convertOpen = (stockData.open / coinType)
        let convertHigh = (stockData.high / coinType)
        let convertLow = (stockData.low / coinType)
        let convertClose = (stockData.close / coinType)


        $("#stockCard").html(`
        <div class="card card-back">
        <div class="card-content white-text">
        <span class="right right-align">
        <h5 class="no-margin">Amt in Bitcoin: </h5>
        <p>${convertOpen} in Bitcoin on Open Today</p>
        <p>${convertHigh} in Bitcoin on Daily High</p>
        <p>${convertLow} in Bitcoin on Daily Low</p>
        <p>${convertClose} in Bitcoin on Close Today</p>
        </span>
        <span class="card-title">${stockData.symbol}</span>
        <p>Open: $${stockData.open}</p>
        <p>High: $${stockData.high}</p>
        <p>Low: $${stockData.low}</p>
        <p>Close: $${stockData.close}</p>
        </div>
        <div class="card-action">
        <a href="#" class="right add-btn"><i class="material-icons">add_circle</i></a><br/>
        </div>
        </div>
        `)
      })
  })
    .catch(e => console.error(e))
})

// RETRIEVE DATA FROM LOCALSTORAGE
let ciData = JSON.parse(localStorage.getItem('crypit')) || []

// CIDATA STRUCTURE, EXAMPLE VALUES
ciData = {
  crypto: 'BTC',
  stocks: ['FB', 'AMZN', 'AAPL', 'NFLX', 'GOOG']
}

// GENERATE WATCHLIST
const updateWatch = _ => {
  document.getElementById('').innerHTML = ''
  ciData.stocks.forEach(element => {
    // WATCHLIST CARD CODE GOES HERE

    document.getElementById('watchlist').innerHTML = `
<div class="col s12 m5 l4">
  <h2>Watchlist:</h2>
  <div class="card side-back">
    <div class="card-content">
      <span class="right right-align mini-margin">
        <p>0.333333 ${ciData.crypto}</p>
      </span>
      <span class="card-title">${ciData.stocks}</span>
      <a href="#" class="right minus-btn"><i class="material-icons">remove_circle</i></a>
      <br />
    </div>
  </div>
</div>
`
    document.getElementById('watchlist').innerHTML += ''
  })
}

// RETURNS TRUE IF ALREADY IN WATCHLIST, FALSE IF NOT
// X = STOCK SYMBOL
const isWatched = x => {
  return ciData.stocks.includes(x)
}

// ADDS TO WATCHLIST
// X = STOCK SYMBOL
const addWatch = x => {
  if (!ciData.stocks.includes(x)) {
    ciData.stocks.unshift(x)
    updateWatch()
  }
}

// REMOVES FROM WATCHLIST
// X = STOCK SYMBOL
const delWatch = x => {
  const index = ciData.stocks.indexOf(x)
  if (index >= 0) {
    ciData.stocks.splice(index, 1)
    updateWatch()
  }
}

// STORE DATA TO LOCALSTORAGE
localStorage.setItem('crypit', JSON.stringify(ciData))
