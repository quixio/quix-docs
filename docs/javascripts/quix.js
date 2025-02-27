
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

function post_hog_event(event_name, params){
    if (consent && consent.posthog) {
        posthog.capture(event_name, params);
    }
}

const elements = document.querySelectorAll('p, span, div, a'); // Add other tags if needed
elements.forEach(element => {
    console.log(element.innerText)
    if (element.innerText === 'Book a session') { // Replace 'Click Me' with your specific text
        // element.addEventListener('click', handleClick);
        console.log("Book link")
    }
});