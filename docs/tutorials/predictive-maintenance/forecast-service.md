# Forecast service

Generates a forecast for the temperature data received from the input topic. This is to predict a potential failure condition, when the ambient temperature of the 3D printer drops below the minimum threshold for successful ABS-based printing.

![Forecast pipeline segment](./images/forecast-pipeline-segment.png)

The forecast is made using the downsampled data as the input, and using the scikit-learn library. The forecasts are published to the `json-forecast` topic. <!-- The Alert service and Printers dashboard service both subscribe to this topic.--> The Alert service subscribes to this topic.

## Data format

The forecast data format is:

```json
{
  "timestamp": "2024-04-16 18:03:20",
  "forecast": 72.21788743081183
}
```

## Prediction algorithm

The work of the prediction is carried out by the `scikit-learn` library, using a quadratic polynomial (second order) linear regression algorithm:

``` python
forecast_input = list(map(lambda row: row["mean_fluctuated_ambient_temperature"], rows))

# Define the degree of the polynomial regression model
degree = 2
# Create a polynomial regression model
model = make_pipeline(PolynomialFeatures(degree), LinearRegression())
# Fit the model to the data
model.fit(np.array(range(len(forecast_input))).reshape(-1, 1), forecast_input)
# Forecast the future values
forecast_array = np.array(range(len(forecast_input), len(forecast_input) + forecast_length)).reshape(-1, 1)
forecast_values = model.predict(forecast_array)

result = []
timestamp = rows[-1]["timestamp"]

for value in forecast_values:
    timestamp += 60 * 1000
    result.append({
        "timestamp": timestamp,
        "forecast": float(value)
    })
return result
```

## 🏃‍♀️ Next step

[Part 5 - Alert service :material-arrow-right-circle:{ align=right }](./alert-service.md)
