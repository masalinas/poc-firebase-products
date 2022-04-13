## Description
PoC Firebase CRUD products

## Deploy Firebase Project

Create a Firebase project from [Firebase Console](https://console.firebase.google.com/)

![Firebase Console](captures/firebase_console.png "Firebase Console")

STEP 01:

![Firebase project name](captures/firebase_project_name.png "Firebase project name")

STEP 02:

Select if we want active Google Analytics.

![Firebase Google Analytics](captures/firebase_google_analytics.png "Firebase Google Analytics")

STEP 03:

![Firebase Project Confirmation](captures/firebase_project_confirmation.png "Firebase Project Confirmation")

## Configure Firebase Project

Now we create a Firestore Database a NoSQL database from Google

![Firebase Firestore Database](captures/firebase_firestore_creation.png "Firebase Firestore Database")

Firestore from firebase console

![Firestore Database](captures/firestore_database.png "Firestore 
Database")

Firestore from Google Clooud Platform

![GCP Firestore Database](captures/gcp_firestore_database.png "GCP Firestore 
Database")

## Login

We must to login in Google Cloud Platform at first

```sh
firebase login
```

## Debug local service

We could debug our local service before deploy in Google Cloud Platform
```sh
firebase serve
```

## Deploy service on Google Cloud Platform

If we obtaine errirs from eslint remove the dot point from package lint scripts
```sh
firebase deploy
```

![Firebase Deployment](captures/firebase_deploy.png "Firebase Deployment")

Obtaine the firebase uri

```sh
https://us-central1-product-3a5fb.cloudfunctions.net/app
```

Firebase from Google Functions on Google Cloud Platform
![Google Functions GCP](captures/firebase_gcp.png "Google Functions GCP")