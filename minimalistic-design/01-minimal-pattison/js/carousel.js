const listButtons = document.querySelectorAll('li.open-btn');
const mainOverlay = document.querySelector('main.overlay');
const exitBtn = document.querySelector('button.close-btn');
const nextBtn = document.querySelector('div.next');
const prevBtn = document.querySelector('div.prev');
const firstGallery = document.querySelectorAll('img.fg-img');
const secondGallery = document.querySelectorAll('img.sg-img');
const sgCarousel = document.querySelector('div#second');
const fgCarousel = document.querySelector('div#first');
const pCounter = document.querySelector('p.counter');
const pGallery = document.querySelector('p.p-gal');
const bodyTag = document.querySelector('body');

const captions = [
    {
        cap: "Gallery One"
    },
    {
        cap: "Gallery Two"
    }
]

let attributeArray = createDataArray(listButtons);
let currentIndexFirstGallery = 0;
let currentIndexSecondGallery = 0;
let currentGallery = firstGallery;

function processDataArray(arr) {
    listButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            mainOverlay.classList.add('active');
            if (arr[index] === 'sg') {
                currentGallery = secondGallery;
                showCarousel(sgCarousel);
                hideCarousel(fgCarousel);
                pGallery.textContent = captions[1].cap;
            } else if (arr[index] === 'fg') {
                currentGallery = firstGallery;
                showCarousel(fgCarousel);
                hideCarousel(sgCarousel);
                pGallery.textContent = captions[0].cap;
            }
            updateCounter();
        });
    });
}

processDataArray(attributeArray);

function nextImage(gallery) {
    if (gallery === firstGallery) {
        currentIndexFirstGallery += 1;
        if (currentIndexFirstGallery >= gallery.length) {
            currentIndexFirstGallery = 0;
        }
        updateCounter();
        updateImage(gallery, currentIndexFirstGallery);
    } else if (gallery === secondGallery) {
        currentIndexSecondGallery += 1;
        if (currentIndexSecondGallery >= gallery.length) {
            currentIndexSecondGallery = 0;
        }
        updateCounter();
        updateImage(gallery, currentIndexSecondGallery);
    }
}

function prevImage(gallery) {
    if (gallery === firstGallery) {
        currentIndexFirstGallery -= 1;
        if (currentIndexFirstGallery < 0) {
            currentIndexFirstGallery = gallery.length - 1;
        }
        updateCounter();
        updateImage(gallery, currentIndexFirstGallery);
    } else if (gallery === secondGallery) {
        currentIndexSecondGallery -= 1;
        if (currentIndexSecondGallery < 0) {
            currentIndexSecondGallery = gallery.length - 1;
        }
        updateCounter();
        updateImage(gallery, currentIndexSecondGallery);
    }
}

function updateCounter() {
    const currentIndex = currentGallery === firstGallery ? currentIndexFirstGallery : currentIndexSecondGallery;
    const formattedIndex = currentIndex < 9 ? ` 0${currentIndex + 1}` : currentIndex + 1;
    pCounter.textContent = `${formattedIndex} | ${currentGallery.length}`;
}

function updateImage(gallery, currentIndex) {
    gallery.forEach(img => {
        img.style.opacity = 0;
    });
    gallery[currentIndex].style.opacity = 1;
}

exitBtn.addEventListener('click', () => {
    mainOverlay.classList.remove('active');
});

nextBtn.addEventListener('click', () => {
    nextImage(currentGallery);
});

prevBtn.addEventListener('click', () => {
    prevImage(currentGallery);
});


function createDataArray(arr) {
    let attributeArray = [];
    for (let i = 0; i < arr.length; i++) {
        let dataAttributes = arr[i].getAttribute('data-filter');
        attributeArray.push(dataAttributes);
    }
    return attributeArray;
}

function showCarousel(element) {
    element.classList.add('active');
}

function hideCarousel(element) {
    element.classList.remove('active');
}

document.addEventListener('keydown', (event) => {
    if (mainOverlay.classList.contains('active')) {
        if (event.keyCode === 37) {
            prevImage(currentGallery);
        } else if (event.keyCode === 39) {
            nextImage(currentGallery);
        }
    }
});