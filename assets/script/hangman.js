    var wins = 0;
    var losses = 0;

    var gameover = true;
    var play = false
    var wordIndex = 0;
    var word = "";
    var wordMaster = "";
    var display = document.getElementById("word-display");
    var pickedDisp = document.getElementById("picked");
    var tree = document.getElementById("hanging-tree");
    var picked = [];
    var playerPick = "";
    var userText = "";
    var badpick = 0;
    var found = 0;
    var displayArray = [];
    var validPick = false;
    var winner = false;
    var loser = false;
    var level=1; //level 1 - Ultrahard, level 2- Hard
    var levelselect=true;

    var wordList = ['beekeeping', 'fluffiness', 'sleeveless', 'babies', 'puzzling', 'foxes', 'joker', 'jars', 'jazz', 'buzz', 'jinx', 'puff', 'quiz', 'voodoo', 'faking','headache','handcuff','woodshed','jawbone','photocopy','bikini','kilobyte','onyx','pneumonia','sphinx','twelfth','rhubarb'];

    var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    newGame();

    userText = document.getElementById("user-text");
    userText.textContent = "";

    document.onkeyup = function(event) {
        playerPick = event.key.toUpperCase();
        userText.textContent = event.key.toUpperCase();
        console.log("player pick " + playerPick);
        if (winner === true) {
            youWin();
        }
        if (loser === true) {
            youLose();
        }
        updatePicked();
    };

    function newGame() {
        // reinitialize variables for new game except wins/losses
        gameover = true;
        play = false
        wordIndex = 0;
        word = "";
        wordMaster = "";
        picked = [];
        playerPick = "";
        userText = "";
        badpick = 0;
        found = 0;
        displayArray = [];
        validPick = false;
        winner = false;
        loser = false;
        // new game?
        if (gameover === true) {
            if (wins === 0 && losses === 0) {
                play = confirm("Greetings Professor Falken. \nShall we play a game?");
            } else {
                play = confirm("Wins: " + wins + "\nLosses: " + losses + "\n\nWould you like to play again?");
            }
            console.log("New game: " + play);
            if (play === false) {
                location.replace("goodbye.html");
            } else {
                levelselect = confirm("Let's play the hard level.");
                if(levelselect===true){
                  level=2;
                  letsPlay();
                }else{
                  level=1;
                  alert("Welcome to the ULTRA HARD Level! Muahahahaha!!");
                  letsPlay();
                }
            }
        }
    }


    function letsPlay() {;

        userText = document.getElementById("user-text");
        userText.textContent = "";
        display = document.getElementById("word-display"); // reset word display
        display.textContent = "";
        pickedDisp = document.getElementById("picked"); // reset picked display
        pickedDisp.innerHTML = "";
        tree = document.getElementById("hanging-tree"); // reset tree
        tree.src = "./assets/images/Hangman-0.png";
        document.getElementById("win-lose").textContent="";
        //initilize word
        wordIndex = Math.floor(Math.random() * (wordList.length - 1));
        word = wordList[wordIndex].toUpperCase();
        wordMaster = word;
        console.log("the word is " + word)
        for (i = 0; i < word.length; i++) {
            displayArray[i] = "_";
            display.textContent = display.textContent + displayArray[i] + " ";
        }
    }


    function updatePicked() {
        if (winner === true) {
            youWin();
        }
        if (loser === true) {
            youLose();
        }
        pickedDisp = document.getElementById("picked");
        if(playerPick==="" || playerPick===null){
          return;
        }
        if (alphabet.indexOf(playerPick) === -1) { //is this a letter
            pickedDisp.innerHTML = playerPick + " is not a Letter. <br>Pick a letter.<br>"; // not a letter message - Using innerHTML to allow formatting <br>
            validPick = false;
        } else if (picked.indexOf(playerPick) === -1) { //has this been picked already?
            picked.push(playerPick);
            console.log(playerPick);
            pickedDisp.innerHTML = "";
            validPick = true;
        } else {
            pickedDisp.innerHTML = "You already picked " + playerPick + ". <br>Pick another letter.<br>"; // already picked message
            validPick = false;
        }
        for (i = 0; i < picked.length; i++) {
            pickedDisp.innerHTML = pickedDisp.innerHTML + picked[i].toUpperCase() + " "; //report of picked letters
        }
        if (validPick === true) {
            isLetterFound();
        }
    }


    function isLetterFound() {
        found = word.indexOf(playerPick);
        if (found === -1) {
            //Letter does not appear in the word.
            document.getElementById("win-lose").textContent="NOPE";
            badpick++;
            updateHangingTree();
        } else {
            document.getElementById("win-lose").textContent=" ";
            updateWordDisplay();
        }
    }


    function updateWordDisplay() {
        display = document.getElementById("word-display");
        for (i = 0; i < word.length; i++) {
            if (playerPick === word.charAt(i)) {
                word = word.slice(0, i) + "_" + word.slice(i + 1, word.length);
                displayArray[i] = playerPick;
                display.textContent = "";
                for (j = 0; j < word.length; j++) {
                    display.textContent = display.textContent + displayArray[j] + " ";
                }
            }
        }
        if (displayArray.indexOf("_") === -1) {
            winner = true;
            document.getElementById("win-lose").textContent="YOU WIN!!!!";
            pickedDisp.innerHTML = "The word was: " + wordMaster + "<br> Press Any Key to Continue.";
        }
    }


    function updateHangingTree() {
        if (badpick % level === 0) {
            tree = document.getElementById("hanging-tree");
            tree.src = "./assets/images/Hangman-" + badpick / level + ".png";
        }
        if (badpick === 6*level) {
            loser = true;
            document.getElementById("win-lose").textContent="YOU LOSE";
            pickedDisp.innerHTML = "The word was: " + wordMaster + "<br> Press Any Key to Continue.";
            var snd = new Audio("./assets/images/minion.wav"); // buffers automatically when created snd.play();
            snd.play();
        } 
    }

    

    function youWin() {
        console.log('you win');
        gameover = true;
        wins++;
        newGame(); 
    }


    function youLose() {
        console.log('you lose');
        gameover = true;
        losses++;
        newGame();
    }