(function () {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function () {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

var minutes = 0;
setInterval(function () {
  var timePlaceholderNode = document.getElementById('time_on_site');
  if (timePlaceholderNode) {
    minutes++;
    var textContent = minutes + ' ' + (minutes > 1 ? 'minutes' : 'minute') + ' on site';
    timePlaceholderNode.textContent = textContent;
  }
}, 1000 * 60);

var ARROW_UP_CODE = 'ArrowUp';
var ARROW_DOWN_CODE = 'ArrowDown';
var ARROW_RIGHT_CODE = 'ArrowRight';
var ARROW_LEFT_CODE = 'ArrowLeft';

var navigationMenuButton = document.getElementById('navigation_menu_button');
var navigationMenu = document.getElementById('navigation_menu');
var navigationMenuItems = document.querySelectorAll('#navigation_menu li');
var navigationMenuLinks = document.querySelectorAll('#navigation_menu li a');

navigationMenuButton.onclick = function () {
  navigationMenu.toggleAttribute('hidden');
  if (!navigationMenu.hasAttribute('hidden')) {
    focusLink(navigationMenuItems, 0);
  }
};

navigationMenu.addEventListener('focusout', function (event) {
  if(!~getElementIndex(navigationMenuLinks, event.relatedTarget)) {
    navigationMenu.toggleAttribute('hidden');
  }
});

navigationMenu.onkeydown = function (event) {
  var listElement = event.target.closest('li');
  var length = navigationMenuItems.length;
  if (listElement) {
    var currentIndex = getElementIndex(navigationMenuItems, listElement);
    var targetIndex;
    if (!~currentIndex) {
      return;
    }
    switch (event.keyCode) {
      case KEY_CODE.ARROW_DOWN:
      case KEY_CODE.ARROW_LEFT: {
        event.preventDefault();
        targetIndex = currentIndex === 0 ? String(length - 1) : String(currentIndex - 1);
        break;
      }
      case KEY_CODE.ARROW_UP:
      case KEY_CODE.ARROW_RIGHT: {
        event.preventDefault();
        targetIndex = currentIndex + 1 === length ? '0' : String(currentIndex + 1);
        break;
      }
      case KEY_CODE.HOME: {
        event.preventDefault();
        targetIndex = '0';
        break;
      }
      case KEY_CODE.END: {
        event.preventDefault();
        targetIndex = String(length - 1);
        break;
      }
    }
    if (targetIndex) {
      focusLink(navigationMenuItems, targetIndex);
    }
  }
}

function getElementIndex(items, element) {
  var currentIndex = -1;
  for (var i = 0; i < items.length; i++) {
    if (items[i] === element) {
      currentIndex = i;
      break;
    }
  }

  return currentIndex;
}

function focusLink(items, index) {
  var targetItem;
  if (items) {
    targetItem = items[index];
  }

  if (targetItem && targetItem.firstElementChild && targetItem.firstElementChild.focus) {
    targetItem.firstElementChild.focus();
  }
}

var tabMenu = document.getElementById("nav");
var tabElements = document.querySelectorAll("#nav button");
tabMenu.onclick = function (event) {
  var listElement = event.target.closest("[data-target]");
  if (listElement) {
    toggleTab(listElement.id, listElement.dataset.target);
  }
}

tabMenu.onkeydown = function (event) {
  var listElement = event.target;
  if (listElement) {
    var id = parseInt(listElement.id);
    var liElementsLength = liElements.length;
    switch (event.code) {
      case ARROW_DOWN_CODE:
      case ARROW_LEFT_CODE: {
        event.preventDefault();
        targetId = id === 1 ? String(tabElementsLength) : String(id - 1);
        break;
      }
      case ARROW_UP_CODE:
      case ARROW_RIGHT_CODE: {
        event.preventDefault();
        targetId = id === tabElementsLength ? '1' : String(id + 1);
        break;
      }
      case KEY_CODE.HOME: {
        event.preventDefault();
        targetId = '1';
        break;
      }
      case KEY_CODE.END: {
        event.preventDefault();
        targetId = String(tabElementsLength);
        break;
      }
    }
    if (targetId) {
      handleElement(listElement, targetId);
    }
  }
}

function handleElement(element, targetId) {
  var target = element.dataset.target.replace(element.id, targetId);
  toggleTab(targetId, target);
}

function toggleTab(selectedNav, targetId) {
  tabElements.forEach(function (navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
      navEl.setAttribute('tabindex', '0');
      navEl.setAttribute('aria-selected', true);
      navEl.focus();
    } else if (navEl.classList.contains("is-active")) {
      navEl.classList.remove("is-active");
      navEl.setAttribute('tabindex', '-1');
      navEl.setAttribute('aria-selected', false);
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function (tab) {
    if (tab.id === targetId) {
      tab.style.display = 'block';
      tab.removeAttribute('hidden', '');
    } else {
      tab.setAttribute('hidden', '');
      tab.style.display = 'none';
    }
  });
}
