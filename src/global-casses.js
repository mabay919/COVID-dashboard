import { getTotalConfirmed } from './data';

const carousel = document.createElement('div');
const indicators = document.createElement('ol');
const indicatorsEl = document.createElement('li');
const indicatorsElClone = indicatorsEl.cloneNode(true);
const inner = document.createElement('div');

const innerEl = document.createElement('div');
const innerElHeader = document.createElement('h2');
const innerElDescription = document.createElement('p');
const innerElClone = innerEl.cloneNode(true);
const innerElHeaderClone = innerElHeader.cloneNode(true);
const innerElDescriptionClone = innerElDescription.cloneNode(true);

const controlBtnPrev = document.createElement('a');
const controlBtnNext = controlBtnPrev.cloneNode(true);
const controlIcon = document.createElement('span');
const controlIconClone = controlIcon.cloneNode(true);
const srOnly = document.createElement('span');
const srOnlyClone = srOnly.cloneNode(true);

carousel.classList = 'carousel slide h-100';
carousel.dataset.interval = false;
carousel.dataset.ride = 'carousel_global_cases';
carousel.id = 'carousel_global_cases';
indicators.classList = 'carousel-indicators';
indicatorsEl.dataset.slideTo = '0';
indicatorsEl.classList = 'active';
indicatorsElClone.dataset.slideTo = '1';
inner.classList = 'carousel-inner h-100';
innerEl.classList = 'carousel-item text-center';
innerElClone.classList = 'carousel-item text-center';
innerEl.classList.add('active');
innerElHeader.classList = 'pb-2 pt-4 px-3';
innerElHeaderClone.classList = 'pb-2 pt-4 px-3';
innerElHeader.innerText = 'Global Cases for all people';
innerElDescription.innerText = getTotalConfirmed('Summary');
innerElHeaderClone.innerText = 'Global Cases for 100,000 people';
innerElDescriptionClone.innerText = Math.round(getTotalConfirmed('Summary') / 100000);
controlBtnPrev.classList = 'carousel-control-prev';
controlBtnPrev.href = '#carousel_global_cases';
controlBtnNext.href = '#carousel_global_cases';
indicatorsEl.dataset.target = '#carousel_global_cases';
indicatorsElClone.dataset.target = '#carousel_global_cases';

controlBtnPrev.setAttribute('role', 'button');
controlBtnPrev.dataset.slide = 'prev';
controlIcon.classList = 'carousel-control-prev-icon';
controlIcon.ariaHidden = true;
controlIconClone.ariaHidden = true;
srOnly.classList = 'sr-only';
srOnlyClone.classList = 'sr-only';
srOnly.innerText = 'Previous';
controlBtnNext.dataset.slide = 'next';
controlBtnNext.classList = 'carousel-control-next';
controlBtnNext.setAttribute('role', 'button');
srOnlyClone.innerText = 'Next';
controlIconClone.classList = 'carousel-control-next-icon';

innerEl.append(innerElHeader, innerElDescription);
innerElClone.append(innerElHeaderClone, innerElDescriptionClone);
controlBtnPrev.append(controlIcon, srOnly);
controlBtnNext.append(controlIconClone, srOnlyClone);
inner.append(innerEl, innerElClone);
indicators.append(indicatorsEl, indicatorsElClone);
carousel.append(indicators, inner, controlBtnPrev, controlBtnNext);

document.querySelector('.global_cases_wrapper').appendChild(carousel);

