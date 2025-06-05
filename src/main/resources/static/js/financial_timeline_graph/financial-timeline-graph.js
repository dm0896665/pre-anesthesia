import {FinancialGraphData} from "./financial-graph-data.js";
import {CareerTimeline} from "./career-timeline.js";

const defaultStartYear = 1;
const defaultEndYear = 11;
const financialGraphData = await FinancialGraphData.fetchFinancialGraphData(defaultStartYear,defaultEndYear);
const aaColor = 'rgb(0,63,92)';
const crnaColor = 'rgb(122,81,149)';
const anesthesiologistColor = 'rgb(239,86,117)';
const anesthesiologistGraphData = new FinancialGraphData();
await initializeYearDropdown();
let financialGraph;

(async function() {
    financialGraph = new Chart(
        document.getElementById('financial-chart'),
        {
            type: 'line',
            data: getDataFromFinancialGraphData(financialGraphData),
            options: getChartOptions(financialGraphData.getDollarFormatter())
        }
    );
    updateTotals(financialGraphData);
    window.addEventListener('resize', () => {
        financialGraph.resize();
    });


})();

function getDataFromFinancialGraphData(financialGraphData) {
    return {
        labels: financialGraphData.years,
        datasets: [
            {
                label: 'AA',
                data: financialGraphData.aa,
                backgroundColor: aaColor,
                borderColor: getAlphaColor(aaColor),
            },
            {
                label: 'CRNA',
                data: financialGraphData.crna,
                backgroundColor: crnaColor,
                borderColor: getAlphaColor(crnaColor),
            },
            {
                label: 'Anesthesiologist',
                data: financialGraphData.anesthesiologist,
                backgroundColor: anesthesiologistColor,
                borderColor: getAlphaColor(anesthesiologistColor),
            }
        ]
    }
}

function getAlphaColor(mainColor) {
    return mainColor.replace(')', ', 0.5)').replace('rgb', 'rgba');
}

function getChartOptions(dollarFormater) {
    return {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Year'
                }
            },
            y: {
                ticks: {
                    callback: dollarFormater
                }
            }
        }
    }
}

async function initializeYearDropdown() {
    let timelineMap = await CareerTimeline.fetchCareerTimelineData();
    let startYearMenu = document.getElementById('start-year-menu');
    for (const [year, event] of timelineMap) {
        let option = document.createElement('option');
        let eventString = event.toString();
        option.innerText = year + (eventString != "" ? "- " : "") + eventString;
        option.value = ""+year;
        option.classList.add('start-year-menu-option');
        startYearMenu.appendChild(option);
    }

    startYearMenu.addEventListener("change", (event) => {
       let startYear = +document.getElementById('start-year-menu').value;
       let durationMenu = document.getElementById('duration-menu');
       let currentDuration = Math.round(+JSON.stringify(JSON.parse(""+durationMenu.value)) / 5) * 5; // Gets the current duration rounded to the nearest multiple of 5
       setYearDurationDropdown(startYear);
       let newLastDuration = +durationMenu.options[durationMenu.options.length - 1].value;
       let endYear;
       if (currentDuration + startYear > newLastDuration) {
           endYear = startYear + newLastDuration;
           durationMenu.value = newLastDuration;
       } else {
           endYear = startYear + currentDuration;
           durationMenu.value = currentDuration;
       }
       updateGraph(startYear, endYear).then(r => console.log("Graph updated."));
    });
    setYearDurationDropdown(defaultStartYear);
    document.getElementById('duration-menu').value = defaultEndYear - defaultStartYear;
}

function setYearDurationDropdown(startYear) {
    let durationMenu = document.getElementById('duration-menu');
    durationMenu.innerHTML = "";
    let durations = [];
    let i = 5;
    while(true) {
        durations.push(i);
        if (i + 5 > CareerTimeline.fetchedCareerTimelineData.size - startYear) {
            durations.push(CareerTimeline.fetchedCareerTimelineData.size - startYear);
            break;
        }
        i+=5;
    }
    for (const duration of durations) {
        let option = document.createElement('option');
        option.innerText = duration;
        option.value = ""+duration;
        durationMenu.appendChild(option);
    }
    durationMenu.addEventListener("change", (event) => {
        let startYear = +document.getElementById('start-year-menu').value;
        let duration = +document.getElementById('duration-menu').value;
        updateGraph(startYear, startYear + duration).then(r => console.log("Graph updated."));
    });
}

async function updateGraph(startYear, endYear) {
    const financialGraphData = await FinancialGraphData.fetchFinancialGraphData(startYear,endYear);
    financialGraph.data = getDataFromFinancialGraphData(financialGraphData);
    financialGraph.options = getChartOptions(financialGraphData.getDollarFormatter());
    financialGraph.update();

    updateTotals(financialGraphData);
}

function updateTotals(financialGraphData) {
    let aa = document.getElementById('aa-total');
    let crna = document.getElementById('crna-total');
    let anesthesiologist = document.getElementById('anesthesiologist-total');
    aa.style.color = aaColor;
    crna.style.color = crnaColor;
    anesthesiologist.style.color = anesthesiologistColor;
    aa.innerHTML = "AA: " + FinancialGraphData.dollarFormat(financialGraphData.aa[financialGraphData.aa.length - 1]);
    crna.innerHTML = "CRNA: " + FinancialGraphData.dollarFormat(financialGraphData.crna[financialGraphData.crna.length - 1]);
    anesthesiologist.innerHTML = "Anesthesiologist: " + FinancialGraphData.dollarFormat(financialGraphData.anesthesiologist[financialGraphData.anesthesiologist.length - 1]);
}
