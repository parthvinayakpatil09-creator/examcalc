/* =========================================
   EXAMCALC VERSION 7
========================================= */

let currentExam = "neet";

let currentSubjects = [];


/* =========================================
   EXAM CONFIGURATION
========================================= */

const exams = {

    neet: {

        name: "NEET (UG)",

        maximum: 720,

        info:
            "NEET: +4 for correct answer and −1 for wrong answer.",

        subjects: [

            {
                name: "Physics",
                icon: "⚛️",
                questions: 45,
                correctMark: 4,
                wrongMark: -1
            },

            {
                name: "Chemistry",
                icon: "🧪",
                questions: 45,
                correctMark: 4,
                wrongMark: -1
            },

            {
                name: "Botany",
                icon: "🧬",
                questions: 45,
                correctMark: 4,
                wrongMark: -1
            },

            {
                name: "Zoology",
                icon: "🧬",
                questions: 45,
                correctMark: 4,
                wrongMark: -1
            }

        ]

    },


    cet: {

        pcm: {

            name: "MHT-CET PCM",

            maximum: 200,

            info:
                "MHT-CET PCM: Physics/Chemistry +1 and Mathematics +2 per correct answer.",

            subjects: [

                {
                    name: "Physics",
                    icon: "⚛️",
                    questions: 50,
                    correctMark: 1,
                    wrongMark: 0
                },

                {
                    name: "Chemistry",
                    icon: "🧪",
                    questions: 50,
                    correctMark: 1,
                    wrongMark: 0
                },

                {
                    name: "Mathematics",
                    icon: "📐",
                    questions: 50,
                    correctMark: 2,
                    wrongMark: 0
                }

            ]

        },


        pcb: {

            name: "MHT-CET PCB",

            maximum: 200,

            info:
                "MHT-CET PCB: +1 per correct answer.",

            subjects: [

                {
                    name: "Physics",
                    icon: "⚛️",
                    questions: 50,
                    correctMark: 1,
                    wrongMark: 0
                },

                {
                    name: "Chemistry",
                    icon: "🧪",
                    questions: 50,
                    correctMark: 1,
                    wrongMark: 0
                },

                {
                    name: "Biology",
                    icon: "🧬",
                    questions: 100,
                    correctMark: 1,
                    wrongMark: 0
                }

            ]

        }

    }

};


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        changeExam();

    }
);


/* =========================================
   GET CURRENT EXAM
========================================= */

function getCurrentExam() {

    if (currentExam === "neet") {

        return exams.neet;

    }


    if (currentExam === "cet") {

        const stream =
            document.getElementById(
                "cetStream"
            ).value;

        return exams.cet[stream];

    }


    return {

        name: "JEE Main Paper 1",

        maximum: 300,

        info:
            "JEE Main Paper 1: +4 for correct MCQ/numerical and −1 for wrong response.",

        subjects: getJeeSubjects()

    };

}


/* =========================================
   JEE SUBJECTS
========================================= */

function getJeeSubjects() {

    return [

        {
            name: "Physics",
            icon: "⚛️",
            jee: true
        },

        {
            name: "Chemistry",
            icon: "🧪",
            jee: true
        },

        {
            name: "Mathematics",
            icon: "📐",
            jee: true
        }

    ];

}


/* =========================================
   CHANGE EXAM
========================================= */

function changeExam() {

    currentExam =
        document.getElementById(
            "examSelect"
        ).value;


    clearError();


    const cetGroup =
        document.getElementById(
            "cetGroup"
        );


    if (currentExam === "cet") {

        cetGroup.classList.remove(
            "hidden"
        );

    }

    else {

        cetGroup.classList.add(
            "hidden"
        );

    }


    const data =
        getCurrentExam();


    currentSubjects =
        data.subjects;


    document.getElementById(
        "markingInfo"
    ).innerText =
        data.info;


    createSubjects();


    document.getElementById(
        "result"
    ).classList.add(
        "hidden"
    );

}


/* =========================================
   CREATE SUBJECT INPUTS
========================================= */

