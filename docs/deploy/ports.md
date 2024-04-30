# Configuring network ports

It is possible to configure the network ports of services running in Quix projects, in order to expose service ports to other services running in the same Quix environment. 

In the `quix.yaml` you add configuration in the `deployments` section:

``` yaml
deployments:
    - name: Demo Data
      ...
      network:
        serviceName: MyServiceInternalName
        ports:
        - port: 80
          targetPort: 8080
        - port: 81
          targetPort: 8080
```

In this example, an application running on port 8080 in the container is exposed on ports 80 and 81 as service name `MyServiceInternalName`, with endpoints `http://MyServiceInternalName:80` and `http://MyServiceInternalName:81`. 

| Property | Description |
|---|---|
| `port` | The port the service exposes to the internal network. |
| `targetPort` | The port that the application running in the container uses. This property is optional. If you don't specify it, the specified ports are exposed without redirection. |
