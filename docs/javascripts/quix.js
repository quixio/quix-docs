
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