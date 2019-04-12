$(document).ready(function(){
  if ($('.g-recaptcha')) {
    checkReCaptcha()
  }

  // Navigation change on scroll
  var maxOffset = 300;
  $(window).scroll(function() {
    if ($(window).scrollTop() >= maxOffset) {
      $('.navbar-default').addClass('navbar-shrink');
    }
    else {
      $('.navbar-default').removeClass('navbar-shrink');
    }
  });

  var maxOffset = 300;
  if ($(window).scrollTop() >= maxOffset) {
    $('.navbar-default').addClass('navbar-shrink');
  }
  else {
    $('.navbar-default').removeClass('navbar-shrink');
  }
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Non-jQuery version of function to close responsive menu on item click
const navToggle = document.querySelector('button.navbar-toggle'),
      links = Array.from(document.querySelectorAll('.navbar-collapse ul li a'));

links.forEach(el => {
  // Trigger a click on the navToggle to hide the nav menu.
  el.addEventListener('click', e => navToggle.click());
});

// Async contact form
const frm = document.querySelector('#contactForm'),
      success = document.querySelector('#success'),
      error = document.querySelector('#error');

frm.addEventListener('submit', e => {
  e.preventDefault();
  if (grecaptcha.getResponse() === "") {
    error.classList.remove('hidden');
    success.classList.add('hidden');
    return false;
  }

  let data = new FormData(frm);
  fetch(frm.action, {
    method: 'post',
    body: data
  }).then(res => {
    if (res.ok) {
      success.classList.remove('hidden');
      error.classList.add('hidden');
    } else {
      error.classList.remove('hidden');
      success.classList.add('hidden');
      console.error(res);
    }
  }).catch(err => {
    console.error(err);
  });

  return false;
});

// // Async contact form
// $('form[id=contactForm]').submit(function(){
//   $.post($(this).attr('action'), $(this).serialize(), function(data, textStatus, jqXHR){
//     $('form[id=contactForm] #success').hide();
//     $('form[id=contactForm] #error').hide();
//     if (jqXHR.status == 200) {
//       $('form[id=contactForm] #success').show();
//     }}, 'json').fail(function(){
//       $('form[id=contactForm] #success').hide();
//       $('form[id=contactForm] #error').hide();
//       $('form[id=contactForm] #error').show();
//   });
//   return false;
// });

// function onContactCaptcha($form) {
//   $('form#contactForm').submit();
// }

function checkReCaptcha() {
  if (typeof grecaptcha === "undefined") {
    $('.captcha-error').show();
    setTimeout(checkReCaptcha, 200);
  } else {
    $('.captcha-error').hide();
    $('.g-recaptcha-filler').hide();
    $('.g-recaptcha').attr('disabled', true);
  }
}
