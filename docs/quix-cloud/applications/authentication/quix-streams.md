# Authenticating Quix Streams

If you're using Quix Streams for local development, you'll need to set some environment variables. You can most easily do this by using a `.env` file in the project directory that contains your code (make sure you use a `.gitignore` that includes `.env`). The `.env` file contains the following:

```
Quix__Sdk__Token="sdk-12345"
```

You can read the documentation on [obtaining your SDK token](./streaming-token.md), also known as the streaming token.

You code can then load the `.env` file:

``` python
from dotenv import load_dotenv
load_dotenv()
```

!!! tip

    If developing your application in Quix Cloud, these variables are set for you automatically, so you don't need to load them from a `.env` file.