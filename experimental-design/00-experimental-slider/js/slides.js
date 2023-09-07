const section = document.querySelector('section')
const slides = section.querySelectorAll('div')

let index = 0

const matcher = window.matchMedia('(min-width: 800px)')

let size = matcher.matches ? 'desktop' : 'mobile'

let pattern = {
    desktop: [
        [4, 5, 2, 0, 0, 0],
        [4, 5, 2, 2, 0, 0],
        [0, 3, 2, 3, 0, 0],
        [0, 2, 1, 2, 1, 0],
        [0, 0, 2, 4, 3, 2],
        [0, 0, 0, 1, 1, 1],
    ],
    mobile: [
        [0.5, 1, 0, 0, 0, 0],
        [0, 0.5, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0.5, 1, 0],
        [0, 0, 0, 0, 0.5, 1],
    ],
}

const nextSlide = () => {
    index += 1
    index %= pattern[size].length

    section.style.gridTemplateColumns = pattern[size][index]
        .map((p) => {
            return `${p}fr`
        })
        .join(' ')

    slides.forEach((slide, slideIndex) => {
        if (pattern[size][index][slideIndex] === 0) {
            slide.classList.add('hide')
        } else {
            slide.classList.remove('hide')
        }
    })

    clearTimeout(timeout)
    timeout = setTimeout(nextSlide, 2000)
}

section.addEventListener('click', nextSlide)
timeout = setTimeout(nextSlide, 2000)

matcher.addEventListener('change', () => {
    size = matcher.matches ? 'desktop' : 'mobile'
    index = -1
    nextSlide()
})