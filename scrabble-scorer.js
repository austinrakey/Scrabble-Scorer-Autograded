// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = toBeScored.toUpperCase();
	let letterPoints = "";
   
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let toBeScored = '';

function initialPrompt() {
   let wordInput = input.question("Let's play some scrabble! Enter a word: ");
 
toBeScored = wordInput

   return wordInput;
};



let simpleScorer = function (toBeScored){
   let score = toBeScored.length;

return score;
};



let vowelBonusScorer = function (toBeScored){
   let vowels = ['a', 'e', 'i', 'o', 'u'];
   let score = 0;
   let scrabArray = (toBeScored.toLowerCase().split(''));
   for (i = 0; i < scrabArray.length; i++){
      if (vowels.includes(scrabArray[i])){
         score += 3
      } else {
         score += 1
      }     
}
   return score
};


let scrabbleScorer = function (toBeScored) {
   let score = 0
   word = (toBeScored.toLowerCase().split(''));
      for (i = 0; i < word.length; i++){
        score += (newPointStructure[word[i]]);
      }
   return score;
};


const scoringAlgorithms = [
{
name: "Simple",
description: "Each letter is worth 1 point.",
scorerFunction: simpleScorer
},
{
name: "Vowel",
description: "Vowels are 3 pts, consonants are 1 pt.",
scorerFunction: vowelBonusScorer
},
{
name: "Scrabble", 
description: "The traditional scoring algorithm.", 
scorerFunction: scrabbleScorer
},
];


function scorerPrompt() {
    let algoChoice = -1;
    while ((algoChoice >= 3) || (algoChoice <= -1)){

   algoChoice = input.question("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: ")
    }
   score = scoringAlgorithms[algoChoice].scorerFunction(toBeScored);
    
console.log(`Score for ${toBeScored}: ${score}`);
   return score;
};


function transform(oldScoreKey) {
   const newScoreKey = {};
   for (const [letterValue, letterArr] of Object.entries(oldScoreKey)) {
     for (const letter of letterArr) {
       newScoreKey[letter.toLowerCase()] = Number(letterValue);
     }
   }
   return newScoreKey;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   scorerPrompt();
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
