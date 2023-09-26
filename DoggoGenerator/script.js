const DOG_URL = "https://dog.ceo/api/breeds/image/random";

let finalNum = 0;
let currentDoggos = 0;
let ranNum = randomNum();
let clicksLeft = 3;

const gallery = document.getElementById("gallery");

const doggos = document.getElementById("grid-wrap");
document.getElementById("dog-btn").addEventListener("click", addNewDoggo);

const endBtn = document.getElementById("stop-btn");
endBtn.addEventListener("click", stopClick);

const progressMessage = document.getElementById("progress-message");

async function addNewDoggo() {
  const promise = await fetch(DOG_URL);
  const processedResponse = await promise.json();
  console.log(processedResponse);

      // Create the outer div with class "img-wrap"
      const imgWrapDiv = document.createElement("div");
      imgWrapDiv.classList.add("img-wrap");

      // Create the inner div with class "dog-img"
      const dogImgDiv = document.createElement("div");
      dogImgDiv.classList.add("dog-img");
      dogImgDiv.style.backgroundImage = `url('${processedResponse.message}')`;
      dogImgDiv.style.backgroundSize = "cover";

      // Create the inner div with class "img-bg"
      const imgBgDiv = document.createElement("div");
      imgBgDiv.classList.add("img-bg");

      // Append the inner divs to the outer div
      imgWrapDiv.appendChild(dogImgDiv);
      imgWrapDiv.appendChild(imgBgDiv);

      // Append the outer div to the "dog-target" container
      doggos.appendChild(imgWrapDiv);
      count();
}

document.addEventListener('DOMContentLoaded', function () {
    // Get a reference to the button element
    const button = document.getElementById("dog-btn");

    // Function to simulate a button click
    function simulateButtonClick() {
        button.click(); // Simulate a click on the button
    }

    // Simulate button clicks three times
    for (let i = 0; i < 3; i++) {
        setTimeout(simulateButtonClick, i * 500); // Delay each click by 1 second (adjust as needed)
    }
});

function count () {
    const doggoCount = document.querySelectorAll(".dog-img");
    const countDiv = document.querySelector(".doggo-num");
    const clicksDiv = document.querySelector(".guesses-num");
    currentDoggos = doggoCount.length;
    countDiv.innerText = currentDoggos;
    clicksDiv.innerText = clicksLeft;
    if (currentDoggos > 3) {
      window.scrollTo(0, document.body.scrollHeight);
    }
    if (currentDoggos > ranNum) {
      loser();
    }
}

function randomNum () {
    const min = 4;
    const max = 56;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
}

function stopClick () {
    finalNum = currentDoggos;
    console.log(finalNum);
    console.log(ranNum);
    clicksLeft -= 1;
    count();
    if(clicksLeft <= 0) {
      loser();
    } else {
      if (finalNum === ranNum) {
        winner();
      }
      else if (finalNum > ranNum - 5) {
        alert("Now this is close!");
      }
      else if (finalNum > ranNum - 10 && finalNum < ranNum -5) {
        alert("You're getting warm!");
      }
      else {
        alert("Man, you're way off!");
      }
    }

}

function loser () {
  alert(`All Dogs hate you! Try again loser! There were ${ranNum} Dog's!`)
  setTimeout(function() {
    location.reload();
  },500)
}

function winner () {
  alert("You are the Winner, email me your bank details including your mother's maiden name and postcode, and we will send you a prize!")
  /* Function to open a form in a modal */
}


/*
users has up to three clicks to get as close as possible without going over the number.
with each finalClick the numClick needs to update.
if numClicks is over 3, then fire a loser function();
if numClicks < 3, evaluate the closeness of the final number.
If the finalnumber is within 5, alert "Wow, this is sooo close!"
If the final number is with in 10, alert "Getting warm!".
If the final Mnumber is outside of 10, then alert " You got a lot more Doggos to go!"
*/

/* TO DO */
/*
needs tweaking in design
repsonsiveness
change alerts to 'progress-message'
add score keeping utility
score coul be based on how close you get and how many guesses you have left.
The how to looks good in figma, but not so much in the browser.
more definition with gradients
animations
*/

// Old function
// function addNewDoggo() {
//   const promise = fetch(DOG_URL);
//   promise
//     .then(function (response) {
//       const processingPromise = response.text();
//       return processingPromise;
//     })
//     .then(function (processedResponse) {
//       const dogObject = JSON.parse(processedResponse);

//       // Create the outer div with class "img-wrap"
//       const imgWrapDiv = document.createElement("div");
//       imgWrapDiv.classList.add("img-wrap");

//       // Create the inner div with class "dog-img"
//       const dogImgDiv = document.createElement("div");
//       dogImgDiv.classList.add("dog-img");
//       dogImgDiv.style.backgroundImage = `url('${dogObject.message}')`;
//       dogImgDiv.style.backgroundSize = "cover";

//       // Create the inner div with class "img-bg"
//       const imgBgDiv = document.createElement("div");
//       imgBgDiv.classList.add("img-bg");

//       // Append the inner divs to the outer div
//       imgWrapDiv.appendChild(dogImgDiv);
//       imgWrapDiv.appendChild(imgBgDiv);

//       // Append the outer div to the "dog-target" container
//       doggos.appendChild(imgWrapDiv);
//       count();
//     });
// }