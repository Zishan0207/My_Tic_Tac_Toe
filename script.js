console.log("Welccome to Tic Ta Toe");
let wins = [];

let music = new Audio("crow_guitar.mp3")
// music.play()
let audioTurn = new Audio("click.mp3")
// let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("game_over.mp3")
let turn = "X"
let isgameOver = false

// Functio to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
}

// Function to check win
// const checkWin = () => {
//     let boxtext = document.getElementsByClassName("boxtext")

//     let wins = [
//         [0, 1, 2, 0, 5, 0],
//         [3, 4, 5, 0, 15, 0],
//         [6, 7, 8, 0, 25, 0],
//         [0, 3, 6, -10, 15, 90],
//         [1, 4, 7, 0, 15, 90],
//         [2, 5, 8, 10, 15, 90],
//         [0, 4, 8, 0, 15, 45],
//         [2, 4, 6, 0, 15, 135],
//     ]
//     wins.forEach(e => {
//         if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[1]].innerText === boxtext[e[2]].innerText) && (boxtext[e[0]].innerText !== "")) {
//             document.querySelector(".info").innerText = boxtext[e[0]].innerText + " Won"
//             isgameOver = true
//             document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "120px"
//             document.querySelector(".line").style.width = "30vw"
//             document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
//             gameover.play()
//         }
//     });
// }


function updateWins(mediaQuery) {
    if (mediaQuery.matches) {
        // Small screen (mobile)
        wins = [
            [0, 1, 2, 0, 10, 0],
            [3, 4, 5, 0, 30, 0],
            [6, 7, 8, 0, 50, 0],
            [0, 3, 6, -20, 30, 90],
            [1, 4, 7, 0, 30, 90],
            [2, 5, 8, 20, 30, 90],
            [0, 4, 8, 0, 30, 45],
            [2, 4, 6, 0, 30, 135],
        ];

    } else {
        // Large screen (desktop)
        wins = [
            [0, 1, 2, 0, 5, 0],
            [3, 4, 5, 0, 15, 0],
            [6, 7, 8, 0, 25, 0],
            [0, 3, 6, -10, 15, 90],
            [1, 4, 7, 0, 15, 90],
            [2, 5, 8, 10, 15, 90],
            [0, 4, 8, 0, 15, 45],
            [2, 4, 6, 0, 15, 135],
        ];
    }
}

// Setup media query once when script loads
const mediaQuery = window.matchMedia("(max-width: 1000px)");
mediaQuery.addEventListener("change", () => updateWins(mediaQuery));
updateWins(mediaQuery); // Initial call

const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[1]].innerText === boxtext[e[2]].innerText) &&
            (boxtext[e[0]].innerText !== "")) {
            
            document.querySelector(".info").innerText = boxtext[e[0]].innerText + " Won";
            isgameOver = true;
            document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "120px";
            if(mediaQuery.matches)
            {
                document.querySelector(".line").style.width = "60vw";
            }
            else{
                document.querySelector(".line").style.width = "30vw";
            }
            document.querySelector(".line").style.transform =
                `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            gameover.play();
        }
    });
};


// Game Logic

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        if (boxtext.innerText === "") {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameOver) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    })
});

// Add an event listener to Reset button
reset.addEventListener("click", () => {
    let boxtexts = document.getElementsByClassName("boxtext")
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X"
    isgameOver = false
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector(".line").style.width = "0"
    document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "0"
})