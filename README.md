# SHPE UCF Mobile Apps
Mobile Applications (iOS & Android) for the Society of Hispanic Professional Engineers - UCF Chapter

## Install App for development/testing purposes

### Step 1 - Install
* Install Node.js: https://nodejs.org/en/
* Open up either Terminal(Mac) or Command Prompt(Windows) idk anything about linux
* If you want an android emulator or are on Windows then you need Android Studio. https://developer.android.com/studio/
* After downloading android studio you need to download an emulator. https://developer.android.com/studio/run/managing-avds
* Clone this in your desired folder, change directory to do so. Ex. 'cd Desktop/whateverdirectoryyouwantorjustindesktop'
* Clone this repository by running 'git clone (address of repository)'. 
* Once cloned go into project folder 'cd shpeucfapp'
* Run 'npm install'


### Step 2 - Running the app
* If you want an iOS emulator and are on Windows, You're out of luck. But if you're on Mac then it should come with xCode.
* On the Terminal/Command Prompt make sure you are inside the project shpeucfapp/
* Mac: 'react-native run-ios'
* If you have android studio installed: 
  * First open Android Studio, then click open existing project and choose 'shpeucfapp/android'
  * Then run the emulator by going into the AVD(Android device manager and clicking the run arrow)
  * Now you can finally run 'react-native run-android'
* The app will launch a packager, building the app and opening it for you. If you get an error, close the terminal window that's named React Packager and run the command above again, it might fail because it is building the app for the first time and simulator does not synch with packager. 
* Now you should have the app

### Debugging/ Getting rid of errors
* If git is not a recognized command then download git-cli. https://git-scm.com/downloads
* If react-native is not a recognized command then download react-native-cli 'npm install -g react-native-cli'
* If JAVA_HOME is not set as an environment variable then you need to set it up: https://confluence.atlassian.com/doc/setting-the-java_home-variable-in-windows-8895.html   
  * Download JDK version 8, not 10 or 11 because those are buggy
  * Make sure that you download the JDK which is not the same as JRE. The website gives you an example of the path but your path will almost certainly be different. It will be in 'Users/ProgramFiles/Java/jdk-whateverversionhere'