function createSubjects() {

    const container =
        document.getElementById(
            "subjects"
        );


    container.innerHTML = "";


    currentSubjects.forEach(
        subject => {

            const id =
                makeId(subject.name);


            if (subject.jee) {

                container.innerHTML += `

                <div class="subject">

                    <div class="subject-title">

                        <h3>
                            ${subject.icon}
                            ${subject.name}
                        </h3>

                        <span>
                            25 Questions
                        </span>

                    </div>


                    <div class="jee-section">

                        <h4>
                            Section A — MCQ
                        </h4>

                        <div class="jee-grid">

                            ${createInput(
                                id + "McqCorrect",
                                "Correct",
                                20
                            )}

                            ${createInput(
                                id + "McqWrong",
                                "Wrong",
                                20
                            )}

                            ${createInput(
                                id + "McqUnattempted",
                                "Unattempted",
                                20
                            )}

                        </div>

                    </div>


                    <div class="jee-section">

                        <h4>
                            Section B — Numerical
                        </h4>

                        <div class="jee-grid">

                            ${createInput(
                                id + "NumCorrect",
                                "Correct",
                                5
                            )}

                            ${createInput(
                                id + "NumWrong",
                                "Wrong",
                                5
                            )}

                            ${createInput(
                                id + "NumUnattempted",
                                "Unattempted",
                                5
                            )}

                        </div>

                    </div>

                </div>

                `;

            }


            else {

                container.innerHTML += `

                <div class="subject">

                    <div class="subject-title">

                        <h3>
                            ${subject.icon}
                            ${subject.name}
                        </h3>

                        <span>
                            ${subject.questions}
                            Questions
                        </span>

                    </div>


                    <div class="input-grid">

                        ${createInput(
                            id + "Correct",
                            "Correct",
                            subject.questions
                        )}

                        ${createInput(
                            id + "Wrong",
                            "Wrong",
                            subject.questions
                        )}

                        ${createInput(
                            id + "Unattempted",
                            "Unattempted",
                            subject.questions
                        )}

                    </div>

                </div>

                `;

            }

        }
    );

}


/* =========================================
   CREATE INPUT
========================================= */

function createInput(
    id,
    label,
    max
) {

    return `

        <div class="input-box">

            <label>
                ${label}
            </label>

            <input
                type="number"
                id="${id}"
                min="0"
                max="${max}"
                value="0"
                oninput="limitInput(this, ${max})"
            >

        </div>

    `;

}


/* =========================================
   LIMIT INPUT
========================================= */

function limitInput(
    input,
    max
) {

    let value =
        Number(input.value);


    if (value < 0) {

        input.value = 0;

    }


    if (value > max) {

        input.value = max;

    }

}


/* =========================================
   VALIDATION
========================================= */

function validateInputs() {

    for (
        const subject
        of currentSubjects
    ) {

        const id =
            makeId(subject.name);


        /* =====================================
           JEE SUBJECT
        ===================================== */

        if (subject.jee) {

            const mcqCorrect =
                getValue(
                    id + "McqCorrect"
                );

            const mcqWrong =
                getValue(
                    id + "McqWrong"
                );

            const mcqUnattempted =
                getValue(
                    id + "McqUnattempted"
                );


            const numCorrect =
                getValue(
                    id + "NumCorrect"
                );

            const numWrong =
                getValue(
                    id + "NumWrong"
                );

            const numUnattempted =
                getValue(
                    id + "NumUnattempted"
                );


            /*
             * TOTAL OF ALL SIX INPUTS
             */

            const totalEntered =
                mcqCorrect +
                mcqWrong +
                mcqUnattempted +
                numCorrect +
                numWrong +
                numUnattempted;


            /*
             * COMPLETELY SKIPPED JEE SUBJECT
             *
             * If all six values are 0,
             * this subject is considered
             * not attempted.
             */

            if (totalEntered === 0) {

                continue;

            }


            /*
             * SECTION A
             * MUST TOTAL 20
             */

            const mcq =
                mcqCorrect +
                mcqWrong +
                mcqUnattempted;


            if (mcq !== 20) {

                return (
                    subject.name +
                    ": Section A must total 20 questions."
                );

            }


            /*
             * SECTION B
             * MUST TOTAL 5
             */

            const numerical =
                numCorrect +
                numWrong +
                numUnattempted;


            if (numerical !== 5) {

                return (
                    subject.name +
                    ": Section B must total 5 questions."
                );

            }

        }


        /* =====================================
           NEET + MHT-CET SUBJECT
        ===================================== */

        else {

            const correct =
                getValue(
                    id + "Correct"
                );


            const wrong =
                getValue(
                    id + "Wrong"
                );


            const unattempted =
                getValue(
                    id + "Unattempted"
                );


            const total =
                correct +
                wrong +
                unattempted;


            /*
             * COMPLETELY SKIPPED SUBJECT
             *
             * Any subject can be skipped.
             *
             * Physics = 0,0,0  -> allowed
             * Chemistry = 0,0,0 -> allowed
             * Biology = 0,0,0 -> allowed
             * Mathematics = 0,0,0 -> allowed
             */

            if (total === 0) {

                continue;

            }


            /*
             * IF SUBJECT IS ATTEMPTED,
             * ALL QUESTIONS MUST BE
             * ACCOUNTED FOR.
             */

            if (
                total !==
                subject.questions
            ) {

                return (
                    subject.name +
                    ": Correct + Wrong + Unattempted must equal " +
                    subject.questions +
                    "."
                );

            }

        }

    }


    /*
     * NO VALIDATION ERROR
     */

    return null;

}


