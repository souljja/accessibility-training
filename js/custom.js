(function () {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function () {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

var ARROW_UP_KEY = 38;
var ARROW_DOWN_KEY = 40;
var ARROW_RIGHT_KEY = 39;
var ARROW_LEFT_KEY = 37;

document.querySelectorAll("#nav li").forEach(function (navEl, _, parent) {
  navEl.onclick = function () {
    toggleTab(this.id, this.dataset.target);
  };
  navEl.onkeydown = function (event) {
    var id = parseInt(this.id);
    var target;
    var resultId;
    switch (event.keyCode) {
      case ARROW_DOWN_KEY:
      case ARROW_LEFT_KEY: {   
        event.preventDefault();  
        if (id === 1) {
          resultId = String(parent.length);
        } else {
          resultId = String(id - 1);
        }
        target = this.dataset.target.replace(this.id, resultId);
        toggleTab(resultId, target);
        break;
      }
      case ARROW_UP_KEY:
      case ARROW_RIGHT_KEY: {
        event.preventDefault();
        if (id === parent.length) {
          resultId = '1';
        } else {
          resultId = String(id + 1);
        }
        target = this.dataset.target.replace(this.id, resultId);
        toggleTab(resultId, target);
        break;
      }
    }
  }
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function (navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
      navEl.setAttribute('tabindex', '0');
      navEl.focus();
    } else if (navEl.classList.contains("is-active")) {
      navEl.classList.remove("is-active");
      navEl.setAttribute('tabindex', '-1');
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function (tab) {
    tab.style.display = tab.id == targetId ? "block" : "none";
  });
}
