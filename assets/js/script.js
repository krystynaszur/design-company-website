var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
    cellAlign: 'left',
    contain: true,
    prevNextButtons: false,
    setGallerySize: false,
    draggable: true,
    resize: true
});


var grid = document.querySelector('.grid');
var iso = new Isotope(grid, {
    resizesContainer: true,
    itemSelector: '.grid-item',
    layoutMode: 'fitRows',
    masonry: {
        isFitWidth: true
    }
});

var activeButton = "all-projects";

var loadedTemplates = [];
console.log("Loaded templates: " + loadedTemplates);

var filtersElem = document.querySelector('.filters-button-group');
filtersElem.addEventListener('click', function (event) {

    activeButton = event.target.id;
    changeActiveButton(activeButton);

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
    iso.arrange({ filter: filterValue });

});

function changeActiveButton(idOfActiveButton) {
    activeButton = idOfActiveButton;
    console.log("Active button: " + activeButton)
}

var showMore = document.querySelector('.showMore');

showMore.addEventListener("click", function (event) {

    var url = "./assets/json/" + activeButton + ".json";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.addEventListener("load", function () {
        var response = JSON.parse(xhr.response);

        var templateToBeLoaded = activeButton;

        var alreadyLoaded = checkIfLoaded(templateToBeLoaded, loadedTemplates);

        if (alreadyLoaded === true) {
            hideShowMore(activeButton);
        }
        else {
            loadTemplate(response);
            var loadedTemplate = templateToBeLoaded;
            updateLoadedTemplates(loadedTemplate);
            hideShowMore(loadedTemplate);
        }
    });
    xhr.send();
});

function checkIfLoaded(templateToBeLoaded, loadedTemplates) {
    var count = loadedTemplates.length;
    for (var i = -1; i < count; i++) {
        if (loadedTemplates[i] === templateToBeLoaded) { return true }
        else { return false };
    }
}

function updateLoadedTemplates(loadedTemplate) {
    loadedTemplates.push(loadedTemplate);
    console.log("Updated loaded templates: " + loadedTemplates);
}

function hideShowMore(loadedTemplate) {
    if (loadedTemplates.includes(loadedTemplate)) {
        var showMoreButton = document.getElementById('show-more-button');
        showMoreButton.style.display = "none";
    }
}

function loadTemplate(response) {

    for (var i = 0; i < response.data.length; i++) {
       if (!document.querySelector("#" + response.data[i].id)) {
        var z = "";
        z = document.createElement('div');
        z.innerHTML = ' <div id=' + response.data[i].id + ' class="grid-item ' + response.data[i].class + '"><div class="layer">  <p>ABOUT</p>  <p>' + response.data[i].content + '</p></div><img src="' + response.data[i].imageUrl + '" alt=""></div>';
        grid.appendChild(z);
        iso.appended(z);
        iso.layout();
    }
  }
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
