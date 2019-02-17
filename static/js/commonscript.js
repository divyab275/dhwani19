var server_url  = "http://localhost:3000"
var config = {
    apiKey: "AIzaSyCr1tUZ4sGglBsQbRKn1m5klzhiV-IlCLs",
    authDomain: "dhwanicet-7466c.firebaseapp.com",
    databaseURL: "https://dhwanicet-7466c.firebaseio.com",
    projectId: "dhwanicet-7466c",
    storageBucket: "dhwanicet-7466c.appspot.com",
    messagingSenderId: "1056048590412"
  };





    var providerGoogle = new firebase.auth.GoogleAuthProvider();
    var providerFacebook = new firebase.auth.FacebookAuthProvider();

    function googleSignIn(){
        SignIn(providerGoogle);
    }

    