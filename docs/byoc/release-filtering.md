# What are Quix BYOC Release Filters?

We recommend using ArgoCD or Flux to orchestrate releases and updates to your BYOC environment. We publish multiple branches, or "streams", of releases, but you may choose to only deploy a subset of these releases to your environment. This is where release filters become useful. 

ArgoCD does not natively support picking and choosing the parts of an application you wish to deploy. So we built a tool for it ourselves.

A filter is a powerful tool you can use to determine what versions of our services or chart to accept or reject, based on multiple possible criteria.

Our BYOC distribution comes bundled with ArgoCD. If you decide to deploy it, you'll gain the ability to specify which releases are acceptable. This feature is particularly useful for testing or adhering to the version constraints of your underlying infrastructure.

## How do I use filters?

A Release filter is a Configmap containing a YAML file, which describes the conditions under which a release should be accepted or rejected.

By default the filter is empty, and your platform will deploy any release to which your platform subscribes, to your environment automatically.

The following example shows the various ways in which you may filter releases:
```yaml
---
platform_release:
  - type: versionBelow
    key: version
    value: "2.0.0"
  - type: versionBelow
    key: minSupportedKubernetes
    value: "1.24.19"
  - type: includeKeyword
    key: requiredStorageBackend
    value: 
      - "nfsclient"
auth:
  - type: dateBefore
    key: imagetag
    value: "20231111"
  - type: excludeKeyword
    key: imagetag
    value: 
      - "cactus"
      - "beta"
      - "test"
  - type: includeKeyword
    key: imagetag
    value: 
      - "bamboo"
  - type: exact
    key: imagetag
    value: "20231116.2-2023-11-03-promocode"
  - type: highestMinorVersion
    key: imagetag
    value: "1"
```

Any release chart rejected because of the `platform_release` service matching a filter will cause the entire chart to be rejected. This happens even if the `auth` filter would have accepted the auth service otherwise. Platform_release supersedes individual service filters.

A rejected service (or chart) will not be deployed to your environment either at the time of us pushing it to the branch your environment is subscribed to, or at the time of your environment syncing with the branch. If you wish to install a release anyway, you may at any time change your filter and manually sync your ArgoCD Quix application.

!!! note
    We recommend that if you set a filter, it only applies to the platform_release service. Any more granular filtering should be done at the recommendation of a Quix support engineer during a troubleshooting session. During normal operation, keeping the minSupportedKubernetes key filtered is a good idea, as it will prevent you from deploying a release that is not compatible with your Kubernetes cluster. Otherwise, we recommend you keep the filter, at least initially, empty.

## How do I know what was filtered out?

In your Kubernetes cluster, you can find the Configmap containing a chart (essentially a service version matrix) of all the services your platform was meant to deploy. In case of a filter-induced rejection, you will see a Configmap called `containerversions` receive a new annotation at `.metadata.annotations.rejectedServices` containing a json array of all the services and reasons they were rejected. Or it may be empty in case no such event occurred.

```
> kubectl -n quix get cm containerversions -o jsonpath='{.metadata.annotations.rejectedServices}' | base64 -d
{}


- or -

{ "auth": { "type": "excludeKeyword", "key": "imagetag", "value": [ "cactus", "promocode" ] }, "platform_release": { "type": "versionBelow", "key": "version", "value": "1.0.0" } }
```

