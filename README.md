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
    * MacOS - https://dalanzg.github.io/tips-tutorials/mac/2016/03/21/how-to-set-java_home-on-mac-os-x/
    * Windows - https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/
* ANDROID_HOME missing on:
    * MacOS(user2993582) - https://stackoverflow.com/questions/19986214/setting-android-home-enviromental-variable-on-mac-os-x
    * Windows(Hoque MD Zahidul) - https://stackoverflow.com/questions/27620262/sdk-location-not-found-define-location-with-sdk-dir-in-the-local-properties-fil
* Print: Entry, ":CFBundleIdentifier", Does Not Exist:
    *IDK UPDATE HERE WITH FIX
    
    
//WORK IN PROGRESS
# SHPE @ UCF Mobile app Development

Creating an app to facilitate and assist SHPE @ UCF in their daily tasks.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Java 8 jdk if running an Android Virtual Device (Will not work with higher version as of when this was made) 
- to check your version open your Command Prompt/Terminal and run 'java -version'
- Download here: https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
- You need to set up Java_Home if this is your first time running java or have never done it before.
    * MacOS - https://dalanzg.github.io/tips-tutorials/mac/2016/03/21/how-to-set-java_home-on-mac-os-x/
    * Windows - https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/

Android Studio to use an Android Virtual Device
- If you want to run on a physical device follow this: https://facebook.github.io/react-native/docs/running-on-device
- Download here: https://developer.android.com/studio

XCode version 9.1+
- You can only download this on *MacOS* through the App store
- If you want to use a physical device follow this: https://facebook.github.io/react-native/docs/running-on-device
- Make sure you are signed in to your apple account and that your account is a developer account!

Node 6
- MacOS:
  - Download HomeBrew here: https://brew.sh/
  - On your terminal write: brew install node@6
-Windows:
  - Download the file that ends with .msi here: https://nodejs.org/dist/v0.6.9/
  - If that link doesn't work try looking for the version here https://nodejs.org/dist/

If you don't have git installed
- install git here: https://git-scm.com/downloads
```

### Installing

A step by step series of examples that tell you how to get a development env running

Install the repository
```

```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc



