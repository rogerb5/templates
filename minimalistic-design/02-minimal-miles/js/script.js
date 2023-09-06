const slides = [
    {
        quote: "I have a joke about recursion, but I have a joke about recursion, but I",
        title: "Computer Science",
        img: "../img/03.jpeg"
    },
    {
        quote: "Plants make bad comedians because their jokes always leaf the audience wanting more",
        title: "Biology",
        img: "../img/02.jpeg"
    },
    {
        quote: "What is the best way to describe a guitar that never finishes its work at the office? It's a quitar.",
        title: "Music",
        img: "../img/01.jpeg"
    },
    {
        quote: "What is the capital of Alaska? Juneau this one!",
        title: "Geography",
        img: "../img/04.jpeg"
    }
];

const overlay = document.querySelector('main.overlay-grid');
const overlayBtn = document.querySelector('button.overlay-button')
const idxBtns = document.querySelectorAll('button#idx-btn');
const sectionGrid = document.querySelector('section.grid');

const overlayHideBtn = document.querySelector('button.overlay-hide-btn');
const imagebtn = document.querySelector('button.picture-btn');
const prevBtn = document.querySelector('div.prev');
const nextBtn = document.querySelector('div.next');
const randomBtn = document.querySelector('button.random');
const outputTxt = document.querySelector('h2.quote');
const outputTitle = document.querySelector('h3.title');
const imageElement = document.querySelector('img.img-quote');
const slideTitle = document.querySelector('h3.title');

let slideNumber = 0;
let isImageShown = false;

function nextSlide() {
    slideNumber += 1;
    if (slideNumber > slides.length - 1) {
        slideNumber = 0;
    }
    console.log(slides[slideNumber]);
    updateSlide();
}

function prevSlide() {
    slideNumber -= 1;
    if (slideNumber < 0) {
        slideNumber = slides.length - 1;
    }
    console.log(slides[slideNumber]);
    updateSlide();
}

function randomSlide() {
    slideNumber = Math.floor(Math.random() * slides.length);
    updateSlide();
}

function toggleDisplay() {
    if (!isImageShown) {
        imageElement.src = slides[slideNumber].img;
        imageElement.classList.add('active');
        outputTxt.classList.add('unactive');
        imagebtn.textContent = 'Hide Image';
        isImageShown = true;
    } else {
        imageElement.classList.remove('active');
        outputTxt.classList.remove('unactive');
        imagebtn.textContent = 'Show Image';
        isImageShown = false;
    }
}

function updateImage() {
    if (isImageShown) {
        imageElement.src = slides[slideNumber].img;
    }
}

function updateSlide() {
    outputTxt.innerHTML = slides[slideNumber].quote;
    outputTitle.innerHTML = slides[slideNumber].title;
    updateImage();
}

function generateArticleCell(elementArr) {
    for (let idx = 0; idx < elementArr.length; idx++) {
        const article = document.createElement('article');
        article.classList.add('article-p');
        article.innerHTML = ` <h3>${slides[idx].quote}</h3>
                            <p>${slides[idx].title}</p>`
        sectionGrid.append(article);
    }
}

function displayOverlay() {
    overlay.classList.toggle('active');
    idxBtns.forEach(btn => {
        if (overlay.classList.contains('active')) {
            btn.style.opacity = '0';
            btn.style.pointerEvents = 'none';
            outputTitle.style.opacity = '0';
        } else {
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'all';
            outputTitle.style.opacity = '1';
        }
    })
}

overlayBtn.addEventListener('click', () => {
    displayOverlay();
})

nextBtn.addEventListener('click', () => {
    nextSlide();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
});

randomBtn.addEventListener('click', () => {
    randomSlide();
});

imagebtn.addEventListener('click', () => {
    toggleDisplay();
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide()
    } else if (e.key === 'ArrowRight') {
        nextSlide()
    }
})

generateArticleCell(slides);