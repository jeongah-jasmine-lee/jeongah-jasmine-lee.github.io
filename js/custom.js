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