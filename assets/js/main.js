var breakWidth = 768;

$(document).ready(function() {

  /* ===========================================================================
     Page entry animations and initial setup
     =========================================================================== */
  
  $('#main')
    .transition('fade in', 1500);

  var today = new Date();
  if (today.getDate() == 1 && today.getMonth() == 3) {
    document.querySelector('body').className = "foolsday"; 
  }
  
  
  /* ===========================================================================
     Table Of Content Implementation
     =========================================================================== */
  var $bodytag = $('html, body');
  var $tags = $('#goto-about, #goto-faq, #goto-reg-now, #goto-footer, #goto-team');
  $tags.click(function(e) {
    var elementName = e.target.id.substr(5);
    console.log(elementName);
    if ($(window).width() <= breakWidth) {
      $bodytag.animate({
        scrollTop: $('#'+elementName).offset().top
      }, 800);
    } 
    else {
      $bodytag.animate({
        scrollTop: $('#'+elementName).offset().top - 45
      }, 800);
    }
  });

  /* ===========================================================================
     Registration Implementation

     Adapted from http://stackoverflow.com/questions/8425701/ajax-mailchimp-signup-form-integration. 
     Currently disabled because registration is not open. 
     =========================================================================== */
  /*
  var $form = $('form');

  if ( $form.length > 0 ) {
    $('form button[type="submit"]').bind('click', function ( event ) {
      if ( event ) event.preventDefault();
      register($form);
    });
  }

  function register($form) {
    $('#reg-email-label').slideUp();
    $.ajax({
      method: 'POST',
      url: $form.attr('action'),
      data: $form.serialize(),
      cache       : false,
      dataType    : 'json',
      contentType : "application/json; charset=utf-8",
      error       : function(err) { alert("Could not connect to the registration server. Please try again later."); },
      success     : function(data) {
        $('#reg-email-label').text(data.msg);
        if (data.result != "success") {
          // Something went wrong, do something to notify the user. maybe alert(data.msg);
          $('#reg-email-label').addClass('red basic').slideDown();
        } else {
          $('#reg-button').hide();
          $('#reg-email-label').removeClass('red basic').slideDown();
        }
      }
    });
  }
  
  */

  /* ===========================================================================
     Page responsiveness
     =========================================================================== */
  hideAnswers();
  $('.question').on('click', function() {
      if ($(window).width() <= breakWidth) {
        $question = $(this);
        $answer = $question.next();
        $answer.slideToggle(200);
        $question.children().toggleClass('angle-rotated');
      }
    })

  var resizeTimeout;
  var resizeNavbarTimeout;

  $(window).on('resize', function() {
    clearTimeout(resizeTimeout);
    clearTimeout(resizeNavbarTimeout);
    resizeTimeout = setTimeout(hideAnswers(), 200);
    resizeNavbarTimeout = setTimeout(recalculateNavbarPosition(), 250);
  });

  /* Following Nav Bar */
  var scrollTimeout;
  $(window).on('scroll', function() {
    if ($(window).width() >= 786) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(checkAndMoveNavbarPosition(), 250);
    }
  });

  /* move the nav bar as appropriate */
  var isFixed = false;
  var navbarHeight;
  var deltaLocation;
  recalculateNavbarPosition();
  function checkAndMoveNavbarPosition() {
    if (!isFixed && $(window).scrollTop() > deltaLocation) {
      $('#navbar').stop(true).hide();
      $('#navbar').addClass('fixed');
      isFixed = true;
      $('#navbar').show();
    }
    else if (isFixed && $(window).scrollTop() < deltaLocation) {
      $('#navbar').stop(true).css("display", "none");
      $('#navbar').removeClass('fixed');
      isFixed = false;
      $('#navbar').show();
    }
  }

  function recalculateNavbarPosition() {
    navbarHeight = $('#navbar').outerHeight();
    deltaLocation = $('#splash').outerHeight() - navbarHeight;
  }
});


/* ===========================================================================
 Code to hide the FAQ Answers

 run on window load an resize
 =========================================================================== */
//run on window load and resize
function hideAnswers() {
  if ($(window).width() <= breakWidth) {
    $('.answer').css('display','none');
    $('.question').addClass('question-hidden');
    $('.angle').css('display', 'inline-block');
  }
  else {
    $('.answer').css('display','block');
    $('.question').removeClass('question-hidden');
    $('.angle').css('display', 'none');
    $('.angle').removeClass('angle-rotated');
  }
}

/* ===========================================================================
    Google Maps Configuration
    
    Center the Map on (53.1683441, 8.6510992) -- Jacobs University
   =========================================================================== */
function mapInit(){
    var center = {
      lat: 53.1683441,
      lng: 8.6510992
    };
    var map = new google.maps.Map(document.querySelector('.jacobshack-map'), {
      center: center,
      zoom: 16,
      scrollwheel: false,
    });
    var marker = new google.maps.Marker({
       position: center,
       map: map,
       title: 'jacobsHack!'
    });
   }