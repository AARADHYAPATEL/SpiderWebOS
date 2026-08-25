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

  if(element.id === "threadsWindow") {
    document.querySelector(".system-status").textContent =
      "⚡ WEB SIGNAL: STRONG";
  }
}

function makeClosable(elementName) {
  var screen = document.querySelector("#" + elementName);
  var closeButton = screen.querySelector(".window-close");

  closeButton.addEventListener("click", function () {
    closeWindow(screen);
  });
}

function initializeIcon(iconId, windowId) {
  var icon = document.querySelector("#" + iconId);
  var screen = document.querySelector("#" + windowId);

  icon.addEventListener("click", function () {
    handleIconTap(icon, screen);
  });
}

function initializeWindow(windowId, iconId) {
  var screen = document.querySelector("#" + windowId);

  addWindowTapHandling(screen);
  makeClosable(windowId);
  dragElement(screen);

  if (iconId) {
    initializeIcon(iconId, windowId);
  }
}

function openWindow(element) {
  element.style.display = "block";
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;

  if (element.id === "threadsWindow") {
    document.querySelector(".system-status").textContent =
      "🕸 THREAD SIGNAL: GROWING";
  }
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

function handleIconTap(icon, screen) {
  if (icon.classList.contains("selected")) {
    deselectIcon(icon);
    openWindow(screen);
  } else {
    if (selectedIcon) {
      deselectIcon(selectedIcon);
    }

    selectIcon(icon);
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

initializeWindow("welcomeWindow");
initializeWindow("threadbookWindow", "threadbookIcon");
initializeWindow("threadsWindow", "threadsIcon");

var threadsState = {
  scene: 0,
  qualities: []
};

var threadsScenes = [
  {
    title: "The Broken Thread",
    caption: "A snapped line rocks gently after the rain.",
    text: "Morning arrives quietly. The little spider finds one side of its web open to the sky. There is still enough thread to begin, but not enough to know exactly where it will lead.",
    choices: [
      {
        label: "Spin a brave new line into the open air.",
        quality: "courage",
        color: "warm",
        response: "The first new thread catches the morning light."
      },
      {
        label: "Trace the old silk and learn what stayed strong.",
        quality: "patience",
        color: "blue",
        response: "The old threads still have something to teach."
      }
    ]
  },
  {
    title: "The Heavy Dewdrop",
    caption: "A dewdrop gathers where two threads meet.",
    text: "A dewdrop has grown large enough to bend the silk. It shines beautifully, but it asks the web to carry more than it did yesterday.",
    choices: [
      {
        label: "Steady the thread and carry the weight together.",
        quality: "care",
        color: "green",
        response: "The web bends, but it does not break."
      },
      {
        label: "Let the drop fall and make room for what comes next",
        quality: "release",
        color: "blue",
        response: "The air feels wider after the drop falls."
      }
    ]
  },
  {
    title: "The Restless Wind",
    caption: "A breeze moves through the garden like a question.",
    text: "The wind nudges every line at once. The little spider can hold close to the centre or travel with the motion toward something unfamiliar.",
    choices: [
      {
        label: "Hold the centre and let the web hum around it.",
        quality: "steadiness",
        color: "gold",
        response: "The centre remains calm while the rest of the web sways."
      },
      {
        label: "Ride the breeze toward a new branch.",
        quality: "curiosity",
        color: "pink",
        response: "A new branch waits exactly where the wind carries the spider."
      }
    ]
  },
  {
    title: "The Firefly's Light",
    caption: "A firefly pauses beside the web, glowing softly.",
    text: "As dusk gathers, a tired firefly hovers nearby. Its light makes the missing threads easier to see.",
    choices: [
      {
        label: "Welcome the firefly's light for a little while.",
        quality: "trust",
        color: "gold",
        response: "Help does not make the web any less the spider's own."
      },
      {
        label: "Offer a quite corner of the web for the firefly to rest.",
        quality: "kindness",
        color: "green",
        response: "The firefly's small light warms the whole web."
      }
    ]
  },
  {
    title: "The Open Space",
    caption: "The web is almost whole, except for one bright gap.",
    text: "Night has come, and one open space remains. It could be woven shut, or left open for tomorrow's unexpected light.",
    choices: [
      {
        label: "Finish the last circle and make the web complete.",
        quality: "commitment",
        color: "warm",
        response: "The final line finds its place."
      },
      {
        label: "Leave a doorway for the morning to enter.",
        quality: "hope",
        color: "pink",
        response: "Not every unfinished thing is missing. Some things are waiting."
      }
    ]
  }
];

function renderThreadsProgress() {
  var progress = document.querySelector("#threadsProgress");
  progress.innerHTML = "";

  for (var i = 0; i < threadsScenes.length; i++) {
    var marker = document.createElement("div");
    marker.classList.add("thread-marker");

    if (i < threadsState.scene) {
      marker.classList.add("complete");
    }

    if (i === threadsState.scene && threadsState.scene < threadsScenes.length) {
      marker.classList.add("current");
    }

    progress.appendChild(marker);
  }
}

function renderThreadsScene() {
  var scene = threadsScenes[threadsState.scene];
  var panel = document.querySelector("#threadsPanel");
  var choices = "";

  for (var i = 0; i < scene.choices.length; i++) {
    choices += `
      <button class="thread-choice" type="button" data-choice="${i}">
        ${scene.choices[i].label}
      </button>
    `;
  }

  panel.innerHTML = `
    <p class="thread-number">THREAD ${String(threadsState.scene + 1).padStart(2, "0")} / 05</p>
    <h2>${scene.title}</h2>
    <p>${scene.text}</p>
    <div class="thread-choices">${choices}</div>
  `;

  document.querySelector("#threadsCaption").textContent = scene.caption;

  var buttons = panel.querySelectorAll(".thread-choice");

  for (var j = 0; j < buttons.length; j++) {
    buttons[j].addEventListener("click", function () {
      var choiceIndex = Number(this.dataset.choice);
      chooseThread(threadsScenes[threadsState.scene].choices[choiceIndex]);
    });
  }

  renderThreadsProgress();
}

function chooseThread(choice) {
  var panel = document.querySelector("#threadsPanel");
  var strand = document.querySelector("#threadStrand" + threadsState.scene);
  var dew = document.querySelector("#threadDew" + threadsState.scene);

  threadsState.qualities.push(choice.quality);

  strand.classList.add("active", choice.color);
  dew.classList.add("active");

  panel.innerHTML = `
    <p class="thread-number">THE WEB CHANGES</p>
    <h2>${choice.quality}</h2>
    <p>${choice.response}</p>
  `;

  document.querySelector("#threadsCaption").textContent = choice.response;

  threadsState.scene++;

  setTimeout(function () {
    if (threadsState.scene === threadsScenes.length) {
      renderThreadsEnding();
    } else {
      renderThreadsScene();
    }
  }, 900);
}

function renderThreadsEnding() {
  var panel = document.querySelector("#threadsPanel");
  var qualityTags = "";

  for (var i = 0; i < threadsState.qualities.length; i++) {
    qualityTags += `<span class="ending-quality">${threadsState.qualities[i]}</span>`;
  }

  panel.innerHTML = `
    <p class="thread-number">THE WEB HOLDS</p>
    <h2>A web made for tomorrow</h2>
    <p>
      By nightfall, the little spider has woven a web shaped by its choices.
      It is not the same web it woke beside-but it is stronger because it changed
    </p>

    <div>${qualityTags}</div>

    <button class="restart-thread-button" type="button">
      Spin another web
    </button>
  `;

  document.querySelector(".system-status").textContent = "🕸 THREAD SIGNAL: COMPLETE";
  document.querySelector("#threadsCaption").textContent = 
    "The garden is quiet. The web is ready for tomorrow.";

  panel.querySelector(".restart-thread-button").addEventListener("click", restartThreadsStory);

  renderThreadsProgress();
}

function restartThreadsStory() {
  threadsState.scene = 0;
  threadsState.qualities = [];

  for (var i = 0; i < 5; i++) {
    document.querySelector("#threadStrand" + i).className.baseVal = "thread-strand";
    document.querySelector("#threadDew" + i).className.baseVal = "thread-dew";
  }

  renderThreadsScene();
}

renderThreadsScene();

var themeToggle = document.querySelector("#themeToggle");

function setTheme(isNight) {
  document.body.classList.toggle("night-mode", isNight);

  themeToggle.textContent = isNight ? "☀️ Day mode" : "🌙 Night mode";
  themeToggle.setAttribute("aria-pressed", isNight);
  themeToggle.setAttribute(
    "aria-label",
    isNight ? "Switch to day mode" : "Switch to night mode"
  );

  localStorage.setItem("spideros-theme", isNight ? "night" : "day");
}

themeToggle.addEventListener("click", function () {
  setTheme(!document.body.classList.contains("night-mode"));
});

setTheme(localStorage.getItem("spideros-theme") === "night");