
let home = "/index.html"
if(window.location.href.indexOf("quix.io/docs") > 0) { 
    home = "/docs/index.html"
    document.getElementById("link_to_home").href = home
}