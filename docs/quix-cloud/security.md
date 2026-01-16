# Quix Cloud Security

Quix follows the latest best practices in securing your application and its data on our platform. Security and safety is a core tenet of the way we work.


## Encryption

### Encryption

Our preferred encryption is TLS 1.3, with 1.2 allowed as fallback. We don't support TLS 1.1 or older in any part of our platform.

Older ciphers are cryptographically unsafe. We do not serve or support unsafe and weak ciphers, ensuring that our posture is in-line with your standards and expectations.

### Encryption of Data in flight

Your connection to Quix is secured by the latest in TLS. We also use certificates to encrypt our in-flight traffic internally.

Your traffic to and within Quix is very important to us, and that is why we keep it safe. TLS and the use of certificates at every surface where communication between computers happens ensures we drastically reduce attack vectors and the risk of data falling into the wrong hands.

### Encryption of Data at rest

Any persisted data is encrypted with keys managed in a safe and secure manner either by our Cloud Provider vendors, or by Quix personnel, adhering to our access policies and procedures.

Data saved on disk is sensitive information and we always treat it as such.


## Separation of Concerns

### Environments

Environments at Quix are hermetically sealed with no reused components between them. Development and Production environments should always be and are distinct entities with no cross-talk.

The separation of these concerns allows us to deliver a Quix platform experience in a way that minimizes the chance of errors and mistakes and is a well supported industry standard of software delivery.

### Firewalls

Firewalls in cloud native infrastructure and applications work differently from how they used to in the days of monolithic apps running on bare metal servers stacked neatly in a server room.

All networking technologies utilised during the delivery of the Quix Platform follow the principle of least privilege; we configure our security groups to only allow the minimum necessary traffic, and we configure our access lists to do the same. We follow industry best-practices in architecting these safeguards and constantly monitor and audit them.

## Authentication and Authorisation

### Two-Factor Authentication

We access our key systems with multi-factor authentication enforced. This helps us verify the identity of the person accessing these services and reduce the chance of unauthorised access by way of compromised channels or devices.

Customers may also use Two-factor authentication to access Quix. This is welcome and encouraged, but it is not enforced.

Multi-factor authentication splits channels of an authentication process, rendering just one compromised system or device to be insufficient for use for unauthorised access. It is a widely used technique with a proven record.

### Role-Based Access Control

Quix Cloud implements a role-based access control (RBAC) system that allows you to manage what users can do within your organisation. Users are assigned roles at specific scopes (organisation, project, or environment level), providing granular control over access to resources.

For detailed information on user roles and permissions, see:

- [Roles and Permissions](./roles.md) - Understanding user roles, permissions, and access control

### Employee access policies

At Quix, systems that make up the Quix platform are only ever accessed when necessary and only by authorised personnel. We take our commitment to security and confidentiality seriously.

Restricted access ensures only colleagues of the necessary roles can work on the underlying software and infrastructure stack. This, combined with audit trails built right into our processes and tooling helps us maintain the principle of least privilege, an important security practice.

## Certification

### ISO 27001

ISO-27001 details IT security management systems and procedures. 

An ISO-27001 certification is a quick and easy way to judge the general security posture of an organisation. By obtaining this certification soon, we aim to demonstrate our commitment to information security.

Quix is ISO-27001 certified.

### Availability, Data security and Business Continuity

Data loss and outages can have undesired effects on business continuity, which is why we strive for none of either. Our policies outline continuous backup processes with regular validation. We also operate a 24/7/365 platform incident support coverage, meaning that in the unlikely event of something going wrong, we will fix it, day or night.

Our Cloud Provider vendors publish their compliance acknowledgements here: [https://aws.amazon.com/compliance/](https://aws.amazon.com/compliance/)

[https://azure.microsoft.com/en-us/explore/trusted-cloud/compliance/](https://azure.microsoft.com/en-us/explore/trusted-cloud/compliance/)

We continue to build our platform on providers with the most robust history in service availability and data security.

### GDPR

Quix is fully GDPR compliant. [Quix Terms of Service](https://docs.google.com/document/d/e/2PACX-1vQR2soH_l6G9uZqm-aSScC-waD3TcrGYh2fFZYOtCTqGZWfj_aes4Y-GwxszRijRQ/pub) includes a Data Processing Addendum that enacts standard contractual clauses set forth by the European Commission to establish a legal basis for cross-border data transfers from the EU.

## Visibility and Accountability

### Logging and Monitoring

We rely on industry standard tooling to deliver our platform visibility and metrics.

Visibility of the health and reliability of our platforms allows us to respond to incidents quickly and effectively.

### Proven record of Reliability

Our reliability is no secret, our status page [https://status.quix.io/](https://status.quix.io/) is up to date with the availability of our service.

### Responsive

Please contact us with bugs, concerns and anything you would like to share at [devs@quix.io](mailto:devs@quix.io). Your Quix experience is important to us and we welcome your feedback.