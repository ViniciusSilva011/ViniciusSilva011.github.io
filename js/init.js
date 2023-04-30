/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

/*----------------------------------------------------*/
/* FitText Settings
------------------------------------------------------ */

    setTimeout(function() {
	   $('h1.responsive-headline').fitText(1, { minFontSize: '40px', maxFontSize: '90px' });
	 }, 100);


/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});


/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

	var sections = $("section");
	var navigation_links = $("#nav-wrap a");

	sections.waypoint({

      handler: function(event, direction) {

		   var active_section;

			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},
		offset: '35%'

	});


/*----------------------------------------------------*/
/*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

   $('header').css({ 'height': $(window).height() });
   $(window).on('resize', function() {

        $('header').css({ 'height': $(window).height() });
        $('body').css({ 'width': $(window).width() })
   });


/*----------------------------------------------------*/
/*	Fade In/Out Primary Navigation
------------------------------------------------------*/

   $(window).on('scroll', function() {

		var h = $('header').height();
		var y = $(window).scrollTop();
      var nav = $('#nav-wrap');

	   if ( (y > h*.20) && (y < h) && ($(window).outerWidth() > 768 ) ) {
	      nav.fadeOut('fast');
	   }
      else {
         if (y < h*.20) {
            nav.removeClass('opaque').fadeIn('fast');
         }
         else {
            nav.addClass('opaque').fadeIn('fast');
         }
      }

	});


/*----------------------------------------------------*/
/*	Modal Popup
------------------------------------------------------*/

    $('.item-wrap a').magnificPopup({

       type:'inline',
       fixedContentPos: false,
       removalDelay: 200,
       showCloseBtn: false,
       mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
    		e.preventDefault();
    		$.magnificPopup.close();
    });


/*----------------------------------------------------*/
/*	Flexslider
/*----------------------------------------------------*/
   $('.flexslider').flexslider({
      namespace: "flex-",
      controlsContainer: ".flex-container",
      animation: 'slide',
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false,
   });
//#region contact form
/*----------------------------------------------------*/
/*	contact form
------------------------------------------------------*/

   $('form#contactForm button.submit').click(function() {

      $('#image-loader').fadeIn();

      var contactName = $('#contactForm #contactName').val();
      var contactEmail = $('#contactForm #contactEmail').val();
      var contactSubject = $('#contactForm #contactSubject').val();
      var contactMessage = $('#contactForm #contactMessage').val();

      var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
               '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;

      $.ajax({

	      type: "POST",
	      url: "inc/sendEmail.php",
	      data: data,
	      success: function(msg) {

            // Message was sent
            if (msg == 'OK') {
               $('#image-loader').fadeOut();
               $('#message-warning').hide();
               $('#contactForm').fadeOut();
               $('#message-success').fadeIn();   
            }
            // There was an error
            else {
               $('#image-loader').fadeOut();
               $('#message-warning').html(msg);
	            $('#message-warning').fadeIn();
            }

	      }

      });
      return false;
   });
//#endregion
   //#region GUIDE MODAL
   // Get the modal element
   const modal = document.querySelector('.modal');

   // Get the button that opens the modal
   const openModalBtn = document.querySelector('#see-demo-anchor');

   // When the user clicks the button, open the modal
   openModalBtn.addEventListener('click', (e) => {
      e.preventDefault()
      modal.style.display = 'block';
      modal.classList.add('is-visible')
   });
   
   // When the user clicks anywhere outside of the modal, close it
   window.addEventListener('click', (event) => {
      if (event.target == modal) {
         modal.classList.remove('is-visible')
         modal.style.display = undefined;
      }
   });
   //#endregion
   //#region ATEC SHOW MORE
   const showMoreAnchor = $('#show-more');
   const theBasicsAnchor = $('#the-basics');
   showMoreAnchor.on('click', function(e) {
      e.preventDefault()
      theBasicsAnchor.show();
      showMoreAnchor.hide();
   });
   //#endregion
  
   //#region Code Maintenance
   const seeMoreCodeMaintenanceLink = $('#see-more-code-maintenance');
   const openCodeMaintenanceDocumentationLink = $('#open-code-maintenance-documentation');
   //#endregion
   seeMoreCodeMaintenanceLink.on('click', (e) => {
      e.preventDefault();
      $('#more-maintenance-code').show();
      seeMoreCodeMaintenanceLink.hide();
   })
   openCodeMaintenanceDocumentationLink.on('click', async (e) => {
      e.preventDefault();
      const secret = await window.prompt('Secret')
      if (!secret) return;
      try {
         const data = await $.post('https://edit.shopping-cart.floow.fun/v-auth', {token: secret});
         window.open(data.link, '_blank')
      } catch (error) {
         if (error.status === 401)
            return window.alert('Invalid Secret');
         window.alert('Server Error');
      }
   })

});

function readMore() {
   $("#read-more-button").hide();
   $("#read-more").show();
}
