# Write to Quix with NodeJs

Clients write data to Quix using streams opened on existing
[topics](../../definitions.md#_topics). Therefore, you need to
first create a topic in the Portal to hold your data streams.

Once you have a topic, your clients can start writing data to Quix by

  - creating a stream in your topic

  - sending data to that stream

  - closing the stream

## Creating a stream

To write data to Quix, you need to open a stream to your topic.
Following is an example of creating a stream using JavaScript and
Node.js.

``` javascript
const https = require(https);

const data = JSON.stringify({
    Name: "Your Stream Name",
    Location: "your/location",
    Metadata: {
        Property1: "Value 1",
        Property2: "Value 2"
    },
    Parents = ["parent-stream-1", "parent-stream-2"],
    TimeOfRecording: "2021-02-06T00:15:15Z"
});

const options = {
    hostname: 'your-workspace-id.portal.quix.io',
    path: '/topics/your-topic-name/streams',
    method: 'POST',
    headers: {
        'Authorization': 'Bearer your_access_token',
        'Content-Type': 'application/json'
    }
};

const req = https.request(options, res => {
    res.on('data', d => {
        let json = JSON.parse(d);
        let streamId = json.streamId;
    });
});

req.write(data);
req.end();
```

Upon completing the request successfully, you will receive the stream id
in the response body. You are going to need this stream id when you are
writing data to the stream.

In the request data, `Location` is also an optional, but an important
property. Location allows you to organise your streams under directories
in the Data Catalogue.

When you are creating the stream, you can add optional metadata about
the stream to the stream definition like `Property1` and `Property2` in
the preceding example.

Field `Parents` is also optional. If the current stream is derived from
one or more streams (e.g. by transforming data from one stream using an
analytics model), you can reference the original streams using this
field.

`TimeOfRecording` is an optional field that allows you to specify the
actual time the data was recorded. This field is useful if you are
streaming data that was recorded in the past.

## Writing parameter data to a stream

After you have created the stream, you can start writing data to that
stream using the following HTTP request.

``` javascript
const https = require(https);

const data = JSON.stringify({
    Timestamps: [1591733989000000000, 1591733990000000000, 1591733991000000000],
    NumericValues: {
        "ParameterA": [1, 2, 3],
        "ParameterB": [5, 8, 9]
    },
    StringValues: {
        "ParameterC": ["hello", "world", "!"]
    },
    BinaryValues: {
        "ParameterD": [
            Buffer.from("hello").toString('base64'),
            Buffer.from(" Quix").toString('base64'),
            Buffer.from("!").toString('base64')
        ]
    }
    TagValues: {
        "ParameterA": [null, null, "tag-1"]
    }
});

const options = {
    hostname: 'your-workspace-id.portal.quix.io',
    path: '/topics/your-topic-name/streams/your-stream-id/parameters/data',
    method: 'POST',
    headers: {
        'Authorization': 'Bearer your_access_token',
        'Content-Type': 'application/json'
    }
};

const req = https.request(options, res => {
    console.log(`Status Code: ${res.statusCode}`);
});

req.write(data);
req.end();
```

In the preceding example, `data` has two different parameter types,
numeric and strings. If your data only contains numeric data, you do not
need to include the `StringValues` property. In the case of binary
values, the items in the array must be a base64 encoded string.

`TagValues` is another optional field in the data request that allows
you to add context to data points by means of tagging them. Index of the
`Timestamps` array is used when matching the parameter data values as
well as tag values. Therefore, the order of the arrays is important.

## Defining parameters

In the above examples, parameters are created in Quix as you write data
to the stream. However, what if you would like to add more information
like acceptable value ranges, measurement units, etc. to your
parameters? You can use the following HTTP request to update your
parameter definitions.

``` javascript
const https = require(https);

const data = JSON.stringify([
    {
        Id: "ParameterA",
        Name: "Parameter A",
        Description: "Temperature measurements from unit 1234A",
        MinimumValue: 0.0,
        MaximumValue: 100.0,
        Unit: "°C",
        CustomProperties: "{\"OptimalMinimum\": 30.0, \"OptimalMaximum\": 50.0}",
        Location: "/chassis/engine"
    }
]);

const options = {
    hostname: 'your-workspace-id.portal.quix.io',
    path: '/topics/your-topic-name/streams/your-stream-id/parameters',
    method: 'PUT',
    headers: {
        'Authorization': 'Bearer your_access_token',
        'Content-Type': 'application/json'
    }
};

const req = https.request(options, res => {
    console.log(`Status Code: ${res.statusCode}`);
});

req.write(data);
req.end();
```

In the preceding request, the `Id` must match the parameter id you set
when writing data to the stream. `Name` allows you to set a more
readable name for the parameter. You can also add a description, minimum
and maximum values, unit of measurement to your parameter. `Location`
allows you to organise/group your parameters in a hierarchical manner
like with the streams. If you have a custom parameter definition that is
not covered by the primary fields of the request, you can use
`CustomProperties` field to add your custom definition as a string.

## Writing event data to a stream

Writing event data to a stream is similar to writing parameter data
using the web api. The main difference in the two requests is in the
request body.

``` javascript
const data = JSON.stringify([
    {
        Id: "EventA",
        Timestamp: 1591733989000000000,
        Value: "Lap1",
        Tags: {
            TagA: "val1",
            TagB: "val2"
        }
    },
    {
        Id: "EventA",
        Timestamp: 1591734989000000000,
        Value: "Lap2",
        Tags: {
            TagA: "val1",
            TagB: "val2"
        }
    },
    {
        Id: "EventA",
        Timestamp: 1591735989000000000,
        Value: "Lap3",
        Tags: {
            TagA: "val1"
        }
    },
]);

const options = {
    hostname: 'your-workspace-id.portal.quix.io',
    path: '/topics/your-topic-name/streams/your-stream-id/events/data',
    method: 'POST',
    headers: {
        'Authorization': 'Bearer your_access_token',
        'Content-Type': 'application/json'
    }
};

const req = https.request(options, res => {
    console.log(`Status Code: ${res.statusCode}`);
});

req.write(data);
req.end();
```

In the preceding example, tags in the event data request are optional.
Tags add context to your data points and help you to execute efficient
queries over them on your data like using indexes in traditional
databases.

## Defining events

In the above examples, events are created in Quix as you write data to
the stream. If you want to add more descriptions to your events, you can
use event definitions api similar to parameter definitions to update
your events.

``` javascript
const https = require(https);

const data = JSON.stringify([
    {
        Id: "EventA",
        Name: "Event A",
        Description: "New lap event",
        CustomProperties: "{\"Tarmac\": \"Open-graded\"}",
        Location: "/drive/lap",
        Level: "Information"
    }
]);

const options = {
    hostname: 'your-workspace-id.portal.quix.io',
    path: '/topics/your-topic-name/streams/your-stream-id/events',
    method: 'PUT',
    headers: {
        'Authorization': 'Bearer your_access_token',
        'Content-Type': 'application/json'
    }
};

const req = https.request(options, res => {
    console.log(`Status Code: ${res.statusCode}`);
});

req.write(data);
req.end();
```

In the preceding request, the `Id` must match the event id you set when
writing events to the stream. `Name` allows you to set a more readable
name for the event. `Location` allows you to organise/group your events
in a hierarchy like with the parameters. If you have a custom event
definition that is not covered by the primary fields of the request, you
can use `CustomProperties` field to add your custom definition as a
string. You can also set an optional event `Level`. Accepted event
levels are Trace, Debug, Information, Warning, Error and Critical. Event
level defaults to Information if not specified.

## Closing a stream

After finishing sending data, you can proceed to close the stream using
the request below.

``` javascript
const https = require(https);

const options = {
    hostname: 'your-workspace-id.portal.quix.io',
    path: '/topics/your-topic-name/streams/your-stream-id/close',
    method: 'POST',
    headers: {
        'Authorization': 'Bearer your_access_token',
        'Content-Type': 'application/json'
    }
};

const req = https.request(options, res => {
    console.log(`Status Code: ${res.statusCode}`);
});

req.end();
```
