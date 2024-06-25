
let home = "/index.html"
if(window.location.href.indexOf("quix.io/docs") > 0) { 
    home = "/docs/index.html"
    document.getElementById("link_to_home").href = home
}

if(window.location.hostname == "docs.quix.io"){

    // build the new URL
    redirectUrl = "https://quix.io/docs" + window.location.pathname + window.location.search + window.location.hash

    // replace the path in the navigation call stack. 
    // The user won't be able to nav back here
    window.location.replace(redirectUrl)
}

// handle posthog optin/optout on cookie settings
var consent = __md_get("__consent")
if (consent && consent.posthog) {
  /* The user accepted the cookie */
  this.posthog.opt_in_capturing();
}else{
    this.posthog.opt_out_capturing();
}


function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getSessionId() {

    let key = 'quixDocsSessionId';
    let sessionId = localStorage.getItem(key);
    
    // handle posthog optin/optout on cookie settings
    var consent = __md_get("__consent")
    if (consent && consent.quix) {
        // user opted in, if needed add key to storage
        if (!sessionId) {
            sessionId = generateUUID();
            localStorage.setItem(key, sessionId);
        }

    }else{
        // user opted out, ensure key is removed
        if(sessionId){
            alert('removing');
            localStorage.removeItem(key);
        }
    }

    // sessionId may be nothing, null, empty, blank, none??!?!!
    if(!sessionId)    {
        sessionId = 'opt-out';
    }
    return sessionId;
}

const sessionId = getSessionId();
console.log('Session ID:', sessionId);


// JavaScript code to call the POST method

async function publishEvent(object, action) {
    if (!sessionId || sessionId === 'opt-out') return;
    const url = 'https://docs-api-quix-quixdocsanalytics-main.deployments.quix.io/publish';
    const data = {
        sessionId: sessionId,
        object: object,
        action: action
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Success:', result);
    } catch (error) {
        console.error('Error publishing action:', error);
    }
}
// example usage
// publishEvent('exampleObject', 'exampleAction')

let eventData = {
    sessionId: sessionId,
    events: []
};

let lastEventTime = 0;

// Function to track events
function trackEvent(event) {
    const currentTime = Date.now();
    if (currentTime - lastEventTime >= 1000) { // Check if 1 second has passed
        const target = event.target;
        const tag = target.tagName;
        const callerId = target.id;
        const callerName = target.getAttribute('name');
        const callerType = event.type;
        const mouseX = event.screenX;
        const mouseY = event.screenY;
        const documentWidth = document.documentElement.scrollWidth;
        const documentHeight = document.documentElement.scrollHeight;
        const url = document.URL;

        eventData.events.push({
            callerId,
            callerName,
            callerType,
            tag,
            mouseX,
            mouseY,
            documentWidth,
            documentHeight,
            url
        });

        lastEventTime = currentTime; // Update the last event time
    }
}

// Global event listeners for mouseover and click events
document.addEventListener('mouseover', trackEvent);
document.addEventListener('click', trackEvent);

// Track page load event
window.addEventListener('load', function(event) {
    const pageUrl = window.location.href;
    eventData.events.push({
        callerId: 'page',
        callerName: 'page',
        callerType: 'navigation',
        url: pageUrl
    });
});

// Track clicks on any element inside a nav element
document.querySelectorAll('nav').forEach(nav => {
    nav.addEventListener('click', function(event) {
        const target = event.target;
        const callerId = target.id;
        const callerName = target.getAttribute('name');
        const callerType = 'nav_click';
        const innerText = target.innerText;
        const mouseX = event.screenX;
        const mouseY = event.screenY;
        const documentWidth = document.documentElement.scrollWidth;
        const documentHeight = document.documentElement.scrollHeight;
        const pageUrl = window.location.href;

        eventData.events.push({
            callerId,
            callerName,
            callerType,
            innerText,
            mouseX,
            mouseY,
            documentWidth,
            documentHeight,
            pageUrl
        });
    });
});

// Function to send data to the server every 10 seconds
setInterval(function() {
    if (eventData.events.length > 0) {
        publishEvent(eventData.sessionId, eventData.events);
        eventData.events = []; // Clear events after sending
    }
}, 10000);