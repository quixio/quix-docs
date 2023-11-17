# HTTP requests

How you send HTTP requests REST APIs varies depending on the client or language you’re using.

## Sign requests using your PAT

Make sure you accompany each request to the API with an `Authorization` header using your Personal Access Token (PAT) as a bearer token, as follows:

``` http
Authorization: bearer <token>
```

Replace `<token>` with your Personal Access Token (PAT). 

For example, if you’re using Curl on the command line, you can set the header using the `-H` flag:

``` shell
curl -H "Authorization: bearer <token>" ...
```

If you fail to send a valid Authorization header, the API will respond with a `401 UNAUTHORIZED` status code.

## Endpoint URLs

APIs are available on a per-environment basis (with the exception of the Portal API), so the endpoint URL is based on your environment ID. 

Read the documentation on how to obtain your environment ID.

The API endpoint URL has the following format:

```
https://<api-name>-<environment-id>.platform.quix.io/<action>
```

So, for example, the endpoint URL for the streaming writer might resemble the following:

```
https://writer-acme-weather.platform.quix.io/<action>
```

The API is `writer`, and the environment ID is `acme-weather`.

## HTTP method

Endpoints in the API use HTTP methods such as `POST` and `PUT` methods. Ensure your HTTP client sends the correct request method.

Using `curl`, you can specify the request method with the `-X <POST|PUT>` flag, for example:

```bash
curl -X PUT ...
```

## Payload

For most methods, you’ll need to send a JSON object containing supported parameters. You’ll also need to set the appropriate content type for the payload you’re sending:

```bash
curl -H "Content-Type: application/json" ...
```

!!! warning

	You **must** specify the content type of your payload. Failing to include this header will result in a `415 UNSUPPORTED MEDIA TYPE` status code.

You can send data using the `curl` flag `-d`. This should be followed by either a string of JSON data, or a string starting with the *@* symbol, followed by a filename containing the JSON data.

```bash
curl -d '{"key": "value"}' ...
curl -d "@data.json" ...
```

!!! tip

	By default, `-d` will send a `POST` request, so `-X POST` becomes unnecessary.

## Complete Curl example

You should structure most of your requests to the API around this pattern:

```bash
curl -H "Authorization: bearer ${token}" \
     -H "Content-Type: application/json" \
     -d "@data.json" \
     https://${api-name}-${environment-id}.platform.quix.io/<action>
```
