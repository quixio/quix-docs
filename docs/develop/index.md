# Develop your application

With a branch you develop your Applications, typically in Python. Each application represents the implementation of a source, transform, or destination.

For example, you might create a new source component to retrieve data from an external service, a transform to process this data, and then perhaps a destination, which could store data in a Postgres database. You might have another destination to display the data on a Streamlit dashboard. 

These applications are connected together to form your pipeline. It is important to note the pipeline is contained within a branch.

For example, a pipeline on the develop branch of Project Alpha might be:

| Application name | Type | Notes |
|---|---|---|
| Inbound data | Source | Fetch data from REST API |
| IP to geo | Transform | Converts IP address to Geolocation |
| Archive data | Destination | Write to Postgres relational database |
| Dashboard | Destination | Streamlit dashboard |

### Application name and path

A new feature in Quix is the ability to change an application name and path. For example, when creating a new application from a Code Sample, you are prompted for the application name and path. 

The application name can be any suitable name, the application path is the folder in which the application is stored in the Git repository. By default the path is set to be the same as the application name, but you can choose any path name - for example, you might not want to use spaces in folder names, so you use underscores instead of spaces in the path.

* [Watch a video on how to create an application](https://www.loom.com/share/dee01c5f7d0d4d338504c3c09dcd3181?sid=b902acbd-ef72-4450-80f3-6201764f48b9){target=_blank}
