# Docs internal processes

## Docs release

To do a docs release the process is:

1. Do development.
2. Merge your changes to `dev` branch.
3. When ready for a release, create a PR to merge `dev` to `main`, use release naming convention for PR title, for example, `Docs Release 2023-04-001`. The format used is `YYYY-MM-NNN`, where `NNN` is the release number for the month.
4. Seek review and approval for the above PR to merge `dev` to `main`.
5. Create a merge commit, adding comments stating the changes. See the [docs changelog](https://github.com/quixio/quix-docs/wiki/Docs-Releases) for examples.
6. Go to `Actions` in the docs repo on GitHub. Trigger the deployment GitHub action.
7. Update the [docs release wiki page](https://github.com/quixio/quix-docs/wiki/Docs-Releases).

You can also add a announcement to the `#general` channel in Slack, with a link to the release notes. 
