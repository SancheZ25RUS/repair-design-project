const slider = document.querySelector("[data-slider]");
const sliderTrack = document.querySelector("[data-slider-track]");
const sliderMobileArrowPrev = document.querySelector("[data-slider-arrow-mobile-prev]");
const sliderMobileArrowNext = document.querySelector("[data-slider-arrow-mobile-next]");
const sliderDesktopArrowPrev = document.querySelector("[data-slider-arrow-desktop-prev]");
const sliderDesktopArrowNext = document.querySelector("[data-slider-arrow-desktop-next]");
const sliderPaginationDots = document.querySelector(".projects__pagination-dot-wrap").children;
const sliderImages = sliderTrack.children;

// Устанавливаем текущее просматриваемое изображение
// sliderImages[0].setAttribute("data-current-image", '');


// Инициализация слайдера
// Устанавливаем дефолтное положения трека внутри слайдера
sliderTrack.style.transform = `translateX(${0}px)`;



// Функция получения значения, на которое сдвинут трек (свойство transform)
function getTransformValueOfSliderTrack() {
  // Регулярка
  const regExp = /\d+/;
  // С помощью регулярки получаем значение
  let sliderTrackNotFormatData = regExp.exec(sliderTrack.style.transform);
  // И возвращаем в виде числа
  return Number(sliderTrackNotFormatData[0]);
}


// Функция сдвига трека
function toSlide(width) {
  sliderTrack.style.transform = `translateX(${width}px)`
}

// Функция сдвига трека вперед
function toSlideForward() {
  let sliderCurrentOffset = getTransformValueOfSliderTrack();
  if (getTransformValueOfSliderTrack() == Number(slider.offsetWidth) * (sliderImages.length - 1)) {
    toSlide(0);
    sliderCurrentOffset = 0;
    return
  }
  toSlide(-`${sliderCurrentOffset += Number(slider.offsetWidth)}`)
}


// Функция сдвига трека назад
function toSlideBack() {
  let sliderCurrentOffset = getTransformValueOfSliderTrack();
  if (sliderCurrentOffset == 0) {
    toSlide(-Number(slider.offsetWidth * (sliderImages.length - 1)));
    return
  }
  toSlide(-`${sliderCurrentOffset -= Number(slider.offsetWidth)}`)
}



// Кнопки для перемещения трека вперед
sliderMobileArrowNext.addEventListener("click", toSlideForward)
sliderDesktopArrowNext.addEventListener("click", toSlideForward)


// Кнопки для перемещения трека назад
sliderMobileArrowPrev.addEventListener("click", toSlideBack)
sliderDesktopArrowPrev.addEventListener("click", toSlideBack)
