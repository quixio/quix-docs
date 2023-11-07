# Cloud Security Principles

## Introduction

Quix's mission is to free developers to build, test and run next-gen applications without the hassle of managing complex technologies. We believe that we must make your data secure and that protecting it is one of our most important responsibilities. We're committed to being transparent about our security practices and helping you understand our approach.

Quix includes a robust set of security and data protection product features that give you the control, visibility and flexibility you need to manage all your security challenges, without compromising agility.

This document outlines how Quix helps customers configure, deploy and use the cloud service securely.

## Authentication

Securing your information starts with identity controls, no matter where your users are located. Quix enables you to manage users, streamline authentication using your identity provider, and assign roles. We give you the solutions to ensure that only the right people can access your company's information in Quix.

OAuth is the protocol Quix uses when you auth against our platform using Google or your preferred Identity provider. Customers are responsible for integrating and managing their identity provider (for single sign-on and provisioning) as well as assigning roles in Quix.

Data in flight is protected with Authentication (OAuth 2.0 tokens, SASL, SSL Certificates), Authorisation (RBAC) and Encryption (TLS 1.2).

### Two-Factor Authentication

Multi-factor authentication splits channels of an authentication process, rendering just one compromised system or device to be insufficient for use for unauthorised access. It is a widely used technique with a proven record.

Customers may use Two-factor authentication to access Quix. This is welcome and encouraged, but it needs to be enforced. To request it you can write to [support@quix.io](mainto:support@quix.io).

## Data security

By default, Quix encrypts data at rest and data in transit as part of our foundational security controls. We also provide tools that give you even further protection and control.

### Encryption

Our preferred encryption is TLS 1.3, with 1.2 allowed as a fallback. We don't support TLS 1.1 or older in any part of our platform.

Older cyphers are cryptographically unsafe. We do not serve or support unsafe and weak cyphers, ensuring that our posture is in line with your standards and expectations.

#### Encryption of Data in Flight

Your connection to Quix is secured by the latest in TLS. We also use certificates to encrypt our in-flight traffic internally.

Your traffic to and within Quix is very important to us, and that is why we keep it safe. TLS and the use of certificates at every surface where communication between computers happens ensures we drastically reduce attack vectors and the risk of data falling into the wrong hands.

#### Encryption of Data at Rest

Customer data at rest resides in Azure and AWS. Any persisted data is encrypted with keys managed in a safe and secure manner either by our Cloud Provider vendors or by Quix personnel, adhering to our access policies and procedures.

Data saved on disk is sensitive information and we always treat it as such.

## Separation of Concerns

To give you even further protection and control, we architected Quix on independent environments and firewalls. Logical separation ensures that customers can only access their own data and no one else's: potential malicious usage of the service will not affect the service or data of another.

### Environments

Environments at Quix are hermetically sealed with no reused components between them. Development and Production environments are distinct entities with no cross-talk.

The separation of these concerns enables us to deliver a Quix platform experience in a way that minimizes the chance of errors and mistakes and is a well-supported industry standard of software delivery.

In case you choose to host Quix on your platform, we recommend that you follow the same practices.

### Firewalls

Firewalls in cloud-native infrastructure and applications work differently from how they used to in the days of monolithic apps running on bare metal servers stacked neatly in a server room.

All networking technologies utilised during the delivery of the Quix Platform follow the principle of least privilege; we configure our security groups to only allow the minimum necessary traffic, and we configure our access lists to do the same. We follow industry best practices in architecting these safeguards and constantly monitor and audit them.

## Employee access policies

Quix employees access our key systems with multi-factor authentication enforced. This helps us verify the identity of the person accessing these services and reduce the chance of unauthorised access by way of compromised channels or devices.

At Quix, systems that make up the Quix platform are only ever accessed when necessary and only by authorised personnel. We take our commitment to security and confidentiality seriously.

Restricted access ensures only colleagues in the necessary roles can work on the underlying software and infrastructure stack. This, combined with audit trails built right into our processes and tooling helps us maintain the principle of least privilege, an important security practice.

## Compliance

Quix is ISO-27001 certified, a widely recognised standard that sets forth the criteria for an information security management system (ISMS).

### ISO-27001

This standard provides a structured approach for implementing, operating, monitoring, and improving an ISMS.

Quix adheres to ISO 27001, ensuring that the company applies systematic methodologies and a solid framework to identify, manage, and reduce information security risks. Certification in this standard indicates Quix's commitment to establishing international best practices in information security.

For Quix's clients, the ISO 27001 certification assures a dependable security framework. This certification signals our dedication to data protection and the strength of our risk management practices, aiming to secure client data against potential threats.

You can verify the validity of our ISO certificate by entering the certificate number 251068 using the [certification verification link](https://www.british-assessment.co.uk/verify-certification/).
