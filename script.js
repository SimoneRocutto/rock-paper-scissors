// let gameUIWrapper = document.getElementsByClassName("game-ui-wrapper")[0];
// let ajax = new XMLHttpRequest();
// ajax.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//         gameUIWrapper.innerHTML = ajax.responseText;
//         gameUIWrapper.style.background = "none";
//         let firstSign = document.getElementById("first-circle");
//         firstSign.classList.add(`picked-paper`);
//     }
// }
// ajax.open("GET", "./gameUI/picked.html", true);
// ajax.send();

let scorePoints = 0;
const signArr = ["rock", "paper", "scissors"];
function getResult(playerSign, enemySign) {
    const playerIndex = signArr.indexOf(playerSign);
    const enemyIndex = signArr.indexOf(enemySign);
    const difference = playerIndex - enemyIndex;
    let result;
    switch (true) {
        case (difference === 0):
            result = "DRAW";
            break;
        case (difference === 1 || difference === -2):
            result = "YOU WIN";
            break;
        default:
            result = "YOU LOSE";
    }
    return (result);
}

function callback() {
    const rulesButton = document.getElementById("btn");
    const rulesOverlay = document.getElementById("rules-overlay");
    const crossButton = document.getElementById("cross");
    const rock = document.getElementById("rock");
    const paper = document.getElementById("paper");
    const scissors = document.getElementById("scissors");
    let gameUIWrapper = document.getElementsByClassName("game-ui-wrapper")[0];

    let rulesSwitch = false;
    // rules
    rulesButton.addEventListener("click", (e) => {
        if (!rulesSwitch) {
            rulesOverlay.style.display = "flex";
            rulesSwitch = true;
        }
    })
    crossButton.addEventListener("click", (e) => {
        if (rulesSwitch) {
            rulesOverlay.style.display = "none";
            rulesSwitch = false;
        }
    });

    // gesture pick
    function seeResult(playerSign) {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                gameUIWrapper.innerHTML = ajax.responseText;
                gameUIWrapper.style.background = "none";
                let firstSign = document.getElementById("first-circle");
                firstSign.classList.add(`picked-${playerSign}`);
                setTimeout(() => {
                    const rdm = Math.floor(Math.random() * 3);
                    const enemySign = signArr[rdm];
                    let secondSign = document.getElementById("second-circle");
                    secondSign.classList.add(`picked-${enemySign}`);
                    const result = getResult(playerSign, enemySign);
                    setTimeout(() => {
                        const resultTitle = document.getElementsByClassName("result-title")[0];
                        resultTitle.innerText = result;
                        const pickedResultBox = document.getElementsByClassName("pickedresultbox")[0];
                        pickedResultBox.style.display = "flex";
                        switch (result) {
                            case ("YOU WIN"):
                                scorePoints++;
                                firstSign.classList.add("winning-circle");
                                break;
                            case ("YOU LOSE"):
                                secondSign.classList.add("winning-circle");
                                scorePoints--;
                                break;
                        }
                        const score = document.getElementsByClassName("score")[0];
                        score.innerText = scorePoints;
                        const playAgainButton = document.getElementsByClassName("play-again")[0];
                        playAgainButton.addEventListener("click", () => {
                            let restartRequest = new XMLHttpRequest();
                            restartRequest.onreadystatechange = () => {
                                if (this.readyState == 4 && this.status == 200) {
                                    gameUIWrapper.innerHTML = restartRequest.responseText;
                                    callback();
                                }
                            }
                            restartRequest.open("GET", "./gameUI/initial.html", true);
                            restartRequest.send();
                        });
                    }, 1000);
                }, 1000);
            }
        }
        ajax.open("GET", "./gameUI/picked.html", true);
        ajax.send();
    }

    // click listeners
    try {
        rock.addEventListener("click", () => {
            seeResult("rock");
        });
        paper.addEventListener("click", () => {
            seeResult("paper");
        });
        scissors.addEventListener("click", () => {
            seeResult("scissors");
        });
    } catch (error) { // todo: understand how to avoid the errors
        // console.log(error);
    }
}


callback();