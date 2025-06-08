import {Quiz} from "./quiz.js";

const previousText = "< Previous";
const nextText = "Next >";
const submitText = "Submit";

let questions;
let currentQuestionNumber = 0;
let answerMap = new Map();
let isSureCheck = false;

function updateAnswerMap() {
    let currentAnswer = Array.from(
        document.querySelectorAll('input[name=question-option]')
    ).filter(radio => radio.checked)[0]?.value;

    answerMap.set("" + currentQuestionNumber, currentAnswer);
}

function hasSelectedAnswer() {
    return Array.from(
        document.querySelectorAll('input[name=question-option]')
    ).filter(radio => radio.checked).length > 0;
}

function getSelectedAnswer() {
    return Array.from(
        document.querySelectorAll('input[name=question-option]')
    ).filter(radio => radio.checked)[0]?.value;
}

function makeSureUserWantsToContinueQuiz() {
    let questionElement = document.getElementById("question");
    questionElement.innerText = "Anesthesia, regardless of the pathway, is a stressful career where minutes can determine if a patient lives or dies. Would you like to continue with the quiz";
    let newOptions = new Map();
    newOptions.set("1", {text: "Yes, continue."});
    newOptions.set("2", {text: "No"});
    updateOptions(newOptions);
}

function handleNextSubmitButtonClick(_event) {
    if (!hasSelectedAnswer()) {
        return;
    }

    if (currentQuestionNumber == 1 && !isSureCheck) {
        // Going to question 2
        let currentAnswer = Array.from(
            document.querySelectorAll('input[name=question-option]')
        ).filter(radio => radio.checked)[0]?.value;
        if (currentAnswer == 2) {
            makeSureUserWantsToContinueQuiz();
            isSureCheck = true;
            return;
        }
    } else if (currentQuestionNumber == 1 && isSureCheck) {
        // Going to question 2
        isSureCheck = false;
        let currentAnswer = Array.from(
            document.querySelectorAll('input[name=question-option]')
        ).filter(radio => radio.checked)[0]?.value;
        if (currentAnswer == 2) {
            alert("It looks like anesthesia might not be the right career for you. Learning to manage stress and work under pressure is difficult, but if you can conquer them, try taking the quiz again in the future.");
            window.location.href = "/";
            return;
        }

        // Record question 1 being answered as option 2
        document.getElementById("option-2").checked = true;
    } else if (currentQuestionNumber == 2) {
        // Going to question 3
        document.getElementById("previous-btn").disabled = false;
        document.getElementById("previous-btn").classList.toggle("d-none", false);
    } else if (currentQuestionNumber == questions.size - 1) {
        // Going to last question
        document.getElementById("next-submit-btn").value = submitText;
    }
    updateAnswerMap();

    if (currentQuestionNumber == questions.size) {
        submitResults();
        return;
    }
    goToNextQuestion();

    selectAnswerIfAlreadyAnswered();
}

function handlePreviousButtonClick(_event) {
    if (currentQuestionNumber == 3) {
        // Going to question 2
        document.getElementById("previous-btn").disabled = true;
    }
    document.getElementById("next-submit-btn").value = nextText;

    if (hasSelectedAnswer()) {
        updateAnswerMap();
    }

    goToPreviousQuestion();

    selectAnswerIfAlreadyAnswered();
}

function selectAnswerIfAlreadyAnswered() {
    if (answerMap.has(""+currentQuestionNumber)) {
        document.getElementById("option-" + answerMap.get(""+currentQuestionNumber)).checked = true;

        document.getElementById("next-submit-btn").disabled = false;
    }
}

function goToNextQuestion() {
    changeQuestion(true);
}

function goToPreviousQuestion() {
    changeQuestion(false);
}

function changeQuestion(isNext) {
    if (isNext) {
        currentQuestionNumber++;
    } else {
        currentQuestionNumber--;
    }

    let currentQuestion = questions.get(""+currentQuestionNumber);

    updateQuestionPrompt(currentQuestion);

    updateImage(currentQuestion);

    updateOptions(currentQuestion.options);

    document.getElementById("next-submit-btn").disabled = true;
}

function updateQuestionPrompt(currentQuestion) {
    let questionElement = document.getElementById("question");
    questionElement.innerText = "Question: " + currentQuestionNumber + ". " + currentQuestion.question;
}

function updateImage(currentQuestion) {
    let img = document.getElementById("image-container");
    img.innerHTML = "";
    if (currentQuestion.hasImage()) {
        let imageElement = document.createElement("img");
        imageElement.src = "/images/quiz/" + currentQuestion.image;
        imageElement.alt = currentQuestion.imageDescription;
        imageElement.classList.add("pt-1");
        imageElement.classList.add("pb-3");
        imageElement.classList.add("mw-100");
        img.appendChild(imageElement);
    }
}

function updateOptions(options) {
    let optionsElement = document.getElementById("options");
    optionsElement.innerHTML = "";

    for (const [optionNumber, option] of options) {
        let div = document.createElement("div");
        div.classList.add("form-check");

        let input = document.createElement("input");
        let inputId = "option-" + optionNumber;
        input.classList.add("form-check-input");
        input.type = "radio";
        input.name = "question-option";
        input.id = inputId;
        input.value = optionNumber;
        input.addEventListener("change", (_event) => {
            document.getElementById("next-submit-btn").disabled = false;
        });
        div.appendChild(input);

        let label = document.createElement("label");
        label.classList.add("form-check-label");
        label.setAttribute("for", inputId);
        label.innerText = option.text;
        div.appendChild(label);

        optionsElement.appendChild(div);
    }
}

function submitResults() {
    let form = document.createElement("form");
    form.method = "POST";
    form.action = "/quiz/results";

    let input = document.createElement("input");
    input.type = "hidden";
    input.name = "results";
    input.value = JSON.stringify(buildAnswers(), mapReplacer);
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();

    //fetch('/quiz/results', options).then(r => console.log("Calculating Results...."));
}
function mapReplacer(key, value) {
    if(value instanceof Map || value instanceof Set) {
        return Object.fromEntries(value);
    }
    return value;
}

function buildAnswers() {
    let newAnswerMap = new Map();
    for (const [question, answer] of answerMap) {
        let newPointMap = new Map();
        for (const [pointType, scored] of questions.get(question).options.get(answer).points) {
            newPointMap.set(pointType, scored.scored);
        }
        newAnswerMap.set(question, {
            answer: answer,
            points: newPointMap
        });
    }
    return newAnswerMap;
}

/**************** Main ****************/
async function main() {
	questions = await Quiz.fetchQuestions();
    document.getElementById("next-submit-btn").addEventListener("click", handleNextSubmitButtonClick);
    document.getElementById("previous-btn").addEventListener("click", handlePreviousButtonClick);
    answerMap = new Map();

    // Start quiz
    goToNextQuestion();
}
main();