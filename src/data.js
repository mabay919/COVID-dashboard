import 'regenerator-runtime';
import { addDataToTheCountriesData } from './index-map';

window.onload = async function setData() {
  const url = 'https://api.covid19api.com/summary';
  const res = await fetch(url);
  const data = await res.json();
  localStorage.setItem('Summary', JSON.stringify(data.Global));
  const arr = data.Countries;

  arr.forEach((element) => localStorage.setItem(`${JSON.stringify(element.Country)
    .replace(/['"]+/g, '')}`, JSON.stringify(element)));
  addDataToTheCountriesData();
};

const getNewConfirmed = (string) => JSON.parse(localStorage.getItem(string)).NewConfirmed;

const getNewDeaths = (string) => JSON.parse(localStorage.getItem(string)).NewDeaths;

const getNewRecovered = (string) => JSON.parse(localStorage.getItem(string)).NewRecovered;

const getTotalConfirmed = (string) => JSON.parse(localStorage.getItem(string)).TotalConfirmed;

const getTotalDeaths = (string) => JSON.parse(localStorage.getItem(string)).TotalDeaths;

const getTotalRecovered = (string) => JSON.parse(localStorage.getItem(string)).TotalRecovered;

export {
  getNewConfirmed,
  getNewDeaths,
  getNewRecovered,
  getTotalConfirmed,
  getTotalDeaths,
  getTotalRecovered,
};
// {"ID":"bc72e57d-db6f-48e0-895e-8cc5542f30f6","Country":"Mexico","CountryCode":"MX","Slug":"mexico","NewConfirmed":5370,"TotalConfirmed":2261879,"NewDeaths":613,"TotalDeaths":205598,"NewRecovered":0,"TotalRecovered":1765244,"Date":"2021-04-08T10:19:48.986Z","Premium":{}}