## Why?

This project was born from the will of doing a game engine from scratch. I have learned lots of valued stuff from it, and improved a lot my design and programing skills.

This its a pasion project not a production one, the drive of this project its to study.

If you need a game engine i sugest to use Matter.js that its an amazing minimalistic engine.

### Spell Engine 

Spell its not exacly a game engine, because has no colision yet.

Spell its a scheduler engine... what means that will organize a game loop flow allowing the injection of tools to render and move objects

**Loop based data driven** 

the entire engine works as a loop with callbacks inside callbacks with a global scope based on static classes.
The static classes are holding the game objects and states and the loops apply modifiers to the data, that means that the common flux its to define a callback loop that receive the static classes and allow the loading and modification of attributes on that objects.


### Engine in action 

Currently im working in a few games based on this game engine the most "completed" but yet in progress its called JUMP a homage to the famous Dinossaur run game from google chrome:

https://jump-f1bca.web.app/