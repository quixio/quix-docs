
# Weather data

You now have a working real time stream of bike data, next you will access OpenWeathers current and forecasted weather data. 

## Create OpenWeather account (free)

!!! info

	[OpenWeather](https://openweathermap.org/){target=_blank} is a team of IT experts and data scientists that provides historical, current and forecasted weather data via light-speed APIs.
	
1. Go to the [OpenWeather Sign Up page](https://home.openweathermap.org/users/sign_up/){target=_blank}.

2. Click the `Sign Up` button and complete the dialog and the email and text message verifications.

3. Then, go to the [OpenWeather API keys](https://home.openweathermap.org/api_keys){target=_blank} page to copy your key. 
	Keep it safe for later.

## Weather real time stream

You can now deploy the pre-built OpenWeather connector from the Quix Samples.

1. Search the Code Samples for `weather` and select the `Open Weather API` tile.

2. Click `Setup and deploy`

	a. Leave the `name` as it is.
	
	b. Ensure the `output` is set to `weather-topic`.

	c. Paste your OpenWeather API key into the `open weather key` field. This is the API key you obtained from your OpenWeather account.

3. Click `Deploy`

	The pre-compiled service will be deployed to your workspace and will begin running immediately.

	!!! note "OpenWeather limitation"

		The OpenWeather API has limits on how much data we can access for free and the real weather only changes in real-time (this means slowly). 
		
		In order to prevent your account from being rate limited, the connector is coded to consume data every 30 minutes.

## Summary

At this stage you should have two services running.

One is publishing `New York CitiBike` data to a topic called `bikes-topic` and another is publishing `OpenWeather` data to a topic called `weather-topic`.

![Successfully deployed pipeline](early-success.png)


[Part 3 - Data views :material-arrow-right-circle:{ align=right }](3-data.md)
