# SHPE @ UCF Mobile App Development
![SHPE UCF](https://www.shpeucf.com/wp-content/uploads/2019/09/shpe-banner-white-background.png)

An open-source application used to aid in the organization of SHPE @ UCF and simplify everyone's jobs.

## Getting Started
Follow these instructions to get you started in contributing to the SHPE UCF app.

## Contents
* [Pre-requisites](#pre-requisites)
	* [Windows](#windows)
	* [MacOS](#macos)
* [Installation](#installation)
* [Running](#running)
* [About](#about)
* [Common errors](#common-errors)

## Pre-requisites
What do I need to start contributing to the SHPE app?

### Windows
<details>
	<summary>Git</summary>

For version control; this is how we manage all the files on our app and how you are able to read this now on GitHub. You can download the latest version (2.25.0 as of February 2020) [here](https://git-scm.com/).
</details>
<details>
	<summary>Node</summary>
	
The runtime we use to build the app. Download the latest stable version (12.15.0 as of February 2020) [here](https://nodejs.org/en/).
</details>
<details>
	<summary>Java 8 JDK</summary>
	
Used to build and emulate the app on Android Studio.
* To check your version open command prompt (*not* WSL) and run `java -version`, making sure that it is Java 8. If you don't have this version, you can download it [here](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html).
* You will need to add **JAVA_HOME** as an environment variable, to tell Windows which version of Java you want to use. For a guide on how to do that, go [here](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/).
</details>
<details>
	<summary>Python 3</summary>

Since the building system for React Native uses Python, you will need to install it. Go [here](https://www.python.org/downloads/windows/) and download the latest version (3.8.1 as of February 2020).
</details>
<details>
	<summary>Android Studio</summary>

To build and test the app you can:
1. [Run on a physical *Android* device](https://facebook.github.io/react-native/docs/running-on-device)
2. Run on Android Studio.  
	a. [Download](https://developer.android.com/studio) Android Studio.  
	b. Download the AVD (Android Virtual Device) inside Android Studio. Go [here](https://developer.android.com/studio/run/managing-avds) for an in-depth guide.
</details>

### MacOS
<details>
	<summary>Git</summary>

For version control; this is how we manage all the files on our app and how you are able to read this now on GitHub. You can download the latest version (2.25.0 as of February 2020) [here](https://git-scm.com/).
</details>
<details>
	<summary>Node</summary>
	
The runtime we use to build the app.
* Download HomeBrew [here](https://brew.sh/).
* On your terminal, write `brew install node@10`.
</details>
<details>
	<summary>Xcode</summary>

* You can only download this through the App Store, version 9.1+.
* If you want to use a physical device follow [this](https://facebook.github.io/react-native/docs/running-on-device).
* Make sure that you are signed in to your Apple account and that your account is a [developer account](https://9to5mac.com/2016/03/27/how-to-create-free-apple-developer-account-sideload-apps/).
</details>
<details>
	<summary>Java 8 JDK (Optional)</summary>
	
Used to build and emulate the app on Android Studio, if you don't want to use XCode (or you want to use both), or want to see how the app looks on Android.
* To check your version open terminal and run `java -version`, making sure that it is Java 8. If you don't have this version, you can download it [here](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html).
* You will need to add **JAVA_HOME**. For a guide on how to do that, go [here](https://dalanzg.github.io/tips-tutorials/posts/2016/03/21/how-to-set-java_home-on-mac-os-x/).
</details>
<details>
	<summary>Android Studio (Optional)</summary>

To build and test the app you can:
1. [Run on a physical *Android* device](https://facebook.github.io/react-native/docs/running-on-device)
2. Run on Android Studio.  
	a. [Download](https://developer.android.com/studio) Android Studio.  
	b. Download the Android Virtual Device (AVD) inside Android Studio. Go [here](https://developer.android.com/studio/run/managing-avds) for an in-depth guide.
</details>

## Installation
**Getting your development environment running...**
1. Install the react-native command line interface by using command prompt/terminal.
```
npm i -g react-native-cli
```
2.  (Optional) [Fork the repository](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) (if you plan on contributing to the app).
3. Open command prompt/terminal and navigate to the directory you want to download the shpeucf repository, preferably the Desktop.
4. Clone the original (or forked) repository. Note that this will create the folder **shpeucfapp** in the directory you are currently in.
```
git clone https://github.com/SHPEUCF/shpeucfapp.git
```
5. Navigate inside the cloned repository.
```
cd shpeucfapp
```
6. Install the dependencies used in this project using the **n**ode **p**ackage **m**anager.
```
npm install
```

## Running
### Android
* Open Android Studio and run the Android emulator.
* Open the terminal/command prompt, navigate to the cloned repository (shpeucfapp), and type `react-native run-android`.
### iOS
* Open the terminal, navigate to the cloned repository (shpeucfapp), and type `react-native run-ios`.

## About
**Built with**
* [React Native](https://facebook.github.io/react-native/)
* [Node](https://nodejs.org/en/)

**Authors**
* [Luis Benavides](https://github.com/luisbenan), initial work
* [Haniel Diaz](https://github.com/HanielDiaz), continued work
* [Steven Perdomo](https://github.com/esteban737), continued work

...and our [contributors](https://github.com/SHPEUCF/shpeucfapp/graphs/contributors) who participated in this project.

**License**  
This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

## Common errors
<details>
	<summary>JAVA_HOME missing</summary>

* [MacOS](https://dalanzg.github.io/tips-tutorials/posts/2016/03/21/how-to-set-java_home-on-mac-os-x/)
* [Windows](https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/)
</details>
<details>
	<summary>ANDROID_HOME missing</summary>

* [MacOS(user2993582)](https://stackoverflow.com/questions/19986214/setting-android-home-enviromental-variable-on-mac-os-x)
* [Windows(Hoque MD Zahidul)](https://stackoverflow.com/questions/27620262/sdk-location-not-found-define-location-with-sdk-dir-in-the-local-properties-fil)
</details>
<details>
	<summary>Print: Entry, ":CFBundleIdentifier", Does Not Exist</summary>

1. Open the project on Xcode; that is, open "shpeucfapp/ios/shpeucfapp.xcodeproj".
2. In Xcode, File -> Workspace setting.
3. Change Build System to Legacy Build System and click "OK".
4. Follow these instructions:

<p align="center">
  <img height="450" src="https://user-images.githubusercontent.com/2400215/45737941-92981200-bc08-11e8-80fc-978147db7a9a.png">
</p>

5. In Xcode, Product -> Clean.
6. In Xcode, Click on the project folder on the left side-bar.

<p align="center">
  <img height="450" src="https://i.imgur.com/t8v9oQy.png">
</p>

7. Make sure there are no errors by selecting a team and changing the bundle identifier, if it's giving you an error.
8. Close Xcode and try running the simulator by typing `react-native run-ios` on your terminal (while inside the project folder).
9. If step 6 doesn't work then try running `react-native run-ios` at least 2 more times.
</details>
