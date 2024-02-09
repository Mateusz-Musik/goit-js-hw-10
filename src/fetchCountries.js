const API_URL = `https://restcountries.com/v3.1/name/`;  // Upewnij się, że API jest zdefiniowane
const fields = `fields=name,capital,population,flags,languages`;

// Funkcja do pobierania danych o kraju
export async function fetchCountries(name) {
  const response = await fetch(`${API_URL}${name}?${fields}`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Country not found');
  }
}
