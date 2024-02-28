# Handling inbound webhooks

Many services generate webhooks when certain events occur, and you may want to get these webhooks and their data into Quix. As Quix services can be deployed as web services, they can receive inbound webhooks easily. You simply handle the webhook in the required way, perhaps using an existing connector as a guide. For example, the Segment connector handles webhooks from the Segment service in the following way:

``` python
from quixstreams import Application
from quixstreams.models.serializers.quix import JSONSerializer, SerializationContext
from flask import Flask, request
from datetime import datetime
from waitress import serve
import os
import json
import hmac
import hashlib

app = Application.Quix(
    consumer_group="sample_webhook_group",
    auto_create_topics=True,
)

serializer = JSONSerializer()
output_topic = app.topic(os.environ["output"])
producer = app.get_producer()

flask_app = Flask("Sample Webhook")

# this is unauthenticated, anyone could post anything to you!
@flask_app.route("/webhook", methods=['POST'])
def webhook():
    
    # get the shared secret from environment variables
    secret = os.environ["shared_secret"]
    # convert to a byte array
    secret_bytes = bytearray(secret, "utf-8")

    # get the signature from the headers
    header_sig = request.headers['x-signature']

    # compute a hash-based message authentication code (HMAC)
    hex_digest = hmac.new(secret_bytes, request.get_data(), hashlib.sha1).hexdigest()

    # compare the HMAC to the header signature provided by Segment
    if(header_sig != hex_digest):
        # if they don't match its no bueno
        return "ERROR", 401
    
    with producer:
        serialized_value = serializer(
            value=request.json, ctx=SerializationContext(topic=output_topic.name)                                              
        )
        producer.produce(
            topic=output_topic.name,
            key="sample-webhook",
            value=serialized_value
        )

    return "OK", 200

print("CONNECTED!")

# you can use app.run for dev, but its not secure, stable or particularly efficient
# qx.App.run(debug=True, host="0.0.0.0", port=80)

# use waitress instead for production
serve(flask_app, host='0.0.0.0', port = 80)
```

!!! note

    The Segment webhooks are signed, but for other services this is not always the case, and this will therefore simplify your webhook code.

When you deploy your service you can configure public access in the `Deploy` dialog. You can then obtain the public access URL needed to configure the inbound webhook from the `Deploy` dialog or from the service itself.

See also [How to deploy a public service](../../deploy/deploy-public-page.md) for more information.
