 // Let's start by grabbing a reference to the <span> below.
 console.log('This ran');
 var userText = document.getElementById("user-text");


 updateWordDisplay();
 updatePicked();
 updateHangingTree();
console.log("This ran");


 // Next, we give JavaScript a function to execute when onkeyup event fires.
 document.onkeyup = function(event) {
     userText.textContent = event.key;
 };

 function updateWordDisplay() {
     var word = document.getElementById("word-display");
     word.textContent = "PLACEHOLDER";
      console.log('This ran');
 }


 function updatePicked() {
     var picked = document.getElementById("picked");
     picked.textContent = "a,b,c,d".toUpperCase();
 }

 function updateHangingTree(){
 	var tree=document.getElementById("hanging-tree");
 	tree.src="./assets/images/Hangman-1.png";
 	console.log(tree.src);
 }