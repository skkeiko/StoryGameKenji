
// --------------------------------------------------
// SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add fields for each scene, as relevant, to match your mockup
// 2) customize the scenes to fit your story
// 3) add any new fields to the function below
// --------------------------------------------------

// First, we create a variable for the current scene being displayed
let currentScene = "DiningArea";

// Then, we create an object that stores the data for each scene,
const scenes = {
  // See "backyard" for the first example
  CookingArea: {
    title: "Room One - Cooking Area",
    character: "Scene:Chef Frank",
    text: "You search the Cooking area. There are dozens of orders all asking for the new sauce piling up the station.",
    // you can choose how many choices to include
    // each choice can have text, an action, and/or nextScene
    choices: [
      {
        text: "Head over to the Freezer",
        action: function () {
          updateStress(5);
        },
        nextScene: "WalkinFreezer"
      },

      {
        text: "Talk to Chef Frank(+10 Stress)",
        action: function () {
          updateStress(10);
          messageDisplay.textContent = "STOP STANDING AROUND I NEED MY RECIPE";
          if (inventory.includes("Old recipe note")) {
            messageDisplay.textContent = "STOP STANDING AROUND I NEED MY RECIPE. Wait, THIS IS THE OLD RECIPE NOTE! I NEED THE NEW RECIPE NOTE! I NEED IT NOW!";
            updateStress(15);
          }
        },
        
      },
      {
          text: "look around the cooking area",
          action: function () {
            pickUpItem("Old recipe note");
            messageDisplay.textContent = "You found an old recipe note. Insignificant, but it may be useful later. IDK im just text. ";
          },
      }
    ]
  },

  WalkinFreezer: {
    title: "Location: Walk-In Freezer",
    character: "Interviewee:Sous-Chef Darren",
    text: "well what I remember...",
    choices: [
      {
        text: "Ask about the chef",
        action: function () {
          updateStress(10);
          messageDisplay.textContent = "Chef Frank is a great chef, but he can be a bit forgetful at times. He ran in with his clipboard, ran around in circles a couple times and ran out of the kitchen. I think he was looking for something, but I don't know what it was.";
        },
        
      },
         {
        text: "Ask about the dishwasher",
        action: function () {
          updateStress(5);
        },
        nextScene: "DishwasherRoom"
      }
    ]
  },


  DishwasherRoom: {
    title: "Dishwasher Room",
    text: "The smell of soap and steam fills the room. The dishwasher is humming in the corner.",
    choices: [
      {
        text: "Talk to the dishwasher",
        action: function () {
          updateStress(5);
        },
        nextScene: "Office"
      }
    ]
  },

   Office: {
    title: "The Office",
    text: "The office is cluttered with papers and files.",
    choices: [
      {
        text: "Look through the papers",
        action: LookthroughPapers,
      },
      {
        text: "Go back",
        nextScene: "CookingArea"
      }
    ]
  },

  DiningArea: {
    title: "Dining Area",
    text: "The dining area is a rush, with tables being cleared and new customers arriving. The smell of food fills the air. You see Chef Frank running around, looking for something.",
    choices: [
      {
        text: "Head into the Cooking Area",
        nextScene: "CookingArea"
      }
    ]
  },

   solution: {
    title: "The solution",
    text: "You didn't get fired!",
    
  },

  gameOver: {
    title: "Game Over",
    text: "You got fired! Click the Play the Game option above to try again, I was a bit lazy to code a restart button.", 
  }
};

// --------------------------------------------------
// UPDATE SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add a new const variable for each new field you added above
// Make sure to match the ids used in your mock up with the fields 
// 2) set the .textContent of each variable to the corresponding field in the scene object
// Use sceneTitle as a model
// --------------------------------------------------

// First, we create variables to hold the references to the HTML elements
// Technically you could just use document.getElementById('id-name') 
// in the function itself, but that would be very wordy 
// and make the code harder to read
const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const choicesContainer = document.getElementById("choices-container");
const characterName = document.getElementById("character-name");

// Then, we create a function to update the scene,
function updateScene(sceneName) {

  //This update the variable currentScene with the new scene passed as a parameter
  currentScene = sceneName;

  //This accesses the scene object based on the scene name
  const scene = scenes[sceneName];

  // Here, for each html element, you change the textContent to match
  // the appropriate text from the scene object
  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  characterName.textContent = scene.character;

  // Clear the old buttons before creating new ones
  choicesContainer.innerHTML = "";

  // Loop through each choice in the scene, connecting an action and nextScene if included
  scene.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.textContent = choice.text;

    button.addEventListener("click", function () {
      if (choice.action) {
        choice.action();
      }

      if (choice.nextScene) {
        updateScene(choice.nextScene);
      }
    });

    choicesContainer.appendChild(button);
  });
}

// This updates the screen with the current scene
updateScene(currentScene);


// --------------------------------------------------
// HEALTH
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// Either customize the name from health to steps, stress, etc...
// OR
// create a copy of each step for each additional state you want to track throughout the game
// --------------------------------------------------

// Create a variable for stress
let stress = 0;

// Display current stress
const stressDisplay = document.getElementById("Stress-display");

// Create a function to update health 
function updateStress(amount) {
  stress += amount;
  if (stress >= 100){
  stressDisplay.textContent = stress;
  updateScene("gameOver");
  }
  else{
  stressDisplay.textContent = stress;
  }
}


// This refreshes the stress display
updateStress(0);

// --------------------------------------------------
// INVENTORY
// Read through the comments below to see what this section does
//
// For now, you are probably leaving this section as is. 
// --------------------------------------------------

// Create a variable for inventory
let inventory = [];

// Display current inventory
const inventoryDisplay = document.querySelector("#inventory-display");
const messageDisplay = document.getElementById("message-display");

// Create a function to update inventory 
function pickUpItem(itemName) {
    // Add itemName to the inventory array
    // Show the updated inventory on the page
  inventory.push(itemName);
  inventoryDisplay.textContent = inventory.join(", ");
}

// --------------------------------------------------
// CONDITIONAL 
// Depending on how you want to implement the conditional logic, you may 
// simply adjust the names below or you may need to expand upon this section
// --------------------------------------------------

// Create a function that checks if the inventory contains one item and if so shows the win condition scene.
function LookthroughPapers() {
 if (inventory.includes("Recipe Note Reminder")) {
    pickupItem("New Recipe Note");
    messageDisplay.textContent = "You found the new recipe note! You can now give it to Chef Frank and save your job!";
  } else if(stress >= 75 ){
    pickupItem("Crinkled New Recipe Note");
    messageDisplay.textContent = "The significance of the pile of papers escapes you. But you are too stressed and decide to look through the papers anyway. ";
  }
  else {
    messageDisplay.textContent = "The significance of the pile of papers escapes you. ";
  }
}

function giveRecipeNote() {
  if (inventory.includes("New Recipe Note")) {
    updateScene("solution");
  } else {
    messageDisplay.textContent = "You don't have a recipe note to give to Chef Frank.";
  }
}