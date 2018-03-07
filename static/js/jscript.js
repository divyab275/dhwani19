// Initialize Firebase
var config = {
    apiKey: "AIzaSyAcc11rgCRK5Ygd1WpFX556Sn36HGCI-hA",
    authDomain: "dhwani18-8b03f.firebaseapp.com",
    databaseURL: "https://dhwani18-8b03f.firebaseio.com",
    projectId: "dhwani18-8b03f",
    storageBucket: "dhwani18-8b03f.appspot.com",
    messagingSenderId: "866486690145"
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

    document.getElementById("login_failed").innerHTML = "Login Failed.";
    // ...
    });

    
}

function signOut(){
            firebase.auth().signOut().then(function() {
        document.getElementById('login-mob').innerHTML='LOGIN/REGISTER';
        $('#login').css({'background-image':''});

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
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;
        document.getElementById("displayName").innerHTML=displayName;
        document.getElementById("email").innerHTML=email;
        document.getElementById('profilepic').setAttribute('src',photoURL);
        document.getElementById('login-mob').innerHTML=displayName+'/Profile';
        $('#login').css({'background-image': 'url('+photoURL+')'});
        $('#login').css({'background-size': '100%'});


        localStorage.setItem("accessToken", accessToken);

        var config = {
            headers: {'Content-Type': 'application/json',
        'x-auth-token' : accessToken}
        };

        console.log(accessToken);
        axios.post('https://api.dhwanicet.org/student/login', {}, config)
        .then(function(response){
            if(response.data.registered===true){
                axios.get('https://api.dhwanicet.org/public/student/'+email)
                .then(function(response){
                  console.log(response.data)
                  document.getElementById('unique-id').innerHTML ='D-'+response.data.id;
                });

                axios.get('https://api.dhwanicet.org/student/event',config)
                .then(function(response){
                  var eventsJson = response.data;
                    $("#reg_events").empty();
                  eventsJson.forEach(function(item){
                     axios.get('https://api.dhwanicet.org/student/event/'+item.id,config)
                .then(function(response){
                    if(response.data.paid===true)
                      $("#reg_events").append("<div class=\"eachevent\"><h5>"+item.name+"</h5></div><div class=\"paid\"><h5>paid</h5></div>");
                    else
                      $("#reg_events").append("<div class=\"eachevent\"><h5>"+item.name+"</h5></div><div class=\"paid\"><h5>not paid</h5></div>");
                }); 
                  });
                }).catch(function(error){
                  console.log(error);
                });


                $('#logContent').animate({"right":"100%"});
                $('#profile-content').animate({"right":"0%"});
                //window.location.href = "./profile.html";
                }
            else{
                $('#logContent').animate({"right":"0%"});
                $('#profile-content').animate({"right":"-100%"});
                $('#register').animate({"right":"0%"});
                $('#regpage').animate({"right":"100%"});
            }
            });

    }); 

    } else {
        $('#logContent').animate({"right":"0%"});
        $('#profile-content').animate({"right":"-100%"});
        $('#register').animate({"right":"-100%"});
        $('#regpage').animate({"right":"0%"});
        document.getElementById('sign-in-status').textContent = 'Signed IN';
        document.getElementById('login-mob').innerHTML='LOGIN/REGISTER';
        $('#login').css({'background-image':''});

    }
}, function(error) {
    console.log(error);
});
};



window.addEventListener('load', function() {
initApp()
});

function regEvent(event,groupArray){

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        user.getIdToken().then(function(accessToken) {

             var config = {
                 headers: {'Content-Type': 'application/json',
               'x-auth-token' : accessToken}
                };



                axios.put('https://api.dhwanicet.org/student/event/'+event.id,{ 'group' : groupArray},config)
                  .then(function(response){
                    //suucess
                  }).catch(function(error){

                    //error

                  });


        });
      } else {
        
        //to login page
      }
    });


}
var lastId;
var toggleclose = false;
var togglelist = false;
function workshopAnimate(id){
    function toggleClose(){
        if(toggleclose == false){
            $('.close-all').css({"display":"block"});
            toggleclose = true;
        }else{
            $('.close-all').css({"display":"none"});
            toggleclose = false;
        }
    }
    function toggleList(){
        if(togglelist == false){
            $('.list').css({"display":"none"});
            togglelist = true;
        }else{
            $('.list').css({"display":""});
            togglelist = false;
        }
    }
    if(id==9999){
        if(window.innerWidth<=768){
            $('#work'+lastId).animate({"top":"100%"});
            setTimeout(toggleClose,0);
            setTimeout(toggleList,400);
        }else{
            $('#work'+lastId).animate({"left":"100%"});
            setTimeout(toggleClose,0);
            setTimeout(toggleList,400);
        }
    }else{
        lastId = id;
        if(window.innerWidth<=768){
            $('#work'+id).animate({"top":"60px"});
            setTimeout(toggleClose,400);
            setTimeout(toggleList,0);
        }else{
            $('#work'+id).animate({"left":"110px"});
            setTimeout(toggleClose,400);
            setTimeout(toggleList,0);
        }
    }
}

