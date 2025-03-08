document.addEventListener("DOMContentLoaded", () => {
    const choices = ["rock", "paper", "scissors"];
    let playerChoice = "";
    let score = {
        wins: localStorage.getItem("wins") || 0,
        losses: localStorage.getItem("losses") || 0,
        ties: localStorage.getItem("ties") || 0
    };

    document.getElementById("wins").textContent = score.wins;
    document.getElementById("losses").textContent = score.losses;
    document.getElementById("ties").textContent = score.ties;

    document.querySelectorAll(".choice").forEach(img => {
        img.addEventListener("click", function() {
            document.querySelectorAll(".choice").forEach(i => i.classList.remove("selected"));
            this.classList.add("selected");
            playerChoice = this.id;
            startComputerTurn();
        });
    });

    function startComputerTurn() {
        const computerImg = document.getElementById("computer-choice");
        let shuffleIndex = 0;
        const shuffleInterval = setInterval(() => {
            computerImg.src = `images/${choices[shuffleIndex]}.png`;
            shuffleIndex = (shuffleIndex + 1) % choices.length;
        }, 500);

        setTimeout(() => {
            clearInterval(shuffleInterval);
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
            computerImg.src = `images/${computerChoice}.png`;
            determineWinner(playerChoice, computerChoice);
        }, 3000);
    }

    function determineWinner(player, computer) {
        let resultText = document.getElementById("result-text");
        if (player === computer) {
            resultText.textContent = "It's a tie!";
            score.ties++;
        } else if (
            (player === "rock" && computer === "scissors") ||
            (player === "scissors" && computer === "paper") ||
            (player === "paper" && computer === "rock")
        ) {
            resultText.textContent = "You win!";
            score.wins++;
        } else {
            resultText.textContent = "Computer wins!";
            score.losses++;
        }

        updateScore();
    }

    function updateScore() {
        localStorage.setItem("wins", score.wins);
        localStorage.setItem("losses", score.losses);
        localStorage.setItem("ties", score.ties);
        document.getElementById("wins").textContent = score.wins;
        document.getElementById("losses").textContent = score.losses;
        document.getElementById("ties").textContent = score.ties;
    }

    document.getElementById("reset-btn").addEventListener("click", () => {
        localStorage.clear();
        score = { wins: 0, losses: 0, ties: 0 };
        updateScore();
        document.getElementById("result-text").textContent = "Make your move!";
        document.getElementById("computer-choice").src = "images/question.png";
        document.querySelectorAll(".choice").forEach(i => i.classList.remove("selected"));
    });
});