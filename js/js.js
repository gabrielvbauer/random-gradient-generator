const button = document.getElementById('change')
const automode = document.getElementById('auto')
const dropDown = document.getElementById('dropdown')
const bgConfig = document.getElementById('autoBGConfig')
const timeIntervalCustom = document.querySelector('#timeInterval')
const changeTimeIntervalButton = document.getElementById('changeTimeIntervalButton')
const timer = document.getElementById('timer')
const res = document.querySelector('.res')

//Getting the html to show after how many the combinations appeared after the verifications are done
const twoEquals = document.querySelector('.twoEquals')
const threeEquals = document.querySelector('.threeEquals')
const fourEquals = document.querySelector('.fourEquals')
const fiveEquals = document.querySelector('.fiveEquals')
const sixEquals = document.querySelector('.sixEquals')

//LocalStorage for storing the last gradient generated and applying
let gradient = localStorage.getItem('gradient')
document.body.style.background = gradient
res.innerHTML = gradient

//Events
button.addEventListener("click", changeBGOnce)
automode.addEventListener("click", changeBGAuto)
dropDown.addEventListener("click", showBGConfig)
changeTimeIntervalButton.addEventListener("click", changeBGAutoTime)

//Bools for better functions
let isRunning = false;
let changeOnce = false;
let isShowing = false;

//Variables that store the random generated number (Red, Green, Blue, Red2, Green2, Blue2)
let R
let G
let B
let RR
let GG
let BB

//Combination counter, how many times the numbers the numbers repeated. /two times/ /three times/ /four times/ /five times and six times
let thereIsTwoEqual = 0
let thereIsThreeEqual = 0
let thereIsFourEqual = 0
let thereIsFiveEqual = 0
let thereIsSixEqual = 0

//Default
const random = ((255 - 0 + 1) + 0)
let timerFormated
let consoleIndex = 0

//Only change this value for faster tests, this is the default value for the Auto Mode changing function. !!!!BE CAREFUL, LOW NUMBERS MAY CAUSE EPILEPSY ON SOME PEOPLE, USE IT AT YOUR OWN RESPONSABILITY!!!!
let timeIntervalCustomValue = 1000

//Core function, generates random orientation and two rgb values, save them in localStorage and assign it to the body css
function changeBG() {
    if (isRunning || changeOnce) {
        let orientation = generateRandomOrientation()

        R = generateRandomRGB()
        G = generateRandomRGB()
        B = generateRandomRGB()

        RR = generateRandomRGB()
        GG = generateRandomRGB()
        BB = generateRandomRGB()

        let gradientVal = `linear-gradient(${orientation}deg, rgb(${R},${G},${B}), rgb(${RR}, ${GG}, ${BB}))`
        localStorage.setItem('gradient', gradientVal)
        document.body.style.background = gradientVal
        res.innerHTML = gradientVal

        //Showing how many gradients already appeared. As i've seen, it generates around 14.5 thousand to 15 thousand gradients in 60 seconds. So for a good performance, it clears the console after 60 seconds
        consoleIndex += 1
        console.log(consoleIndex + " : " + R, G, B, RR, GG, BB)

        //Calling the function to verify how many times numbers were equal
        howManyTimesItAppeared()
    }
}

//Generate a random value from 0 to 255
function generateRandomRGB() {
    return Math.floor(Math.random() * (random));
}

//Generate a random value from 0 to 360 deg
function generateRandomOrientation() {
    return Math.floor(Math.random() * (360 - 0 + 1) + 0)
}

//Change the gradient only once per click
function changeBGOnce() {
    changeOnce = true
    changeBG()
}

//Change the gradient while isRunning bool is active, this is used for the Auto Mode
function changeBGAuto() {
    if (isRunning != true) {
        isRunning = true
        timerCount()
        setInterval(function() {
            changeBG();
        }, timeIntervalCustomValue)
    } else {
        isRunning = false
        location.reload()
    }
}

//Changes the change rate of the background gradient with the value that was put into the input on the configs
function changeBGAutoTime() {
    timeIntervalCustomValue = timeIntervalCustom.value
}

