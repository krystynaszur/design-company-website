var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
  // options
  cellAlign: 'left',
  contain: true,
  prevNextButtons: false,
  setGallerySize: false,
  draggable: true
});


var grid = document.querySelector('.grid');
var iso = new Isotope(grid, {
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

/*
var showMore = document.querySelector('.showMore');
showMore.addEventListener( 'click', function( event ) {
  var items = '<div class="grid-item">YAY</div>';
  elem.append(items);
  elem.isotope( 'appended', items );

});*/

var showMore = document.querySelector('.showMore');

showMore.addEventListener('click', function(event){
  var url = '';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.addEventListener('load', function(){
    var response = JSON.parse(xhr.response);
  });
  xhr.send();

        grid.appendChild(response);
        iso.appended(response);
      }
);


function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
