var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
  // options
  cellAlign: 'left',
  contain: true
});


var elem = document.querySelector('.grid');
var iso = new Isotope(elem, {
  itemSelector: '.grid-item',
  layoutMode: 'fitRows'
});

var filtersElem = document.querySelector('.filters-button-group');
filtersElem.addEventListener( 'click', function( event ) {
  // only work with buttons
  if ( !matchesSelector( event.target, 'button' ) ) {
    return;
  }
  var filterValue = event.target.getAttribute('data-filter');
  // use matching filter function
  iso.arrange({ filter: filterValue });
 
});

var showMore = document.querySelector('.showMore');
showMore.addEventListener( 'click', function( event ) {
   iso.arrange({ filter: '*' });

});