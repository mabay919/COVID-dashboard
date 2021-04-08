const mounthObj = {
  0: 'Jan.',
  1: 'Feb.',
  2: 'Mar.',
  3: 'Apr.',
  4: 'May',
  5: 'Jun.',
  6: 'Jul.',
  7: 'Aug.',
  8: 'Sep.',
  9: 'Oct.',
  10: 'Nov.',
  11: 'Dec.',
};
let dateArr = [];
let countsDeathCountryArr = [];
let countsHealthCountryArr = [];
let countsAllCasesCountryArr = [];
let needArr = [];
let arr = [];
let allArr = [];
const allCasesArr = [];
const allDeathArr = [];
const allHealsArr = [];
let loaded = false;

async function setData(value) {
  const url = `https://api.covid19api.com/total/dayone/country/${value}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data;
}

async function setAllCasesData(date) {
  const allCasesUrl = `https://api.covid19api.com/world?from=2020-03-01T00:00:00Z&to=${date}`;
  const res = await fetch(allCasesUrl);
  const data = await res.json();
  return data;
}

export default function getCountry() {
  const deathCells = document.querySelectorAll('.death_block_cell');
  const healthCells = document.querySelectorAll('.health_block_cell');

  deathCells.forEach((cell) => cell.addEventListener('click', () => {
    setTimeout(() => {
      dataDeathGenerator(cell.children[2].innerText);
      chartUpdater(chart, countsDeathCountryArr, `Deaths in ${cell.children[2].innerText}`, dateArr);
    }, 0);
  }));

  healthCells.forEach((cell) =>
    cell.addEventListener('click', () => {
      dataHealthGenerator(cell.children[2].innerText);
      chartUpdater(chart, needArr, `Recovered in ${cell.children[2].innerText}`, dateArr);
    }));
}

function chartButtons() {
  const buttonAllCases = document.querySelector('.button_all_cases');
  const buttonAllDeath = document.querySelector('.button_all_death');
  const buttonAllHealth = document.querySelector('.button_all_health');
  buttonAllCases.addEventListener('click', () => {
    dateArr = [];
    countsAllCasesCountryArr = [];
    dataAllCasesGenerator();
    chartUpdater(chart, allCasesArr, 'Total Confirmed', dateArr);
  });
  buttonAllDeath.addEventListener('click', () => {
    dataDeathGenerator();
    chartUpdater(chart, allDeathArr, 'All mortality', dateArr);
  });
  buttonAllHealth.addEventListener('click', () => {
    dataHealthGenerator();
    chartUpdater(chart, allHealsArr, 'All recovered', dateArr);
  });
}
chartButtons();

function dataAllCasesGenerator(country) {
  if (country) {
    setData(country).then((data) => {
      arr = [...data];
      loaded = true;
    });

    setTimeout(() => {
      if (loaded) {
        for (let i = 0; i < arr.length; i += 1) {
          const arrDate = new Date(arr[i].Date);
          const day = arrDate.getDate();
          const month = arrDate.getMonth();
          const year = arrDate.getFullYear();
          const allDate = `${day} ${mounthObj[month]} ${year}`;
          countsAllCasesCountryArr.push(arr[i].Confirmed);
          dateArr.push(allDate);
        }
      }
    }, 1000);
  } else {
    setData('Ukraine').then((data) => {
      arr = [...data];
      loaded = true;
    });

    setTimeout(() => {
      if (loaded) {
        for (let i = 0; i < allArr.length; i += 1) {
          const arrDate = new Date(arr[i].Date);
          const day = arrDate.getDate();
          const month = arrDate.getMonth();
          const year = arrDate.getFullYear();
          const allDate = `${day} ${mounthObj[month]} ${year}`;
          dateArr.push(allDate);
        }
      }
    }, 1000);
    const date = new Date();
    const strDate = date.toISOString();
    const cutDate = `${strDate.slice(0, 11)}00:00:00Z`;
    setAllCasesData(cutDate).then((data) => {
      allArr = [...data];
      loaded = true;
    });
    setTimeout(() => {
      if (loaded) {
        for (let i = 0; i < allArr.length; i += 1) {
          allCasesArr.push(allArr[i].NewConfirmed);
        }
      }
    }, 1000);
  }

  needArr = countsAllCasesCountryArr;
}
dataAllCasesGenerator();
setTimeout(() => {
  chartUpdater(chart, allCasesArr, 'Total Confirmed', dateArr);
}, 1000);

