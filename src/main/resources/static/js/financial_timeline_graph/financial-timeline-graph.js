import {FinancialGraphData} from "./financial-graph-data.js";
import {CareerTimeline} from "./career-timeline.js";

// initialize variables
const defaultStartYear = 1;
const defaultEndYear = 10;
const financialGraphData = await FinancialGraphData.fetchFinancialGraphData(defaultStartYear,defaultEndYear);
const aaColor = 'rgb(0,63,92)';
const crnaColor = 'rgb(239,86,117)';
const anesthesiologistColor = 'rgb(122,81,149)';
let financialGraph;

async function initializeGraph() {
    // initialize graph
    financialGraph = new Chart(
        document.getElementById('financial-chart'),
        {
            type: 'line',
            data: getDataFromFinancialGraphData(financialGraphData),
            options: getChartOptions(financialGraphData.getDollarFormatter())
        }
    );

    // update totals section
    updateTotals(financialGraphData);

    // make sure the graph resizes when the window does
    window.addEventListener('resize', () => {
        financialGraph.resize();
    });


};

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
    // Get career timeline data
    let timelineMap = await CareerTimeline.fetchCareerTimelineData();
    let startYearMenu = document.getElementById('start-year-menu');

    // Loop through timeline data
    for (const [year, event] of timelineMap) {
        // Create option and add it to the select element
        let option = document.createElement('option');
        let eventString = event.toString();
        option.innerText = "Year " + year + (eventString != "" ? "- " : "") + eventString;
        option.value = ""+year;
        option.classList.add('start-year-menu-option');
        startYearMenu.appendChild(option);
    }

    // Add event listener for when a new start year is selected
    startYearMenu.addEventListener("change", (event) => {
        // Get current start year and duration variables
        let startYear = +document.getElementById('start-year-menu').value;
        let durationMenu = document.getElementById('duration-menu');
        let currentDuration = Math.round(+JSON.stringify(JSON.parse(""+durationMenu.value)) / 5) * 5; // Gets the current duration rounded to the nearest multiple of 5

        // Update duration with new start year
        setYearDurationDropdown(startYear);

        // Get new last duration
        let newLastDuration = +durationMenu.options[durationMenu.options.length - 1].value;
        let endYear;
        let duration;

        // If the previous selected duration plus the new start year is greater than the new last duration,
        // use the new last duration; otherwise, use the previously selected duration
        if (currentDuration + startYear > newLastDuration) {
            duration = newLastDuration;
        } else {
            duration = currentDuration;
        }

        // Calculate the new end year and pre-select the correct duration
        endYear = startYear + duration - 1;
        durationMenu.value = duration;

        // Update the graph with the new start and end year
        updateGraph(startYear, endYear).then(r => console.log("Graph updated."));
    });

    // Initialize the duration options and select the default
    setYearDurationDropdown(defaultStartYear);
    document.getElementById('duration-menu').value = defaultEndYear - defaultStartYear + 1;
}

function setYearDurationDropdown(startYear) {
    // Initialize variables
    let durationMenu = document.getElementById('duration-menu');
    durationMenu.innerHTML = "";
    let durations = [];
    let i = 5;

    // Add durations in multiples of 5 with the last being the maximum duration
    while(true) {
        durations.push(i);
        if (i + 5 > CareerTimeline.fetchedCareerTimelineData.size - startYear) {
            durations.push(CareerTimeline.fetchedCareerTimelineData.size - startYear + 1);
            break;
        }
        i+=5;
    }

    // Create options and add them to the duration select element
    for (const duration of durations) {
        let option = document.createElement('option');
        option.innerText = duration + " years";
        option.value = ""+duration;
        durationMenu.appendChild(option);
    }

    // Add an event lister when a new duration is selected
    durationMenu.addEventListener("change", (event) => {
        // Get the start year and the new duration
        let startYear = +document.getElementById('start-year-menu').value;
        let duration = +document.getElementById('duration-menu').value;

        // Update the graph with the start year and calculated new end year
        updateGraph(startYear, startYear + duration - 1).then(r => console.log("Graph updated."));
    });
}

async function updateGraph(startYear, endYear) {
    // Get data between specified time
    const financialGraphData = await FinancialGraphData.fetchFinancialGraphData(startYear,endYear);

    // Get format the data so that the plug-in can read it
    financialGraph.data = getDataFromFinancialGraphData(financialGraphData);
    financialGraph.options = getChartOptions(financialGraphData.getDollarFormatter());

    // Update the graph
    financialGraph.update();

    // Update the totals section
    updateTotals(financialGraphData);
}

function updateTotals(financialGraphData) {
    // Get each totals section
    let aa = document.getElementById('aa-total');
    let crna = document.getElementById('crna-total');
    let anesthesiologist = document.getElementById('anesthesiologist-total');

    // Set the proper colors
    aa.style.color = aaColor;
    crna.style.color = crnaColor;
    anesthesiologist.style.color = anesthesiologistColor;

    // Set value to the last years value since that will be the total
    aa.innerHTML = "AA: " + FinancialGraphData.dollarFormat(financialGraphData.aa[financialGraphData.aa.length - 1]);
    crna.innerHTML = "CRNA: " + FinancialGraphData.dollarFormat(financialGraphData.crna[financialGraphData.crna.length - 1]);
    anesthesiologist.innerHTML = "Anesthesiologist: " + FinancialGraphData.dollarFormat(financialGraphData.anesthesiologist[financialGraphData.anesthesiologist.length - 1]);
}

function init() {
    initializeGraph();
    initializeYearDropdown();
}
init();
