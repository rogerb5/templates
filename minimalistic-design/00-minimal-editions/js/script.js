const galleries = [
    document.querySelectorAll('img.first-g-img'),
    document.querySelectorAll('img.second-g-img')
];

const overlayCaption = document.querySelector('main.m-overlay-cap');
const overlay = document.querySelector('main.m-overlay');
const imgOverlay = document.querySelector('img.m-overlay-img');
const prevBtn = document.querySelector('div.prev');
const nextBtn = document.querySelector('div.next');
const exitBtn = document.querySelector('button.exit');
const divContainer = document.querySelector('div.m-overlay-d');
const displayCounter = document.querySelector('h2.m-overlay-counter');
const bg = document.querySelector('div.div-bg');

let activeGalleryIndex = 0;
let currentIndex = 0;

function displayOverlay() {
    overlay.classList.add('active');
    overlayKeyEvents();
}

function hideOverlay() {
    overlay.classList.remove('active');
    removeOverlayKeyEvents();
}

function showImage(image, imageArray) {
    imgOverlay.src = image.dataset.path;
    currentIndex = Array.from(imageArray).indexOf(image);
    displayCounter.textContent = `0${currentIndex + 1} / ${imageArray.length}`;
    displayOverlay();
}

function showNextImage(imageArray) {
    currentIndex += 1;
    if (currentIndex > imageArray.length - 1) {
        currentIndex = 0;
    }
    showImage(imageArray[currentIndex], imageArray);
}

function showPreviousImage(imageArray) {
    currentIndex -= 1;
    if (currentIndex < 0) {
        currentIndex = imageArray.length - 1;
    }
    showImage(imageArray[currentIndex], imageArray);
}

function processImage(imageArray) {
    imageArray.forEach(image => {
        image.addEventListener('click', () => {
            currentIndex = Array.from(imageArray).indexOf(image);
            showImage(image, imageArray);
        });
    });
}

nextBtn.addEventListener('click', () => {
    showNextImage(galleries[activeGalleryIndex]);
});

prevBtn.addEventListener('click', () => {
    showPreviousImage(galleries[activeGalleryIndex]);
});

exitBtn.addEventListener('click', () => {
    hideOverlay();
});

function overlayKeyEvents() {
    document.addEventListener('keyup', overlayKeyUpHandler);
}

function removeOverlayKeyEvents() {
    document.removeEventListener('keyup', overlayKeyUpHandler);
}

function overlayKeyUpHandler(e) {
    if (overlay.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            showPreviousImage(galleries[activeGalleryIndex]);
        } else if (e.key === 'ArrowRight') {
            showNextImage(galleries[activeGalleryIndex]);
        }
    }
}

// Process images for each gallery
galleries.forEach((gallery, index) => {
    processImage(gallery);
    gallery.forEach(image => {
        image.addEventListener('click', () => {
            activeGalleryIndex = index;
        });
    });
});

document.addEventListener('scroll', () => {
    bg.classList.add('clear');
})