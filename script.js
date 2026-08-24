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

    var nextTop = elmnt.offsetTop - pos2;
    var nextLeft = elmnt.offsetLeft - pos1;
    var minimumTop = topBar.offsetHeight + 14;

    elmnt.style.top = Math.max(minimumTop, nextTop) + "px";
    elmnt.style.left = Math.max(8, nextLeft) + "px";
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

var threadbookEntries = [
  {
    id: "start-here",
    title: "🕸 Start Here",
    subtitle: "Welcome note",
    signal: "⚡ WEB SIGNAL: IDEAS SPINNING",
    content: `
      <p class="threadbook-kicker">ENTRY 001 · SPIDEROS</p>
      <h2>Welcome to my Threadbook</h2>

      <p>
        This is my digital scrapbook: a place to collect the things that inspire
        me, the projects I am building, and the ideas I want to return to.
      </p>

      <blockquote>
        “Every big project starts as a small thread of an idea.”
      </blockquote>

      <p>
        Right now, that thread is SpiderOS—my own creative space on the web.
        Explore the sections to follow the things I am learning and making.
      </p>

      <div class="threadbook-tags" aria-label="Current topics">
        <span>Web development</span>
        <span>Creative coding</span>
        <span>Learning</span>
        <span>Playing Basketball</span>
        <span>Cooking</span>
      </div>
    `
  },
  {
    id: "build-log",
    title: "🛠 Build Log",
    subtitle: "Projects in progress",
    signal: "🛠 BUILD SIGNAL: ACTIVE",
    content: `
      <p class="threadbook-kicker">ACTIVE THREADS</p>
      <h2>Things I am building</h2>

      <p>
        I enjoy turning ideas into projects that people can actually use.
        SpiderOS and ConnectCircle are two projects helping me learn that process.
      </p>

      <div class="threadbook-tags">
        <span>SpiderOS</span>
        <span>ConnectCircle</span>
        <span>Problem solving</span>
      </div>
    `
  },
  {
    id: "bookshelf",
    title: "📚 Bookshelf",
    subtitle: "Stories and ideas",
    signal: "📚 ARCHIVE SIGNAL: OPEN",
    content: `
      <p class="threadbook-kicker">FAVOURITE READS</p>
      <h2>Books that stay with me</h2>

      <p>
        One of my favourite books is <strong>Chanakya's Chant</strong> by
        Ashwin Sanghi. I enjoy books that combine a great story with ideas
        worth thinking about afterwards.
      </p>

      <div class="threadbook-tags">
        <span>Reading</span>
        <span>History</span>
        <span>Ideas</span>
        <span>Thriller</span>
      </div>
    `
  },
  {
    id: "soundtrack",
    title: "🎧 Soundtrack",
    subtitle: "Music on repeat",
    signal: "🎧 AUDIO SIGNAL: PLAYING",
    content: `
      <p class="threadbook-kicker">NOW PLAYING</p>
      <h2>Music while I make things</h2>

      <p>
        Music is part of my creative process—whether I am coding, reading,
        cooking, or just taking a break from a project.
      </p>

      <div class="threadbook-tags">
        <span>Music</span>
        <span>Focus Time</span>
        <span>Good Vibes</span>
        <span>Enjoying and Chilling</span>
      </div>
    `
  }
];

function setThreadbookContent(index) {
  var threadbookPage = document.querySelector("#threadbookPage");
  var entries = document.querySelectorAll(".threadbook-entry");
  var currentEntry = threadbookEntries[index];
  var systemStatus = document.querySelector(".system-status");

  threadbookPage.innerHTML = threadbookEntries[index].content;
  systemStatus.textContent = currentEntry.signal;
  topBar.dataset.thread = currentEntry.id;

  for (var i = 0; i < entries.length; i++) {
    entries[i].classList.remove("current");
    entries[i].removeAttribute("aria-current");
  }

  entries[index].classList.add("current");
  entries[index].setAttribute("aria-current", "page");
}

function addToThreadbookSelector(index) {
  var threadbookSelector = document.querySelector("#threadbookSelector");
  var entry = threadbookEntries[index];
  var newButton = document.createElement("button");

  newButton.classList.add("threadbook-entry");
  newButton.type = "button";

  newButton.innerHTML = `
    <span>${entry.title}</span>
    <small>${entry.subtitle}</small>
  `;

  newButton.addEventListener("click", function () {
    setThreadbookContent(index);
  });

  threadbookSelector.appendChild(newButton);
}

for (var i = 0; i < threadbookEntries.length; i++) {
  addToThreadbookSelector(i);
}

setThreadbookContent(0);

threadbookIcon.addEventListener("click", function () {
  handleIconTap(threadbookIcon);
});

initializeWindow("welcomeWindow");
initializeWindow("threadbookWindow");