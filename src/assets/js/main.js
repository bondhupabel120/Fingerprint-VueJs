$(document).ready(function($){
    "use strict";

  //==============================
  // smooth scroll
  //==============================
  $('.banner-carousel').owlCarousel({
    loop:true,
    margin:10,
    dots:false,
    nav:true,
    navText: ["<i class='fas fa-chevron-left'></i>","<i class='fas fa-chevron-right'></i>"],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})
$('.owl-carousel2').owlCarousel({
    loop:true,
    margin:10,
    dots:false,
    nav:true,
    navText: ["<i class='fas fa-chevron-left'></i>","<i class='fas fa-chevron-right'></i>"],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:6
        }
    }
})

$('.department-carousel').owlCarousel({
    loop:true,
    margin:10,
    dots:false,
    nav:true,
    navText: ["<i class='fas fa-chevron-left'></i>","<i class='fas fa-chevron-right'></i>"],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:3
        },
        1200:{
            items:6
        }
    }
})
}(jQuery));
