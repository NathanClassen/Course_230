function Autocomplete(input, url) {
  this.input = input;
  this.url = url;

  this.listUI = null;
  this.overlay = null;
  this.visible = false;
  this.matches = [];
  this.selectedIndex = null;
  this.previousValue = null;
  this.bestMatchIndex = null;

  this.wrapInput();
  this.createUI();
  this.valueChanged = debounce(this.valueChanged.bind(this), 300);
  this.bindEvents();
}

Autocomplete.prototype.bindEvents = function() {
  this.input.addEventListener('input', this.valueChanged);
  this.input.addEventListener('keydown', this.handleKeydown.bind(this));
  this.listUI.addEventListener('mousedown', this.handleMousedown.bind(this));
};

Autocomplete.prototype.wrapInput = function() {
  var wrapper = document.createElement('div');
  wrapper.classList.add('autocomplete-wrapper');
  this.input.parentNode.appendChild(wrapper);
  wrapper.appendChild(this.input);
};

Autocomplete.prototype.createUI = function() {
  var listUI = document.createElement('ul');
  listUI.classList.add('autocomplete-ui');
  this.input.parentNode.appendChild(listUI);
  this.listUI = listUI;

  var overlay = document.createElement('div');
  overlay.classList.add('autocomplete-overlay');
  overlay.style.width = this.input.clientWidth + 'px';

  this.input.parentNode.appendChild(overlay);
  this.overlay = overlay;
};

Autocomplete.prototype.draw = function() {
  var child;
  while (child = this.listUI.lastChild) {
    this.listUI.removeChild(child);
  }

  if (!this.visible) {
    this.overlay.textContent = '';
    return;
  }

  if (this.bestMatchIndex !== null && this.matches.length !== 0) {
    var selected = this.matches[this.bestMatchIndex];
    this.overlay.textContent = this.generateOverlayContent(this.input.value, selected);
  } else {
    this.overlay.textContent = '';
  }

  this.matches.forEach(function(match, index) {
    var li = document.createElement('li');
    li.classList.add('autocomplete-ui-choice');
    if (index === this.selectedIndex) {
      li.classList.add('selected');
      this.input.value = match.name;
    }
    li.textContent = match.name;
    this.listUI.appendChild(li);
  }.bind(this));
};

Autocomplete.prototype.generateOverlayContent = function(value, match) {
  var end = match.name.substr(value.length);
  return value + end;
};

Autocomplete.prototype.fetchMatches = function(query, callback) {
  var request = new XMLHttpRequest();

  request.addEventListener('load', function() {
    callback(request.response);
  });

  request.open('GET', this.url + encodeURIComponent(query));
  request.responseType = 'json';
  request.send();
};

Autocomplete.prototype.handleKeydown = function(event) {
  switch(event.key) {
    case 'Tab':
      if (this.bestMatchIndex !== null && this.matches.length !== 0) {
        this.input.value = this.matches[this.bestMatchIndex].name;
        event.preventDefault();
      }
      this.reset();
      break;
    case 'Enter':
      this.reset();
      break;
    case 'ArrowUp':
      event.preventDefault();
      if (this.selectedIndex === null || this.selectedIndex === 0) {
        this.selectedIndex = this.matches.length - 1;
      } else {
        this.selectedIndex -= 1;
      }
      this.bestMatchIndex = null;
      this.draw();
      break;
    case 'ArrowDown':
      event.preventDefault();
      if (this.selectedIndex === null || this.selectedIndex === this.matches.length - 1) {
        this.selectedIndex = 0;
      } else {
        this.selectedIndex += 1;
      }
      this.bestMatchIndex = null;
      this.draw();
      break;
    case 'Escape': // escape
      this.input.value = this.previousValue;
      this.reset();
      break;
  }
};

Autocomplete.prototype.handleMousedown = function(event) {
  event.preventDefault();

  var element = event.target;
  if (element.classList.contains('autocomplete-ui-choice')) {
    this.input.value = element.textContent;
    this.reset();
  }
};

Autocomplete.prototype.reset = function() {
  this.visible = false;
  this.matches = [];
  this.selectedIndex = null;
  this.previousValue = null;
  this.bestMatchIndex = null;
  this.draw();
};

Autocomplete.prototype.valueChanged = function() {
  var value = this.input.value;
  this.previousValue = value;
  if (value.length > 0) {
    this.fetchMatches(value, function(matches) {
      this.visible = true;
      this.matches = matches;
      this.selectedIndex = null;
      this.bestMatchIndex = 0;
      this.draw();
    }.bind(this));
  } else {
    this.reset();
  }
};

document.addEventListener('DOMContentLoaded', function() {
  var input = document.querySelector('input');
  var autocomplete = new Autocomplete(input, "/countries?matching=");
});