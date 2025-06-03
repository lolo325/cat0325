const verbs = [
    // ÊTRE (to be)
    { verb: "être", tense: "plus-que-parfait", forms: { je: "avais été", tu: "avais été", il: "avait été", elle: "avait été", nous: "avions été", vous: "aviez été", ils: "avaient été", elles: "avaient été" } },
    { verb: "être", tense: "futur antérieur", forms: { je: "aurai été", tu: "auras été", il: "aura été", elle: "aura été", nous: "aurons été", vous: "aurez été", ils: "auront été", elles: "auront été" } },
    { verb: "être", tense: "futur simple", forms: { je: "serai", tu: "seras", il: "sera", elle: "sera", nous: "serons", vous: "serez", ils: "seront", elles: "seront" } },
    { verb: "être", tense: "conditionnel présent", forms: { je: "serais", tu: "serais", il: "serait", elle: "serait", nous: "serions", vous: "seriez", ils: "seraient", elles: "seraient" } },
    { verb: "être", tense: "présent de l'indicatif", forms: { je: "suis", tu: "es", il: "est", elle: "est", nous: "sommes", vous: "êtes", ils: "sont", elles: "sont" } },

    // AVOIR (to have)
    { verb: "avoir", tense: "passé composé", forms: { je: "ai eu", tu: "as eu", il: "a eu", elle: "a eu", nous: "avons eu", vous: "avez eu", ils: "ont eu", elles: "ont eu" } },
    { verb: "avoir", tense: "imparfait", forms: { je: "avais", tu: "avais", il: "avait", elle: "avait", nous: "avions", vous: "aviez", ils: "avaient", elles: "avaient" } },
    { verb: "avoir", tense: "futur simple", forms: { je: "aurai", tu: "auras", il: "aura", elle: "aura", nous: "aurons", vous: "aurez", ils: "auront", elles: "auront" } },
    { verb: "avoir", tense: "conditionnel présent", forms: { je: "aurais", tu: "aurais", il: "aurait", elle: "aurait", nous: "aurions", vous: "auriez", ils: "auraient", elles: "auraient" } },

    // ALLER (to go) - Irregular & uses ÊTRE in compound tenses
    { verb: "aller", tense: "passé composé", forms: { je: "suis allé(e)", tu: "es allé(e)", il: "est allé", elle: "est allée", nous: "sommes allé(e)s", vous: "êtes allé(e)(s)", ils: "sont allés", elles: "sont allées" } },
    { verb: "aller", tense: "présent de l'indicatif", forms: { je: "vais", tu: "vas", il: "va", elle: "va", nous: "allons", vous: "allez", ils: "vont", elles: "vont" } },
    { verb: "aller", tense: "futur simple", forms: { je: "irai", tu: "iras", il: "ira", elle: "ira", nous: "irons", vous: "irez", ils: "iront", elles: "iront" } },

    // FAIRE (to do/make)
    { verb: "faire", tense: "passé composé", forms: { je: "ai fait", tu: "as fait", il: "a fait", elle: "a fait", nous: "avons fait", vous: "avez fait", ils: "ont fait", elles: "ont fait" } },
    { verb: "faire", tense: "présent de l'indicatif", forms: { je: "fais", tu: "fais", il: "fait", elle: "fait", nous: "faisons", vous: "faites", ils: "font", elles: "font" } },

    // PARLER (to speak) - Regular -ER verb
    { verb: "parler", tense: "passé composé", forms: { je: "ai parlé", tu: "as parlé", il: "a parlé", elle: "a parlé", nous: "avons parlé", vous: "avez parlé", ils: "ont parlé", elles: "ont parlé" } },
    { verb: "parler", tense: "présent de l'indicatif", forms: { je: "parle", tu: "parles", il: "parle", elle: "parle", nous: "parlons", vous: "parlez", ils: "parlent", elles: "parlent" } },
    { verb: "parler", tense: "futur simple", forms: { je: "parlerai", tu: "parleras", il: "parlera", elle: "parlera", nous: "parlerons", vous: "parlerez", ils: "parleront", elles: "parleront" } },

    // FINIR (to finish) - Regular -IR verb (2nd group)
    { verb: "finir", tense: "passé composé", forms: { je: "ai fini", tu: "as fini", il: "a fini", elle: "a fini", nous: "avons fini", vous: "avez fini", ils: "ont fini", elles: "ont fini" } },
    { verb: "finir", tense: "présent de l'indicatif", forms: { je: "finis", tu: "finis", il: "finit", elle: "finit", nous: "finissons", vous: "finissez", ils: "finissent", elles: "finissent" } },

    // VENDRE (to sell) - Regular -RE verb
    { verb: "vendre", tense: "passé composé", forms: { je: "ai vendu", tu: "as vendu", il: "a vendu", elle: "a vendu", nous: "avons vendu", vous: "vendez", ils: "ont vendu", elles: "ont vendu" } },
    { verb: "vendre", tense: "présent de l'indicatif", forms: { je: "vends", tu: "vends", il: "vend", elle: "vend", nous: "vendons", vous: "vendez", ils: "vendent", elles: "vendent" } }
];

