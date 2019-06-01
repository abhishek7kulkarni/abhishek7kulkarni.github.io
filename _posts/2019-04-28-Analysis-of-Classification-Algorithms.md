---
title: "Analysis of Classification Algorithms"
date: 2019-02-25
tags: [Classification, Data Science, Machine Learning, Logistic Regression, Classification Trees, Bagging, Random Forest, Boosting, Support Vector Machine]
header:
  image: "/images/ucdblue.JPG"
categories: datascience
---

## Abstract

In this analysis, we have the data pertaining to individuals suffering from back pain. We have many clinical parameters that, in combination, determine the back pain type which is a binary outcome. We will use several classification techniques such as, logistic regression, classification trees, bagging, random forest, boosting and support vector machine to model the outcome.

In addition we form the training and test data by three approaches: splitting data into test and training data, bootstrapping and k-Fold cross validation. Once the models are built, we assess the performance using accuracy and the area under the ROC curve metrics. The goal is to identify which model performs the best in the given approach. We will also analyse which data splitting approaches are more reliable.

## Introduction

Let us explore the Back Pain dataset which contains information about subjects suffering from lower back pain. We have 380 individuals  and 32 numerical and categorical clinical indicators. The clinical parameters include age, gender, pain location, duration of current episode and several medical test scores. Among these indicators, we have the class of the back pain: Nociceptive or Neuropathic. Nociceptive back pain arises from the tissue damage, while Neuropathic pain arises from the defect in the nervous system. It is imperative for a patient to find out what type of back pain he/she is having based on other clinical diagnostics, since a Neuropathic pain is usually more serious, while Nociceptive pain may just be muscle damage.

It becomes compelling to predict the class of back pain based on the clinical parameters. To carry out this, we will utilize several classification techniques to classify the back pain type. The classification techniques include logistic regression, classification trees, bagging, random forest, boosting and support vector machines. We will analyse these algorithms and assess how well the data are fit by the respective models.

## Methods

As part of data pre-processing, we coded the back pain type in binary categories: 0 refers to Nociceptive back pain and 1 refers to Neuropathic back pain. This is done to ensure that the models are built with appropriate arguments. Then, we coded the back pain type as a factor. Then, we looked at the summaries of the variables in our dataset. Out of 380 observations, 207 subjects have Nociceptive back pain and 173 subjects have Neuropathic back pain. Therefore, we have considerably good number of observations of both back pain types. We also checked for any abnormalities in the data. We found that only one observation had PainLocation as ‘Bilat BK’. This may be due to the fact that this is a rare case or we do not have enough observations that would cover all the categories of PainLocation.

We will assess the performances of the models with three approaches. In the first approach, we will split the data in to train data (75%) and test data (25%). We build the model by using the train data, predict the back pain type of test data and assess how well our prediction is. We incorporated this approach since the test data becomes new data that model had no knowledge about. So, the models with high accuracies for this test data can be considered reliable.

In the second approach, we will use bootstrapping (Brownlee, 2018). In this approach, we use sampling with replacement on the data and train our model using this data. Then, the remaining observations are used to predict the back pain type and the model accuracy is computed. The main reasons for going by this approach is to facilitate stability. Bootstrapping is useful for small datasets, as is our case and it proves to be easier to evaluate on unseen data.

In the third approach, we will have a look at the k-Folds cross validation approach (Hewa, 2018). I this approach, the data set is split into a K number of sections/folds where each fold is used as a testing set at some point. In the first iteration, the first fold is used to test the model and the rest are used to train the model. In the second iteration, 2nd fold is used as the testing set while the rest serve as the training set. This process is repeated until each fold of the K folds have been used as the testing set ensuring that each fold is used as a testing set at some point and give stable accuracies.

The accuracies are computed as the ratio between the number of observations for which the model correctly predicts the class and the total number of observations. We will now build the models with mentioned algorithms and check the fit of the models.


### Logistic Regression
This is the appropriate regression analysis to conduct when the dependent variable is dichotomous (binary). (Solutions, 2018) This method not only helps us to predict the outcome class given set of parameters, but also helps us to interpret how the change in a predictor influences the outcome. For instance, holding all other clinical variables constant, the odds of having Neuropathic back pain for every one unit increase in age is 0.94. For this method, we built the model by 3 approaches: splitting test and train data, bootstrapping and k-Fold cross validation and the accuracies are computed in each case.


### Classification Trees
We will analyse the Classification Trees since they are capable of achieving high accuracy in many tasks while being highly interpretable (Seif, 2018). The knowledge learned by a classification tree through training is directly formulated into a hierarchical structure, which can easily be interpreted. A con of classification trees is that high variance is observed. For the sake of this explanation, the classification tree is built using 75% of the dataset. Criterion8 is having the highest Variable Importance. Similar classification trees are built by bootstrapping and k-Fold cross validation approaches.

### Bagging (Bootstrap Aggregation with Classification Trees)
Bagging is a simple and very powerful ensemble method that combines bootstrap and classification trees. Since classification trees have high variance, Bagging will help to reduce the variance for classification trees, since we use it with bootstrapping (Brownlee, 2016). Thus, bagging improves the accuracy by having many bootstrap samples and creating a classification tree. As in standalone classification trees, we can notice that Criterion8 is at the root node proving its variable importance.

### Random Forest
Random Forest builds multiple classification trees and merges them together to get a more accurate and stable prediction (Donges, 2018). Since it uses a different random subset of variables at each split of classification tree, random forest is more versatile. A number of redundant predictors will not influence the stability of the random forests. They increase the predictive power by assigning importance to each predictor. We built the random forest on our dataset using the training observations. It is noticeable that the model diminished the errors in few number of tree iterations. The Neuropathic and Nociceptive classes can be seen.

### Boosting
Boosting is a powerful ensemble method for improving the model predictions of the algorithm. It is a sequential process in which each next model which is generated is added so as to improve a bit from the previous model (D'Souza, 2018). We will be using 3 variants of Boosting: AdaBoost.M1 by Breiman, AdaBoost.M1 by Freund and SAMME by Zhu algorithms. It is noticeable that PainLocation is most important variable. As with other methods, we modelled boosting by test-train splitting, bootstrapping and k-Fold cross validation.

### Support Vector Machine
Given labelled training data, the Support Vector Machine algorithm outputs an optimal hyperplane which categorizes new examples. The learning of the hyperplane in SVM is done by transformation. Kernel function defines inner product in the transformed space (Patel, 2017). It is highly preferred as it produces significant accuracy with less computation power. We will use three different kernels for our analysis: Radial Basis kernel, Polynomial kernel and Polynomial kernel. We have used three different kernels since they greatly influence the model fit. The models with these kernels are built and the accuracies are computed. We will analyse how different kernels influence accuracy.

In addition to accuracy, the area under the curve of the ROC curves will be calculated for each model. The area under the curve represents how much model is capable of distinguishing between classes. We believe that the combination of the accuracy and the area under the curve of the ROC curves provide sufficient metrics to assess model fit of all methods in three approaches.
