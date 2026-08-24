function updateTime() {
  var currentTime = new Date().toLocaleString();
  var timeText = document.querySelector("#timeElement");
  timeText.innerHTML = currentTime;
}

updateTime();
setInterval(updateTime, 1000);


function dragElement(elmnt) {
  var pos1 = 0;
  var pos2 = 0;
  var pos3 = 0;
  var pos4 = 0;

  document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var welcomeScreen = document.querySelector("#welcomeWindow");
var welcomeScreenOpen = document.querySelector("#welcomeOpen");
var biggestIndex = 1;
var topBar = document.querySelector("#topBar");

function closeWindow(element) {
  element.style.display = "none";
}

function makeClosable(elementName) {
  var screen = document.querySelector("#" + elementName);
  var closeButton = screen.querySelector(".window-close");

  closeButton.addEventListener("click", function () {
    closeWindow(screen);
  });
}

function initializeWindow(elementName) {
  var screen = document.querySelector("#" + elementName);

  addWindowTapHandling(screen);
  makeClosable(elementName);
  dragElement(screen);
}

function openWindow(element) {
  element.style.display = "block";
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

var threadbookScreen = document.querySelector("#threadbookWindow");


welcomeScreenOpen.addEventListener("click", function () {
  openWindow(welcomeScreen);
});

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", function () {
    handleWindowTap(element);
  });
}

function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;

  if (selectedIcon) {
    deselectIcon(selectedIcon);
  }
}


var selectedIcon = undefined;
var threadbookIcon = document.querySelector("#threadbookIcon");

function selectIcon(element){
  element.classList.add("selected");
  selectedIcon = element;
}

function deselectIcon(element) {
  element.classList.remove("selected");
  selectedIcon = undefined;
}

function handleIconTap(element) {
  if (element.classList.contains("selected")) {
    deselectIcon(element);
    openWindow(threadbookScreen);
  } else {
    if (selectedIcon) {
      deselectIcon(selectedIcon);
    }

    selectIcon(element);
  }
}

threadbookIcon.addEventListener("click", function () {
  handleIconTap(threadbookIcon);
});

initializeWindow("welcomeWindow");
initializeWindow("threadbookWindow");