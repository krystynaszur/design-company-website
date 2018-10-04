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
//var gridContainer = document.getElementById('grid-container');
var iso = new Isotope(grid, {
  // elementStyle: null,
  resizesContainer: true,
  itemSelector: '.grid-item',
  layoutMode: 'fitRows',
  masonry: {
    isFitWidth: true
  }
});

var activeButton = "all-projects";

var filtersElem = document.querySelector('.filters-button-group');
filtersElem.addEventListener('click', function (event) {
 
  console.log(event.target.id);
  activeButton = event.target.id;
  changeActiveButton(activeButton);
console.log('aCtive button:' + activeButton);
  var showMoreButton = document.getElementById('show-more-button');
  if (loadedTemplates.includes(activeButton)) {
    showMoreButton.style.display = "none";
  }
  else {
  showMoreButton.style.display = "block";
  }

  if (!matchesSelector(event.target, 'button')) {
    return;
  }
  var filterValue = event.target.getAttribute('data-filter');
  // use matching filter function
  iso.arrange({ filter: filterValue });

});

function changeActiveButton(idOfActiveButton) {
  activeButton = idOfActiveButton;
  console.log("Active button:" + activeButton)
}

/*
var showMore = document.querySelector('.showMore');
showMore.addEventListener( 'click', function( event ) {
  var items = '<div class="grid-item">YAY</div>';
  elem.append(items);
  elem.isotope( 'appended', items );

});

var gridButtons = document.querySelectorAll(".grid-button");
console.log(gridButtons);

for (var i = 0; i < gridButtons.length; i++) {
  console.log(gridButtons[i].outerText);
  gridButtons[i].addEventListener("click", function (event) {
    //  var activeButton = document.activeElement.id;
    //  console.log(activeButton);
    changeActiveButton(document.activeElement.id);
    var showMoreButton = document.getElementById('show-more-button');
    showMoreButton.style.display = "inline";
  });
};

var activeButtonId = "all-projects";
console.log(activeButtonId);*/


var showMore = document.querySelector('.showMore');
/*
showMore.addEventListener("click", function(event) {

  var focused = document.querySelector(":active");
    console.log(focused);
});*/

showMore.addEventListener("click", function (event) {

  console.log(activeButton);
  var url = "./assets/json/" + activeButton + ".json";

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.addEventListener("load", function () {
    var response = JSON.parse(xhr.response);

    var templateToBeLoaded = activeButton;
    console.log ("Template to be loaded" + templateToBeLoaded);

   var alreadyLoaded = checkIfLoaded(templateToBeLoaded, loadedTemplates);
    console.log("Check if loaded result: " + alreadyLoaded );
  
    if (alreadyLoaded === true) {
       console.log("We can't upload the template");
    hideShowMore(activeButton);
     }
     else {
      console.log("We can upload the template");
      loadTemplate(response);
      var loadedTemplate = templateToBeLoaded;
      console.log("Loaded template:" + loadedTemplate);
      
      
       updateLoadedTemplates(loadedTemplate);
       hideShowMore(loadedTemplate);
     }
    // hideShowMore(activeButton);
  });
  xhr.send();
  //var showMoreButton = document.getElementById('show-more-button');
  //showMoreButton.style.display = "none";
  /*var template = document.getElementById('template').innerHTML;
  var rendered = Mustache.render(template);
  document.getElementById('mustache').innerHTML = rendered;
  console.log(grid);
  var z = document.createElement('div'); 
  z.innerHTML =   ' <div class="grid-item misc photos"><div class="layer">  <p>ABOUT</p>  <p> Praesent metus urna, feugiat a placerat elementum at leo</p></div><img src="assets/images/img12.png" alt=""></div>';
  grid.appendChild( z);
  iso.appended( z );
  iso.layout();*/
});
/*
iso.appendChild(response);
iso.appended(response);*/
var loadedTemplates = [];
console.log("Loaded templates"+ loadedTemplates);

function checkIfLoaded(templateToBeLoaded, loadedTemplates) {
  console.log("Loaded templates"+ loadedTemplates);
  var count = loadedTemplates.length;
  for (var i = -1; i < count; i++) {
    if (loadedTemplates[i] === templateToBeLoaded) { return true }
    else { return false };
  }
}
function updateLoadedTemplates(loadedTemplate) {
  console.log("Loaded category" + loadedTemplate);
  loadedTemplates.push(loadedTemplate);
  console.log("All loaded categories" + loadedTemplates)
}

function hideShowMore(loadedTemplate) {
  console.log(loadedTemplates.includes(loadedTemplate));
  if (loadedTemplates.includes(loadedTemplate)) {
    var showMoreButton = document.getElementById('show-more-button');
    showMoreButton.style.display = "none";
  }
}
/*
var loaded = {
  all: "",
photo: "",
branding: "",
adverts: "",
development: "",
misc: "",
};
 
console.log ("Loaded all:" + loaded.all);*/

function loadTemplate(response) {
  console.log(response);
  console.log("Is the template loaded?" + response.status);
  console.log(response.data[0].content);
  console.log(response.data[0].imageUrl);
  console.log(response.data[0].class);

  for (var i = 0; i < response.data.length; i++) {
    //  if (!document.querySelector("#" + response.data[i].id)) {
    console.log("New loaded image id" + response.data[i].id);
    var z = "";
    z = document.createElement('div');
    z.innerHTML = ' <div id=' + response.data[i].id + ' class="grid-item ' + response.data[i].class + '"><div class="layer">  <p>ABOUT</p>  <p>' + response.data[i].content + '</p></div><img src="' + response.data[i].imageUrl + '" alt=""></div>';
    grid.appendChild(z);
    iso.appended(z);
    iso.layout();
    // }
    // var showMoreButton = document.getElementById('show-more-button');
    // showMoreButton.style.display = "none";
  }

  /* if (response.status = "success") {
     console.log("You should hide the button!");
     var showMoreButton = document.getElementById('show-more-button');
    showMoreButton.style.display = "none";
   }*/

}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function addProjects(projectsForAdding) {
  console.log(projectsForAdding);
}
