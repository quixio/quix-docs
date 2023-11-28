import mkdocs.plugins
from mkdocs.structure.files import Files


@mkdocs.plugins.event_priority(-100)
def on_files(files: Files, config):
    """
    Redirect URLs "quix-streams/***" to "quix-streams/v0-5-stable/***"
    using "redirects" plugin
    """
    new_prefix = "quix-streams/v0-5-stable/"
    old_prefix = "quix-streams/"

    redirect_plugin = config.get("plugins", {}).get("redirects")
    redirects = redirect_plugin.config.get("redirect_maps", {})

    for file in files.documentation_pages():
        if file.url.startswith(new_prefix):
            redirects[file.src_uri.replace(new_prefix, old_prefix, 1)] = file.src_uri
