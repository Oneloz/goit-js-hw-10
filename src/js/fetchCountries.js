export function fetchCountries(name) {
  return fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`,)
      .then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}