export class FinancialGraphData {
    constructor(years, aa, crna, anesthesiologist) {
        this.years = years;
        this.aa = aa;
        this.crna = crna;
        this.anesthesiologist = anesthesiologist;
    }

    years = [];
    aa = [];
    crna = [];
    anesthesiologist = [];

    static fetchedFinancialGraphData = null;
    static fetchedFinancialMapData = new Map();
    static millionDollarFormat = value => `$${(value / 1000000).toLocaleString()}M`;
    static thousandDollarFormat = value => `$${(value / 1000).toLocaleString()}K`;
    static dollarFormat = value => `$${(value).toLocaleString()}`;

    getYears(startYear, endYear) {
        return this.years.slice(startYear + 1, endYear + 2);
    }

    getAA(startYear, endYear) {
        return this.aa.slice(startYear + 1, endYear + 2);
    }

    getCRNA(startYear, endYear) {
        return this.crna.slice(startYear + 1, endYear + 2);
    }

    getAnesthesiologist(startYear, endYear) {
        return this.anesthesiologist.slice(startYear + 1, endYear + 2);
    }

    getYearsTotal(startYear, endYear) {
        return this.years.slice(startYear + 1, endYear + 2).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    getAATotal(startYear, endYear) {
        return this.aa.slice(startYear + 1, endYear + 2).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    getCRNATotal(startYear, endYear) {
        return this.crna.slice(startYear + 1, endYear + 2).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    getAnesthesiologistTotal(startYear, endYear) {
        return this.anesthesiologist.slice(startYear + 1, endYear + 2).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    getFinancialGraphDataInTimeFrame(startYear, endYear) {
        let years = this.getYears(startYear, endYear);
        let aa = this.getAA(startYear, endYear);
        let crna = this.getCRNA(startYear, endYear);
        let anesthesiologist = this.getAnesthesiologist(startYear, endYear);
        return new FinancialGraphData(years, aa, crna, anesthesiologist);
    }

    static async fetchFinancialGraphData() {
        // Don't refetch data if we have it already
        if (FinancialGraphData.fetchedFinancialGraphData != null) {
            return FinancialGraphData.fetchedFinancialGraphData;
        }

        // Fetch data and from server
        let financialGraphData;
        try {
            const response = await fetch('/financialTimelineGraph/financialGraphData');
            financialGraphData = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        // Initialize data variables with a zero year
        let years = [0];
        let aa = [0];
        let crna = [0];
        let anesthesiologist = [0];

        // Add the rest of the received data
        years.push(financialGraphData.years);
        aa.push(financialGraphData.aa);
        crna.push(financialGraphData.crna);
        anesthesiologist.push(financialGraphData.anesthesiologist);

        // Create and assign new financial graph data to the static variable and return it
        FinancialGraphData.fetchedFinancialGraphData = new FinancialGraphData(years, aa, crna, anesthesiologist);
        return FinancialGraphData.fetchedFinancialGraphData;
    }

    static async fetchFinancialGraphData(startYear, endYear) {
        // Only fetch the data from the server if we need to
        if (FinancialGraphData.fetchedFinancialMapData.size == 0) {
            try {
                const response = await fetch('/financialTimelineGraph/financialMap');
                const responseJSON = await response.json();

                // Assign received data to the static variable to be reused later
                FinancialGraphData.fetchedFinancialMapData = new Map(Object.entries(responseJSON));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        // Shorten the data within the start and end year, total them, convert them to class variable and return it
        let shortenedFinancialMap = FinancialGraphData.#shortenFinancialMap(FinancialGraphData.fetchedFinancialMapData, startYear, endYear);
        let financialTotalsMap = FinancialGraphData.#getFinancialTotalsMapFromFinancialMap(shortenedFinancialMap);
        return FinancialGraphData.#getFinancialGraphDataFromFinancialTotalsMap(financialTotalsMap);
    }

    static #shortenFinancialMap(financialMap, startYear, endYear) {
        // Initialize variables
        let shortenedFinancialMap = new Map();
        let year = 1;

        // Loop through map
        for (const [key, value] of financialMap) {
            // If the value's key (the year) is within the start and end year, add it to the shortened map
            let i = parseInt(key);
            if (i >= startYear && i <= endYear) {
                shortenedFinancialMap.set(year, value);
                year++;
            }
        }

        return shortenedFinancialMap;
    }

    static #getFinancialTotalsMapFromFinancialMap(financialMap) {
        // Initialize variables
        let financialTotalsMap = new Map();
        let aaTotal = 0;
        let crnaTotal = 0;
        let anesthesiologistTotal = 0;

        // Loop through map
        for (const [key, value] of financialMap) {
            // Create a new object with each pathway's running total
            const newValues = {
                "AA" : aaTotal+=value["AA"],
                "CRNA" : crnaTotal+=value["CRNA"],
                "Anesthesiologist" :  anesthesiologistTotal+=value["Anesthesiologist"]
            };

            // Add it to the new map
            financialTotalsMap.set(key, newValues);
        }

        // Return the new map
        return financialTotalsMap;
    }

    static #getFinancialGraphDataFromFinancialTotalsMap(financialTotalsMap) {
        // Initialize variables
        let years = [0];
        let aa = [0];
        let crna = [0];
        let anesthesiologist = [0];

        // Loop through map
        for (const [key, value] of financialTotalsMap) {
            // Add each element to corresponding array
            years.push(key);
            aa.push(value["AA"]);
            crna.push(value["CRNA"]);
            anesthesiologist.push(value["Anesthesiologist"]);
        }

        // Convert to class variable and return it
        return new FinancialGraphData(years, aa, crna, anesthesiologist);
    }

    getDollarFormatter() {
        // If a million-dollar format is needed, return it
        if (this.#isMillionFormatter()) {
            return FinancialGraphData.millionDollarFormat;
        }

        // If a thousand-dollar format is needed, return it
        if (this.#isThousandFormatter()) {
            return FinancialGraphData.thousandDollarFormat;
        }

        // Otherwise, just return the dollar format
        return FinancialGraphData.dollarFormat;
    }

    #isThousandFormatter() {
        return this.#hasGreaterValue(100000);
    }

    #isMillionFormatter() {
        return this.#hasGreaterValue(2000000);
    }
    #hasGreaterValue(value) {
        // Check if each array has an element with a value greater than 'value'
        let aa = this.aa.some(element => element > value);
        let crna = this.crna.some(element => element > value);
        let anesthesiologist = this.anesthesiologist.some(element => element > value);

        // Return true if any of the arrays contain a greater value that 'value'
        return aa || crna || anesthesiologist;
    }
}