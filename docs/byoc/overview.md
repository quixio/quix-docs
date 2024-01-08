# Bring Your Own Cluster

BYOC is Quix, packaged to run on your own Kubernetes cluster. Bring Your Own Cluster, control its resources and make them work efficiently by deploying the Quix Platform to it.

!!! Info "Glossary"
    **Kubernetes** is a container orchestration platform tailored to offer great flexibility and power. You can run Kubernetes on a variety of different computers ranging from your laptop to hundreds of Virtual Machine nodes in data centres distributed around the world.

The driving force behind the design of **Quix BYOC Enterprise Edition** was to enable the installation of the Quix Platform in as many different configurations of Kubernetes as technology allows. This enables us to offer Quix on a range of platforms, from minimal-viable clusters functioning as pilot projects on spare bare-metal hardware, to extensive production clusters managed within AKS, EKS, GCP, Proxmox and similar environments. These advanced setups can include hundreds of CPU cores and terabytes of RAM, utilize container engines off the beaten path and provide storage through a multitude of means.

We have developed Quix BYOC to deliver a safe, opinionated default configuration, designed to ensure our platform operates effectively across a diverse range of Kubernetes cluster setups. Additionally, it is crafted for easy integration with existing components and technologies you currently employ and wish to continue using.

We have also made a conscious effort to ensure Quix works well with clusters that already run workloads. We do not require a dedicated empty cluster for Quix to run on, although you may want to consider operating BYOC in its own environment for a variety of reasons.



## Next steps

See the requirements of the [Quix platform](requirements.md)