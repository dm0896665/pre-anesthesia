export class CareerTimeline {
    static fetchedCareerTimelineData = new Map();

    static getEventString(year) {
        if (CareerTimeline.fetchedCareerTimelineData.has("" + year)) {
            return CareerTimeline.fetchedCareerTimelineData.get("" + year);
        } else {
            return "";
        }
    }

    static async fetchCareerTimelineData() {
        if (CareerTimeline.fetchedCareerTimelineData.size == 0) {
            try {
                const response = await fetch('/CareerPathways/careerTimelineData');
                const responseJSON = await response.json();
                let tempMap = new Map(Object.entries(responseJSON));
                for (const [key, value] of tempMap) {
                    CareerTimeline.fetchedCareerTimelineData.set(key, new Event(value));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        return CareerTimeline.fetchedCareerTimelineData;
    }
}
export class Event {
    constructor(event) {
        if ("All" in event) {
            this.all =  event["All"];
            return;
        }

        if ("AA" in event) {
            this.aa = event["AA"];
        }
        if ("CRNA" in event) {
            this.crna = event["CRNA"];
        }
        if ("Anesthesiologist" in event) {
            this.anesthesiologist = event["Anesthesiologist"];
        }
    }

    all = "";
    aa = "";
    crna = "";
    anesthesiologist = "";

    toString() {
        if (this.all != "") {
            return this.all;
        }

        let s = "";
        if (this.aa != "") {
            s+="AA: " + this.aa;
        }
        if (this.crna != "") {
            if (s != "") {
                s+="; ";
            }
            s+="CRNA: " + this.crna;
        }
        if (this.anesthesiologist != "") {
            if (s != "") {
                s+="; ";
            }
            s+="Anesthesiologist: " + this.anesthesiologist;
        }
        return s;
    }
}