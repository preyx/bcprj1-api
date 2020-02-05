
  let stockSymbol = $("#searchBox").val()
  let currentTime = moment()
  let currentDate = currentTime.format('YYYY-MM-DD')
  let stockData = {}
  // console.log(currentDate)
  // console.log(stockSymbol)

  const  stockapi = _ => {
    $.getJSON(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&interval=5min&apikey=MF50LI0Q6H9V0VWV`, data =>  {
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
          <p>Open:$ ${stockData.open}</p>
          <p>High:$ ${stockData.high}</p>
          <p>Low:$ ${stockData.low}</p>
          <p>Close:$ ${stockData.close}</p>
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
  }


const cryptoapi= _  => {
  $.getJSON('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP,TUSD,BCH&tsyms=USD&api_key=0190464490a4a78ca623e065b1766167f8810d127b191c98a032bb28a9aa1604', USD => {
    console.log(USD.USD)

    let convertOpen = USD / stockData.open
    let convertHigh = USD / stockData.high
    let convertLow = USD / stockData.low
    let convertClose = USD / stockData.close
    console.log('convert open' + convertOpen)
    console.log('convert close = ' + convertClose)
    console.log('convert high =' + convertHigh)
    console.log('converto low =' + convertLow)
    console.log('stockdata ='+ stockData)
    


    
  //   $('#BTC').text(USD.BTC)
  //   $('#ETH').text(USD.ETH)
  //   $('#XRP').text(USD.XRP)
  //   $('#TUSD').text(USD.TUSD)
  //   $('#BCH').text(USD.BCH)

  //   return 'all good'

    })
  }


  $("#makeApiCall").on('click', addapi => {
    stockapi()
    cryptoapi()
  })