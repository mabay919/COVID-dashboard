import {countryArr} from "./country-name-data";
import {getTotalConfirmed, getNewConfirmed} from "./data";

let date = {
    'Mexico': {
        'Country': 'Mexico',
        'TotalConfirmed': 1488,
        'NewConfirmed': 322
    },
    'US': {
        'Country': 'US',
        'TotalConfirmed': 322,
        'NewConfirmed': 1
    }
}
let carousel = document.createElement('div');
let indicators = document.createElement('ol');

let indicators_el0 = document.createElement('li');
let indicators_el1 = indicators_el0.cloneNode(true);

let inner = document.createElement('div');

let inner_el0 = document.createElement('div');
let inner_el0_header = document.createElement('h3');
let inner_el1 = inner_el0.cloneNode(true);
let inner_el1_header = document.createElement('h3');

let control_btn_prev = document.createElement('a');
let control_btn_next = control_btn_prev.cloneNode(true);
let control_icon = document.createElement('span');
let control_icon_clone = control_icon.cloneNode(true);
let sr_only = document.createElement('span');
let sr_only_clone = sr_only.cloneNode(true);

carousel.classList = 'carousel slide h-100';
carousel.dataset.interval = false;
carousel.dataset.ride = carousel.id = 'carousel_by_cases';
indicators.classList = 'carousel-indicators';
indicators_el0.dataset.slideTo = '0';
indicators_el0.classList = 'active';
indicators_el1.dataset.slideTo = '1';
inner.classList = 'carousel-inner pb-4 pt-2';
inner_el0.classList = inner_el1.classList = 'carousel-item';
inner_el0.classList.add('active');
inner_el0_header.innerText = 'Total Confirmed';
inner_el1_header.innerText = 'New Confirmed';
inner_el0_header.classList = inner_el1_header.classList = 'text-center';
inner_el0.appendChild(inner_el0_header);
inner_el1.appendChild(inner_el1_header);
Object.keys(date).forEach(el => {

});

for (let i = 0; i < countryArr.length; i += 1) {
    if (!getTotalConfirmed(countryArr[i])) {
        console.log('wrong name');
    }
    let inner_el0_country = document.createElement('a');
    inner_el0_country.innerText = countryArr[i]  + ' ' + getTotalConfirmed(countryArr[i]);
    inner_el0_country.classList = 'd-block text-center country_link country_name px-2';
    inner_el0.appendChild(inner_el0_country);
    let inner_el1_country = document.createElement('a');
    inner_el1_country.innerText = countryArr[i] + ' ' + getNewConfirmed(countryArr[i]);
    inner_el1_country.classList = 'd-block text-center country_link country_name py-2';
    inner_el1.appendChild(inner_el1_country);
}
let button = document.querySelectorAll('.country_link');

for (var number = 0; number < button.length; number++) {
    button[number].onclick = func();
}

control_btn_prev.classList = 'carousel-control-prev';
control_btn_prev.href = control_btn_next.href = indicators_el0.dataset.target = indicators_el1.dataset.target = '#carousel_by_cases';
control_btn_prev.setAttribute('role', 'button');
control_btn_prev.dataset.slide = 'prev';
control_icon.classList = 'carousel-control-prev-icon';
control_icon.ariaHidden = control_icon_clone.ariaHidden = true;
sr_only.classList = sr_only_clone.classList = 'sr-only';
sr_only.innerText = 'Previous';
control_btn_next.dataset.slide = 'next';
control_btn_next.classList = 'carousel-control-next';
control_btn_next.setAttribute('role', 'button');
sr_only_clone.innerText = 'Next';
control_icon_clone.classList = 'carousel-control-next-icon';

control_btn_prev.append(control_icon, sr_only);
control_btn_next.append(control_icon_clone, sr_only_clone);
inner.append(inner_el0, inner_el1);
indicators.append(indicators_el0, indicators_el1);
carousel.append(indicators, inner, control_btn_prev, control_btn_next);

document.querySelector('.by_cases_wrapper').appendChild(carousel);

function func() {
    console.log(this.innerText);
}