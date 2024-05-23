---
title: Using the Quix CLI from GitHub Actions
description: You can invoke Quix CLI from GitHub Actions in order to help automate your workflows.
---

# Using the Quix CLI from GitHub Actions

Sometimes you might want to invoke certain commands of the Quix CLI from GitHub Actions (or equivalent) as part of your CI/CD pipelines. For example, you might want to sync your Git repository to Quix after you merge a Pull Request from, say, your `develop` branch to your `main` branch. The alternative to doing this would be to enter the Quix Cloud pipeline view and manually sync. You might want to do a similar thing if you push directly to a branch, and want the Quix pipeline to be updated with the latest code changes.

Using the Quix CLI, you can push any changes to your code, and sync the repo to Quix, by using the following command:

```
quix local pipeline sync --update
```

But sometimes, a developer may make code changes to a branch directly, without using the Quix CLI. In this case you could create a GitHub Action to make sure your repo is always synched to Quix.

The basic procedure to use the Quix CLI in a GitHub Action is:

1. Install the Quix CLI using the [Curl command](https://github.com/quixio/quix-cli?tab=readme-ov-file#installation-of-quix-cli){target=_blank}.
2. Authenticate the CLI with Quix Cloud using the command `quix login <pat>`, where `<pat>` is the [personal access token](../develop/authentication/personal-access-token.md) for the environment. 
3. Run your CLI command or commands.

In this case you'll run the command to synchronize the repository with Quix using the command `quix env sync <workspace-id>`. You can obtain the Workspace ID from your environment settings.

!!! tip

    Note that both the PAT and the Workspace ID can be conveniently stored in GitHub secrets, for secure access by the script.

An example GitHub Action workflow is:

``` yaml
# This is a basic workflow to help you get started with Quix CLI and Actions

name: CI

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the "main" branch
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v4

      # Quix sync
      - name: Quix sync
        run: |
          echo Installing Quix CLI
          curl -fsSL https://github.com/quixio/quix-cli/raw/main/install.sh | bash
          echo Logging into Quix Cloud
          quix login ${{ secrets.QUIX_PAT }}
          quix env sync ${{ secrets.WORKSPACE_ID }}
```

In this case the Action is run for `main` branch, but you could modify this or add other branches as required.
