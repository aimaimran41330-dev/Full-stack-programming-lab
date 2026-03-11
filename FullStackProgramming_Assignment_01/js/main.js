/* ============================================
   HotSpring Portable Spas - Main JavaScript
   jQuery Animations & Shared Functions
   FullStackProgramming_Assignment_01
   ============================================ */

$(document).ready(function () {

  /* ================================================
     1. SCROLL ANIMATIONS - Elements fade in on scroll
     ================================================ */
  function animateOnScroll() {
    $('.animate-on-scroll').each(function (index) {
      var elementTop = $(this).offset().top;
      var viewportBottom = $(window).scrollTop() + $(window).height();

      if (elementTop < viewportBottom - 60) {
        var delay = $(this).data('delay') || (index * 100);
        var el = $(this);
        setTimeout(function () {
          el.addClass('fade-in-up').css('opacity', 1);
        }, delay);
      }
    });
  }

  // Run on load and scroll
  animateOnScroll();
  $(window).on('scroll', animateOnScroll);


  /* ================================================
     2. NAVBAR - Active link highlight
     ================================================ */
  var currentPage = window.location.pathname.split('/').pop();
  $('.red-nav .nav-link').each(function () {
    var href = $(this).attr('href');
    if (href === currentPage) {
      $(this).css('background', 'rgba(0,0,0,0.2)');
    }
  });


  /* ================================================
     3. CART BUTTON - Dropdown toggle
     ================================================ */
  $('.cart-btn').on('click', function () {
    $(this).toggleClass('active');
  });


  /* ================================================
     4. SEARCH BAR - Focus effect
     ================================================ */
  $('.red-nav input[type="text"], .search-bar-section input').on('focus', function () {
    $(this).css('box-shadow', '0 0 0 2px rgba(255,255,255,0.4)');
  }).on('blur', function () {
    $(this).css('box-shadow', 'none');
  });

  // Search button click
  $('.btn-search').on('click', function () {
    var query = $(this).siblings('input').val().trim();
    if (query.length > 0) {
      // In a real app, this would redirect to search results
      console.log('Searching for:', query);
    }
  });


  /* ================================================
     5. PRODUCT CARDS - Add to Cart animation
     ================================================ */
  $(document).on('click', '.btn-cart', function () {
    var btn = $(this);
    var original = btn.text();
    btn.text('ADDED!').css('background', '#2a7a2a');
    setTimeout(function () {
      btn.text(original).css('background', '');
    }, 1500);
  });


  /* ================================================
     6. FILTER SIDEBAR - Active state toggle
     ================================================ */
  $(document).on('click', '.filter-item', function () {
    $(this).closest('.sidebar-filter').find('.filter-item').removeClass('active');
    $(this).addClass('active');
  });


  /* ================================================
     7. SHARED FORM VALIDATION FUNCTIONS
     ================================================ */

  // Validate a single field
  window.validateField = function (fieldId, errorId, type) {
    var val = $('#' + fieldId).val().trim();
    var isValid = true;

    switch (type) {
      case 'email':
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(val);
        break;
      case 'phone':
        var phoneRegex = /^[\d\s\-\+\(\)]{7,15}$/;
        isValid = phoneRegex.test(val);
        break;
      case 'zip':
        isValid = /^\d{4,10}$/.test(val);
        break;
      case 'password':
        isValid = val.length >= 6;
        break;
      case 'text':
      default:
        isValid = val.length > 0;
        break;
    }

    if (!isValid) {
      $('#' + fieldId).addClass('error-field');
      $('#' + errorId).fadeIn(200);
    } else {
      $('#' + fieldId).removeClass('error-field');
      $('#' + errorId).fadeOut(200);
    }

    return isValid;
  };

  // Remove error on focus
  $(document).on('focus', 'input, select, textarea', function () {
    $(this).removeClass('error-field');
  });


  /* ================================================
     8. SHAKE ANIMATION for invalid fields
     ================================================ */
  $.fn.shake = function (times, distance, duration) {
    times    = times    || 4;
    distance = distance || 8;
    duration = duration || 60;

    this.each(function () {
      var el = $(this);
      for (var i = 0; i < times; i++) {
        el.animate({ marginLeft: '+=' + distance }, duration)
          .animate({ marginLeft: '-=' + (distance * 2) }, duration);
      }
      el.animate({ marginLeft: '+=' + distance }, duration);
    });

    return this;
  };


  /* ================================================
     9. SMOOTH SCROLL for anchor links
     ================================================ */
  $('a[href^="#"]').on('click', function (e) {
    var target = $($(this).attr('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 80
      }, 500);
    }
  });


  /* ================================================
     10. NEWSLETTER FORM
     ================================================ */
  $('.newsletter-input').closest('div').find('button').on('click', function () {
    var email = $('.newsletter-input').val().trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      $('.newsletter-input').val('').attr('placeholder', 'Thank you for subscribing!');
    } else {
      $('.newsletter-input').css('border', '1px solid #c00').attr('placeholder', 'Enter valid email');
      setTimeout(function () {
        $('.newsletter-input').css('border', '');
      }, 2000);
    }
  });


  /* ================================================
     11. PAGE LOAD - Fade in body
     ================================================ */
  $('body').css('opacity', 0).animate({ opacity: 1 }, 300);


  /* ================================================
     12. BACK TO TOP on double-click logo
     ================================================ */
  $('.logo-text').on('dblclick', function () {
    $('html, body').animate({ scrollTop: 0 }, 400);
  });

});