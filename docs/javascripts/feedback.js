

var consent = __md_get("__consent")
var use_google_analytics = consent && consent.analytics;

/* Register event handlers after document is loaded */
document.addEventListener("DOMContentLoaded", function() {

  if(!use_google_analytics){
    return;
  }

    /* Set up search tracking */
    if (document.forms.search) {
      var query = document.forms.search.query
      query.addEventListener("blur", function() {
        if (this.value)
          gtag("event", "search", { search_term: this.value })
          post_hog_event('docs-search', {search_term: this.value})
      })
    }
    
    /* Set up feedback, i.e. "Was this page helpful?" */
    document$.subscribe(function() {
      var feedback = document.forms.feedback
      if (typeof feedback === "undefined")
        return
    
      /* Send feedback to Google Analytics */
      for (var button of feedback.querySelectorAll("[type=submit]")) {
        button.addEventListener("click", function(ev) { 
          ev.preventDefault()
    
          /* Retrieve and send data */
          var page = document.location.pathname
          var data = this.getAttribute("data-md-value")
          gtag("event", "feedback", { page, data })
    
          /* Disable form and show note, if given */
          feedback.firstElementChild.disabled = true
          var note = feedback.querySelector(
            ".md-feedback__note [data-md-value='" + data + "']"
          )
          if (note)
            note.hidden = false
        })
    
        /* Show feedback */
        feedback.hidden = false
      }
    })
    
    /* Send page view on location change */
    location$.subscribe(function(url) {
      gtag("config", "G-BFBHQ33YP1", {
        pageview: url.pathname,
        page_view: url.pathname
      })
      post_hog_event('docs-navigation', {page: url.pathname})
    })
  })