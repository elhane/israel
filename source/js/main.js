// -------------------- модальные окна --------------------
'use strict';

(function () {
  var callBtn = document.querySelector('.header__link--call');
  var callPopup = document.querySelector('.modal-overlay--call');
  var callPopupSubmitBtn = callPopup.querySelector('button[type=submit]');
  var wantToGoForm = document.querySelector('.want-to-go__form');
  var wantToGoFormBtn = wantToGoForm.querySelector('button[type=submit]');
  var wantToGoFormInputs = wantToGoForm.querySelectorAll('input');
  var wantToGoPhoneInput = wantToGoForm.querySelector('[name=user-phone]');
  var feedbackForm = document.querySelector('.details__feedback-form');
  var feedbackFormBtn = feedbackForm.querySelector('button[type=submit]');
  var feedbackFormInputs = feedbackForm.querySelectorAll('input');
  var feedbackNameInput = feedbackForm.querySelector('[name=user-name]');
  var feedbackPhoneInput = feedbackForm.querySelector('[name=user-phone]');
  var callPopupCloseBtn = callPopup.querySelector('.modal-call__btn-close');
  var callAcceptedPopup = document.querySelector('.modal-overlay--call-accepted');
  var callAcceptedPopupCloseBtn = callAcceptedPopup.querySelector('.modal-call__btn-close');
  var callAcceptedBtn = callAcceptedPopup.querySelector('.modal-call__btn--accepted');
  var callForm = callPopup.querySelector('form');
  var callFormInputs = callForm.querySelectorAll('input');
  var nameInput = callPopup.querySelector('[name=user-name]');
  var phoneInput = callPopup.querySelector('[name=user-phone]');
  var userAgreeInput = callPopup.querySelector('[name=user-agree]');
  var storageName = localStorage.getItem('nameInput');
  var storagePhone = localStorage.getItem('phoneInput');

  function openPopup(item, evt) {
    if (item.classList.contains('modal-overlay--closed')) {
      evt.preventDefault();
      item.classList.remove('modal-overlay--closed');
      item.classList.add('modal-overlay--opened');
    }
  }

  function closePopup(item) {
    if (item.classList.contains('modal-overlay--opened')) {
      item.classList.remove('modal-overlay--opened');
      item.classList.add('modal-overlay--closed');
    }
  }

  // функция для валидации инпутов
  function validateFormInputs(formInputs) {
    formInputs.forEach(function (element) {
      if (!element.validity.valid) {
        element.parentElement.classList.remove('form__field--correct');
        element.parentElement.classList.add('form__field--error');
      } else {
        element.parentElement.classList.remove('form__field--error');
        element.parentElement.classList.add('form__field--correct');
      }
    });
  }

  // проверка инпутов CallForm
  function onCallFormInput() {
    validateFormInputs(callFormInputs);
  }

  // проверка инпутов FeedbackForm
  function onFeedbackFormInput() {
    validateFormInputs(feedbackFormInputs);
  }

  // проверка инпутов FeedbackForm
  function onWantToGoFormFormInput() {
    validateFormInputs(wantToGoFormInputs);
  }

  // проверка формы CallForm
  function onCallFormSubmit(evt) {
    if (!nameInput.value || !phoneInput.value || !userAgreeInput.value) {
      evt.preventDefault();
    } else {
      evt.preventDefault();
      openPopup(callAcceptedPopup, evt);
    }
  }

  // функция показа попапа заказать звонок
  function onCallBtnClick(evt) {
    openPopup(callPopup, evt);
    nameInput.focus();
    callForm.addEventListener('input', onCallFormInput);

    if (storageName && storagePhone) {
      nameInput.value = storageName;
      phoneInput.value = storagePhone;
    }
  }

  // закрытие попапа по клику на крестик
  function onCallPopupCloseBtnClick() {
    closePopup(callPopup);
  }

  // открытие попапа по клику на кнопку перезвоните мне / хочу поехать
  function onWantToGoFormBtnClick(evt) {
    evt.preventDefault();

    if (wantToGoPhoneInput.validity.valid) {
      openPopup(callAcceptedPopup, evt);
    }
  }

  // открытие попапа по клику на кнопку перезвоните мне / узнать подробности
  function onFeedbackFormBtnClick(evt) {
    evt.preventDefault();

    if (feedbackNameInput.validity.valid && feedbackPhoneInput.validity.valid) {
      openPopup(callAcceptedPopup, evt);
    }
  }

  // закрытие попапа по клику на крестик попапа заявка принята
  function onCallAcceptedPopupCloseBtnClick() {
    closePopup(callPopup);
    closePopup(callAcceptedPopup);
  }

  // закрытие попапов по клику на кнопку понятно
  function onCallAcceptedBtnBtnClick() {
    closePopup(callPopup);
    closePopup(callAcceptedPopup);
  }

  // закрытие по ESC
  function onEscPress(evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      closePopup(callPopup);
      closePopup(callAcceptedPopup);
    }
  }

  // закрытие по клику на оверлей
  function overlayClickHandler(evt) {
    if (evt.target.matches('.modal-overlay')) {
      evt.preventDefault();
      closePopup(callPopup);
      closePopup(callAcceptedPopup);
    }
  }

  // проверка инпутов форм Хочу поехать / Узнать подробности
  feedbackForm.addEventListener('input', onFeedbackFormInput);
  wantToGoForm.addEventListener('input', onWantToGoFormFormInput);

  // клик по ссылке "заказать звонок"
  callBtn.addEventListener('click', onCallBtnClick);

  // клик по крестику попапа заказать звонок
  callPopupCloseBtn.addEventListener('click', onCallPopupCloseBtnClick);

  // клик по кнопке перезвоните мне в блоке Хочу поехать
  wantToGoFormBtn.addEventListener('click', onWantToGoFormBtnClick);

  // клик по кнопке перезвоните мне в блоке Узнать подробности
  feedbackFormBtn.addEventListener('click', onFeedbackFormBtnClick);

  // клик по крестику попапа заявка принята
  callAcceptedPopupCloseBtn.addEventListener('click', onCallAcceptedPopupCloseBtnClick);

  // клик по кнопке перезвонить мне
  callPopupSubmitBtn.addEventListener('click', onCallFormSubmit);

  // клик по кнопке понятно
  callAcceptedBtn.addEventListener('click', onCallAcceptedBtnBtnClick);

  // закрытие по ESC и клику на оверлей
  window.addEventListener('keydown', onEscPress);
  window.addEventListener('click', overlayClickHandler);

})();

