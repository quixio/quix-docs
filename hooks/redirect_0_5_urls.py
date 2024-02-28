import mkdocs.plugins
from mkdocs.structure.files import Files


@mkdocs.plugins.event_priority(-100)
def on_files(files: Files, config):
    """
    Redirect URLs "quix-streams/v2-0-latest/***" to "quix-streams/***"
    using "redirects" plugin
    """
    new_prefix = "quix-streams/v2-0-latest/"
    old_prefix = "quix-streams/"

    redirect_plugin = config.get("plugins", {}).get("redirects")
    redirects = redirect_plugin.config.get("redirect_maps", {})

    for file in files.documentation_pages():
        if file.url.startswith(new_prefix):
            redirects[file.src_uri.replace(new_prefix, old_prefix, 1)] = file.src_uri
