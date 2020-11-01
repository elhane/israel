// -------------------- модальные окна --------------------
(function () {
  var callBtn = document.querySelector('.header__link--call');
  var callPopup = document.querySelector('.modal-overlay--call');
  var callPopupSubmitBtn = callPopup.querySelector('#order-call');
  var wantToGoForm = document.querySelector('.want-to-go__form');
  var wantToGoFormBtn = wantToGoForm.querySelector('#order-call-want-to-go');
  var wantToGoFormInputs = Array.from(wantToGoForm.querySelectorAll('input'));
  var wantToGoPhoneInput = wantToGoForm.querySelector('#want-to-go-user-phone');
  var feedbackForm = document.querySelector('.details__feedback-form');
  var feedbackFormBtn = feedbackForm.querySelector('#order-call-feedback');
  var feedbackFormInputs = Array.from(feedbackForm.querySelectorAll('input'));
  var feedbackNameInput = feedbackForm.querySelector('#feedback-user-name');
  var feedbackPhoneInput = feedbackForm.querySelector('#feedback-user-phone');
  var callPopupCloseBtn = callPopup.querySelector('.modal-call__btn-close');
  var callAcceptedPopup = document.querySelector('.modal-overlay--call-accepted');
  var callAcceptedPopupCloseBtn = callAcceptedPopup.querySelector('.modal-call__btn-close');
  var callAcceptedBtn = callAcceptedPopup.querySelector('.modal-call__btn--accepted');
  var callForm = callPopup.querySelector('form');
  var callFormInputs = Array.from(callForm.querySelectorAll('input'));
  var nameInput = callPopup.querySelector('#user-name');
  var phoneInput = callPopup.querySelector('#user-phone');
  var userAgreeInput = callPopup.querySelector('#user-agree');
  var storageName = localStorage.getItem('nameInput');
  var storagePhone = localStorage.getItem('phoneInput');
  var body = document.querySelector('body');

  function openPopup(item, evt) {
    if (item.classList.contains('modal-overlay--closed')) {
      evt.preventDefault();
      item.classList.remove('modal-overlay--closed');
      item.classList.add('modal-overlay--opened');
      body.classList.add('overflow-hidden');
    }
  }

  function closePopup(item) {
    if (item.classList.contains('modal-overlay--opened')) {
      item.classList.remove('modal-overlay--opened');
      item.classList.add('modal-overlay--closed');
      body.classList.remove('overflow-hidden');
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
    validateFormInputs(callFormInputs);

    if (nameInput.validity.valid && phoneInput.validity.valid && userAgreeInput.validity.valid) {
      openPopup(callAcceptedPopup, evt);
    }
  }

  // функция показа попапа заказать звонок
  function onCallBtnClick(evt) {
    openPopup(callPopup, evt);
    nameInput.focus();

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
    if (wantToGoPhoneInput.validity.valid) {
      openPopup(callAcceptedPopup, evt);
    }
  }

  // открытие попапа по клику на кнопку перезвоните мне / узнать подробности
  function onFeedbackFormBtnClick(evt) {
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
    if (evt.target.classList.contains('modal-overlay')) {
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

  // клик по кнопке перезвонить мне в попапе
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
  var itemActiveClass = 'program__item--active';
  var tabActiveClass = 'programs__tab--active';

  function hideActiveTabs() {
    var programBtns = Array.from(document.querySelectorAll('.program__link'));
    var programTabs = Array.from(document.querySelectorAll('.programs__tab'));

    programBtns.forEach(function (btn) {
      btn.parentElement.classList.remove(itemActiveClass);
    });

    programTabs.forEach(function (tab) {
      tab.classList.remove(tabActiveClass);
    });
  }

  function toggleTabs(evt) {
    hideActiveTabs();
    var programItem = evt.target.parentElement;
    programItem.classList.add(itemActiveClass); // выделяем выбранный пункт
    var clickedTabAttribute = evt.target.getAttribute('data-tab-name');
    var activeTab = document.getElementsByClassName(clickedTabAttribute)[0];
    activeTab.classList.add(tabActiveClass); // покзаываем содержимое таба
  }

  function onTabEnterPress(evt) {
    if (evt.keyCode === 13) {
      if (evt.target.classList.contains('program__link')) {
        toggleTabs(evt);
      }
    }
  }

  function onTabClick(evt) {
    toggleTabs(evt);
  }

  if (programsTabs) {
    programsTabs.addEventListener('click', onTabClick);
    window.addEventListener('keydown', onTabEnterPress);
  }

})();

// ---------- свайперы список программ / жизнь в израиле / отзывы--------------

(function () {

  var lifeSlider = document.querySelector('.life__slider');
  var programSlider = document.querySelector('.programs__slider');
  var reviewSlider = document.querySelector('.reviews__slider');
  var MOBILE_WIDTH_MAX = 767;
  var myLifeSwiper;
  var myProgramSwiper;
  var myReviewSwiper;
  var TAB_0 = 0;
  var TAB_MINUS_1 = -1;

  function enableProgramSlider() {
    if (programSlider) {
      if (window.innerWidth <= MOBILE_WIDTH_MAX && programSlider.dataset.programSwiperOn === 'false') {
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

        programSlider.dataset.programSwiperOn = 'true';
      }

      if (window.innerWidth > MOBILE_WIDTH_MAX) {
        programSlider.dataset.programSwiperOn = 'false';
        if (programSlider.classList.contains('swiper-container-initialized')) {
          myProgramSwiper.destroy();
        }
      }
    }
  }

  function enableLifeSlider() {
    if (lifeSlider) {
      if (window.innerWidth <= MOBILE_WIDTH_MAX && lifeSlider.dataset.lifeSwiperOn === 'false') {
        myLifeSwiper = new window.Swiper(lifeSlider, {
          loop: true,
          slideClass: 'life__slide',
          wrapperClass: 'life__slider-wrapper',
          keyboard: {
            enabled: true,
            onlyInViewport: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },

          breakpoints: {
            320: {
              slidesPerView: 1,
            },
          }
        });

        lifeSlider.dataset.lifeSwiperOn = 'true';
      }

      if (window.innerWidth > MOBILE_WIDTH_MAX) {
        lifeSlider.dataset.lifeSwiperOn = 'false';
        if (lifeSlider.classList.contains('swiper-container-initialized')) {
          myLifeSwiper.destroy();
        }
      }
    }
  }

  function enableReviewSlider() {
    if (reviewSlider) {
      myReviewSwiper = new window.Swiper(reviewSlider, {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        keyboard: {
          enabled: true,
          onlyInViewport: false,
        },
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
    }
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

  myReviewSwiper.on('slideChangeTransitionStart', onSlideChange);

  function onSlideChange() {
    cleanAllTabIndex();
    toggleTabIndex();
  }

  toggleTabIndex();

  function cleanAllTabIndex() {
    var reviewsSlides = Array.from(reviewSlider.querySelectorAll('.reviews__item'));

    reviewsSlides.forEach(function (slide) {
      slide.tabIndex = TAB_MINUS_1;

      slide.querySelector('.reviews__link').tabIndex = TAB_MINUS_1;

      var socials = Array.from(slide.querySelectorAll('.reviews__social-link'));
      socials.forEach(function (btn) {
        btn.tabIndex = TAB_MINUS_1;
      });
    });
  }

  function toggleTabIndex() {
    var activeSlide = reviewSlider.querySelector('.swiper-slide-active');
    var activeSlideSocials = Array.from(activeSlide.querySelectorAll('.reviews__social-link'));
    var activeSlideLink = activeSlide.querySelector('.reviews__link');

    activeSlide.tabIndex = TAB_0;
    activeSlideLink.tabIndex = TAB_0;
    activeSlideSocials.forEach(function (socialBtn) {
      socialBtn.tabIndex = TAB_0;
    });
  }

})();

// -------------------- аккордеон частые вопосы --------------------

(function () {
  var activeClass = 'questions__item--active';
  var questionsList = document.querySelector('.questions__list');

  if (questionsList) {
    questionsList.addEventListener('click', function (evt) {
      var questionItem = evt.target.parentElement;
      questionItem.classList.toggle(activeClass);
    });
  }

})();
