// Import funkcji fetch oraz bibliotek
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './styles.css'

// Stałe
//const API_URL = 'https://restcountries.com/v3.1/name/';
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('#country-list');
const countryInfo = document.querySelector('#country-info');


// Funkcja do wyświetlania listy krajów
function showCountryList(countries) {
  countryList.textContent = ''; // Wyczyść istniejącą zawartość
  if (countries.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  countries.forEach(country => {
    const listItem = document.createElement('li');
    listItem.classList.add('country-list-item');
    const flag = document.createElement('img');
    flag.src = country.flags.svg;
    flag.alt = `${country.name.official} flag`;
    flag.classList.add('country-flag');
    const name = document.createElement('span');
    name.classList.add('country-name');
    name.textContent = country.name.official;
    listItem.appendChild(flag);
    listItem.appendChild(name);
    countryList.appendChild(listItem);
  });
}

// Funkcja do wyświetlania informacji o kraju
function showCountryInfo(country) {
  countryInfo.textContent = ''; // Wyczyść istniejącą zawartość
  const card = document.createElement('div');
  card.classList.add('country-info-card');

  // Dodanie flagi
  const flag = document.createElement('img');
  flag.src = country.flags.svg;
  flag.alt = `${country.name.official} flag`;
  flag.classList.add('country-flag');
  card.appendChild(flag);

  // Dodanie nazwy kraju
  const name = document.createElement('h1');
  name.classList.add(`<b>${'country-name'}</b>`);
  name.textContent = country.name.official;
  card.appendChild(name);

  // Dodanie sekcji z detalami
  const details = document.createElement('ul');
  details.classList.add('country-details');

  // Dodanie stolicy
  
  const capital = document.createElement('li');
  capital.innerHTML = `<p><b>Capital: </b>${country.capital}</p>`;
  details.appendChild(capital);
  

  // Dodanie populacji
  const population = document.createElement('li');
  population.innerHTML = `<span>Population: <span>${country.population}`;
  details.appendChild(population);

  // Dodanie języków
  const languages = document.createElement('li');
  languages.innerHTML = `<span>Languages: </span>${country.languages.map(lang => lang.name).join(', ')}`;
  details.appendChild(languages);


  // // Dodanie sekcji detali do karty
  // card.appendChild(details);

  // // Dodanie karty do kontenera
  // countryInfo.appendChild(card);

}


// Obsługa zdarzenia input
searchBox.addEventListener('input', debounce(async () => {
  const name = searchBox.value.trim();
  if (!name) {
    countryList.textContent = '';
    countryInfo.textContent = '';
    return;
  }
  try {
    const countries = await fetchCountries(name);
    if (countries.length === 10) {
      showCountryInfo(countries[0]);
      countryList.textContent = '';
    } else if (countries.length > 1) {
      showCountryList(countries);
      countryInfo.textContent = '';
    }
  } catch (error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
}, 300));

//console.log(countries.country.name.official);