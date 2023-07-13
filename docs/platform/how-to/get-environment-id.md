# Get environment ID

Occasionally, you’ll need to obtain an ID based on a specific environment. For example, endpoints for the [Data Catalogue API](../../apis/data-catalogue-api/intro.md) use a domain with the following pattern:

    https://telemetry-query-${environment-id}.platform.quix.ai/

The environment ID is a combination of your organization and environment names, converted to URL friendly values. 

To obtain your environment ID:

1.  Go to the [Portal home](https://portal.platform.quix.ai/){target=_blank}.

2.  Locate the environment you’re interested in and open it.

3.  At this point, take note of the URL. It will be in the form:

    https://portal.platform.quix.ai/home?workspace={environment-id}

Copy the value for `environment-id` and use it wherever you need an environment ID.

!!! note

    The `workspace` parameter in the URL `https://portal.platform.quix.ai/home?workspace={environment-id}` is there for legacy reasons, and does in fact indicate an environment.