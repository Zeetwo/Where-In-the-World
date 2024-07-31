const countriesContainer = document.querySelector('.countries')
const filterByRegion =document.querySelector('.select-menu')
const searchInput =document.querySelector('.search-container')
const themeChanger = document.querySelector('.theme-changer')

let allCountriesData


fetch('https://restcountries.com/v3.1/all')
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data)
    allCountriesData = data
  })


filterByRegion.addEventListener('change', (e) =>{
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries)
    allCountriesData = data
  })

function renderCountries(data) {
  countriesContainer.innerHTML = ''
  data.forEach((country) => {
    const countryCard = document.createElement('a')
    countryCard.classList.add('country-card')
    countryCard.href = `/Rest%20country%20apii/country.html?name=${country.name.common}`
    countryCard.innerHTML = `
        <img src="${country.flags.svg}" alt="${country.name.common}" />
        <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Capital: </b>${country.capital?.[0]}</p>
        </div>
      `
    countriesContainer.append(countryCard)
  })
}

searchInput.addEventListener('input',  (e) => {
  const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
  renderCountries(filteredCountries)
})

themeChanger.addEventListener('click', () => {
  document.body.classList.toggle('dark')
})