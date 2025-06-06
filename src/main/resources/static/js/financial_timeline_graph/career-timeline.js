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
                const response = await fetch('/financialTimelineGraph/careerTimelineData');
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
        // If the event has an all property, set 'this.all' and early return
        if ("All" in event) {
            this.all =  event["All"];
            return;
        }

        // Set each variable if it's in the event
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
        // If there is an all string just return that
        if (this.all != "") {
            return this.all;
        }

        // Create a new string with the other variables when they are there
        let s = "";
        if (this.aa != "") {
            s+="AA: " + this.aa;
        }
        if (this.crna != "") {
            // If this isn't the first event string add a separator
            if (s != "") {
                s+="; ";
            }
            s+="CRNA: " + this.crna;
        }
        if (this.anesthesiologist != "") {
            // If this isn't the first event string add a separator
            if (s != "") {
                s+="; ";
            }

            s+="Anesthesiologist: " + this.anesthesiologist;
        }

        // Return created string
        return s;
    }
}