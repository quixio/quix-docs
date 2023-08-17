//import { PublishData } from './quix-publish.js';

//TODO:
// quix-publish - fix other methods e.g. publish event
// tidy this file and extract stuff for:
//                   quix
//                   tracking clicks etc, 
//                   closing the stream
// Add cookie notice to cookie list
// See if we can create a Quix plugin for mkdocs/material
// add metadata (the id) to help trace and identify the user


let home = "/index.html";
if (window.location.href.indexOf("quix.io/docs") > 0) {
  home = "/docs/index.html";
  document.getElementById("link_to_home").href = home;
}

if (window.location.hostname == "docs.quix.io") {
  // build the new URL
  redirectUrl =
    "https://quix.io/docs" +
    window.location.pathname +
    window.location.search +
    window.location.hash;

  // replace the path in the navigation call stack.
  // The user won't be able to nav back here
  window.location.replace(redirectUrl);
}

// handle posthog optin/optout on cookie settings
var consent = __md_get("__consent");
if (consent && consent.posthog) {
  /* The user accepted the cookie */
  this.posthog.opt_in_capturing();
} else {
  this.posthog.opt_out_capturing();
}

// Get bearer token from platform.
const token =
  "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlpXeUJqWTgzcXotZW1pUlZDd1I4dyJ9.eyJodHRwczovL3F1aXguYWkvcm9sZXMiOiJhZG1pbiBRdWl4QWRtaW4iLCJodHRwczovL3F1aXguYWkvb3JnX2lkIjoicXVpeGRldiIsImlzcyI6Imh0dHBzOi8vYXV0aC5kZXYucXVpeC5haS8iLCJzdWIiOiJhdXRoMHw5YjFhYjE5Yy05NWYwLTRhZjQtYjczMy0yYWRmYjY0MmUxMmUiLCJhdWQiOlsiaHR0cHM6Ly9wb3J0YWwtYXBpLmRldi5xdWl4LmFpLyIsImh0dHBzOi8vcXVpeC1kZXYuZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4OTY3MjYwNSwiZXhwIjoxNjkyMjY0NjA1LCJhenAiOiI2MDRBOXE1Vm9jWW92b05Qb01panVlVVpjRUhJY2xNcyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJwZXJtaXNzaW9ucyI6W119.FD9kV4y6X1nO9hyQ1ug67O-ja5VazR863ug7j2KOI-w4UcY1tt3aXrb2eiW1PFz9ZltwnebNU4Up1l41QPT3YfjK9Hkf6h11GaC8k1XcdvlT_qLRk9YE2RhuAvZganX1H7d3UOQvBIZB9d--VFiQXIrn2FXGfM_RK29n7zxodrNGUYhIYrf25jEozb5pyWzcS-z94TsAv7LnFxfwXd7o_HUTtZogwbYY_i263oC7vHAZpiCsJ3g_EucawkPuP_SuZHpP0sTSHQHwjCPWVwxGf8zauBykopWPUxIT22NPmjq7pcxXmRTkaOjKOEwmf3zQoXhWJ3bks1rfkzeMtSdlGw";

// Set the Workspace and Topic
const workspaceId = "quixdev-stevesstuff";
const topicName = "app-data";

// TODO move to quix-publish

function send_data() {
  //console.log(local_data);
}

var streamid = "";

// Execute POST request to send data to the stream
function sendData() {
  publishableData.publish(topicName, streamid);

  //reset the data
  local_data = new data();
}

function closeStream(streamId) {
  let xhttp = new XMLHttpRequest();

  // Open the Connection
  xhttp.open(
    "POST",
    `https://writer-${workspaceId}.dev.quix.ai/topics/${topicName}/streams/${streamId}/close`,
    true
  );

  // Add Auth and Content headers
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization", token);

  //Send the POST
  xhttp.send();
}

console.log(check_cookie("docs_session_id"));

class data {
  lastTimestamp;
  constructor() {
    this.page_views = [];
    this.mouse_data = [];
    this.search_terms = [];
    this.mode = [];
  }

  CheckAndAddTimeststamp() {
    const timeNow = new Date().getTime() * 1000 * 1000;
    if (this.lastTimestamp === undefined || this.lastTimestamp < timeNow) {
      publishableData.addTimestamp(timeNow);
    }
  }

  AddPageView(page) {
    this.CheckAndAddTimeststamp();
    publishableData.addParameter("page_view", page);
  }

