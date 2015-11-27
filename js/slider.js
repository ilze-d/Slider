$(function() {
    slider(".aqua-slider");
});

function slider(sliderContainer){

    var sliderContainerWidth = $(sliderContainer).width();
    var slideCount = $(sliderContainer +  ' .slide-track > div').length;
    var slideLength = sliderContainerWidth * 0.8;
    var trackLength = slideLength * slideCount;
    var translateLeft = slideLength * 0.8765;
    var blockAnimation = false;
    var activeButton = 1;

    $(".slide-track > div").width(slideLength);
    $(".slide-track").width(trackLength);
    $(".slide-track").css( {"right" : translateLeft, "transition":"right 1s"});
    $(sliderContainer).addClass("main-slider");
    $(".slide-track > div:last-child").prependTo(".slide-track");
    $(".slide-track > div:nth-child(2)").addClass("active-slide");

    buildSliderbuttons();

    $( ".arrow-next" ).click(function() {
        slideRight();
    });

    $( ".arrow-previous" ).click(function() {
        slideLeft();
    });

    $( ".slider-buttons button" ).click(function() {
        $( ".slider-buttons button").removeClass("active");
        var selectedButtonSlide = $(this).attr('class');
        selectedButtonSlide = selectedButtonSlide.split("-").pop();
        $(this).addClass("active");
        navigateToSlide( selectedButtonSlide );
    });

    function slideRight(){
        if(blockAnimation != true) {
            blockAnimation = true;
            translateLeft = translateLeft + slideLength;
            $(".slide-track").css({"right": translateLeft, "transition": "right 0.5s"});
            $(".slide-track > div").removeClass("active-slide");
            var thisBottomButton = $(".slide-track > div:nth-child(2)").attr('class');
            $(".slider-buttons button").removeClass("active");
            activeButton = thisBottomButton.split("-").pop();
            $(".slider-buttons ." + thisBottomButton).addClass("active");
            $(".slide-track > div:nth-child(3)").addClass("active-slide");
            window.setTimeout(loopSlider, 500);
        }
    }

    function slideLeft(){

        if(blockAnimation != true) {
            blockAnimation = true;
            $(".slide-track > div").removeClass("active-slide");
            var thisBottomButton = $(".slide-track > div:last-child").attr('class');
            $(".slider-buttons button").removeClass("active");
            activeButton = thisBottomButton.split("-").pop();
            $(".slider-buttons ." + thisBottomButton).addClass("active");
            $(".slide-track > div:first-child").addClass("active-slide");
            $(".slide-track > div:last-child").prependTo('.slide-track');
            translateLeft = translateLeft + slideLength;
            $(".slide-track").css({"right": translateLeft, "transition": ""});
            window.setTimeout( function() { //workaround css3 transition
                translateLeft = translateLeft - slideLength;
                $(".slide-track").css({"right": translateLeft, "transition": "right 0.5s"});
            }, 10);
            window.setTimeout(loopSliderLeft, 500);
        }

    }

    function slideToLeft(toCount){

        if(blockAnimation != true) {
            blockAnimation = true;
            $(".slide-track > div").removeClass("active-slide");


            //var thisBottomButton = $(".slide-track > div:first-child").attr('class');
            //$(".slider-buttons button").removeClass("active");
            //activeButton = thisBottomButton.split("-").pop();
            //$(".slider-buttons ." + thisBottomButton).addClass("active");

            //$(".slide-track > div:first-child").addClass("active-slide");
            //$(".slide-track > div:last-child").prependTo('.slide-track');

            translateLeft = translateLeft + slideLength;
            $(".slide-track").css({"right": translateLeft, "transition": ""});
            window.setTimeout( function() { //workaround css3 transition
                translateLeft = translateLeft - slideLength;
                $(".slide-track").css({"right": translateLeft, "transition": "right 0.5s"});
            }, 10);
            //window.setTimeout(loopSliderLeft, 500);
        }

    }

    function slideToRight(toCount,thisSlide){

        if(blockAnimation != true) {
            blockAnimation = true;
            for (i = 0; i < toCount; i++) { $(".slide-track > div:first-child").appendTo('.slide-track'); }

            translateLeft = translateLeft + slideLength;
            $(".slide-track").css({"right": translateLeft, "transition": "right 0.5s"});

            $(".slide-track > div").removeClass("active-slide");
            //var thisBottomButton = $(".slide-track > div:nth-child(2)").attr('class');
            //$(".slider-buttons button").removeClass("active");
            //activeButton = thisBottomButton.split("-").pop();
            //$(".slider-buttons ." + thisBottomButton).addClass("active");
            $(".slide-track > div:nth-child(2)").addClass("active-slide");

            //window.setTimeout(loopSlider, 500);
           // setTimeout(function(){  for (i = 1; i < toCount+1; i++) { $(".slide-track >
           // div:first-child").appendTo('.slide-track'); }}, 500);
        }

    }

    function loopSlider(){
        $(".slide-track > div:first-child").appendTo('.slide-track');
        translateLeft = translateLeft - slideLength;
        $(".slide-track").css( {"right" : translateLeft, "transition":"right 0s"});
        blockAnimation = false;
    }

    function loopSliderLeft(){
        blockAnimation = false;
    }

    function buildSliderbuttons(){
        $( sliderContainer ).append( "<div class='slider-buttons'></div>" );
        for (i = 0; i < slideCount+1; i++) {
            var slideNavClass = 'slide-'+i;
            $( sliderContainer + " .slider-buttons" ).append( "<button class='"+slideNavClass+"'></button>" );
            $( sliderContainer + " .slide-track > div:nth-child("+i+")").addClass(slideNavClass);
        }
        //$(".slider-buttons button:first-child").appendTo(".slider-buttons");
        var activeSliderButton = $(".slider-buttons button:first-child");
        activeSliderButton.addClass("active");
    }

    function navigateToSlide( toSlide ){
        console.log("activebutton was "+activeButton);
        console.log(toSlide);

        if( activeButton > toSlide ){
            var howMany = activeButton - toSlide;
            //console.log("to left " + howMany);
            //console.log(howMany);
            //slideToLeft(howMany)
        }
        else if( activeButton < toSlide ){

            var howMany = toSlide - activeButton;
            //console.log("to rigt " + howMany);
            console.log("this many "+howMany);
            slideToRight(howMany,toSlide)
        }else{
            //alert("error");
        }

    }
}