$( window ).on( "load", function() {

    $("#overlay").animate({"bottom":"100vh"},600);



    var toggle = false;
    var lastActive = "#main";

    function resetPage(){
            $("#main").animate({"bottom":"0%"},0);
            $("#main").animate({"right":"100%"},0);
            $("#about-content").animate({"top":"100%"},0);
            $("#about-content").animate({"right":"0%"},0);
            $("#login-content").animate({"top":"100%"},0);
            $("#login-content").animate({"right":"0%"},0);
            $("#proshow-content").animate({"bottom":"100%"},0);
            $("#proshow-content").animate({"right":"0%"},0);
            $("#event-content").animate({"bottom":"100%"},0);
            $("#event-content").animate({"right":"0%"},0);
            $("#contact-content").animate({"right":"100%"},0);
            $("#accomodation-content").animate({"right":"100%"},0);
    }

    if(window.innerWidth<=768){var anim = 400;}else{var anim=600;}

    function animateMenu(callback){
        if(window.innerWidth<=768){var anim = 400;}else{var anim=600;}
        if(toggle==false){
            $("#menu").css("background-image","url('./static/img/close.png')");
            $(lastActive).animate( {"right":"100%"},anim);
            $("#menu-content").animate({"left":"0%"},anim);
            toggle = true;
            callback();
        }else{
            $("#menu").css("background-image","url('./static/img/hamburger.png')");
            $(lastActive).animate( {"right":"0%"},anim );
            $("#menu-content").animate({"left":"100%"},anim);
            toggle = false;
            callback(); 
        }
    }

    $( "#menu" ).on( "click", function() {
        function hello(){

        }
            animateMenu(hello);
    });

    $( "#home" ).on( "click", function() {
        function hello(){

        }
        if(lastActive == "#main"){
            animateMenu(hello);
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(hello);
        }
    });
    $( "#home-mob" ).on( "click", function() {
        function hello(){

        }
        if(lastActive == "#main"){
            animateMenu(hello);
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(hello);
        }
    });
    $( "#about" ).on( "click", function() {
        function animateAbout(){
            setTimeout(function() {
                $("#main").animate( {"bottom":"100%"},anim );
                $("#about-content").animate({"top":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateAbout);
            console.log('hello');
            lastActive = "#about-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateAbout);
            lastActive = "#about-content";
        }
    });
    $( "#about-mob" ).on( "click", function() {
        function animateAbout(){
            setTimeout(function() {
                $("#main").animate( {"bottom":"100%"},anim );
                $("#about-content").animate({"top":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateAbout);
            console.log('hello');
            lastActive = "#about-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateAbout);
            lastActive = "#about-content";
        }
    });
    $( "#proshow" ).on( "click", function() {
        function animateProshow(){
            setTimeout(function() {
                $("#main").animate( {"bottom":"-100%"},anim );
                $("#proshow-content").animate({"bottom":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateProshow);
            console.log('hello');
            lastActive = "#proshow-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateProshow);
            lastActive = "#proshow-content";
        }
    });
    $( "#proshow-mob" ).on( "click", function() {
        function animateProshow(){
            setTimeout(function() {
                $("#main").animate( {"bottom":"-100%"},anim );
                $("#proshow-content").animate({"bottom":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateProshow);
            console.log('hello');
            lastActive = "#proshow-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateProshow);
            lastActive = "#proshow-content";
        }
    });
    $( "#sponsors" ).on( "click", function() {
        window.open('https://sponsors.dhwani.org.in');
    });
    $( "#sponsors-mob" ).on( "click", function() {
        window.open('https://sponsors.dhwani.org.in');
    });
    $( "#contact-fb" ).on( "click", function() {
        window.open('https://facebook.com/dhwanifest');
    });
    $( "#fb" ).on( "click", function() {
        window.open('https://facebook.com/dhwanifest');
    });
    $( "#contact-twitter" ).on( "click", function() {
        window.open('https://twitter.com/dhwanifest');
    });
    $( "#contact-insta" ).on( "click", function() {
        window.open('https://instagram.com/dhwanifest');
    });
    $( "#insta" ).on( "click", function() {
        window.open('https://instagram.com/dhwanifest');
    });
    $( "#contact-youtube" ).on( "click", function() {
        window.open('https://www.youtube.com/channel/UCUGXXOIJVE6jpuQY2EubYTA');
    });
    $( "#you" ).on( "click", function() {
        window.open('https://www.youtube.com/channel/UCUGXXOIJVE6jpuQY2EubYTA');
    });
    $( "#contact" ).on( "click", function() {
        function animateContact(){
            setTimeout(function() {
                $("#main").animate( {"right":"-100%"},anim );
                $("#contact-content").animate({"right":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateContact);
            console.log('hello');
            lastActive = "#contact-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateContact);
            lastActive = "#contact-content";
        }
    });
    $( "#contact-mob" ).on( "click", function() {
        function animateContact(){
            setTimeout(function() {
                $("#main").animate( {"right":"-100%"},anim );
                $("#contact-content").animate({"right":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateContact);
            console.log('hello');
            lastActive = "#contact-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateContact);
            lastActive = "#contact-content";
        }
    });
    $( "#accomodation-mob" ).on( "click", function() {
        function animateAccomodation(){
            setTimeout(function() {
                $("#main").animate( {"right":"-100%"},anim );
                $("#accomodation-content").animate({"right":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateAccomodation);
            console.log('hello');
            lastActive = "#accomodation-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateAccomodation);
            lastActive = "#accomodation-content";
        }
    });
    $( "#accomodation" ).on( "click", function() {
        function animateAccomodation(){
            setTimeout(function() {
                $("#main").animate( {"right":"-100%"},anim );
                $("#accomodation-content").animate({"right":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateAccomodation);
            console.log('hello');
            lastActive = "#accomodation-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateAccomodation);
            lastActive = "#accomodation-content";
        }
    });
    $( "#login" ).on( "click", function() {
        initApp();
        function animateLogin(){
            setTimeout(function() {
                $("#main").animate( {"bottom":"100%"},anim );
                $("#login-content").animate({"top":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateLogin);
            console.log('hello');
            lastActive = "#login-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateLogin);
            lastActive = "#login-content";
        }
    });
    $( "#login-mob" ).on( "click", function() {
        initApp();
        function animateLogin(){
            setTimeout(function() {
                $("#main").animate( {"bottom":"100%"},anim );
                $("#login-content").animate({"top":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateLogin);
            console.log('hello');
            lastActive = "#login-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateLogin);
            lastActive = "#login-content";
        }
    });
    $( "#event-mob" ).on( "click", function() {
        function animateEvent(){
            setTimeout(function() {
                $("#main").animate( {"bottom":"-100%"},anim );
                $("#event-content").animate({"bottom":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateEvent);
            console.log('hello');
            lastActive = "#event-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateEvent);
            lastActive = "#event-content";
        }
    });
    $( "#event" ).on( "click", function() {
        function animateEvent(){
            setTimeout(function() {
                $("#main").animate( {"bottom":"-100%"},anim );
                $("#event-content").animate({"bottom":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateEvent);
            console.log('hello');
            lastActive = "#event-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateEvent);
            lastActive = "#event-content";
        }
    });


axios.get('https://api.dhwanicet.org/public/event',config)
    .then(function (response) {
        var i;
        for (i = 0; i < response.data.length; ++i) {
            if(response.data[i].isWorkshop == true){
                $('#workshops-list').append('<h2 onclick=workshopAnimate('+i+')>'+response.data[i].name+'</h2>');
                $('#workshops-list').css({"height":"+=39"});
                $('#workshops-content').append('<div class="worklist-content" id=work'+i+'></div>');
                $('#work'+i).append('<div class = \"wrapper-event\" id=\"wrapper'+i+'\"></div>');
                $('#wrapper'+i).append('<div class=\"section-event\" id=\"secOne'+i+'\"></div>');
                $('#wrapper'+i).append('<div class=\"section-event\" id=\"secTwo'+i+'\"></div>');
                $('#secOne'+i).append('<div class = \"event-content-img\" id=\"event-img'+i+'\"></div>');
                //$('#secOne'+i).append('<p class = \"event-content-prize\" id=\"event-prizeOne'+i+'\"></p>');
                //$('#secOne'+i).append('<p class = \"event-content-prize\" id=\"event-prizeTwo'+i+'\"></p>');
                //$('#secOne'+i).append('<p class = \"event-content-prize\" id=\"event-prizeThree'+i+'\"></p>');
                $('#secOne'+i).append('<p class = \"event-content-regfee\" id=\"event-regfee'+i+'\"></p>');
                $('#secOne'+i).append('<p class = \"event-content-time\" id=\"event-time'+i+'\"></p>');
                $('#secTwo'+i).append('<h2 class = \"event-content-name\" id=\"event-name'+i+'\"></h2>');
                $('#secTwo'+i).append('<p class = \"event-content-description\" id=\"event-description'+i+'\"></p>');
                $('#secTwo'+i).append('<p class = \"event-content-format\" id=\"event-format'+i+'\"></p>');
                $('#event-img'+i).append('<img src="'+response.data[i].image+'" class="event-img-child"></img>');
                $('#event-regfee'+i).append('REG FEE : '+response.data[i].regFee);
                $('#event-time'+i).append('TIME : '+response.data[i].time);
                $('#event-name'+i).append(response.data[i].name);
                $('#event-description'+i).append(response.data[i].description);
                $('#event-format'+i).append(response.data[i].format);

                var shiteWidth = window.innerWidth - ((5/100)*window.innerWidth);

                if(window.innerWidth<=768){
                    $('#work'+i).css({"top":"100%","left":"0","height":window.innerHeight - 120});
                }else{
                    $('#work'+i).css({"top":"0","left":"100%","width":shiteWidth - 220});
                }
            }else{

            }
        }
    });



    var workshopsToggle = false;
    var competitionsToggle = false;
    var informalsToggle = false;

    var width = window.innerWidth;
    var height = window.innerHeight;
    if(width>=768){
        width = width - (width *(5/100));
        var balance = width - 930;
        balance = balance / 2;
        $('#workshops').css({"left":balance,"top":"0","bottom":"0"});
        $('#competitions').css({"left":balance+310,"top":"0","bottom":"0"});
        $('#informals').css({"left":balance+620,"top":"0","bottom":"0"});
        $('#workshops-content').css({"left":"100%","top":"0","border-left":"3px solid white","border-top-left-radius":"20px","border-bottom-left-radius":"20px"});
        $('#competitions-content').css({"left":"100%","top":"0","border-left":"3px solid white","border-top-left-radius":"20px","border-bottom-left-radius":"20px"});
        $('#informals-content').css({"left":"100%","top":"0","border-left":"3px solid white","border-top-left-radius":"20px","border-bottom-left-radius":"20px"});
    }else{
        var mobBalance = height - 435;
        mobBalance = mobBalance /2;
        $('#workshops').css({"left":"0","right":"0","top":mobBalance,"width":"140px","height":"140px"});
        $('#competitions').css({"left":"0","right":"0","top":mobBalance + 145,"width":"140px","height":"140px"});
        $('#informals').css({"left":"0","right":"0","top":mobBalance + 290,"width":"140px","height":"140px"});
        $('#workshops-inner').css({"background-image":"url(./static/img/workshops-hover.png)"});
        $('#competitions-inner').css({"background-image":"url(./static/img/competitions-hover.png)"});
        $('#informals-inner').css({"background-image":"url(./static/img/informals-hover.png)"});
        $('#workshops-content').css({"top":"100%","border-top":"3px solid white","border-top-left-radius":"20px","border-top-right-radius":"20px"});
        $('#competitions-content').css({"top":"100%","border-top":"3px solid white","border-top-left-radius":"20px","border-top-right-radius":"20px"});
        $('#informals-content').css({"top":"100%","border-top":"3px solid white","border-top-left-radius":"20px","border-top-right-radius":"20px"});
    }
    $( "#workshops" ).on( "click", function() {
        function displayWorkshop(){
            if(workshopsToggle == false){
                $('#competitions').css({"display":"none"});
                $('#informals').css({"display":"none"});
                workshopsToggle = true;
            }else{
                $('#competitions').css({"display":"block"});
                $('#informals').css({"display":"block"});
                workshopsToggle = false;
            }
        }
        if(width>=768){
            if(workshopsToggle == false){
                $('#workshops').animate({"left":"5px","width":"100px","height":"100px"});
                $('#workshops-content').animate({"left":"110px"});
                $('#workshops-inner').css({"background-image":"url(./static/img/close-big.png)"});
                setTimeout(displayWorkshop,0);
            }else{
                $('#workshops').animate({"left":balance,"width":"300px","height":"300px"});
                $('#workshops-content').animate({"left":"100%"});
                $('#workshops-inner').css({"background-image":""});
                setTimeout(displayWorkshop,400);
            }
        }else{
            if(workshopsToggle == false){
                $('#workshops').animate({"top":"5px","width":"50px","height":"50px"});
                $('#workshops-content').animate({"top":"60px"});
                $('#workshops-inner').css({"background-image":"url(./static/img/close-big.png)"});
                setTimeout(displayWorkshop,0);
            }else{
                $('#workshops').animate({"top":mobBalance,"width":"140px","height":"140px"});
                $('#workshops-content').animate({"top":"100%"});
                $('#workshops-inner').css({"background-image":"url(./static/img/workshops-hover.png)"});
                setTimeout(displayWorkshop,400);
            }
        }
    });
    $( "#competitions" ).on( "click", function() {
        function displayCompetition(){
            if(competitionsToggle == false){
                $('#workshops').css({"display":"none"});
                $('#informals').css({"display":"none"});
                competitionsToggle = true;
            }else{
                $('#workshops').css({"display":"block"});
                $('#informals').css({"display":"block"});
                competitionsToggle = false;
            }
        }
        if(width>=768){
            if(competitionsToggle == false){
                $('#competitions').animate({"left":"5px","width":"100px","height":"100px"});
                $('#competitions-content').animate({"left":"110px"});
                $('#competitions-inner').css({"background-image":"url(./static/img/close-big.png)"});
                setTimeout(displayCompetition,0);
            }else{
                $('#competitions').animate({"left":balance+310,"width":"300px","height":"300px"});
                $('#competitions-content').animate({"left":"100%"});
                $('#competitions-inner').css({"background-image":""});
                setTimeout(displayCompetition,400);
            }
        }else{
            if(competitionsToggle == false){
                $('#competitions').animate({"top":"5px","width":"50px","height":"50px"});
                $('#competitions-content').animate({"top":"60px"});
                $('#competitions-inner').css({"background-image":"url(./static/img/close-big.png)"});
                setTimeout(displayCompetition,0);
            }else{
                $('#competitions').animate({"top":mobBalance+145,"width":"140px","height":"140px"});
                $('#competitions-content').animate({"top":"100%"});
                $('#competitions-inner').css({"background-image":"url(./static/img/competitions-hover.png)"});
                setTimeout(displayCompetition,400);
            }
        }
    });
    $( "#informals" ).on( "click", function() {
        function displayInformal(){
            if(informalsToggle == false){
                $('#competitions').css({"display":"none"});
                $('#workshops').css({"display":"none"});
                informalsToggle = true;
            }else{
                $('#competitions').css({"display":"block"});
                $('#workshops').css({"display":"block"});
                informalsToggle = false;
            }
        }
        if(width>=768){
            if(informalsToggle == false){
                $('#informals').animate({"left":"5px","width":"100px","height":"100px"});
                $('#informals-content').animate({"left":"110px"});
                $('#informals-inner').css({"background-image":"url(./static/img/close-big.png)"});
                setTimeout(displayInformal,0);
            }else{
                $('#informals').animate({"left":balance+620,"width":"300px","height":"300px"});
                $('#informals-content').animate({"left":"100%"});
                $('#informals-inner').css({"background-image":""});
                setTimeout(displayInformal,400);
            }
        }else{
            if(informalsToggle == false){
                $('#informals').animate({"top":"5px","width":"50px","height":"50px"});
                $('#informals-content').animate({"top":"60px"});
                $('#informals-inner').css({"background-image":"url(./static/img/close-big.png)"});
                setTimeout(displayInformal,0);
            }else{
                $('#informals').animate({"top":mobBalance + 290,"width":"140px","height":"140px"});
                $('#informals-content').animate({"top":"100%"});
                $('#informals-inner').css({"background-image":"url(./static/img/informals-hover.png)"});
                setTimeout(displayInformal,400);
            }
        }
    });


});

$( document ).ready(function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    $('#container').css({"width":width,"height":height});

    var colors = new Array(
    [62,35,255],
    [60,255,60],
    [255,35,98],
    [45,175,230],
    [255,0,255],
    [255,128,0]);
    
    var step = 0;
    //color table indices for: 
    // current color left
    // next color left
    // current color right
    // next color right
    var colorIndices = [0,1,2,3];
    
    //transition speed
    var gradientSpeed = 0.002;
    
    function updateGradient()
    {
    
    if ( $===undefined ) return;
    
    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];
    
    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb("+r1+","+g1+","+b1+")";
    
    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb("+r2+","+g2+","+b2+")";
    
    $('#gradient').css({
    background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
        background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
    
    step += gradientSpeed;
    if ( step >= 1 )
    {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];
        
        //pick two new target color indices
        //do not pick the same as the current one
        colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
        
    }
    }
    
    setInterval(updateGradient,10);
    
});


