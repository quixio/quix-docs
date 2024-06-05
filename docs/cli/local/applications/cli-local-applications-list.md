# quix local applications list

Lists local applications.

**Aliases:** list, ls

**Usage:**

```
quix local applications list [options]
```

**Example Usage** 

When you enter the command without any options:

```
$ quix local applications list
```

A table containing all your local applications is printed:

```
ApplicationId                  | Name                           | Language | Dockerfile | RunEntryPoint | Default File    
-------------------------------|--------------------------------|----------|------------|---------------|-----------------
Event Detection Transformation | Event Detection Transformation | Python   | dockerfile | main.py       | quix_function.py
Starter Source                 | Starter Source                 | Python   | dockerfile | main.py       | main.py         
```