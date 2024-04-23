# Configuring network ports

It is possible to configure the network ports of services running in Quix projects, in order to expose service ports to other services running in the same Quix environment. For example, if a service by default uses port 80, and you want the service to be accessible internally running on port 8080, you can configure the deployed service accordingly.

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

In this example, two service ports are explosed as port 8080 on the host machine.

| Property | Description |
|---|---|
| `port` | The port the service uses internally. |
| `targetPort` | The port that the service docker container uses. |

