document.addEventListener("DOMContentLoaded", function() {
    var script = document.createElement('script');
    script.defer = true;
    script.type = 'module';
    script.id = 'runllm-widget-script';
    script.src = 'https://cdn.jsdelivr.net/npm/@runllm/search-widget@stable/dist/run-llm-search-widget.es.js';
    script.setAttribute('version', 'stable');
    script.setAttribute('runllm-server-address', 'https://api.runllm.com');
    script.setAttribute('runllm-assistant-id', '111');
    script.setAttribute('runllm-position', 'BOTTOM_RIGHT');
    script.setAttribute('runllm-keyboard-shortcut', 'Mod+j');
    script.setAttribute('runllm-slack-community-url', 'https://quix.io/slack-invite');
    script.setAttribute('runllm-name', 'RunLLM');

    document.head.appendChild(script);
});
