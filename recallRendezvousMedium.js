const cardsNum = 16;

const keyFrames = [{transform: "rotateY(0deg)"}, {transform: "rotateY(180deg)"}];

const flippingTime = {
    duration: 350,
    iteration: 1,
};


let colours = ['yellow', 'yellow', 'green', 'green', 'red', 'red', 'orange', 'orange', 'purple', 'purple', 'pink', 'pink', 'brown', 'brown', 'blue', 'blue'];
let coloursOrdered = [];
let coloursClicked = [];
let clickedCounter = 0;
let flipped = false;
let colourChosen;
let pastColourID;
let flipBack = false;
let message = false;
let cardsFlipped = 0;
let seconds = 0;
let minutes = 0;
let myinterval;
let sound = new Audio("https://audio.jukehost.co.uk/rD1Pox482k2qw08DPhZmcOPa624jR9Hd");

window.onload = () => {
    playsound()
    console.log("This is recallRendezvous");
    for (let i = 0; i <= cardsNum-1; i++)
    {
        coloursOrdered[i] = randomColour();
        coloursClicked[i] = false;
    }
    console.log(coloursOrdered);
}

const playsound = () => {
    setTimeout(() => {
      try {
        document.getElementById("insuranceOfTheShin").play()
      }
      catch {
        playsound();
      }
      setTimeout(() => {
        if (document.getElementById("insuranceOfTheShin").paused) {
        playsound();
      }
      }, 100);
    }, 1000);
  }


function reset() {
    console.log("you are retrying");
    colours = ['yellow', 'yellow', 'green', 'green', 'red', 'red', 'orange', 'orange', 'purple', 'purple', 'pink', 'pink', 'brown', 'brown', 'blue', 'blue'];
    coloursOrdered = [];
    coloursClicked = [];
    clickedCounter = 0;
    flipped = false;
    flipBack = false;
    message = false;
    cardsFlipped = 0;

    clearInterval(myinterval);
    seconds = 0;
    minutes = 0;
    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s";
    document.getElementById("cardsFlipped").innerHTML = cardsFlipped

    for (let i = 0; i <= cardsNum-1; i++)
    {
        coloursOrdered[i] = randomColour();
        coloursClicked[i] = false;
    }
    console.log(coloursOrdered);

    for (let i = 0; i <= (cardsNum-1); i++)
    {
        changeColour("card" + i, 'default');
    }
}


function changeColour(elementId, color) {
    let canvas = document.getElementById(elementId);
    setTimeout(() => {
    canvas.className = color;
    }, 0);
    canvas.animate(keyFrames, flippingTime);
    sound.play();
}


function randomColour() {
    let colourChosenInt = Math.floor(Math.random()*colours.length);
    colourChosen = colours[colourChosenInt];
    colours.splice(colourChosenInt, 1);
    return colourChosen;
}


function complete() {
    let iscomplete = false;
    for (let i = 0; i <= cardsNum-1; i++) {
        iscomplete = coloursClicked[i];
        if (iscomplete == false){
            return false;
        }
    }
    return true;
}


function stopwatch() {
    seconds++;
    if (seconds == 60) {
        minutes++;
        seconds = 0;
    }
    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s";
}


function flip(elementId) {
    let colourPointer = elementId.substring(4,elementId.length);
    let iscomplete = false;

    if (clickedCounter == 0) {
        myinterval = setInterval(stopwatch, 1000);
    }

    if (coloursClicked[colourPointer] == true || flipBack == true) { // if already being clicked on dont change anything and exit the function
        return 0;
        console.log('Cant click here');
    } else {
        coloursClicked[colourPointer] = true
        clickedCounter ++;
    }

    colourChosen = coloursOrdered[colourPointer];
    changeColour(elementId, colourChosen);

    if (flipped == true) {
        flipped = false;
        let pastColourPointer = pastColourID.substring(4,pastColourID.length);
        let pastColour = coloursOrdered[pastColourPointer];

        if (pastColour != colourChosen) { // if they dont match flip them back over
            flipBack = true;
            setTimeout(() => {
                flipBack = false;
                changeColour(pastColourID, 'default');
                changeColour(elementId, 'default');
                coloursClicked[colourPointer] = false;
                coloursClicked[pastColourPointer] = false;
                pastColourID = elementId;
            }, 600);
        } else {
            cardsFlipped++;
            document.getElementById("cardsFlipped").innerHTML = cardsFlipped
        }
    } else {
        flipped = true;
        pastColourID = elementId;
    }

    setTimeout(() => {
    iscomplete = complete(); // checks if game is over
        if (iscomplete == true && message == false) {
            clearInterval(myinterval);
            let print = "You have beat Recall Rendezvous in " + minutes + "m " + seconds + "s using " + clickedCounter + " clicks";
            message = true;
            window.alert(print);
            let cookies = document.cookie.split(':')[0];
            document.cookie = cookies + ":" + " completed Medium difficulty in " + minutes + "m " + seconds + "s using " + clickedCounter + " clicks";
        }
    }, 500);
}