const slider = document.querySelector("[data-slider]");
const sliderTrack = document.querySelector("[data-slider-track]");
const sliderImages = sliderTrack.children;
const elemsWithDataSets = document.querySelectorAll(".projects__info-data")
// Кнопки, табы
const sliderButtonMobileArrowPrev = document.querySelector("[data-slider-arrow-mobile-prev]");
const sliderButtonMobileArrowNext = document.querySelector("[data-slider-arrow-mobile-next]");
const sliderButtonDesktopArrowPrev = document.querySelector("[data-slider-arrow-desktop-prev]");
const sliderButtonDesktopArrowNext = document.querySelector("[data-slider-arrow-desktop-next]");
const sliderDots = document.querySelector(".projects__pagination-dot-wrap").children;
const sliderTabs = document.querySelector(".projects__tab-wrap").children;

// Текстовые данные
const sliderData = {
  0: {
    "city": "Rostov-on-DonDon",
    "region": "LCD admiral",
    "apartmentArea": "81",
    "repairTime": "3.5",
    "repairCost": "Upon request",
  },
  1: {
    "city": "Sochi",
    "region": "Thieves",
    "apartmentArea": "105",
    "repairTime": "4",
    "repairCost": "Upon request",
  },
  2: {
    "city": "Rostov-on-Don",
    "region": "Patriotic",
    "apartmentArea": "93",
    "repairTime": "3",
    "repairCost": "Upon request",
  }
}

// Функция получения значения, на которое сдвинут трек (свойство transform в разметке), и возвращает в виде числа
function getTransformValueOfSliderTrack() {
  // Регулярка
  const regExp = /\d+/;
  // С помощью регулярки получаем значение
  let sliderTrackNotFormatData = regExp.exec(sliderTrack.style.transform);
  // И возвращаем в виде числа
  return Number(sliderTrackNotFormatData[0]);
}


// Функция сдвига трека с изображениями, принимает на вход направления сдвига
function toSlideImageTrack(direction) {
  let sliderCurrentOffset = getTransformValueOfSliderTrack();

  // Сдвиг трека с изображениями назад
  if (direction == "prev") {
    if (sliderCurrentOffset == 0) {
      sliderTrack.style.transform = `translateX(${-Number(slider.offsetWidth * (sliderImages.length - 1))}px)`;
      return;
    }
    sliderTrack.style.transform = `translateX(-${sliderCurrentOffset -= Number(slider.offsetWidth)}px)`

    // Сдвиг трека с изображениями вперед
  } else if (direction == "next") {
    if (sliderCurrentOffset == Number(slider.offsetWidth) * (sliderImages.length - 1)) {
      sliderTrack.style.transform = `translateX(${0}px)`
      return;
    }
    sliderTrack.style.transform = `translateX(-${sliderCurrentOffset += Number(slider.offsetWidth)}px)`
  }
}

// Глобальный объект Slider, включает в себя методы перелистывания, установки
// текстовых данных, добавление нужных классов
const Slider = {
  "currentSlideIndex": 0,

  // Функция проверки выхода значения индекса за пределы диапазона
  // Важно для цикличного перелистывания
  checkAndSetCurrentSlideIndex(index, direction) {
    if (direction == "next") {
      this.currentSlideIndex = index > sliderImages.length - 1 || index < 0 ? 0 : index;
      return this.currentSlideIndex;
    } else if (direction == "prev") {
      this.currentSlideIndex = index <= -1 ? sliderImages.length - 1 : this.currentSlideIndex;
      return this.currentSlideIndex;
    }
  },


  // Функция переключения следующего слайда (изображения)
  toSlideNext() {
    Slider.currentSlideIndex = Slider.checkAndSetCurrentSlideIndex(++Slider.currentSlideIndex, "next")
    toSlideImageTrack("next");
    Slider.setActiveData(Slider.currentSlideIndex)
    Slider.setActiveDot(Slider.currentSlideIndex)
    Slider.setActiveTab(Slider.currentSlideIndex)
  },

  // Функция включения определенного слайда (изображения, доты, табы, данные)
  setSpecificSlide(index) {
    this.currentSlideIndex = index
    sliderTrack.style.transform = `translateX(-${slider.offsetWidth * index}px)`;
    Slider.setActiveDot(this.currentSlideIndex)
    Slider.setActiveTab(this.currentSlideIndex)
    Slider.setActiveData(this.currentSlideIndex)
  },

  // Функция переключения предыдущего слайда (изображения)
  toSlidePrev() {
    Slider.currentSlideIndex = Slider.checkAndSetCurrentSlideIndex(--Slider.currentSlideIndex, "prev")
    toSlideImageTrack("prev");
    Slider.setActiveData(Slider.currentSlideIndex)
    Slider.setActiveDot(Slider.currentSlideIndex)
    Slider.setActiveTab(Slider.currentSlideIndex)
  },

  // Функция, добавления класса активному tab
  setActiveTab(index) {
    const tabWithActiveClass = document.querySelector(".projects__tab--active")
    if (tabWithActiveClass) {
      tabWithActiveClass.classList.remove("projects__tab--active")
    }
    sliderTabs[index].classList.add("projects__tab--active")
  },

  // Функция установки текстовых данных, используя датасеты в разметке
  setActiveData(index) {
    elemsWithDataSets[0].innerText = sliderData[index].city;
    elemsWithDataSets[1].innerText = sliderData[index].region;
    elemsWithDataSets[2].innerText = sliderData[index].apartmentArea + " m2";
    elemsWithDataSets[3].innerText = sliderData[index].repairTime + " months";
    elemsWithDataSets[4].innerText = sliderData[index].repairCost;
  },

  // Функция, добавления класса активному dot (точке пагинации)
  setActiveDot(index) {
    const dotWithActiveClass = document.querySelector(".projects__pagination-dot--active")
    if (dotWithActiveClass) {
      dotWithActiveClass.classList.remove("projects__pagination-dot--active")
    }
    sliderDots[index].classList.add("projects__pagination-dot--active")
  },

  // Функция инициализации слайдера
  initialize() {
    this.setActiveData(this.currentSlideIndex)
    this.setActiveTab(this.currentSlideIndex);
    this.setActiveDot(this.currentSlideIndex);
  },
}


// Первоначальная инициализация слайдера
Slider.initialize()


// // // // // //
// Обработчики //
// // // // // //

// Кнопки для перемещения трека
// Для мобилки
sliderButtonMobileArrowNext.addEventListener("click", Slider.toSlideNext)
sliderButtonMobileArrowPrev.addEventListener("click", Slider.toSlidePrev)
// Для десктопа
sliderButtonDesktopArrowNext.addEventListener("click", Slider.toSlideNext)
sliderButtonDesktopArrowPrev.addEventListener("click", Slider.toSlidePrev)


// Доты (пагинация)
Array.from(sliderDots).forEach((dot) => {
  dot.addEventListener("click", () => {
    Slider.currentSlideIndex = dot.dataset.dotIndex;
    Slider.setSpecificSlide(Slider.currentSlideIndex)
  })
})

// Табы (пагинация)
Array.from(sliderTabs).forEach((tab) => {
  tab.addEventListener("click", () => {
    Slider.currentSlideIndex = tab.dataset.tabIndex;
    Slider.setSpecificSlide(Slider.currentSlideIndex)
  })
})
