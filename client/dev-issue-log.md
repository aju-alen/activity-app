# 🛠 Developer Issue Log

A log of issues encountered during development, with descriptions, attempted fixes, and final solutions.  
Helps track bugs and also serves as a knowledge base for future reference and for other developers.

---

## 🐞 Issue #1: `INSTALL_FAILED_UPDATE_INCOMPATIBLE` during Android prebuild
**Date**: 2025-06-25  
**Platform**: Android Simulator  
**Tech Stack**: Expo (Prebuild)

### ✅ Summary
When attempting to install the Android prebuild APK on the simulator, the installation failed with a signature mismatch error due to an existing app with a conflicting package name. 

### 🧪 Reproduction Steps
1. Ran `npx expo prebuild` to generate native Android build files.  
2. npx expo run:android  
3. Encountered the following error during install:

### ❌ Error Message
```sh
adb: failed to install /Users/user/Desktop/Hobby/activity/client/android/app/build/outputs/apk/debug/app-debug.apk: 
Failure [INSTALL_FAILED_UPDATE_INCOMPATIBLE: Existing package com.alenaju.croudup signatures do not match newer version; ignoring!]
```

### 🧠 Debugging Notes
- A previous version of the app was already installed on the simulator.  
- The existing app was signed differently (e.g., installed via Expo Go or a different build).  
- The package name `com.alenaju.croudup` was the same, causing the signature conflict.

### ✅ Final Solution
- Uninstalled the existing app from the simulator:


- Reinstalled the new APK:


### 📌 Notes & Learnings
- Always uninstall previously installed apps with the same package name before installing new builds signed differently.  
- This often happens when switching between Expo Go and custom dev builds.  
- Automate uninstall steps in your dev workflow to avoid this error.

---
