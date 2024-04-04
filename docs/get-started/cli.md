# Using the Quix CLI

You can now continue on your command-line by installing the Quix CLI, and then using it to connect with Quix Cloud.

## Step 1. Install Quix CLI

```
curl -fsSL https://github.com/quixio/quix-cli/raw/main/install.sh | sudo bash
```

For fruther details on installation see the [install guide](https://github.com/quixio/quix-cli?tab=readme-ov-file#installation-of-quix-cli){target=_blank}.

## Step 2. Sign up to Quix Cloud for free

Sign up [here](https://portal.platform.quix.io/self-sign-up){target=_blank}.

## Step 3. Obtain a personal Access Token (PAT)

Log into Quix Cloud and obtain a PAT. To do this click on your profile icon in Quix Cloud. Then generate a token and copy it to the clipboard using the button provided.

## Step 4. Log in using the CLI

```
quix login <your-pat>
```

## Step x. Create a Git repository

Create a Git repo where you can store your files (you could use GitHub). 

## Step x. Clone your Git repo into your project directory

For example, if your project is `cli-app`:

```
git clone <url>/cli-app
cd cli-app
```


## Step . Create your application locally

Create a directory for your project and then create an application:

```
quix local app create
```

This creates a start transformation for you. You can explore the files created locally for you.




