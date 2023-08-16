const slide = document.querySelectorAll(".slide");
const slideCount = slide.length;
let counter = 0;

slide.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
});

const slideImage = () => {
    slide.forEach((slide) => {
        slide.style.transform = `translateX(-${counter * 100}%)`;
    });
};

const nextSlide = () => {
    counter = (counter + 1) % slideCount;
    slideImage();
};

// Change slider image automatically after 3 seconds
setInterval(nextSlide, 2000);
