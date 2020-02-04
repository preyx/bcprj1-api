
  
  $.getJSON('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,&api_key=0190464490a4a78ca623e065b1766167f8810d127b191c98a032bb28a9aa1604', USD => {
    console.log(USD.USD)
  })
  
  



//with jquery
// $.get('http://api.open-notify.org/astros.json')
//   .then(({ people, number }) => {
//     $('#title').text(`There are ${number} people in space right now`)

//     people.forEach(({ name, craft }) => {
//       let personElem = $(`<li>${name} aboard the ${craft}</li>`)
//       $('#people').append(personElem)
//     })

//   })
//   .catch(e => console.error(e))

















