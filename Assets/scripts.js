let movie = {}
document.getElementById('searchMovie').addEventListener('click', event => {
  event.preventDefault()
  fetch(`http://www.omdbapi.com/?t=${document.getElementById('title').value}&apikey=trilogy`)
    .then(r => r.json())
    .then(({
      Title,
      Year,
      Director,
      Poster,
      Plot
    }) => {
      movie = {
        title: Title,
        year: Year,
        director: Director,
        plot: Plot
      }
      document.getElementById('movie').innerHTML = `
          <div class="card">
            <div class="card-image">
              <img src="${Poster}" alt="${Title}">
              <span class="card-title">${Title}</span>
            </div>
            <div class="card-content">
              <h4>Directed by ${Director}</h4>
              <h5>Year: ${Year}</h5>
              <p>${Plot}</p>
            </div>
            <div class="card-action">
              <button class="btn waves-effect waves-light addWatchlist">Add To Watchlist</button>
            </div>
          </div>
          `
      document.getElementById('title').value = ''
    })
    .catch(e => console.error(e))

  // Store to localStorage
  localStorage.setItem('movie', JSON.stringify(movie));
  let list = JSON.parse(localStorage.getItem(movie.title)) || []
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('addWatchlist')) {
    event.target.parentNode.parentNode.remove()
    let movieElem = document.createElement('div')
    movieElem.className = 'card'
    movieElem.innerHTML = `
        <div class="card-content">
          <h3>${movie.title}</h3>
          <h4>Directed by ${movie.director}</h4>
          <h5>Year: ${movie.year}</h5>
          <p>${movie.plot}</p>
        </div>
        <div class="card-action">
          <button class="btn waves-effect waves-light removeWatchlist">Remove from Watchlist</button>
        </div>
        `
    document.getElementById('watchlist').append(movieElem)
  } else if (event.target.classList.contains('removeWatchlist')) {
    event.target.parentNode.parentNode.remove()
  }
})