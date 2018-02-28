

$( window ).on( "load", function() {
    $("#overlay").animate({"bottom":"100vh"},400);



    var toggle = false;
    var lastActive = "#main";

    function animateMenu(){
        if(window.innerWidth<=768){var anim = 400;}else{var anim=600;}
        if(toggle==false){
            $("#menu").css("background-image","url('./static/img/close.png')");
            $(lastActive).animate( {"right":"100%"},anim);
            $("#menu-content").animate({"left":"0%"},anim);
            toggle = true;
        }else{
            $("#menu").css("background-image","url('./static/img/hamburger.png')");
            $(lastActive).animate( {"right":"0%"},anim );
            $("#menu-content").animate({"left":"100%"},anim);
            toggle = false; 
        }
    }

    $( "#menu" ).on( "click", function() {
            animateMenu();
    });

    $( "#home" ).on( "click", function() {
            animateMenu();
    });
    $( "#home-mob" ).on( "click", function() {
            animateMenu();
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