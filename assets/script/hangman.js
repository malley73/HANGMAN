 // Let's start by grabbing a reference to the <span> below.
 var userText = document.getElementById("user-text");


 updateWordDisplay();
 updatePicked();



 // Next, we give JavaScript a function to execute when onkeyup event fires.
 document.onkeyup = function(event) {
     userText.textContent = event.key;
 };

 function updateWordDisplay() {
     var word = document.getElementById("word-display");
     word.textContent = "PLACEHOLDER";
 }


 function updatePicked() {
     var picked = document.getElementById("picked");
     picked.textContent = "a,b,c,d".toUpperCase();
 }