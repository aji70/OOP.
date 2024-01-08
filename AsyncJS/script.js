'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
//https://countries-api-836d.onrender.com/countries/
//https://restcountries.com/v2/name/portugal
////////////////////////////////////////

const renderCountry = function(data, className = ''){
    const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p> 
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
    </article> `
    countriesContainer.insertAdjacentHTML('beforeend', html);

}

const renderError = function(msg){
    countriesContainer.insertAdjacentText('beforeend', msg);
}
// const getCountryDataAndNebo = function(country){
// const request = new XMLHttpRequest();

// //request.open('GET', 'https://countries-api-836d.onrender.com/countries')
// request.open('GET', `https://restcountries.com/v2/name/${country}`)
// request.send();


// request.addEventListener('load', function(){
//     const [data] = JSON.parse(this.responseText)
//     console.log(data);
//     renderCountry(data);

//     const [neighbour] = data.borders;

//     if (!neighbour) return;
    
//     const request1 = new XMLHttpRequest();

// request1.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`)
// request1.send();


// request1.addEventListener('load', function(){
//     const data1 = JSON.parse(this.responseText)
//     console.log(data1.borders);
//     renderCountry(data1, 'neighbour');

// })
// }
// ,)}
// // getCountryDataAndNebo('portugal')
// getCountryDataAndNebo('nigeria')
// // getCountryDataAndNebo('portugal')
// // getCountryDataAndNebo('comoros')

// const request = fetch(`https://restcountries.com/v2/name/portugal`)

// console.log(request)

// const getCountryData = function(country){
//     fetch(`https://restcountries.com/v2/name/${country}`).then(function(response){
//         console.log(response)
//         response.json().then(function(data){
//             console.log(data)
//             renderCountry(data[0])
//         })
//     })
// }
const request = fetch(`https://restcountries.com/v2/name/portugal`)

console.log(request)

const getCountryData = function(country){
    fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response =>{
        if(!response.ok)
        throw new Error (`Country not found (${response.status})Error`)
        return response.json()
    })
    .then(data => {
        renderCountry(data[0])
        const neighbour = data[0].borders?.[0];

        if(!neighbour) return;
        return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
        console.log(err)
        renderError(`something happened ${err}`)
    })
    .finally(()=> {
        countriesContainer.style.opacity = 1;
        })

}

btn.addEventListener('click', function(){
    getCountryData('nigerthhgia')

})