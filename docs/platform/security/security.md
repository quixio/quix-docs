# Security

This section describes the basic security features of Quix.

## Data in flight

### Authentication

  - Our APIs are authenticated using
    [OAuth 2.0](https://datatracker.ietf.org/doc/html/rfc6749){target=_blank} token. We
    are using [Auth0](https://auth0.com/docs/protocols/protocol-oauth2){target=_blank}
    as our provider.

  - Each Kafka server is authenticated using certificate, which is
    provided for each project created and can also be downloaded from
    topics view. The client is authenticated using SASL (username,
    password).

### Authorization

  - The APIs is using RBAC. You are limited in what you can do based on
    your token and the role configured for your user.

  - Each kafka client is authrozied to only read and write to the topics
    or query consumer group information regarding topics owned by the
    organization the client belongs to.

### Encryption

  - All our APIs communicate with TLS 1.2

## Data at rest

  - Your data is encrypted at rest using cloud provider (Azure) managed
    keys.

  - Your data is phyisically protected at our cloud provider’s location.
