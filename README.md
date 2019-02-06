# SHPE UCF Mobile Apps
Mobile Applications (iOS & Android) for the Society of Hispanic Professional Engineers - UCF Chapter

## Install App for development/testing purposes

### Step 1 - Install
* Install Node.js: https://nodejs.org/en/
* Open up either Terminal(Mac) or Command Prompt(Windows) idk anything about linux
* Download React-Native https://facebook.github.io/react-native/docs/getting-started
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
  * Then run the emulator by going into the AVD(Looks like a purple screen with an android on the bottom right of it) and click the  green arrow.
  * Now you can finally run 'react-native run-android' on your command prompt
* The app will launch a packager, building the app and opening it for you. If you get an error, close the terminal window that's named React Packager and run the command above again, it might fail because it is building the app for the first time and simulator does not synch with packager. 
* Now you should have the app

### Debugging installation
* JAVA_HOME missing on:
 *MacOS - https://dalanzg.github.io/tips-tutorials/mac/2016/03/21/how-to-set-java_home-on-mac-os-x/
 *Windows - https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/
* ANDROID_HOME missing on:
 *MacOS(user2993582) - https://stackoverflow.com/questions/19986214/setting-android-home-enviromental-variable-on-mac-os-x
 *Windows(Hoque MD Zahidul) - https://stackoverflow.com/questions/27620262/sdk-location-not-found-define-location-with-sdk-dir-in-the-local-properties-fil
