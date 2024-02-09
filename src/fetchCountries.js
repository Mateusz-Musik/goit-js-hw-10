// funkcja fetchCountries.js
// Upewnij się, że API jest zdefiniowane
const URL = 'https://restcountries.com/v3.1/name/';
const FIELDS = 'fields=name,capital,population,flags,languages';

export async function fetchCountries(name) {
  const response = await fetch(`${URL}${name}?${FIELDS}`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Country not found');
  }
}
