# Random Linear Gradient Generator
Hi there, this is my first solo JavaScript program that i worked for real. I've made it just for fun at the start using codepen, but after a few minutes i've decided to use vscode and put more effort into it, adding more functions and data visualization aswell.

# The interface
Well, firstly, there are **two buttons**, one changes the background gradient **only once per click**, while the other starts an **Auto Mode** wich will change the gradient acording to the value the user had put into the configuration menu, or by the default value of **1000 miliseconds (1 second)**.

![Buttons](https://i.ibb.co/FzqphKw/buttons.png)

The arrow pointing up is the **configuration menu**, by entering it the user can then **change the change rate of the background gradient**, **get the value of the current gradient** and **see how many times values were equal**.

![Configuration Menu](https://i.ibb.co/jrV7QzQ/config-Menu.png)

The timer at the top right of the screen is a timer, there isn't much things to say about it.

# How does it work?
Using JavaScript **random( )** method, the program generates a **random value** from **0 to 255**, and a **orientation value** that goes from **0 to 360** and assign those values to variables, wich then goes to the background gradient.
That's pretty much everything done.

# Wait, there's more...
If you stop and think for a moment *"Why there's a timer?"*, well, there's an **if statement** that when **all the six randomly generated values are exactly equal**, it shows a little secret. The timer is to know how much time it took to get this **1 in 359 billion** chance of getting all the six values equal

I've made some calculations, and there's aproximately **359,895,314,625 billions of combinations possible**, wich is equal to **0.00000000027785858% of chance**

# That's it
I'm out of ideas to add to this project right now, so it's pretty much done by now. If you wanna try and get to the little secret **first than anyone**, just **open the link and start using it**, you can put any value as the velocity, feel free.

**Plus**

if you want, you can just get the code in the end of the JS file and see what's is the "secret", but it wouldn't be funny, so it's your choice :)
