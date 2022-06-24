# README

## [Front-end repo](https://github.com/joshmrallen/mini-brain-fm)
## [Back-end repo](https://github.com/joshmrallen/mini_brain_backend)
---

## Description
This is a small audio player project I did originally as a code challenge for Brain.fm.

## How to Use
Goal of the project was to create a simple audio player.
The app presents you with 3 mental states.
1. Choose a mental state and click on it.
2. The audio player will show and start playing automatically.
3. Skip forward and back through tracks (3 tracks for each mental state).
4. Skip forward or backwards 15 seconds.

## Audio files
Audio files are completely in memory on the backend. No database was created for this mini project.

## How to install
### Back-end
1. Clone down the back-end repo.
2. Navigate to the back-end repo's location on your machine.
3. Run `rails s` command from command line.
4. The server will run on `http://localhost:3000`. If it doesn't due to your personal rails settings, you'll need to change the base url for the request in the front-end app.
5. Back-end needs to be running in order for the front-end app to successfully work.
### Front-end
1. Clone down the front-end repo.
2. Navigate to the front-end repo's location on your machine.
3. Run `npm start` from command line.
4. In your internet browser, navigate to `http://localhost:8080/`.
5. Follow the instructions from the [How to Use](#how-to-use) section.
