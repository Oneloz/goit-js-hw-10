export function fetchCountries(name) {
    const url = 'https://restcountries.com/v3.1/name/';
    const searchCountries = '?fields=flag,capital,name,population,languages';
    return fetch(`${BASE_URL}${name}?${searchCountries}`)
        .then( response => {
            if (!response.ok) {
                throw new Error(data.status);
            }
            return response.json();
        });
}