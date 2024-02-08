// Import funkcji fetch oraz bibliotek
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import notiflix from 'notiflix';

// Stałe
const API_URL = 'https://restcountries.com/v3.1/name/{name}';
const SEARCH_BOX = document.querySelector('#search-box');
const COUNTRY_LIST = document.querySelector('#country-list');
const COUNTRY_INFO = document.querySelector('#country-info');

// Funkcja do wyświetlania listy krajów
function showCountryList(countries) {
  COUNTRY_LIST.textContent = ''; // Wyczyść istniejącą zawartość
  if (countries.length > 10) {
    notiflix.notify.info('Too many matches found. Please enter a more specific name.');
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
    COUNTRY_LIST.appendChild(listItem);
  });
}

// Funkcja do wyświetlania informacji o kraju
function showCountryInfo(country) {
  COUNTRY_INFO.textContent = ''; // Wyczyść istniejącą zawartość
  const card = document.createElement('div');
  card.classList.add('country-info-card');

  // Dodanie flagi
  const flag = document.createElement('img');
  flag.src = country.flags.svg;
  flag.alt = `${country.name.official} flag`;
  flag.classList.add('country-flag');
  card.appendChild(flag);

  // Dodanie nazwy kraju
  const name = document.createElement('h2');
  name.classList.add('country-name');
  name.textContent = country.name.official;
  card.appendChild(name);

  // Dodanie sekcji z detalami
  const details = document.createElement('ul');
  details.classList.add('country-details');

  // Dodanie stolicy
  const capital = document.createElement('li');
  capital.textContent = `<span>Capital:</span> ${country.capital}`;
  details.appendChild(capital);

  // Dodanie populacji
  const population = document.createElement('li');
  population.textContent = `<span>Population:</span> ${country.population}`;
  details.appendChild(population);

  // Dodanie języków
  const languages = document.createElement('li');
  languages.textContent = `<span>Languages:</span> ${country.languages.join(', ')}`;
  details.appendChild(languages);

  // Dodanie sekcji detali do karty
  card.appendChild(details);

  // Dodanie karty do kontenera
  COUNTRY_INFO.appendChild(card);
}

// Obsługa zdarzenia input
SEARCH_BOX.addEventListener('input', debounce(async () => {
  const name = SEARCH_BOX.value.trim();
  if (!name) {
    COUNTRY_LIST.textContent = '';
    COUNTRY_INFO.textContent = '';
    return;
  }
  try {
    const countries = await fetchCountries(name);
    if (countries.length === 1) {
      showCountryInfo(countries[0]);
      COUNTRY_LIST.textContent = '';
    } else if (countries.length > 1) {
      showCountryList(countries);
      COUNTRY_INFO.textContent = '';
    }
  } catch (error) {
    notiflix.notify.failure(error.message);
  }
}, 300));

// Przykładowe użycie w innym miejscu pliku index.js:
// const countries = await fetchCountries('poland'); // Wywołanie funkcji
// console.log(countries);
