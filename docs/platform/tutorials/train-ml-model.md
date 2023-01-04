# How to train an ML model

In this article, you will learn how to manage ML model training with
Quix. In this example, we will train a model to predict car braking on a
racing circuit 5 seconds ahead of time.

## Watch
If you prefer watching instead of reading, we've recorded a short video:
<iframe width="560" height="315" src="https://www.youtube.com/embed/8h0jm0q_0PA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Why this is important

With the Quix platform, you can leverage historic data to train your
model to react to data coming from source with milliseconds latency.

## End result

At the end of this article, we will end up with a **pickle file**
trained on historic data.

![](../images/tutorials/train-and-deploy-ml/train.png)

## Preparation

You will need Python3 installed.

You’ll need some data stored in the Quix platform. You can use any of
our Data Sources available in the samples Library, or just follow the
onboarding process when you [sign-up to Quix](https://portal.platform.quix.io/self-sign-up/){target=_blank}

!!! tip 
	
	If in doubt, login to the Quix Portal, navigate to the Library and deploy "Demo Data - Source".
	
	This will provide you with some real-time data for your experiments.

You’ll also need a Jupyter notebook environment to run your experiments
and load data for training. Please use ["How to work with Jupyter notebook"](../../how-to/jupyter-nb).

### Install required libraries

``` shell
python3 -m pip install seaborn
python3 -m pip install sklearn
python3 -m pip install mlflow
python3 -m pip install matplotlib
```

!!! note 
	
	If you get an 'Access Denied' error installing mlflow try adding '--user' to the install command or run the installer from an Anaconda Powershell Prompt (with --user)

!!! tip

	If you don’t see **Python3** kernel in your Jupyter notebook, execute the following commands in your python environment: 
	``` python
	python3 -m pip install ipykernel
	python3 -m ipykernel install --user
	```

### Necessary imports

To execute all code blocks below, you need to start with importing these
libraries. Add this code to the top of you Jupyter notebook.

``` python
import math
import matplotlib.pyplot as plt
import mlflow
import numpy as np
import pandas as pd
import pickle
import seaborn as sns

from sklearn import tree
from sklearn.model_selection import KFold
from sklearn.metrics import confusion_matrix, accuracy_score
from sklearn.tree import DecisionTreeClassifier
```

## Training ML model

### Getting training data

The Quix web application has a python code generator to help you connect your Jupyter notebook with Quix.

You need to be logged into the platform for this:

1.  Select workspace (you likley only have one)

2.  Go to the Data Explorer

3.  Add a query to visualize some data. Select parameters, events, aggregation and time range

	!!! note
		Select `Brake`, `Motion_WorldPositionX`, `Steer`, `Speed`, `Gear` parameters and turn off aggregation!

4.  Select the **Code** tab

5.  Ensure **Python** is the selected language

![](../images/tutorials/train-and-deploy-ml/connect-python.png)

Copy the Python code to your Jupyter notebook and execute.

![](../images/tutorials/train-and-deploy-ml/jupyter-results.png)

!!! tip

	If you want to use this generated code for a long time, replace the temporary token with a **PAT token**. See [authenticate your requests](../../apis/data-catalogue-api/authenticate.md) for how to do that.

### Preprocessing of features

We will prepare data for training by applying some transformation on the downloaded data.

Execute this in your notebook:

``` python
## Convert motion to continuous values
df["Motion_WorldPositionX_sin"] = df["Motion_WorldPositionX"].map(lambda x: math.sin(x))
df["Motion_WorldPositionX_cos"] = df["Motion_WorldPositionX"].map(lambda x: math.cos(x))
```

#### Preprocessing of label

Here we simplify braking to a boolean value.

``` python
## Conversion of label
df["Brake_bool"] = df["Brake"].map(lambda x: round(x))
```

### Generate advanced brake signal for training

Now we need to shift breaking 5 seconds ahead to train the model to predict breaking 5 seconds ahead.

``` python
## Offset dataset and trim it
NUM_PERIODS = -round(5e9/53852065.77281786)

df["Brake_shifted_5s"] = df["Brake_bool"].shift(periods=NUM_PERIODS)
df = df.dropna(axis='rows')
```

Lets review it in plot:

``` python
plt.figure(figsize=(15, 8))
plt.plot(df["Brake_shifted_5s"])
plt.plot(df["Brake_bool"])
plt.legend(['Shifted', 'Unshifted'])
```

![](../images/tutorials/train-and-deploy-ml/brake-shifted.png)

### Fit, predict and score a model

Calculate class weighting in case we gain any accuracy by performing
class balancing.

``` python
Y = df["Brake_shifted_5s"]

cw = {}
for val in set(Y):
    cw[val] = np.sum(Y != val)

print(cw)
```

#### Experiment

In the following code snippet we are executing an experiment using
**MLflow**. Notice in last 3 lines that each experiment is logging
**MLflow** metrics for experiments comparison later.

``` python
model_accuracy = pd.DataFrame(columns=[
    'Baseline Training Accuracy',
    'Model Training Accuracy',
    'Baseline Testing Accuracy',
    'Model Testing Accuracy',
])

kfold = KFold(5, shuffle=True, random_state=1)

with mlflow.start_run():
    class_weight = None
    max_depth = 5
    features = ["Motion_WorldPositionX_cos", "Motion_WorldPositionX_sin", "Steer", "Speed", "Gear"]

    mlflow.log_param("class_weight", class_weight)
    mlflow.log_param("max_depth", max_depth)
    mlflow.log_param("features", features)
    mlflow.log_param("model_type", "DecisionTreeClassifier")

    X = df[features]
    decision_tree = DecisionTreeClassifier(class_weight=class_weight, max_depth=max_depth)

    for train, test in kfold.split(X):
        X_train = X.iloc[train]
        Y_train = Y.iloc[train]
        X_test = X.iloc[test]
        Y_test = Y.iloc[test]

        # Train model
        decision_tree.fit(X_train, Y_train)
        Y_pred = decision_tree.predict(X_test)

        # Assess accuracy
        train_accuracy = round(decision_tree.score(X_train, Y_train) * 100, 2)
        test_accuracy = round(decision_tree.score(X_test, Y_test) * 100, 2)

        Y_baseline_zeros = np.zeros(Y_train.shape)
        baseline_train_accuracy = round(accuracy_score(Y_train, Y_baseline_zeros) * 100, 2)
        Y_baseline_zeros = np.zeros(Y_test.shape)
        baseline_test_accuracy = round(accuracy_score(Y_test, Y_baseline_zeros) * 100, 2)

        model_accuracy = model_accuracy.append({
            "Baseline Training Accuracy": baseline_train_accuracy,
            "Model Training Accuracy": train_accuracy,
            "Baseline Testing Accuracy": baseline_test_accuracy,
            "Model Testing Accuracy": test_accuracy
        }, ignore_index=True)

    mlflow.log_metric("train_accuracy", model_accuracy["Model Training Accuracy"].mean())
    mlflow.log_metric("test_accuracy", model_accuracy["Model Testing Accuracy"].mean())
    mlflow.log_metric("fit_quality", 1/abs(model_accuracy["Model Training Accuracy"].mean() - model_accuracy["Model Testing Accuracy"].mean()))
```

We review experiment model accuracy:

``` python
model_accuracy
```

|       |                            |                         |                           |                        |
| ----- | -------------------------- | ----------------------- | ------------------------- | ---------------------- |
| Depth | Baseline Training Accuracy | Model Training Accuracy | Baseline Testing Accuracy | Model Testing Accuracy |
| 0     | 88.97                      | 97.93                   | 86.49                     | 86.49                  |
| 1     | 87.59                      | 97.24                   | 91.89                     | 83.78                  |
| 2     | 89.04                      | 96.58                   | 86.11                     | 88.89                  |
| 3     | 88.36                      | 97.95                   | 88.89                     | 83.33                  |
| 4     | 88.36                      | 97.95                   | 88.89                     | 80.56                  |

Table with model accuracy preview

#### Prediction preview

Let’s plot actual vs predicted braking using a trained model:

``` python
f, (ax1, ax2) = plt.subplots(2, 1, sharey=True, figsize=(50,8))
ax1.plot(Y)
ax1.plot(X["Speed"]/X["Speed"].max())

ax2.plot(decision_tree.predict(X))
ax2.plot(X["Speed"]/X["Speed"].max())
```

![](../images/tutorials/train-and-deploy-ml/prediction.png)

### Saving model

When you are confident with the results, save the model into a file.

``` python
pickle.dump(decision_tree, open('./decision_tree_5_depth.sav', 'wb'))
```

!!! tip
 
	Pickle file will be located in folder where jupyter notebook command was executed

## MLflow

To help you with experiments management, you can review experiments in
MLflow.

!!! warning

	MLflow works only on MacOS, Linux or Windows linux subsystem (WSL).

!!! tip

	To have some meaningful data, run the experiment with 3 different `max_depth` parameter.

Let’s leave Jupyter notebook for now and go back to command line and run
MLflow server:

``` python
mlflow ui
```

Select experiments to compare:

![](../images/tutorials/train-and-deploy-ml/experiments.png)

Plot metrics from experiments:

![](../images/tutorials/train-and-deploy-ml/experiments-comparison.png)