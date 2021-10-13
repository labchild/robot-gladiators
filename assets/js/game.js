console.log("Welcome, Robots!");

// initial player stats
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

// print multiple values to console
console.log(playerName, playerAttack, playerHealth);

// initial enemy stats
var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

// the fight begins function
var fight = function () {
    // Alert players that they are starting the round
    window.alert("Welcome to Robot Gladiators!");

    //Subtract value of 'playerAttack' from the value of 'enemyHealth'
    enemyHealth = enemyHealth - playerAttack;

    // log a resulting message to the console so we know it worked
    console.log(
        playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    );

    // check enemy health
    if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");
    }
    else {
        window.alert(enemyName + " still has " + enemyHealth + " health left!")
    }

    //subtract the value of 'enemyAttack' from the value of 'playerHealth'
    playerHealth = playerHealth - enemyAttack;

    // log a message to the console so we know that it work
    console.log(
        enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );

    // check player health
    if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
    }
    else {
        window.alert(playerName + " has " + playerHealth + " health left!")
    }
};

fight();