$(document).ready(_ => {
  $('select').formSelect()
})

$("#makeApiCall").on('click', function () {
  let stockSymbol = $("#searchBox").val()
  let currentTime = moment()
  let currentDate = currentTime.format('YYYY-MM-DD')
  console.log(currentDate)
  console.log(stockSymbol)

  let stockData = {}
  $.getJSON(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&interval=5min&apikey=MF50LI0Q6H9V0VWV`, function (data) {
    stockData = {
      open: data['Time Series (Daily)'][currentDate]['1. open'],
      high: data['Time Series (Daily)'][currentDate]['2. high'],
      low: data['Time Series (Daily)'][currentDate]['3. low'],
      close: data['Time Series (Daily)'][currentDate]['4. close']
    }

    






    console.log(stockData)
  })
    .catch(e => console.log(e))
  // }
  // stockInfo(stockSymbol, currentDate)
})



// let movie = {}
// document.getElementById('searchMovie').addEventListener('click', event => {
//   event.preventDefault()
//   fetch(`http://www.omdbapi.com/?t=${document.getElementById('title').value}&apikey=trilogy`)
//     .then(r => r.json())
//     .then(({
//       Title,
//       Year,
//       Director,
//       Poster,
//       Plot
//     }) => {
//       movie = {
//         title: Title,
//         year: Year,
//         director: Director,
//         plot: Plot
//       }
//       document.getElementById('movie').innerHTML = `
//           <div class="card">
//             <div class="card-image">
//               <img src="${Poster}" alt="${Title}">
//               <span class="card-title">${Title}</span>
//             </div>
//             <div class="card-content">
//               <h4>Directed by ${Director}</h4>
//               <h5>Year: ${Year}</h5>
//               <p>${Plot}</p>
//             </div>
//             <div class="card-action">
//               <button class="btn waves-effect waves-light addWatchlist">Add To Watchlist</button>
//             </div>
//           </div>
//           `
//       document.getElementById('title').value = ''
//     })
//     .catch(e => console.error(e))

//   // Store to localStorage
//   localStorage.setItem('movie', JSON.stringify(movie))
//   const list = JSON.parse(localStorage.getItem(movie.title)) || []
// })

// document.addEventListener('click', event => {
//   if (event.target.classList.contains('addWatchlist')) {
//     event.target.parentNode.parentNode.remove()
//     const movieElem = document.createElement('div')
//     movieElem.className = 'card'
//     movieElem.innerHTML = `
//         <div class="card-content">
//           <h3>${movie.title}</h3>
//           <h4>Directed by ${movie.director}</h4>
//           <h5>Year: ${movie.year}</h5>
//           <p>${movie.plot}</p>
//         </div>
//         <div class="card-action">
//           <button class="btn waves-effect waves-light removeWatchlist">Remove from Watchlist</button>
//         </div>
//         `
//     document.getElementById('watchlist').append(movieElem)
//   } else if (event.target.classList.contains('removeWatchlist')) {
//     event.target.parentNode.parentNode.remove()
//   }
// })
