var server_url  = "https://api.dhwanicet.org"
var config = {
    apiKey: "AIzaSyCr1tUZ4sGglBsQbRKn1m5klzhiV-IlCLs",
    authDomain: "dhwanicet-7466c.firebaseapp.com",
    databaseURL: "https://dhwanicet-7466c.firebaseio.com",
    projectId: "dhwanicet-7466c",
    storageBucket: "dhwanicet-7466c.appspot.com",
    messagingSenderId: "1056048590412"
  };


firebase.initializeApp(config);


    var providerGoogle = new firebase.auth.GoogleAuthProvider();
    var providerFacebook = new firebase.auth.FacebookAuthProvider();

    function googleSignIn(){
        SignIn(providerGoogle);
    }

    function facebookSignIn(){
        SignIn(providerFacebook);
    }


    function SignIn(provider){  

        firebase.auth().signInWithPopup(provider).then(function(result) {

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    localStorage.setItem("user",user.uid);
    console.log(user);
    $('#profileViewButton').html("<button class='stylebutton' id='viewProfile'>View Profile</button>");
    $('#reg-button').remove();
    $('#log-button').remove();
    $('#signOutDiv').html('<button class="stylebutton" id="signout-button" onclick="signOut()">SignOut</button>');
    $('#login').remove();

    // window.location.replace("./registerForm.html")
    // $('#reg-button').show();
    // $('#register').show();
    // $('#signout-button').show();
    // document.getElementById("register").html = "Welcome "+user.displayName;    
    // ...
    }).catch(function(error) {

    console.log(error);
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
        console.log("Login failed");
        $('#registerDiv').html("<button class='stylebutton' id='reg-button' onclick='googleSignIn()'>Register</button>");
        $('#loginDiv').html("<button class='stylebutton' id='log-button' onclick='googleSignIn()'>Login</button>");
        $('#viewProfile').remove();
        $('#signout-button').remove();
        

    // document.getElementById("login_failed").html = "Login Failed.";
    // ...
    });

    
}
function login(provider)
{    googleSignIn();
    register();
}

function signOut(){
            firebase.auth().signOut().then(function() {
        // document.getElementById('login-mob').html='LOGIN/REGISTER';
        // $('#login').css({'background-image':''});
        $('#signout-button').remove();
        $('#loginDiv').html("<button class='stylebutton' id='log-button' onclick='googleSignIn()'>Login</button>");

                console.log("Logged out")
                $('registerDiv').html("<button class='stylebutton' id='reg-button' onclick='googleSignIn()'>Register</button>");
                $('#viewProfile').remove();
                localStorage.removeItem("accessToken")
                localStorage.removeItem("user")
                $('#login').html('<button class="btn btn-warning" id="login" onclick="login()">Sign in</button> ');

             

    // Sign-out successful.
}).catch(function(error) {
    // An error happened.

});

}

initApp = function check() {
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    user.getIdToken().then(function(accessToken) {
        // User is signed in.
        // document.getElementById("register").html = "Welcome "+user.displayName;
        $('#reg-button').remove();
        $('#profileViewButton').html("<button class='stylebutton' id='viewProfile' onclick='goToProfile()'>View Profile</button>");
        $('#signOutDiv').html('<button class="stylebutton" id="signout-button" onclick="signOut()">SignOut</button>');
        $('#log-button').remove();
        $('#login').remove();
        console.log("User signed in");
        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var uid = user.uid;
        // var phoneNumber = user.phoneNumber;
        // var providerData = user.providerData;
        // document.getElementById("displayName").html=displayName;
        // document.getElementById("email").html=email;
        // document.getElementById('profilepic').setAttribute('src',photoURL);
        // document.getElementById('login-mob').html=displayName+'/Profile';
        // $('#login').css({'background-image': 'url('+photoURL+')'});
        // $('#login').css({'background-size': '100%'});
        console.log(accessToken);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user",user.uid);

        var config = {
            headers: {'Content-Type': 'application/json',
        'x-auth-token' : accessToken}
        };

        axios.post(server_url+'/student/login', {}, config)
        .then(function(response){
        })
        .catch(err=>{
            console.log(err);
        })
        //     if(response.data.registered===true){
                
        //         console.log(response.data);
        //         document.getElementById("register").html = "Welcome "+user.displayName;
        //         // $('#reg-button').hide();
        //         // document.getElementById('unique-id').html ='D-'+response.data.id;
               

        //         // axios.get('server_url+/student/event',config)
        //         // .then(function(response){
        //         //   var eventsJson = response.data;
        //         //     $("#reg_events").html('');
        //         //   eventsJson.forEach(function(item){
        //         //      axios.get('server_url+/student/event/'+item.id,config)
        //         // .then(function(response){
        //         //     if(response.data.paid===true)
        //         //       $("#reg_events").html("<div class=\"eachevent\"><h5>"+item.name+"</h5></div><div class=\"paid\"><h5>paid</h5></div>");
        //         //     else
        //         //       $("#reg_events").html("<div class=\"eachevent\"><h5>"+item.name+"</h5></div><div class=\"paid\"><h5>not paid</h5></div>");
        //         // }); 
        //         //   });
        //         // }).catch(function(error){    
        //         //   console.log(error);
        //         // });


        //         // $('#logContent').animate({"right":"100%"});
        //         // $('#profile-content').animate({"right":"0%"});
        //         //window.location.href = "./profile.html";
        //         }
        //     else{
        //         // $('#logContent').animate({"right":"0%"});
        //         // $('#profile-content').animate({"right":"-100%"});
        //         // $('#register').animate({"right":"0%"});
        //         // $('#regpage').animate({"right":"100%"});
        //         console.log("Person not registered");
        //         // 
        //         // $('#profileView').hide();

        //     }
        //     });

    }); 

    } else {
        // $('#logContent').animate({"right":"0%"});
        // $('#profile-content').animate({"right":"-100%"});
        // $('#register').animate({"right":"-100%"});
        // $('#regpage').animate({"right":"0%"});
        // docnnerHTML='LOGIN/REGISTER';
        // $('#login').css({'background-image':''});
        console.log("Person not registered");
        $('#profileView').hide();
        $('#registerDiv').html("<button class='stylebutton' id='reg-button' onclick='googleSignIn()'>Register</button>");
        $('#loginDiv').html("<button class='stylebutton' id='log-button' onclick='googleSignIn()'>Login</button>");
        $('#login').html('<button class="btn btn-warning" id="login" onclick="login()">Sign in</button> ')
    }
}, function(error) {
    console.log(error);
});
};

goToProfile = function(){
    window.location.href = window.location.origin+'/profilenew.html'
}

createReunion = function(){
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            //User signed in
            console.log("User signed in")
            user.getIdToken()
            .then(function(){
             console.log(user);
            var query = user.uid      
            axios.get(server_url+'/public/student/'+query)
            .then(res=>{
                console.log(res)
                if(res.data.registered){
                    window.location.href="./groupdetails.html";
                }
                   
                else{
                    //User not completed his profile
                    window.location.href = "./profilenew.html"
                }
                })
               
            })
            .catch(err=>{
                console.log(err)
            })
            
        }   
        else{
           // console.log("user login cheythatilla")
            alert('please sign in')
            $('#login')
        }
    })
}


window.addEventListener('load', function() {
    // firebase.initializeApp(config);
   
initApp()
});