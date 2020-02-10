const ciData = JSON.parse(localStorage.getItem('crypit')) || { crypto: 'BTC', stocks: [] }
const ciList = ['BTC', 'ETH', 'XRP', 'TUSD', 'BCH', 'EOS', 'ETC', 'LTC', 'TRX', 'BSV', 'BNB', 'LINK']

$('#makeApiCall').click(_ => {
  if ($('#searchBox').val().trim() === '') {
    $('#searchBox').attr('placeholder', 'Please Enter Stock Name!')
    $('#searchBox').val('')
    $('#searchBox').addClass('red-input-fail')
    $('#searchBox').addClass('fail-input-color')
  } else {
    $('#searchBox').removeClass('red-input-fail')
    $('#searchBox').removeClass('fail-input-color')
    const stockSearch = $('#searchBox').val()
    $.getJSON(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockSearch}&apikey=MF50LI0Q6H9V0VWV`, ({ bestMatches }) => {
      const stockSymbol = bestMatches[0]['1. symbol']
      const stockName = bestMatches[0]['2. name']
      $.getJSON(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=MF50LI0Q6H9V0VWV`, data => {
        const currentDate = data['Meta Data']['3. Last Refreshed'].slice(0, 10)
        const stockData = {
          symbol: data['Meta Data']['2. Symbol'],
          open: data['Time Series (Daily)'][currentDate]['1. open'],
          high: data['Time Series (Daily)'][currentDate]['2. high'],
          low: data['Time Series (Daily)'][currentDate]['3. low'],
          close: data['Time Series (Daily)'][currentDate]['4. close']
        }
        const cryptoName = $('#cryptoSelector').val()
        $.getJSON(`https://min-api.cryptocompare.com/data/price?fsym=${cryptoName}&tsyms=USD&api_key=0190464490a4a78ca623e065b1766167f8810d127b191c98a032bb28a9aa1604`)
          .then(({ USD }) => {
            let decimals = 0
            let multiplier = 1
            let convertHigh = stockData.high / USD
            let convertLow = stockData.low / USD
            let convertClose = stockData.close / USD
            const currVal = parseFloat(stockData.close).toFixed(2)
            while (convertClose < 100000) {
              convertHigh *= 10
              convertLow *= 10
              convertClose *= 10
              decimals++
            }
            while (decimals > 0) {
              multiplier *= 10
              decimals--
            }
            multiplier = Math.round(multiplier)
            convertHigh = Math.round(convertHigh) / multiplier
            convertLow = Math.round(convertLow) / multiplier
            convertClose = Math.round(convertClose) / multiplier
            $('#stockCard').html(`
<div class="card card-back">
<div class="card-content white-text">
<span class="right right-align">
<h5 class="no-margin">${convertClose} ${cryptoName}</h5>
<p>High: ${convertHigh} ${cryptoName}</p>
<p>Low: ${convertLow} ${cryptoName}</p>
</span>
<span class="card-title">${stockSymbol}</span>
<p>${stockName}</p>
<p>Current Price: $${currVal}</p>
</div>
<div class="card-action">
<a href="#" id="${stockSymbol}" class="right add-btn"><i class="material-icons">add_circle</i></a><br/>
</div>
</div>
`)
          })
      })
    })
  }
})

$('#cryptoSelector').change(event => {
  ciData.crypto = event.target.value
  localStorage.setItem('crypit', JSON.stringify(ciData))
})

$('#searchBox').keyup(event => {
  if (event.keyCode === 13) {
    $('#makeApiCall').click()
  }
})

$(document).click(event => {
  event.preventDefault()
  const pNode = event.target.parentNode
  if (pNode.className.includes('add-btn')) {
    addWatch(pNode.id)
  } else if (pNode.className.includes('minus-btn')) {
    delWatch(pNode.id)
  } else if (event.target.className.includes('ci-watchlist')) {
    $('#searchBox').val(event.target.id)
    $('#makeApiCall').trigger('click')
  }
})

const updateWatch = _ => {
  $('#watchlist').html('')
  ciData.stocks.forEach(element => {
    $('#watchlist').append(`
<div class="card side-back">
<div class="card-content">
<a href="#" id=${element} class="right minus-btn"><i class="material-icons">remove_circle</i></a>
<h5 class="no-margin"><a href="#" class="ci-watchlist" id="${element}">${element}</a></h5>
</div>
</div>
`)
  })
}

const addWatch = x => {
  if (!ciData.stocks.includes(x)) {
    ciData.stocks.unshift(x)
    localStorage.setItem('crypit', JSON.stringify(ciData))
    updateWatch()
  }
}

const delWatch = x => {
  const index = ciData.stocks.indexOf(x)
  if (index >= 0) {
    ciData.stocks.splice(index, 1)
    localStorage.setItem('crypit', JSON.stringify(ciData))
    updateWatch()
  }
}

// INITIALIZE PAGE
for (let i = 0; i < ciList.length; i++) {
  $('#cryptoSelector').append(`<option id="${ciList[i]}" value="${ciList[i]}"${(ciList[i] === ciData.crypto) ? ' selected' : ''}>${ciList[i]}</option>`)
}
updateWatch()
