const events = {
  GET_EXTENSION_ID: "GET_EXTENSION_ID",
  SAVE_SETTING: "SAVE_SETTING",
  GET_SETTING: "GET_SETTING",
  UPDATE_SETTING: "UPDATE_SETTING",
};

window.horsy = {
  events,
};

const logger = (message, data = null) => {
  console.log(`::: [${chrome.runtime.id}] content.js: ${message}`, data);
};

const injectSummaryButtonOnYoutube = () => {
  // Add styles to document head
  const style = document.createElement("style");
  style.textContent = `
    .horsy-subscribe-button {
      margin-left: 8px;
      padding: 10px 16px;
      background-color: #FFFFFF1A;
      color: white;
      border: none;
      border-radius: 18px;
      cursor: pointer;
      font-family: Roboto, Arial, sans-serif;
      font-size: 14px;
    }
    
    .horsy-subscribe-button:hover {
      background-color: rgba(255,255,255,0.2);
    }
  `;
  document.head.appendChild(style);

  const subscribeButton = document.querySelector("#subscribe-button");
  if (subscribeButton) {
    const horsyButton = document.createElement("button");
    horsyButton.className = "horsy-subscribe-button";

    // Create container for icon and text
    const buttonContent = document.createElement("div");
    buttonContent.style.display = "flex";
    buttonContent.style.alignItems = "center";
    buttonContent.style.gap = "6px";

    // Create and style icon
    const icon = document.createElement("img");
    icon.src = chrome.runtime.getURL("images/icon-48.png");
    icon.style.width = "23px";
    icon.style.height = "23px";

    // Add text
    const text = document.createTextNode("Summary");

    // Combine elements
    buttonContent.appendChild(icon);
    buttonContent.appendChild(text);
    horsyButton.appendChild(buttonContent);

    horsyButton.addEventListener("click", () => {
      window.postMessage({ type: "HORSY_SUMMARY_BUTTON_CLICKED" }, "*");
    });

    subscribeButton.parentNode.insertBefore(
      horsyButton,
      subscribeButton.nextSibling
    );
  }
};

const injectApp = () => {
  const extensionRoot = document.createElement("div");
  extensionRoot.id = "horsy-extension-root";

  // Ensure our extension is not hidden
  extensionRoot.style.display = "block";
  extensionRoot.style.visibility = "visible";
  extensionRoot.style.opacity = "1";

  // Try different selectors to find the right place to inject
  const possibleSelectors = [
    "ytd-watch-flexy #secondary",
    "ytd-watch-flexy #related",
    "ytd-watch-flexy #secondary-inner",
    "#secondary-inner",
    "#related",
    "#secondary",
  ];

  let targetElement = null;

  for (let selector of possibleSelectors) {
    targetElement = document.querySelector(selector);
    if (targetElement) break;
  }

  if (targetElement) {
    // Insert our extension root as the first child of the target element
    targetElement.insertBefore(extensionRoot, targetElement.firstChild);
  } else {
    console.error("Could not find appropriate element to insert extension");
    document.body.appendChild(extensionRoot);
  }

  // Inject CSS
  const link = document.createElement("link");
  link.href = chrome.runtime.getURL("styles.css");
  link.type = "text/css";
  link.rel = "stylesheet";
  document.head.appendChild(link);

  // Inject your React app's JS
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("static/js/main.js");
  script.onload = () => {
    // This will be called after the script has loaded and executed
    extensionRoot.dispatchEvent(new Event("extension-loaded"));
  };
  document.body.appendChild(script);

  // Ensure the extension stays visible
  const ensureVisible = () => {
    extensionRoot.classList.remove("hidden");
    extensionRoot.style.display = "block";
    extensionRoot.style.visibility = "visible";
    extensionRoot.style.opacity = "1";
  };

  // Run it immediately and set up an interval to keep checking
  ensureVisible();
  setInterval(ensureVisible, 1000);
};

// We might need to wait a bit for YouTube to finish rendering
const tryInjectApp = () => {
  if (document.querySelector("ytd-watch-flexy")) {
    injectApp();
    injectSummaryButtonOnYoutube();
  } else {
    setTimeout(() => {
      tryInjectApp();
    }, 1000); // try again after 1 second
  }
};

function addMessageListener() {
  window.addEventListener("message", (e) => {
    if (Object.values(events).includes(e.data.type)) {
      // logger(`Sent message: ${e.data.type}`, e.data.data);
      chrome.runtime.sendMessage(
        { action: e.data.type, id: e.data.id, data: e.data.data },
        (response) => {
          // logger(`Received message: ${e.data.type}_RESPONSE`, response);
          window.postMessage(
            { type: `${e.data.type}_RESPONSE`, ...response },
            "*"
          );
        }
      );
    }
  });
}

const createTrustedScriptURLPolicy = () => {
  window.horsy = {
    ...(window.horsy ?? {}),
    trsutedTypePolicy: window.trustedTypes?.createPolicy("default", {
      createScriptURL: (url) => url,
    }),
  };
};

async function init() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      tryInjectApp();
      addMessageListener();
    });
  } else {
    tryInjectApp();
    addMessageListener();
  }
}

init();
