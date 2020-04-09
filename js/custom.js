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
    var textContent = minutes + ' ' + (minutes > 1 ? 'minutes': 'minute') + ' on site';
    timePlaceholderNode.textContent = textContent;
  }
}, 1000 * 60);

var ARROW_UP_CODE = 'ArrowUp';
var ARROW_DOWN_CODE = 'ArrowDown';
var ARROW_RIGHT_CODE = 'ArrowRight';
var ARROW_LEFT_CODE = 'ArrowLeft';

var tabMenu = document.getElementById("nav");
var liElements = document.querySelectorAll("#nav li");
tabMenu.onclick = function (event) {
  var listElement = event.target.closest("[data-target]");
  if (listElement) {
    toggleTab(listElement.id, listElement.dataset.target);
  }
}

tabMenu.onkeydown = function (event) {
  var listElement = event.target.closest("[data-target]");
  if (listElement) {
    var id = parseInt(listElement.id);
    var liElementsLength = liElements.length;
    switch (event.code) {
      case ARROW_DOWN_CODE:
      case ARROW_LEFT_CODE: {
        event.preventDefault();
        handleElement(listElement, id === 1 ? String(liElementsLength) : String(id - 1));
        break;
      }
      case ARROW_UP_CODE:
      case ARROW_RIGHT_CODE: {
        event.preventDefault();
        handleElement(listElement, id === liElementsLength ? '1' : String(id + 1));
        break;
      }
    }
  }
}

function handleElement(element, newId) {
  var target = element.dataset.target.replace(element.id, newId);
  toggleTab(newId, target);
}

function toggleTab(selectedNav, targetId) {
  liElements.forEach(function (navEl) {
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
    tab.style.display = tab.id == targetId ? "block" : "none";
  });
}
