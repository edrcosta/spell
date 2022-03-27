## Why?

This project was born from the will of doing a game engine from scratch. I have learned lots of valued stuff from it, and improved a lot my design and programing skills.

This its a pasion project not a production one, the drive of this project its to study.

If you need a game engine i sugest to use Matter.js that its an amazing minimalistic engine.

### Spell Engine 

Spell its a scheduler engine... what means that will organize a game loop flow allowing the injection of tools to render and move objects

**Loop based data driven** 

the entire engine works as a loop with callbacks inside callbacks with a global scope based on static classes.
The static classes are holding the game objects and states and the loops apply modifiers to the data, that means that the common flux its to define a callback loop that receive the static classes and allow the loading and modification of attributes on that objects.

### Engine in action 

Currently im working in a few games based on this game engine the most "completed" but yet in progress its called JUMP a homage to the famous Dinossaur run game from google chrome:

https://jump-f1bca.web.app/

![image](https://user-images.githubusercontent.com/3594012/160288393-faac7273-65af-4dbc-9ae0-0d6cca47703d.png)

**Loop based data driven** 

Spell its mostly a bunch of classes that holds data across a loop... Think about that as a "game state" 
the most important class its simple a game class that controls the game loop callback... well every game is essensialy a loop 

Inside the loop you will have a few injected tools similar to modules that also will work mostly in a singleton pattern (basicly a "state of the current frame in memory") this tools will evolve with time and become something more and more complex 

**The cartesian problem**

how i see the cartesian problem of browsers where 0 its the up left conner and not the bottom left its not a problem at all if we all take in consideration that cartesian math its conversible and we are just at the bottom right of the graph so its eassily fixable... very very eassily @todo and the  browser cartesian system its more natural ask a nom very good math person what its the first pixel? LOL 
