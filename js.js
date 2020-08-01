const button = document.getElementById('change')
const automode = document.getElementById('auto')
const dropDown = document.getElementById('dropdown')
const bgConfig = document.getElementById('autoBGConfig')
const timeIntervalCustom = document.querySelector('#timeInterval')
const changeTimeIntervalButton = document.getElementById('changeTimeIntervalButton')
const timer = document.getElementById('timer')
let res = document.querySelector('.res')

//LocalStorage
let gradient = localStorage.getItem('gradient')

//Events
button.addEventListener("click", changeBGOnce)
automode.addEventListener("click", changeBGAuto)
dropDown.addEventListener("click", showBGConfig)
changeTimeIntervalButton.addEventListener("click", changeBGAutoTime)

//Bools
let isRunning = false;
let changeOnce = false;
let isShowing = false;
let foundUs = false;

//Default
document.body.style.background = localStorage.getItem('gradient')
res.innerHTML = localStorage.getItem('gradient')
const random = ((255 - 0 + 1) + 0)
let timeIntervalCustomValue = 1000
let timerFormated
let consoleIndex = 0

//Core function, generates random orientation and two rgb values, save them in localStorage a assign it to the body css
function changeBG() {
    if (isRunning || changeOnce) {
        let orientation = generateRandomOrientation()

        let R = generateRandomRGB()
        let G = generateRandomRGB()
        let B = generateRandomRGB()

        let RR = generateRandomRGB()
        let GG = generateRandomRGB()
        let BB = generateRandomRGB()

        let gradientVal = `linear-gradient(${orientation}deg, rgb(${R},${G},${B}), rgb(${RR}, ${GG}, ${BB}))`
        localStorage.setItem('gradient', gradientVal)

        document.body.style.background = gradientVal
        res.innerHTML = gradientVal

        consoleIndex += 1
        console.log(consoleIndex + " : " + R, G, B, RR, GG, BB)

        if (R == G && R == B && R == RR && R == GG & R == BB) {
            isRunning = false
            foundUs = true
            easterEgg()
        }
    } else {

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

//Easter Egg function
function easterEgg() {
    document.body.innerHTML = `
        <div class="easterEgg" id="easterEgg">
            <h2>Congrats. You found us</h2>
            <p>This photo only appears if all the values from the gradient are exactly equal, except from the orientation value.<br>Please take a screenshot of the page and send to me on my discord: <strong>tizuyu#3800</strong>
            </p>
            <p>Believe me, the odds for a thing like this happening are 1 in 359,895,314,625 billion, wich is something around 0.00000000027785858%.</p>
            <div class="timer-easter" id="timer-easter">${timerFormated}</div>
        </div>
        <script src="js.js"></script>
    <script src="https://kit.fontawesome.com/9b436ef260.js " crossorigin="anonymous "></script>
        `
    document.body.style.background = `none`
    document.body.style.backgroundImage = `url(20191124_091416.jpg)`
    document.body.style.backgroundSize = `cover`
}