function dataHealthGenerator(country) {
  dateArr = [];
  countsHealthCountryArr = [];
  if (country) {
    setData(country).then((data) => {
      arr = [...data];
      loaded = true;
    });

    setTimeout(() => {
      if (loaded) {
        for (let i = 0; i < arr.length; i += 1) {
          const arrDate = new Date(arr[i].Date);
          const day = arrDate.getDate();
          const month = arrDate.getMonth();
          const year = arrDate.getFullYear();
          const allDate = `${day} ${mounthObj[month]} ${year}`;
          countsHealthCountryArr.push(arr[i].Recovered);
          dateArr.push(allDate);
        }
      }
    }, 1000);
  } else {
    setData('Ukraine').then((data) => {
      arr = [...data];
      loaded = true;
    });

    setTimeout(() => {
      if (loaded) {
        for (let i = 0; i < allArr.length; i += 1) {
          const arrDate = new Date(arr[i].Date);
          const day = arrDate.getDate();
          const month = arrDate.getMonth();
          const year = arrDate.getFullYear();
          const allDate = `${day} ${mounthObj[month]} ${year}`;
          dateArr.push(allDate);
        }
      }
    }, 1000);
    const date = new Date();
    const strDate = date.toISOString();
    const cutDate = `${strDate.slice(0, 11)}00:00:00Z`;
    setAllCasesData(cutDate).then((data) => {
      allArr = [...data];
      loaded = true;
    });
    setTimeout(() => {
      if (loaded) {
        for (let i = 0; i < allArr.length; i += 1) {
          allHealsArr.push(allArr[i].NewRecovered);
        }
      }
    }, 1000);
  }
  needArr = countsHealthCountryArr;
}

function dataDeathGenerator(country) {
  dateArr = [];
  countsDeathCountryArr = [];
  if (country) {
    setData(country).then((data) => {
      arr = [...data];
      loaded = true;
    });

    setTimeout(() => {
      if (loaded) {
        for (let i = 0; i < arr.length; i += 1) {
          const arrDate = new Date(arr[i].Date);
          const day = arrDate.getDate();
          const month = arrDate.getMonth();
          const year = arrDate.getFullYear();
          const allDate = `${day} ${mounthObj[month]} ${year}`;
          countsDeathCountryArr.push(arr[i].Deaths);
          dateArr.push(allDate);
        }
      }
    }, 1000);
  } else {
    setData('Ukraine').then((data) => {
      arr = [...data];
      loaded = true;
    });

    setTimeout(() => {
      if (loaded) {
        for (let i = 0; i < allArr.length; i += 1) {
          const arrDate = new Date(arr[i].Date);
          const day = arrDate.getDate();
          const month = arrDate.getMonth();
          const year = arrDate.getFullYear();
          const allDate = `${day} ${mounthObj[month]} ${year}`;
          dateArr.push(allDate);
        }
      }
    }, 1000);
    const date = new Date();
    const strDate = date.toISOString();
    const cutDate = `${strDate.slice(0, 11)}00:00:00Z`;
    setAllCasesData(cutDate).then((data) => {
      allArr = [...data];
      loaded = true;
    });
    setTimeout(() => {
      if (loaded) {
        for (let i = 0; i < allArr.length; i += 1) {
          allDeathArr.push(allArr[i].NewDeaths);
        }
      }
    }, 1000);
  }
  needArr = countsDeathCountryArr;
}

const ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    labels: dateArr,
    datasets: [
      {
        label: 'Total Confirmed',
        backgroundColor: 'rgba(253, 203, 142, 0.1)',
        borderColor: 'rgb(253, 203, 142)',
        data: needArr,
      },
    ],
  },

  // Configuration options go here
  options: {
    maintainAspectRatio: false,
  },
});

function chartUpdater(chart, arr, label, labelsArr) {
  setTimeout(() => {
    chart.data.labels = labelsArr;
    chart.data.datasets[0].label = label;
    chart.data.datasets[0].data = arr;
    chart.update();
  }, 1000);
}
