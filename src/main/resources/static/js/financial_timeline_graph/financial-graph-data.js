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
        if (FinancialGraphData.fetchedFinancialGraphData != null) {
            return FinancialGraphData.fetchedFinancialGraphData;
        }
        let financialGraphData;
        try {
            const response = await fetch('/CareerPathways/financialGraphData');
            financialGraphData = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        let years = financialGraphData.years;
        let aa = financialGraphData.aa;
        let crna = financialGraphData.crna;
        let anesthesiologist = financialGraphData.anesthesiologist;
        FinancialGraphData.fetchedFinancialGraphData = new FinancialGraphData(years, aa, crna, anesthesiologist);
        return FinancialGraphData.fetchedFinancialGraphData;
    }

    static async fetchFinancialGraphData(startYear, endYear) {
        if (FinancialGraphData.fetchedFinancialMapData.size == 0) {
            try {
                const response = await fetch('/CareerPathways/financialMap');
                const responseJSON = await response.json();
                FinancialGraphData.fetchedFinancialMapData = new Map(Object.entries(responseJSON));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        let shortenedFinancialMap = FinancialGraphData.#shortenFinancialMap(FinancialGraphData.fetchedFinancialMapData, startYear, endYear);
        let financialTotalsMap = FinancialGraphData.#getFinancialTotalsMapFromFinancialMap(shortenedFinancialMap);
        return FinancialGraphData.#getFinancialGraphDataFromFinancialTotalsMap(financialTotalsMap);
    }

    static #shortenFinancialMap(financialMap, startYear, endYear) {
        let shortenedFinancialMap = new Map();
        let year = 1;
        for (const [key, value] of financialMap) {
            let i = parseInt(key);
            if (i >= startYear && i <= endYear) {
                shortenedFinancialMap.set(year, value);
                year++;
            }
        }
        return shortenedFinancialMap;
    }

    static #getFinancialTotalsMapFromFinancialMap(financialMap) {
        let financialTotalsMap = new Map();
        let aaTotal = 0;
        let crnaTotal = 0;
        let anesthesiologistTotal = 0;
        for (const [key, value] of financialMap) {
            const newValues = {
                "AA" : aaTotal+=value["AA"],
                "CRNA" : crnaTotal+=value["CRNA"],
                "Anesthesiologist" :  anesthesiologistTotal+=value["Anesthesiologist"]
            };
            financialTotalsMap.set(key, newValues);
        }

        return financialTotalsMap;
    }

    static #getFinancialGraphDataFromFinancialTotalsMap(financialTotalsMap) {
        let years = [];
        let aa = [];
        let crna = [];
        let anesthesiologist = [];
        for (const [key, value] of financialTotalsMap) {
            years.push(key);
            aa.push(value["AA"]);
            crna.push(value["CRNA"]);
            anesthesiologist.push(value["Anesthesiologist"]);
        }
        return new FinancialGraphData(years, aa, crna, anesthesiologist);
    }

    getDollarFormatter() {
        if (this.#isMillionFormatter()) {
            return FinancialGraphData.millionDollarFormat;
        }
        if (this.#isThousandFormatter()) {
            return FinancialGraphData.thousandDollarFormat;
        }
        return FinancialGraphData.dollarFormat;
    }

    #isThousandFormatter() {
        return this.#hasGreaterValue(100000);
    }

    #isMillionFormatter() {
        return this.#hasGreaterValue(2000000);
    }
    #hasGreaterValue(value) {
        let aa = this.aa.some(element => element > value);
        let crna = this.crna.some(element => element > value);
        let anesthesiologist = this.anesthesiologist.some(element => element > value);
        return aa || crna || anesthesiologist;
    }
}