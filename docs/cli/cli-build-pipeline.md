# Build a pipeline using the Quix CLI

In this tutorial you'll build a simple pipeline using the Quix CLI. The steps are:

1. **Create a project** - you create your Git project.
2. **Sign up to Cloud** - Sign up to Quix Cloud for free.
3. **Add a source** - you add a demo data source.
4. **Add a transform** - you add a transform and perform some simple processing.
5. **Add a destination** - you add a simple destination.
6. **Sync to Quix Cloud** - you synchronize you CLI project with Quix Cloud.

## Prerequisites

### Quix CLI

Make sure you have **Quix CLI installed**, if you've not already done so:

```
curl -fsSL https://github.com/quixio/quix-cli/raw/main/install.sh | bash
```

For further details on installation, including instructions for Microsoft Windows, see the [install guide](https://github.com/quixio/quix-cli?tab=readme-ov-file#installation-of-quix-cli){target=_blank}.

!!! tip

    To update Quix CLI just run `quix update` to get the latest version of Quix CLI.

### Quix Streams

Make sure you install Quix Streams with `python3 -m pip install quixstreams` if you haven't already done so. 

If you already have Quix Streams installed, make sure you are using the latest version with `python -m pip install quixstreams -U` or `python3 -m pip install quixstreams -U`, depending on how your system is set up.

## Next step

* [Create a project](./cli-create-project.md)
