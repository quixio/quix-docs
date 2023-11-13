# Contributing to the Quix Documentation

You want to help improve our documentation? Fantastic! Here are a few guidelines to help you get started.

## Reporting bugs and requesting enhancements

If you spot a mistake or see room for improvement in any of the Quix docs, please let us know! To create an issue, follow these steps:

1. Open the [GitHub issues](https://github.com/quixio/quix-docs/issues) page for the Quix documentation repository.
2. Click **New Issue** and enter a descriptive title that references affected page. For example, '_Sentiment Analysis tutorial references a button that doesnt exist_'.
3. Click **Submit Issue** and wait for one of our team to respond.

We'll try to respond within a couple of working days.

## How do I submit a good docs issue?

Make sure your title is clear and descriptive. For any problem or enhancement, describe it in full, including any expected results and how they differ from the real results. The more descriptive your issue is, the quicker we'll be able to resolve your issue.

## Contributing changes

If you want to fix an issue yourself, go ahead! We welcome edits. For small changes, like typos and minor clarification, you can do an online edits in the GitHub Editor. 

If you want to do more, or if you prefer to work offline, you can fork this repo, add your changes locally and then push to your fork. After that, you can create a pull request to merge your changes into the original docs repository.

For more information on writing docs see the [Quix Writing Style Guide](WRITING-STYLE.md) and the [best practice guide](./BEST-PRACTICE.md).

**IMPORTANT:** Please create forks or branches from the `dev` branch.

## Online edits in the GitHub Editor

If you want to make a change, you can do it right on GitHub. Just follow these steps:

1. Open the page you want to change click the edit button edit button.
This will open the relevant page in GitHub
2. To edit the page in GitHub, type `E`, or click the edit icon and make your changes.
3. When you've finished, scroll down and write a short description of the changes you made in the commit message, and click **Propose Changes**.
4. On the page that appears, click **Create Pull Request**, fill out the details and submit it.

**Note:** Remember to create forks or branches from the 'dev' branch.

## PR reviews

A member of our team will review your pull request. We might give feedback and suggestions for how you could improve the pull request, which is the same process we use when reviewing each others work internally. We'll try to respond within a couple of working days, but feedback can sometimes take longer. We appreciate all your feedback and contributions.

## Dealing with large files

Where you contribute tutorials or other content that needs to reference very large files, you should avoid checking those files into GitHub. Instead you can use code to download the required file at run time. Some Python code to download a model file is shown here:

```python
# pip install or add urllib3 to requirements.txt
from urllib import request
f = request.urlopen("https://quixtutorials.blob.core.windows.net/tutorials/event-detection/XGB_model.pkl")
with open("model_file.pkl", "wb") as model_file:
    model_file.write(f.read())
```

In this case the model file is stored in the cloud, and simply downloaded prior to use.

## Contact

If you need any help, please sign up to the [Quix Community](https://quix.io/slack-invite){target=_blank}.
