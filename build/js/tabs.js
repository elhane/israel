'use strict';

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

  // --------------свайп списка табов-----------------
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
        programsTabs.style.marginLeft = '-130%';
        programsTabs.style.transition = '0.7s';

      } else {
        evt.preventDefault();
        programsTabs.style.marginLeft = '-16px';
        programsTabs.style.transition = '0.7s';
      }
    }
    xDown = null;
    yDown = null;
  }

  programsTabs.addEventListener('touchstart', touchStartHandler, false);
  programsTabs.addEventListener('touchmove', touchMoveHandler, false);

})();
