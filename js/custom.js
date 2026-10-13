(function ($) {

  "use strict";

    // COLOR MODE
    $('.color-mode').click(function(){
        $('.color-mode-icon').toggleClass('active')
        $('body').toggleClass('dark-mode')
    })

    // HEADER
    $(".navbar").headroom();

    // PROJECT CAROUSEL
    $('.owl-carousel').owlCarousel({
    	items: 1,
	    loop:true,
	    margin:10,
	    nav:true
	});

    // SMOOTHSCROLL
    $(function() {
      $('.nav-link, .custom-btn-link').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
        }, 1000);
        event.preventDefault();
      });
    });  

    // TOOLTIP
    $('.social-links a').tooltip();

})(jQuery);

// Get all "Read more" links
document.querySelectorAll('.read-more').forEach(function(link) {
  link.addEventListener('click', function() {
    // Toggle the previous sibling element with class 'abstract-content'
    var abstract = this.previousElementSibling;
    if (abstract.style.display === "none" || abstract.style.display === "") {
      abstract.style.display = "inline";
      this.textContent = "Show less"; // Change link text to "Collapse"
    } else {
      abstract.style.display = "none";
      this.textContent = "Read more";
    }
  });
});

// Publication figure lightbox
(function() {
  var lightbox = document.createElement('div');
  lightbox.className = 'pub-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Publication figure');
  lightbox.innerHTML =
    '<div class="pub-lightbox-inner">' +
      '<button type="button" class="pub-lightbox-close" aria-label="Close">&times;</button>' +
      '<img src="" alt="">' +
    '</div>';
  document.body.appendChild(lightbox);

  var lightboxImg = lightbox.querySelector('img');
  var closeBtn = lightbox.querySelector('.pub-lightbox-close');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.pub-fig').forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      var img = link.querySelector('img');
      openLightbox(link.getAttribute('href'), img ? img.alt : '');
    });
  });

  closeBtn.addEventListener('click', function(event) {
    event.stopPropagation();
    closeLightbox();
  });

  lightbox.addEventListener('click', function(event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
})();