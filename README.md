# --------/ H E P T A G R A M \\--------

## DUAL VOICE GEOMETRIC STEP SEQUENCER

![Alt text](./ScreenShot2.jpg?raw=true "Screen Shot")

### Check it out: https://heptagram.vercel.app/

### Description:
A site that displays a geometric UI that includes control sliders to create and manipulate sound. At its core it will be a recreation of a late 70’s era step sequencer and synthesizer which combined together create a platform to generate dreamy, hypnotic, minimal electronic patterns and melodies.

### Use Case:
The user will be presented with a stylized page containing a large geometrical shape (Heptagram) and various controls (buttons, sliders). Each segment of the Heptagram (14 total) can be selected which will open up an edit window outlined in blue. In the edit window you can activate/deactivate the segment (step) and select the note (pitch). The Heptagram is surrounded by various banks of sliders that control various effects, settings and sounds for the two synthesizer voices. Hitting play in the upper right will start the sequence and you’re off to space!

### MVP:
* A built out step sequencer where you can turn steps on/off and control the pitch (note) of each step.
* A full synthesizer that is triggered by the sequencer. 
* Controls to manipulate the synthesizer with a filter, envelope, distortion and delay. 
* A geometric visual control interface for the sequencer.

### Tools for the job:
* Visual Studio Code
* Node.js
* React
* JavaScript
* Web Audio API
* Tone.js
* SVG

### Things I would like to add:
* Ability to create a profile and log in
* Hosted with a database so users can save their scenes. 
* Mobile Support 
* Once you create a scene you can save your settings, name it and recall it later. 
* Add more controls to manipulate sounds.
* Add more options to each step in the sequencer, such as tie or skip. 
* Add additional/different geometric shapes.
* Add more visuals using Three.js or something similar

### Additional Information:
* Limited Browser support. Built and tested using Chrome! I tried it out in Safari on my iPad and it works but the sound can get distorted. Haven't figured that out yet. No clue about other browsers yet...just use Chrome!
* Window resizing isn't quite dialed in yet, it looks alright on my iPad but needs work for smaller resolutions.

### License:

MIT

Copyright (c) 2020 **STOLLERSYSTEM**