let score = 0;
let timeLeft = 60;
let timer;
let currentQuestion = null;
let player = "";
let audioPlayed = false;

const bgMusic = document.getElementById("bgMusic");
const playerNameInput = document.getElementById("playerName");
const playerNameFeedback = document.getElementById("playerNameFeedback");

function startGame() {
    player = playerNameInput.value.trim();
    if (!player) {
        playerNameFeedback.textContent = "Please enter your name to start!";
        playerNameInput.focus();
        return;
    }
    playerNameFeedback.textContent = "";

    if (!audioPlayed) {
        bgMusic.volume = 0.3;
        bgMusic.play().catch(e => console.log("Autoplay prevented:", e));
        audioPlayed = true;
    }

    document.getElementById("login").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("gameOver").style.display = "none";
    score = 0;
    timeLeft = 60;
    updateScore();
    updateTimer();

    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
    nextQuestion();
}

function updateScore() {
    document.getElementById("score").innerText = `Score: ${score}`;
}

function updateTimer() {
    document.getElementById("timer").innerText = `Time: ${timeLeft}`;
}

function nextQuestion() {
    const currentVerbData = verbs[Math.floor(Math.random() * verbs.length)];
    const subjects = Object.keys(currentVerbData.forms);
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const correctAnswer = currentVerbData.forms[subject];
    currentQuestion = { currentVerbData, subject, correctAnswer };

    document.getElementById("question").innerText = `${currentVerbData.verb} – ${currentVerbData.tense} – ${subject}`;
    const grid = document.getElementById("moleGrid");
    grid.innerHTML = "";

    const options = new Set([currentQuestion.correctAnswer]);

    while (options.size < 9) {
        let randomVerbData = verbs[Math.floor(Math.random() * verbs.length)];
        let randomSubject = subjects[Math.floor(Math.random() * subjects.length)];

        let incorrectOption = randomVerbData.forms[randomSubject];

        if (Math.random() < 0.5 && randomVerbData.verb === currentVerbData.verb) {
             const otherSubjects = subjects.filter(s => s !== subject);
            if (otherSubjects.length > 0) {
                const s = otherSubjects[Math.floor(Math.random() * otherSubjects.length)];
                incorrectOption = currentVerbData.forms[s];
            } else {
                const otherTenses = verbs.filter(v => v.verb === currentVerbData.verb && v.tense !== currentVerbData.tense);
                if (otherTenses.length > 0) {
                     incorrectOption = otherTenses[Math.floor(Math.random() * otherTenses.length)].forms[subject];
                }
            }
        }

        if (incorrectOption !== currentQuestion.correctAnswer) {
            options.add(incorrectOption);
        }
    }

    Array.from(options).sort(() => 0.5 - Math.random()).forEach(opt => {
        const btn = document.createElement("div");
        btn.className = "mole";
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, btn);
        grid.appendChild(btn);
    });
}

function checkAnswer(ans, clickedButton) {
    const buttons = document.querySelectorAll(".mole");
    buttons.forEach(btn => {
        btn.onclick = null;
    });

    buttons.forEach(btn => {
        if (btn.innerText === currentQuestion.correctAnswer) {
            btn.classList.add("correct");
        }
    });

    if (ans === currentQuestion.correctAnswer) {
        score += 5;
    } else {
        score -= 1;
        clickedButton.classList.add("incorrect");
    }
    updateScore();

    setTimeout(nextQuestion, 1000);
}

function endGame() {
    clearInterval(timer);
    bgMusic.pause();

    const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    leaderboard.push({ name: player, score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard.slice(0, 10)));
    renderLeaderboard();

    document.getElementById("game").style.display = "none";
    document.getElementById("gameOver").style.display = "block";
    document.getElementById("finalScoreText").innerText = `Ton score final: ${score} points!`;
}

function restartSamePlayer() {
    startGame();
}

function goToLogin() {
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("login").style.display = "block";
    playerNameInput.value = "";
    audioPlayed = false;
}

function renderLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    const list = document.getElementById("leaderboardList");
    list.innerHTML = "";
    if (leaderboard.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No scores yet. Be the first!";
        list.appendChild(li);
    } else {
        leaderboard.forEach((entry, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${entry.name} – ${entry.score}`;
            list.appendChild(li);
        });
    }
}

renderLeaderboard();