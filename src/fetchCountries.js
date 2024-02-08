// Funkcja do pobierania danych o kraju
export async function fetchCountries(name) {
  const params = `fields=name.official,capital,population,flags.svg,languages`;
  const url = `https://restcountries.com/v3.1/name/${name}`; // Upewnij się, że API_URL jest zdefiniowane
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Country not found');
  }
}