// -------------------- табы программы --------------------

(function () {
  var programsTabs = document.querySelector('#tab-nav');

  function hideActiveTabs() {
    var activeButtons = document.querySelectorAll('.program__item--active');
    var activeTabs = document.querySelectorAll('.programs__tab--active');

    activeButtons.forEach(function (tab) {
      tab.classList.remove('program__item--active');
    });

    activeTabs.forEach(function (tab) {
      tab.classList.remove('programs__tab--active');
    });
  }

  function tabClickHandler(evt) {
    hideActiveTabs();
    evt.target.parentElement.classList.add('program__item--active'); // выделяем выбранный пункт
    var clickedTabAttribute = evt.target.getAttribute('data-tab-name');
    var activeTab = document.getElementsByClassName(clickedTabAttribute)[0];
    activeTab.classList.add('programs__tab--active'); // покзаываем содержимое таба
  }

  programsTabs.addEventListener('click', tabClickHandler);

})();

// ---------- свайперы список программ / жизнь в израиле / отзывы--------------

(function () {

  var lifeSlider = document.querySelector('.life__slider');
  var programSlider = document.querySelector('.programs__slider');
  var reviewSlider = document.querySelector('.reviews__slider');
  var myLifeSwiper;
  var myProgramSwiper;
  var myReviewSwiper;

  function enableProgramSlider() {
    if (window.innerWidth <= 767 && programSlider.dataset.mobileProgram === 'false') {
      myProgramSwiper = new window.Swiper(programSlider, {
        loop: true,
        slideClass: 'programs__slide',
        wrapperClass: 'programs__slider-wrapper',

        breakpoints: {
          320: {
            slidesPerView: 1.7,
            slidesPerGroup: 1,
          },
          600: {
            slidesPerView: 4,
            slidesPerGroup: 1,
          }
        }
      });

      programSlider.dataset.programSwiper = 'true';
    }

    if (window.innerWidth > 767) {
      programSlider.dataset.mobileProgram = 'false';
      if (programSlider.classList.contains('swiper-container-initialized')) {
        myProgramSwiper.destroy();
      }
    }
  }

  function enableLifeSlider() {
    if (window.innerWidth <= 767 && lifeSlider.dataset.lifeSwiperOn === 'false') {
      myLifeSwiper = new window.Swiper(lifeSlider, {
        loop: true,
        slideClass: 'life__slide',
        wrapperClass: 'life__slider-wrapper',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },

        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          600: {
            slidesPerView: 2,
            slidesPerGroup: 1,
          }
        }
      });

      lifeSlider.dataset.lifeSwiperOn = 'true';
    }

    if (window.innerWidth > 767) {
      lifeSlider.dataset.lifeSwiperOn = 'false';
      if (lifeSlider.classList.contains('swiper-container-initialized')) {
        myLifeSwiper.destroy();
      }
    }
  }

  function enableReviewSlider() {
    myReviewSwiper = new window.Swiper(reviewSlider, {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      pagination: {
        el: '.reviews__swiper-pagination',
        clickable: true,
        type: 'fraction',
      },
      slideClass: 'reviews__slide',
      wrapperClass: 'reviews__slider-wrapper',

      navigation: {
        nextEl: '.reviews__swiper-next',
        prevEl: '.reviews__swiper-prev',
      },
    });

    return myReviewSwiper;
  }

  enableLifeSlider();
  enableProgramSlider();
  enableReviewSlider();

  function enableSwipers() {
    enableLifeSlider();
    enableProgramSlider();
  }

  window.addEventListener('resize', enableSwipers);

})();

// -------------------- аккордион частые вопосы --------------------

var questionBtns = document.querySelectorAll('.questions__question-btn');
var activeClass = 'questions__item--active';

questionBtns.forEach(function (item) {
  item.addEventListener('click', function () {
    item.parentElement.classList.toggle(activeClass);
  });
});
