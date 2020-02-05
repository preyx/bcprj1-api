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