/* =========================================
   CALCULATE RESULT
========================================= */

function calculateResult() {

    clearError();


    const validation =
        validateInputs();


    if (validation) {

        showError(validation);

        return;

    }


    let grandTotal = 0;

    let totalCorrect = 0;

    let totalWrong = 0;

    let totalAttempted = 0;

    let resultHTML = "";


    currentSubjects.forEach(
        subject => {

            const id =
                makeId(subject.name);


            let marks = 0;

            let correct = 0;

            let wrong = 0;

            let unattempted = 0;

            let details = "";


            /* =====================================
               JEE CALCULATION
            ===================================== */

            if (subject.jee) {

                const mcqCorrect =
                    getValue(
                        id + "McqCorrect"
                    );

                const mcqWrong =
                    getValue(
                        id + "McqWrong"
                    );

                const numCorrect =
                    getValue(
                        id + "NumCorrect"
                    );

                const numWrong =
                    getValue(
                        id + "NumWrong"
                    );

                const mcqUnattempted =
                    getValue(
                        id + "McqUnattempted"
                    );

                const numUnattempted =
                    getValue(
                        id + "NumUnattempted"
                    );


                marks =
                    (
                        mcqCorrect * 4
                    ) -
                    mcqWrong +
                    (
                        numCorrect * 4
                    ) -
                    numWrong;


                correct =
                    mcqCorrect +
                    numCorrect;


                wrong =
                    mcqWrong +
                    numWrong;


                unattempted =
                    mcqUnattempted +
                    numUnattempted;


                details =
                    `MCQ: ${mcqCorrect}✓ ${mcqWrong}✗ • Numerical: ${numCorrect}✓ ${numWrong}✗`;

            }


            /* =====================================
               NEET + MHT-CET CALCULATION
            ===================================== */

            else {

                correct =
                    getValue(
                        id + "Correct"
                    );


                wrong =
                    getValue(
                        id + "Wrong"
                    );


                unattempted =
                    getValue(
                        id + "Unattempted"
                    );


                marks =
                    correct *
                    subject.correctMark +
                    wrong *
                    subject.wrongMark;


                details =
                    `${correct} correct • ${wrong} wrong • ${unattempted} unattempted`;

            }


            grandTotal += marks;


            totalCorrect += correct;


            totalWrong += wrong;


            totalAttempted +=
                correct + wrong;


            resultHTML += `

                <div class="result-row">

                    <div>

                        <strong>
                            ${subject.icon}
                            ${subject.name}
                        </strong>

                        <div class="result-details">
                            ${details}
                        </div>

                    </div>

                    <div class="result-mark">
                        ${marks}
                    </div>

                </div>

            `;

        }
    );


    const exam =
        getCurrentExam();


    const percentage =
        (
            grandTotal /
            exam.maximum
        ) * 100;


    const accuracy =
        totalAttempted > 0
        ?
        (
            totalCorrect /
            totalAttempted
        ) * 100
        :
        0;


    /* =========================================
       DISPLAY RESULT
    ========================================= */

    document.getElementById(
        "resultExam"
    ).innerText =
        exam.name;


    document.getElementById(
        "totalScore"
    ).innerText =
        grandTotal;


    document.getElementById(
        "maxScore"
    ).innerText =
        exam.maximum;


    document.getElementById(
        "resultSubjects"
    ).innerHTML =
        resultHTML;


    document.getElementById(
        "correctTotal"
    ).innerText =
        totalCorrect;


    document.getElementById(
        "wrongTotal"
    ).innerText =
        totalWrong;


    document.getElementById(
        "attemptedTotal"
    ).innerText =
        totalAttempted;


    document.getElementById(
        "accuracy"
    ).innerText =
        accuracy.toFixed(2) + "%";


    document.getElementById(
        "percentage"
    ).innerText =
        percentage.toFixed(2) + "%";


    document.getElementById(
        "result"
    ).classList.remove(
        "hidden"
    );


    document.getElementById(
        "result"
    ).scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================
   GET VALUE
========================================= */

function getValue(id) {

    const element =
        document.getElementById(id);


    if (!element) {

        return 0;

    }


    return Number(
        element.value
    ) || 0;

}


/* =========================================
   CREATE SAFE ID
========================================= */

function makeId(name) {

    return name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

}


/* =========================================
   SELECT EXAM CARD
========================================= */

function selectExam(exam) {

    document.getElementById(
        "examSelect"
    ).value =
        exam;


    changeExam();


    scrollToCalculator();

}


/* =========================================
   SCROLL FUNCTIONS
========================================= */

function scrollToCalculator() {

    document.getElementById(
        "calculator"
    ).scrollIntoView({
        behavior: "smooth"
    });

}


function scrollToFeatures() {

    document.getElementById(
        "features"
    ).scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================================
   RESET
========================================= */

function resetCalculator() {

    createSubjects();


    clearError();


    document.getElementById(
        "result"
    ).classList.add(
        "hidden"
    );

}


/* =========================================
   NEW CALCULATION
========================================= */

function newCalculation() {

    resetCalculator();


    scrollToCalculator();

}


/* =========================================
   ERROR
========================================= */

function showError(message) {

    const error =
        document.getElementById(
            "error"
        );


    error.innerText =
        "⚠️ " + message;


    error.classList.remove(
        "hidden"
    );

}


function clearError() {

    document.getElementById(
        "error"
    ).classList.add(
        "hidden"
    );

}


/* =========================================
   DARK MODE
========================================= */

function toggleTheme() {

    document.body.classList.toggle(
        "dark"
    );


    const button =
        document.getElementById(
            "themeBtn"
        );


    if (
        document.body.classList.contains(
            "dark"
        )
    ) {

        button.innerText = "☀️";


        localStorage.setItem(
            "theme",
            "dark"
        );

    }

    else {

        button.innerText = "🌙";


        localStorage.setItem(
            "theme",
            "light"
        );

    }

}


/* =========================================
   LOAD THEME
========================================= */

if (
    localStorage.getItem("theme")
    ===
    "dark"
) {

    document.body.classList.add(
        "dark"
    );


    const button =
        document.getElementById(
            "themeBtn"
        );


    if (button) {

        button.innerText = "☀️";

    }

}


/* =========================================
   MOBILE MENU
========================================= */

function toggleMenu() {

    document
        .getElementById("navMenu")
        .classList.toggle("active");

}


/* =========================================
   CLOSE MOBILE MENU
========================================= */

document.querySelectorAll(
    "#navMenu a"
).forEach(
    link => {

        link.addEventListener(
            "click",
            function () {

                document
                    .getElementById("navMenu")
                    .classList.remove("active");

            }
        );

    }
);


/* =========================================
   PRINT
========================================= */

function printResult() {

    window.print();

}
