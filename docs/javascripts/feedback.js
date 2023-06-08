var feedback = document.forms.feedback
feedback.addEventListener("submit", function(ev) {
  ev.preventDefault()

  /* Retrieve page and feedback value */
  var page = document.location.pathname
  var data = ev.submitter.getAttribute("data-md-value")

  /* Send feedback value */
  gtag("event", "docs-feedback", { page, data })

  /* Hide the feedback on the feedback */
  document.querySelectorAll(`div[data-md-value="0"]`)[0].hidden = true;
  document.querySelectorAll(`div[data-md-value="1"]`)[0].hidden = true;

  /* Show the relevant feedback feedback */
  document.querySelectorAll(`div[data-md-value="${data}"]`)[0].removeAttribute("hidden")

})