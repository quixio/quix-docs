# Develop web applications with Quix

Quix can bring real-time web functionality to you client applications.
Following types of applications are good candidates to use Quix as their
data plane.

  - Dashboard and real-time monitoring applications that show updates as
    they happen to users like cloud/edge monitoring tools.

  - Applications that require data to be pushed from a backend at high
    frequency like games and simulations.

  - Social networking applications that require broadcasting updates to
    many users at high frequency like live sharing of Strava data.

## NodeJs

NodeJs applications can update parameter and event definitions and write
data to streams using RESTful APIs. Quix supports WebSockets for clients
that want to receive telemetry data and parameters/events updates in
real-time. NodeJs clients must authenticate with Quix using [personal access tokens](../../apis/streaming-reader-api/authenticate.md#get-a-personal-access-token).
