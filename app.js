let userScore = 0;
let compScore = 0;
let rounds = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
}

const drawGame = () => {
    console.log("Game was draw.");
    msg.innerText = "Game was draw. Play again";
    msg.style.backgroundColor = "#0b2645";
}

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You lost! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
}

const checkGameOver = () => {
    if (rounds === 5) {
        if (userScore > compScore) {
            msg.innerText = `Game Over! 🎉 You won the game ${userScore} to ${compScore}`;
            msg.style.backgroundColor = "green";
        } else if (compScore > userScore) {
            msg.innerText = `Game Over! 💻 Computer won the game ${compScore} to ${userScore}`;
            msg.style.backgroundColor = "red";
        } else {
            msg.innerText = `Game Over! 🤝 It's a tie! ${userScore} - ${compScore}`;
            msg.style.backgroundColor = "#0b2645";
        }

        // Disable choices temporarily
        choices.forEach(choice => choice.style.pointerEvents = "none");

        // Restart game after 3 seconds
        setTimeout(() => {
            userScore = 0;
            compScore = 0;
            rounds = 0;
            userScorePara.innerText = userScore;
            compScorePara.innerText = compScore;
            msg.innerText = "Game restarted! Make your move.";
            msg.style.backgroundColor = "#222";
            choices.forEach(choice => choice.style.pointerEvents = "auto");
        }, 3000);
    }
}

const playGame = (userChoice) => {
    console.log("user choice = ", userChoice);
    const compChoice = genCompChoice();
    console.log("comp choice = ", compChoice);

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "rock" ? true : false;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }

    rounds++;
    checkGameOver();
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});
