export class Quiz {
    static fetchedQuestions = new Map();

    static async fetchQuestions() {
        if (Quiz.fetchedQuestions.size == 0) {
            try {
                const response = await fetch('/questions');
                const responseJSON = await response.json();
                let tempMap = new Map(Object.entries(responseJSON));
                for (const [questionNumber, questionMap] of tempMap) {
                    Quiz.fetchedQuestions.set(questionNumber, new Question(new Map(Object.entries(questionMap))));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        return Quiz.fetchedQuestions;
    }
}

export class Question {
    question = "";
    image = "";
    imageDescription = "";
    options = new Map();
    constructor(questionMap) {
        this.question = questionMap.get("question");
        this.image = questionMap.get("image");
        this.imageDescription = questionMap.get("image-description");
        let mapOfOptions = new Map(Object.entries(questionMap.get("options")));
        for (const [optionNumber, optionMap] of mapOfOptions) {
            this.options.set(optionNumber, new Option(new Map(Object.entries(optionMap))));
        }
    }

    hasImage() {
        return typeof this.image !== "undefined";
    }
}

export class Option {
    text = "";
    points = new Map();
    constructor(optionMap) {
        this.text = optionMap.get("text");
        let pointMap = new Map(Object.entries(optionMap.get("points")));
        for (const [pointType, value] of pointMap) {
            const pointsMap = new Map(Object.entries(value));
            if (pointType === PathwayPoints.type) {
                this.points.set(pointType, new PathwayPoints(pointsMap))
            }
            if (pointType === WorkPoints.type) {
                this.points.set(pointType, new WorkPoints(pointsMap));
            }
            if (pointType === ModelPoints.type) {
                this.points.set(pointType, new ModelPoints(pointsMap));
            }
        }
    }
}

export class Points {
    type = "";
    scored = new Map();
    constructor(type, scored) {
        this.type = type;
        this.scored = scored;
    }
}

export class PathwayPoints extends Points {
    static type = "pathway";
    constructor(scored) {
        super(PathwayPoints.type, scored);
    }
}

export class WorkPoints extends Points {
    static type = "work";
    constructor(scored) {
        super(WorkPoints.type, scored);
    }
}

export class ModelPoints extends Points {
    static type = "model";
    constructor(scored) {
        super(ModelPoints.type, scored);
    }
}