//Show the configuration menu for the auto mode
function showBGConfig() {
    if (isShowing != true) {
        isShowing = true
        dropDown.classList.remove("fa-chevron-up")
        dropDown.classList.add("fa-chevron-down")
        bgConfig.style.display = "block"
    } else {
        isShowing = false
        dropDown.classList.remove("fa-chevron-down")
        dropDown.classList.add("fa-chevron-up")
        bgConfig.style.display = "none"
    }
}

//Timer, it only starts if AutoMode starts
function timerCount() {
    let seconds = 0
    let minutes = 0
    let hours = 0

    setInterval(() => {
        if (isRunning == true) {
            seconds++
            if (seconds > 59) {
                seconds = 0
                minutes += 1
                consoleIndex = 0
                console.clear()
                if (minutes > 59) {
                    minutes = 0
                    hours += 1
                }
            }
            timerFormated = hours + ':' + minutes + ':' + seconds
            timer.textContent = timerFormated
        }
    }, 1000);
}

function howManyTimesItAppeared() {
    //Verirify if the numbers were equal
    let twoEqual = (R == G || R == B || R == RR || R == GG || R == BB || G == B || G == RR || G == GG || G == BB || B == G || B == RR || B == GG || B == BB)
    let threeEqual = (R == G && R == B || R == G && R == RR || R == G && R == GG || R == G && R == BB || R == B && R == RR || R == B && R == GG || R == B && R == BB || R == RR && R == GG || R == RR && R == BB || R == GG && R == BB)
    let fourEqual = (R == G && R == B && R == RR || R == G && R == B && R == GG || R == G && R == B && R == BB || R == B && R == RR && R == GG || R == B && R == RR && R == BB || R == RR && R == GG && R == BB)
    let fiveEqual = (R == G && R == B && R == RR && R == GG || R == G && R == B && R == RR && R == BB || R == B && R == RR && R == GG && R == BB)
    let sixEqual = (R == G && R == B && R == RR && R == GG && R == BB)

    if (twoEqual) {
        thereIsTwoEqual++
        twoEquals.textContent = `Two equal values: ${thereIsTwoEqual}`
    }
    if (threeEqual) {
        thereIsThreeEqual++
        threeEquals.textContent = `Three equal values: ${thereIsThreeEqual}`
    }
    if (fourEqual) {
        thereIsFourEqual++
        fourEquals.textContent = `Four equal values: ${thereIsFourEqual}`
    }
    if (fiveEqual) {
        thereIsFiveEqual++
        fiveEquals.textContent = `Five equal values: ${thereIsFiveEqual}`
    }
    if (sixEqual) {
        thereIsSixEqual++
        sixEquals.textContent = `Six equal values: ${thereIsSixEqual}`
        isRunning = false
        easterEgg()
    }
}

//Easter Egg function, only appears if all the six values of the gradient are exactly equal
function easterEgg() {
    document.body.innerHTML = `
        <div class="easterEgg" id="easterEgg">
            <h2>Congrats. You found us</h2>
            <p>This photo only appears if all the values from the gradient are exactly equal, except from the orientation value.<br>Please take a screenshot of the page and send to me on my discord: <strong>tizuyu#3800</strong>
            </p>
            <p>Believe me, the odds for a thing like this happening are 1 in 359,895,314,625 billion, wich is something around 0.00000000027785858%.</p>
            <div class="timer-easter" id="timer-easter">${timerFormated}</div>
            <p class="res"></p>
            <p class="twoEquals">Two equal values: ${thereIsTwoEqual}</p>
            <p class="threeEquals">Three equal values: ${thereIsThreeEqual}</p>
            <p class="fourEuals">Four equal values: ${thereIsFourEqual}</p>
            <p class="fiveEquals">Five equal values: ${thereIsFiveEqual}</p>
            <p class="sixEquals">Six equal values: ${thereIsSixEqual}</p>
        </div>
        <script src="js.js"></script>
    <script src="https://kit.fontawesome.com/9b436ef260.js " crossorigin="anonymous "></script>
        `
    document.body.style.background = `none`
    document.body.style.backgroundImage = `url(img/20191124_091416.jpg)`
    document.body.style.backgroundSize = `cover`
}