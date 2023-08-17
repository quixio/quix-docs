const bearer_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlpXeUJqWTgzcXotZW1pUlZDd1I4dyJ9.eyJodHRwczovL3F1aXguYWkvcm9sZXMiOiJhZG1pbiBRdWl4QWRtaW4iLCJodHRwczovL3F1aXguYWkvb3JnX2lkIjoicXVpeGRldiIsImlzcyI6Imh0dHBzOi8vYXV0aC5kZXYucXVpeC5haS8iLCJzdWIiOiJhdXRoMHw5YjFhYjE5Yy05NWYwLTRhZjQtYjczMy0yYWRmYjY0MmUxMmUiLCJhdWQiOlsiaHR0cHM6Ly9wb3J0YWwtYXBpLmRldi5xdWl4LmFpLyIsImh0dHBzOi8vcXVpeC1kZXYuZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4OTc1NDA2MCwiZXhwIjoxNjkyMzQ2MDYwLCJhenAiOiI2MDRBOXE1Vm9jWW92b05Qb01panVlVVpjRUhJY2xNcyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJwZXJtaXNzaW9ucyI6W119.OAyoRQYSiqmLL4KliduvC0Eywuh-g3_SQZLN8E5NstCtKEkNtHsfXDgZjlchhI1nSVeQ7iGWolwIXvWVqDr2kcVOW0g7G2bDFH2Lv6jRxyKnReJRIyjRZtORbttq1-e6F_voSbi4KUADOP0RVBnuQcDJLjp-yIvrFmLMsanxfJxAARL3mRfbnpWBWAjRMXRy1-FyUFeGbcY4wsZkw3zubXyiDGleHB7SX7-kaenpFfCX_rbwvuA2Aanx4Ym47m4GTULFXSoYhpIOnH5zsdJYLRYwGXG6QrU3CrLIXHARf5oL8_sLDmCRnZ8d2WEssH9qMpue4a5PmBPYFFKWYv1A0g";
const apiUrl = "https://writer-quixdev-stevesstuff.dev.quix.ai";
const eventEndpoint = "/topics/__topic__/streams/__stream__/events/data";
const parameterEndpoint =
  "/topics/__topic__/streams/__stream__/parameters/data";
const streamsEndpoint = "/topics/__topic__/streams";

const topicPlaceholder = "__topic__";
const streamPlaceholder = "__stream__";

const topic = "app-data";
const telemetryTopic = "api-telemetry";

class PublishData {
  timestamps = [];
  stringValues = [];
  numericValues = [];
  tagValues = [];

  constructor() {}

  timeNow() {
    return Date.now() * 1000;
  }

  addNewVal(key, value, valArr) {
    if (valArr[key] === undefined) {

      valArr[key] = [];

      for (let i = 0; i < this.timestamps.length - 1; i++) {
        valArr[key].push(undefined);
      }

      valArr[key].push(value);
    } else {
      if (valArr[key][valArr[key].length - 1] !== undefined) {
        console.log("Numeric value already defined for " + key);
      } else {
        valArr[key][valArr[key].length - 1] = value;
      }
    }
  }

  addNumeric(name, val) {
    this.addNewVal(name, val, this.numericValues);
  }

  addString(name, val) {
    this.addNewVal(name, val, this.stringValues);
  }

  addTag(name, val) {
    this.addNewVal(String(name), String(val), this.tagValues);
  }

  addTimestamp(ts) {
    // add ts and push padding to all columns
    this.timestamps.push(ts);
    Object.keys(this.stringValues).forEach((key, index) => {
      this.stringValues[key].push(undefined);
    });
    Object.keys(this.numericValues).forEach((key, index) => {
      this.numericValues[key].push(undefined);
    });
  }

  addParameter(key, value) {
    switch (typeof value) {
      case "number":
      case "bigint":
        this.addNumeric(key, value);
        break;
      case "boolean":
        value = String(value);
      case "string":
        this.addString(key, value);
        break;
      default:
        console.log("Type not supported");
    }
  }

