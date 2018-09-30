/*go();
window.addEventListener('resize', go);

function go() {
  console.log("Yay")
}

this.isMobile = navigator.userAgent.match( /Android|AvantGo|BlackBerry|DoCoMo|Fennec|iPod|iPhone|iPad|J2ME|MIDP|NetFront|Nokia|Opera Mini|Opera Mobi|PalmOS|PalmSource|portalmmm|Plucker|ReqwirelessWeb|SonyEricsson|Symbian|UP\\.Browser|webOS|Windows CE|Windows Phone OS);
if (this.isMobile) {
  window.addEventListener('orientationchange', function () {
    if (this.resizeTo) {
      clearTimeout(this.resizeTo);
    }

    this.resizeTo = setTimeout(function () {
      for (itemIndex = 0; itemIndex < self.resizeCacheArr.length; itemIndex++) {
        self.resizeCacheArr[itemIndex]();
      }
    }, 200);
  }, false);
} else {
  window.addEventListener('resize', function () {
    if (this.resizeTo) {
      clearTimeout(this.resizeTo);
    }

    this.resizeTo = setTimeout(function () {
      for (itemIndex = 0; itemIndex < self.resizeCacheArr.length; itemIndex++) {
        self.resizeCacheArr[itemIndex]();
      }
    }, 200);
  });
}*/





var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
  // options
  cellAlign: 'left',
  contain: true,
  prevNextButtons: false,
  setGallerySize: false,
  draggable: true,
  resize: true
});


var grid = document.querySelector('.grid');
var iso = new Isotope(grid, {
  itemSelector: '.grid-item',
  layoutMode: 'fitRows',
  masonry: {
      isFitWidth: true
  }
});

var filtersElem = document.querySelector('.filters-button-group');
filtersElem.addEventListener('click', function (event) {
  // only work with buttons
  if (!matchesSelector(event.target, 'button')) {
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

showMore.addEventListener('click', function (event) {
  var url = '/assets/json/photos.json';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.addEventListener('load', function () {
    var response = JSON.parse(xhr.response);
  });
  xhr.send();


}
);

iso.appendChild(response);
iso.appended(response);

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