  AddMouseMove(x, y, page_w, page_h) {
    this.CheckAndAddTimeststamp();
    publishableData.addParameter("mouse_coords_x", x);
    publishableData.addParameter("mouse_coords_y", y);
    //publishableData.addTag("page_width", page_w);
    //publishableData.addTag("page_height", page_h);
  }

  AddMouseClick(x, y, buttons, page_w, page_h) {
    this.CheckAndAddTimeststamp();
    this.AddMouseMove(x, y, page_w, page_h);
    publishableData.addParameter("mouse_click", buttons);
  }

  AddSearchTerm(term, hasResults) {
    this.CheckAndAddTimeststamp();
    publishableData.addParameter("search_term", term);
    publishableData.addParameter("search_has_results", hasResults);
  }

  AddViewModeChange(mode) {
    this.CheckAndAddTimeststamp();
    publishableData.addParameter("view_mode", mode);
  }

  AddWindowResize(w, h) {
    this.CheckAndAddTimeststamp();
    publishableData.addParameter("WindowWidth", w);
    publishableData.addParameter("WindowHeight", h);
  }
}

const debounce_input = function (cb, wait) {
  let timeout;

  return function handler_function(...args) {
    const later = () => {
      timeout = null;
      cb(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

location$.subscribe(function (url) {
  //local_data.page_views.push(new page_view(url.pathname))
  local_data.AddPageView(url.pathname);
});

document.onmousemove = debounce_input(handleMouseMove, 150);
function handleMouseMove(event) {
  var eventDoc, doc, body;

  event = event || window.event; // IE-ism

  // If pageX/Y aren't available and clientX/Y are,
  // calculate pageX/Y - logic taken from jQuery.
  // (This is to support old IE)
  if (event.pageX == null && event.clientX != null) {
    eventDoc = (event.target && event.target.ownerDocument) || document;
    doc = eventDoc.documentElement;
    body = eventDoc.body;

    event.pageX =
      event.clientX +
      ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
      ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
    event.pageY =
      event.clientY +
      ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
      ((doc && doc.clientTop) || (body && body.clientTop) || 0);
  }

  var w = document.documentElement.clientWidth;
  var h = document.documentElement.clientHeight;
  
  if ("buttons" in event) {
    local_data.AddMouseClick(event.pageX, event.pageY, event.buttons, w, h);
  }

  // Use event.pageX / event.pageY here
  local_data.AddMouseMove(event.pageX, event.pageY, w, h);
}

var add_mode_data = debounce_input(function (e) {
  if (e.target.id == "__palette_0") local_data.AddViewModeChange("dark");
  if (e.target.id == "__palette_1") local_data.AddViewModeChange("light");
}, 500);
const dark_mode_button = document.getElementById("__palette_0");
const light_mode_button = document.getElementById("__palette_1");
dark_mode_button.addEventListener("change", add_mode_data);
light_mode_button.addEventListener("change", add_mode_data);

var add_search_terms = debounce_input(function (e) {

    var searchResults = document.getElementsByClassName('md-search-result__meta')[0].innerText;
    local_data.AddSearchTerm(e.target.value, "No matching documents" !== searchResults);
}, 500);
const source = document.getElementsByClassName("md-search__input")[0];
source.addEventListener("input", add_search_terms);

var add_window_size = debounce_input(function (e) {
  // Get width and height of the window excluding scrollbars
  var w = document.documentElement.clientWidth;
  var h = document.documentElement.clientHeight;

  // Display result inside a div element
  local_data.AddWindowResize(w, h);
  
}, 500);

// Attaching the event listener function to window's resize event
window.addEventListener("resize", add_window_size);

interval_var = setInterval(sendData, 10000);

var local_data = new data();
var publishableData = new PublishData();

//d.addTimestamp(data.timeNow())
//d.addParameter("A", 1)

// generate a unique id
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function check_cookie(cookie_name) {
  var cookies = document.cookie.split(";").reduce((cookies, cookie) => {
    const [name, val] = cookie.split("=").map((c) => c.trim());
    if (name === cookie_name) {
      console.log(name + "  " + val);
      return value;
    }
    return null;
  }, {});
}
var session_id = check_cookie("docs_session_id");
if (session_id === undefined) {
  const uid = uuidv4();
  document.cookie = "docs_session_id=" + uid;
  session_id = uid;

  publishableData.createStream(
    "DOCS_" + uid,
    topicName,
    (a) => {
      //console.log(a);
      streamid = a;
      document.cookie = "stream_id=" + a;
    },
    window.innerWidth,
    window.innerHeight
  );
}
