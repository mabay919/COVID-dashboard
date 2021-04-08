import { getTotalDeaths, getTotalRecovered } from './data';
import { countryArr } from './country-name-data';

export function deathBlock() {
  const wrapper = document.querySelector('.death_health_wrapper');
  const death = document.createElement('div');
  const deathInnerBlock = document.createElement('div');
  const header = document.createElement('h2');
  const sizeButton = document.createElement('div');
  death.append(sizeButton);
  sizeButton.classList.add('size_button', 'size_button_death', 'hidden');
  wrapper.append(death);
  death.append(header);
  death.append(deathInnerBlock);
  deathInnerBlock.classList.add('death_inner_block');
  death.classList.add('death_block');
  header.classList.add('death_health_header');
  header.innerHTML = `Global deaths: ${getTotalDeaths('Summary')}`;

  for (let i = 0; i < countryArr.length; i += 1) {
    const cell = document.createElement('p');
    deathInnerBlock.append(cell);
    cell.classList.add('d_h_block_cell', 'death_block_cell', `death_cell_${i}`);
    cell.innerHTML = `<span class="count_death">${getTotalDeaths(countryArr[i])} deaths</span><br>
        <span class="country_name">${countryArr[i]}</span>`;
  }
}

export function healsBlock() {
  const wrapper = document.querySelector('.death_health_wrapper');
  const health = document.createElement('div');
  const healthInnerBlock = document.createElement('div');
  const header = document.createElement('h2');
  const sizeButton = document.createElement('div');
  health.append(sizeButton);
  sizeButton.classList.add('size_button', 'size_button_health', 'hidden');
  wrapper.append(health);
  health.append(header);
  health.append(healthInnerBlock);
  healthInnerBlock.classList.add('health_inner_block');
  health.classList.add('health_block');
  header.classList.add('death_health_header');
  header.innerText = `Global Recovered: ${getTotalRecovered('Summary')}`;

  for (let i = 0; i < countryArr.length; i += 1) {
    const cell = document.createElement('p');
    healthInnerBlock.append(cell);
    cell.classList.add('d_h_block_cell', 'health_block_cell', `health_cell_${i}`);
    cell.innerHTML = `<span class="count_health">${getTotalRecovered(countryArr[i])} Recovered</span><br>
        <span class="country_name">${countryArr[i]}</span>`;
  }
}
