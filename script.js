const rulesButton = document.getElementById("btn");
const rulesOverlay = document.getElementById("rules-overlay");
const crossButton = document.getElementById("cross");
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
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
rock.addEventListener("click", (e) => {
    console.log("rock");
});
paper.addEventListener("click", (e) => {
    console.log("paper");
});
scissors.addEventListener("click", (e) => {
    console.log("scissors");
});