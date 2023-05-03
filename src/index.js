import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(onInputBox, DEBOUNCE_DELAY));

function onInputBox(event) {
  const Inputvalue = event.target.value.trim();
  if (Inputvalue) {
      fetchCountries(Inputvalue)
      .then(setMark)
      .catch(alertWrong);
  } else {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }
}

function setMark(countries) {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  if (countries.length > 10) {
    alertInfo();
  } else if (countries.length === 1) {
    countryInfo.insertAdjacentHTML('beforeend', createCountry(countries));
    countryList.insertAdjacentHTML('beforeend', createMark(countries));
  } else {
    countryList.insertAdjacentHTML('beforeend', createMark(countries));
  }
}

function createMark(arr) {
  return arr
    .map(
      ({ flags,name }) => `
          <li class="country-item">
              <img class="country-flag" src="${flags.svg}" alt="flag of ${name.official}" width = 25px >
              <h2 class="country-name">${name.official}</h2>
          </li>`
    )
    .join('');
}

function createCountry(arr) {
    return arr
        .map(
            ({ capital, population, languages }) => `
    <ul class="country-list__info">
     <li class="country-capital"><p><b>Capital: </b>${capital}</p></li>
     <li class="country-population"><p><b>Population: </b>${population}</p></li>
     <li class="country-languages"><p><b>Languages: </b>${Object.values(languages).join(', ')}</p></li>
    </ul>`
    )
    .join('');
}

function alertInfo() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
function alertWrong() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
};
