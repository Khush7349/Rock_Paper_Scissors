const choices = document.querySelectorAll('.choice');
const playerWeaponEl = document.querySelector('.player .weapon');
const computerWeaponEl = document.querySelector('.computer .weapon');
const playerScoreEl = document.querySelector('.player .score');
const computerScoreEl = document.querySelector('.computer .score');
const resultEl = document.querySelector('.result p');

let playerScore = 0;
let computerScore = 0;

function updateScore() {
    playerScoreEl.textContent = `Score: ${playerScore}`;
    computerScoreEl.textContent = `Score: ${computerScore}`;
}

choices.forEach(choice => {
    choice.addEventListener('click', function() {
        const playerChoice = this.id;
        playerWeaponEl.textContent = `Choice: ${playerChoice}`;
        const computerChoice = getComputerChoice();
        computerWeaponEl.textContent = `Choice: ${computerChoice}`;

        const winner = determineWinner(playerChoice, computerChoice);

        if (winner === 'player') {
            playerScore++;
            resultEl.textContent = 'You Win!';
            confetti();
        } else if (winner === 'computer') {
            computerScore++;
            resultEl.textContent = 'You Lose!';
        } else {
            resultEl.textContent = 'It\'s a Tie!';
        }

        updateScore();
    });
});

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return null;
    } else if (playerChoice === 'rock') {
        document.getElementById('rockSound').play();
        if (computerChoice === 'scissors') {
            return 'player';
        } else {
            return 'computer';
        }
    } else if (playerChoice === 'paper') {
        document.getElementById('paperSound').play();
        if (computerChoice === 'rock') {
            return 'player';
        } else {
            return 'computer';
        }
    } else if (playerChoice === 'scissors') {
        document.getElementById('scissorsSound').play();
        if (computerChoice === 'paper') {
            return 'player';
        } else {
            return 'computer';
        }
    }
}

function confetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) {
        const canvas = document.createElement('canvas');
        canvas.id = 'confetti-canvas';
        document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiCount = 200; // Increase the number of confetti pieces
    const confettiColors = ['#FF69B4', '#33CC33', '#66CCCC', '#FFCC00', '#0099CC'];
    const confettiPieces = [];
    const gravity = 0.1; // Add gravity to make confetti fall back down

    for (let i = 0; i < confettiCount; i++) {
        const confettiPiece = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: Math.random() * 10 - 5, // Increase the velocity to make confetti move faster
            vy: Math.random() * 10 - 5, // Increase the velocity to make confetti move faster
            radius: Math.random() * 10 + 2, // Increase the radius to make confetti larger
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        };
        confettiPieces.push(confettiPiece);
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < confettiPieces.length; i++) {
            const confettiPiece = confettiPieces[i];
            confettiPiece.x += confettiPiece.vx;
            confettiPiece.y += confettiPiece.vy;

            // Apply gravity to make confetti fall back down
            confettiPiece.vy += gravity;

            if (confettiPiece.x < 0 || confettiPiece.x > canvas.width) {
                confettiPiece.vx = -confettiPiece.vx;
            }
            if (confettiPiece.y < 0 || confettiPiece.y > canvas.height) {
                confettiPiece.vy = -confettiPiece.vy;
            }

            ctx.beginPath();
            ctx.arc(confettiPiece.x, confettiPiece.y, confettiPiece.radius, 0, 2 * Math.PI);
            ctx.fillStyle = confettiPiece.color;
            ctx.fill();
        }

        requestAnimationFrame(update);
    }

    update();
}