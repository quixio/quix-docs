# Sign up to Quix Cloud for free

Sign up [here](https://portal.platform.quix.io/self-sign-up){target=_blank}.

You need to sign up to Quix Cloud at this stage as you're going to be testing some of your code locally, and rather than set up a local broker, you'll use a Quix-hosted broker for your Kafka topics.

When you log into Quix Cloud, you'll be prompted to create a project.

## Create a Quix project

In this step you create a project in Quix Cloud based on your Git repository.

1. Give you project a suitable name, such as `Simple Pipeline`.
2. Select `Quix advanced configuration` to continue creation of your project.
3. Select your Git provider (for example, GitHub).
4. Link the Quix project to your Git repository using the **setup guide** provided for your chosen Git provider.
5. Use PROD for your environment, and make sure the `main` branch is selected.

When you've created the project, switch back to the command line.

!!! tip

    If you need help on creating a project, you can [read the documentation](../create/create-project.md).

## Next step

* [Add a source](./cli-add-source.md)
