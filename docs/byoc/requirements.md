# Requirements for BYOC

The BYOC installation method assumes that some resources are available and meet version or quantity criteria. We have conducted extensive testing on a variety of Kubernetes cluster configurations and have validated the platform on a number of different setups. 

The requirements are designed to ensure that the platform will run effectively and efficiently. Most default installations in managed Kubernetes environments will meet these requirements, as well as any opinionated installation of Kubernetes on on-prem VMs running any modern linux operating system.

## Essentials

To ensure the success of the installation process, the following essential requirements must be fulfilled:

- For running the installer: A kubectl client that has already been configured to communicate with this cluster. 
  This client must be able to communicate with the cluster from the computer running the installation scripts.
  The installer container may be run locally in docker engine, or as a pod in the cluster.
- To run the platform: An AMD64 Kubernetes cluster that has already been set up.
- Sufficient permissions to create a service account, manage limited tokens, and create new namespaces and other resources.

## Kubernetes cluster minimum requirements

### Hardware
- AMD64 architecture.[^1]
- Multiple nodes with 6 cpu cores and 48GB RAM total.[^2].

### Software
- Kubernetes version 1.24.1 or later.
- A container runtime capable of handling Linux containers, MongoDB and Kafka. (containerd, cri-o etc.)
- Maximum pod count set to at least 50 on nodes that will run the Quix platform or deployments. Purely control-plane nodes do not necessarily need this.

### Networking
- The ability of exposing services outside of the Kubernetes cluster. (either LoadBalancer compatible Load Balancer or NodePorts)
- Network ingress and egress permissive enough for the kubelet to pull platform containers from the Quix Container Registry.

### Storage
- A storage class capable of handling dynamic provisioning of Persistent Volumes. (nfs with nfs-subdir-external-provisioner, Ceph, Longhorn, EBS/EFS, azurefile, Google filestore, Isilon etc)
- One standard RWX storage class and one standard RWO storage class. We recommend the RWO class to be block storage or NFS storage with very low latency.
- Block storage mount points avialable on the nodes for services that require it, at least 16 mount points (this is relevant for small test clusters in public cloud)

### Permissions
- The ability to create custom certificates for the subdomain Quix platform will be deployed into
- Permissions to programmatically change the DNS hosted zone for ACME certificate management

## Kubernetes cluster recommended requirements

- Everything in the minimum requirements
### Scaling
- Three separate control plane nodes (or managed control plane) for high availability and easy maintenance.
- A nodepool sufficient for your requirements, but at least 40 CPU cores and 200GB memory total.

### Software
- Kubernetes version 1.29 or later.
- Maximum pod count set to 250 on nodes powerful enough to take the workload

### Networking
- A Load Balancer capable of exposing a LoadBalancer type service (such as AWS ELB or MetalLB)

### Storage
- Optional: additional Premium RWO storage class
- Optional: additional Standard RWO storage class with locally mounted disks (EBS, managed-csi or similar block storage)
- 20 or more available block storage mount points, depending on size and performance requirements and thus the tuning of the Quix platform

!!! warning

    You may re-use existing services, such as Kafka and MongoDB. If you do not, Quix BYOC will install its own versions of these services. Your underlying infrastructure must be able to run these services, which may require enabling AVX, AVX2 and XSAVE instructions on your CPU, or passed through for it in the Hypervisor. This is not the default in some hypervisors and may be the source of issues.

## Support requirements

For the purposes of installing Quix BYOC Enterprise Edition, an engineer comfortable with using kubectl (or Lens) and the linux terminal is required to attend the initial setup. We also provide live support during this.

You are in full ownership and control of the underlying infrastructure running the platform, therefore scaling, patching and other administrative tasks will be performed by your team to your requirements and specifications. We are always happy to help with any issues you may encounter and will be delivering container and application level security patches to the Quix Platform.

## Next steps

Follow the [installation](installation.md) process to find out how to install the Quix Platform on your Kubernetes cluster.

[^1]: 
    Quix are excited about ARM64 CPUs as well! They are fast becoming a serious contender for building distributed computational platforms, especially on AWS. Unfortunately, some of our dependencies are not yet available for aarch64 and therefore prevent us from shipping Quix for aarch64 Kubernetes clusters. When we do, this document will change. You are welcome to run the installation scripts and the container delivering them on aarch64 computers from the native multi-arch image.

[^2]:
    Quix recommends nodes at least 16GB of RAM each node to err on the safe side. Quix has been tested on 3 x 8GB nodes and has been found to work well. This however leaves very little room for your other workloads and isn't a production experience we wish for you to have with Quix.
