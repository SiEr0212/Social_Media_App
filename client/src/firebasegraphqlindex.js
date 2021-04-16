const functions = require("furebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

admin.initializeApp({
  projectId: "socialmediaapp-images",
  appId: "1:990367168890:web:ef73faa390271770867ec3",
  databaseURL:
    "https://socialmediaapp-images-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "socialmediaapp-images.appspot.com",
  locationId: "europe-west",
  apiKey: "AIzaSyBA3JHX2dGXO3ABx8m4ZXTMie-UpfOHtVI",
  authDomain: "socialmediaapp-images.firebaseapp.com",
  messagingSenderId: "990367168890",
});
