// -------------------- модальные окна --------------------
'use strict';

(function () {
  var callBtn = document.querySelector('.header__link--call');
  var callPopup = document.querySelector('.modal-overlay--call');
  var callPopupSubmitBtn = callPopup.querySelector('button[type=submit]');
  var wantToGoForm = document.querySelector('.want-to-go__form');
  var wantToGoFormBtn = wantToGoForm.querySelector('button[type=submit]');
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

  // открытие попапа по клику на кнопку перезвоните мне
  function onWantToGoFormBtnClick(evt) {
    openPopup(callAcceptedPopup, evt);
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

  // клик по ссылке "заказать звонок"
  callBtn.addEventListener('click', onCallBtnClick);

  // клик по крестику попапа заказать звонок
  callPopupCloseBtn.addEventListener('click', onCallPopupCloseBtnClick);

  // клик по кнопке перезвоните мне
  wantToGoFormBtn.addEventListener('click', onWantToGoFormBtnClick);

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

  // свайп списка табов
  var xDown = null;
  var yDown = null;

  function touchStartHandler(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
  }

  function touchMoveHandler(evt) {
    if (!xDown || !yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        evt.preventDefault();
        programsTabs.style.marginLeft = '-170%';
        programsTabs.style.transition = '0.2s';

      } else {
        evt.preventDefault();
        programsTabs.style.marginLeft = '-16px';
        programsTabs.style.transition = '0.2s';
      }
    }
    xDown = null;
    yDown = null;
  }

  programsTabs.addEventListener('touchstart', touchStartHandler, false);
  programsTabs.addEventListener('touchmove', touchMoveHandler, false);

})();

// -------------------- свайпер жизнь в израиле --------------------

(function () {

  var slider = document.querySelector('.swiper-container');
  var breakpoint = window.matchMedia('(min-width:768px)');
  var mySwiper;

  function checkBreakpoint() {
    if (breakpoint.matches) {

      if (mySwiper) {
        mySwiper.destroy(true, true);
      }
      return;

    } else if (!breakpoint.matches) {

      enableSwiper();
    }
  }

  function enableSwiper() {

    if (slider) {
      mySwiper = new window.Swiper(slider, {

        loop: true,

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
    }
  }

  breakpoint.addListener(checkBreakpoint);
  checkBreakpoint();

})();
