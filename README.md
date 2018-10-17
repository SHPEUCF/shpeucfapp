# SHPE UCF Mobile Apps
Mobile Applications (iOS & Android) for the Society of Hispanic Professional Engineers - UCF Chapter

## Install App for development/testing purposes

### Step 1 - Install
* install Node.js: https://nodejs.org/en/
* Open up either Terminal(Mac) or Command Prompt(Windows) idk anything about linux
* Clone this in your desired folder, change directory to do so. Ex. 'cd Desktop/whateverdirectoryyouwantorjustindesktop'
* Clone this repository by running 'git clone (address of repository)'. 
* Once cloned go into project folder 'cd shpeucfapp'
* Run npm install

### Step 2 - Running the app
* If running the simulator on Android Studio, it needs to be opened before running the app, however, Xcode will launch the simulator for you.
* On the Terminal/Command Prompt make sure you are inside the project shpeucfapp/
* run: react-native run-ios (run-android for Android Studio)
* The app will launch a packager, building the app and opening it for you. If you get an error, close the terminal window that's named React Packager and run the command above again, it might fail because it is building the app for the first time and simulator does not synch with packager. 
* Now you should have the app

### Debugging/ Getting rid of errors
* If git is not a recognized command then download git-cli. https://git-scm.com/downloads
* If react-native is not a recognized command then download react-native-cli 'npm install -g react-native-cli'
* If JAVA_HOME is not set as an environment variable then you need to set it up. 
* https://confluence.atlassian.com/doc/setting-the-java_home-variable-in-windows-8895.html
The steps above are a bit vague, but should get you going if you've been to meetings or have experience with Node.js or React. We will improve this docs soon. 

//Follow React Native environment set up here: https://facebook.github.io/react-native/docs/getting-started.html (Come to meetings for help if needed)