  async publish(topic, stream) {
    let svList = {};
    Object.keys(this.stringValues).forEach((k, i) => {
      svList[k] = this.stringValues[k];
    });

    let nvList = {};
    Object.keys(this.numericValues).forEach((k, i) => {
      nvList[k] = this.numericValues[k];
    });

    let tvList = {};
    Object.keys(this.tagValues).forEach((k, i) => {
      tvList[k] = this.tagValues[k];
    });

    let result = {
      timestamps: this.timestamps,
      stringValues: svList,
      numericValues: nvList//,
      //tagValues: tvList
    };
    // console.log(result);

    this.timestamps = [];
    this.numericValues = [];
    this.stringValues = [];
    this.tagValues = [];

    if (result.timestamps.length !== 0) {
      const payload = JSON.stringify(result);
      console.log(payload);
      await publishTelemetryJson(topic, stream, payload);
    }
  }

  // Execute POST request to create a new stream and execute a callback passing the returned identifier
  async createStream(
    streamName,
    topic,
    streamIdReceivedHandler,
    windowWidth,
    windowHeight
  ) {
    const path = apiUrl + streamsEndpoint.replace(topicPlaceholder, topic);

    let xhttp = new XMLHttpRequest();

    // Configure the callback
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(xhttp.responseText);

        // Execute the callback to make use of the streamId
        streamIdReceivedHandler(response.streamId);
      }
    };

    // Open the Connection
    xhttp.open("POST", path, true);

    // Add Auth and Content headers
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Authorization", token);

    //Send the POST
    xhttp.send(
      JSON.stringify({
        Name: streamName,
        Metadata: {
          Docs: "some metadata",
          WindowWidth: "" + windowWidth,
          WindowHeight: "" + windowHeight,
        },
      })
    );
  }
}

const publishEvent = async (id, value, userId) => {
  // 1 stream per user.. so use userid or email
  const path =
    apiUrl +
    eventEndpoint
      .replace(topicPlaceholder, topic)
      .replace(streamPlaceholder, userId);

  const data = JSON.stringify([
    {
      id: id,
      timestamp: Date.now() * 1000,
      value: value,
    },
  ]);

  const options = {
    hostname: apiUrl,
    path: path,
    method: "POST",
    headers: {
      Authorization: "Bearer " + bearer_token,
      "Content-Type": "application/json",
    },
  };

  const req = https.request(options, (res) => {
    console.log("statusCode:", res.statusCode);
    console.log("headers:", res.headers);

    res.on("data", (d) => {
      console.log(d);
    });
  });

  req.write(data);
  req.end();
};

const publishTelemetryJson = async (topic, stream, data) => {
  // 1 stream per user.. so use userid or email
  const path =
    apiUrl +
    parameterEndpoint
      .replace(topicPlaceholder, topic)
      .replace(streamPlaceholder, stream);

  let xhttp = new XMLHttpRequest();

  // Configure the callback
  xhttp.onreadystatechange = function () {
    console.log(this.response);
    if (this.readyState == 4) {
      // whatever happens close the stream
      // closeStream(stream_id);
    }
  };
  xhttp.onerror = function (e) {
    console.log("Error fetching " + url);
  };

  // Open the Connection
  xhttp.open("POST", path, true);

  // Add Auth and Content headers
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization", "bearer " + bearer_token);

  current_date = new Date().getTime();

  //Send the POST
  xhttp.send(data);
};

const publishTelemetry = async (id, value, userId, unauthorized = false) => {
  // 1 stream per user.. so use userid or email
  const path =
    apiUrl +
    parameterEndpoint
      .replace(topicPlaceholder, topic)
      .replace(streamPlaceholder, userId);

  var dic = { id: [value] };

  var vals = '{ "' + id + '": [ "' + value + '" ] }';

  const data = JSON.stringify({
    timestamps: [Date.now() * 1000, Date.now() * 1001],
    tagValues: {
      userId: [userId],
      authorized: [unauthorized === true ? "false" : "true"],
    },
    stringValues: JSON.parse(vals),
    numericValues: { myNum: [0, 1] },
  });

  const options = {
    hostname: apiUrl,
    path: path,
    method: "POST",
    headers: {
      Authorization: "Bearer " + bearer_token,
      "Content-Type": "application/json",
    },
  };

  const req = https.request(options, (res) => {
    res.on("data", (d) => {
      console.log(d);
    });
  });
  req.write(data);
  req.end();
};
