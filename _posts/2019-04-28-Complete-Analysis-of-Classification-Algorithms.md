---
title: "Complete Analysis of Classification Algorithms"
date: 2019-04-28
tags: [Classification, Data Science, Machine Learning, Logistic Regression, Classification Trees, Bagging, Random Forest, Boosting, Support Vector Machine, Bootstrapping, k-Fold Cross Validation]
header:
  image: "/images/ucdblue.JPG"
categories: DataScience
---

**Abstract:**

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


## Results

The mentioned models are built on the data by three approaches. In the first approach, the data are split randomly into training and test data. 75% of observations belong to the training data and the rest 25% belong to the test data. The model is trained using the training data and the back pain classes of the test data are predicted. Then the accuracy is computed. The results are tabulated in Tab.1 for training data and test data.

| Model                     	| Training Data Accuracy | Test Data Accuracy |
| --------------------------- |------------------------| -------------------|
|Logistic Regression          |	100                    |	88.42             |
|Classification Trees         |	93.68                  |	87.37             |
|Bagging                      |	95.44                  |	90.53             |
|Random Forest                |	100                    |	89.47             |
|Boosting – Breiman           |	100                    |	89.47             |
|Boosting – Freund            |	100                    |	89.47             |
|Boosting – Zhu               |	100                    |	95.79             |
|SVM – Radial Basis kernel    |	97.89                  |	90.53             |
|SVM – Polynomial kernel      |	98.59                  |	85.26             |
|SVM – Linear kernel          |	98.59                  |	85.26             |

Tab. 1

In the second approach, the bootstrapping is carried out. The sampling with replacement is done on the data and the training data is prepared. The rest of the observations form our test data. The models are built using training data and the predictions are made on the test data. The accuracies are tabulated in Tab. 2.

| Model	                      | Training Data Accuracy | 	Test Data Accuracy|
| --------------------------- |------------------------| -------------------|
| Logistic Regression	        | 97.89	                 | 92.91              |
| Classification Trees        | 93.16	                 | 84.11              |
| Bagging                     | 94.47                  | 89.40              |
| Random Forest	              | 100	                   | 94.70              |
| Boosting – Breiman        	| 100	                   | 92.71              |
| Boosting – Freund           |	100	                   | 94.04              |
| Boosting – Zhu            	| 100                    | 89.51              |
| SVM – Radial Basis kernel 	| 98.16                  | 93.38              |
| SVM – Polynomial kernel	    | 99.21                  | 89.40              |
| SVM – Linear kernel       	| 99.21	                 | 89.40              |

Tab. 2


In the third approach, the data set is split into a K=10 number folds where each fold is used as a testing set iteratively. In each iteration, the 9 remaining folds form our training data. In each iteration, the models are built with training data and the predictions are made on the test data. All the K accuracies are computed for each model. Finally the average of the K accuracies are computed for each model. These results are tabulated in the Tab. 3.

The area under the curve of the ROC curves are then calculated. The area of 0.5 represents a random model with little / no predicting power and the area of 1.0 represents the full predicting capacity. The areas under the curve are recorded for the mentioned algorithms with data split in three approaches in Tab. 4.

| Model	                        | k-Fold CV Accuracy |
|-------------------------------| -------------------|
| Logistic Regression	          | 90.49              |
| Classification Trees	        | 91.22              |
| Bagging	                      | 90.94              |
| Random Forest	                | 92.39              |
| Boosting – Breiman	          | 93.27              |
| Boosting – Freund	            | 90.64              |
| Boosting – Zhu	              | 92.11              |
| SVM – Radial Basis kernel	    | 93.56              |
| SVM – Polynomial kernel	      | 93.57              |
| SVM – Linear kernel	          | 93.57              |

Tab. 3


| Model	                      | AUC: Data Splitting	| AUC: Bootstrapping | AUC: k-Fold CV |
| ----------------------------|---------------------|--------------------|----------------|
| Logistic Regression	        | 0.8764600           |	0.9285360	         | 0.9063154      |
| Classification Trees        |	0.8714349	          | 0.8379249          | 0.9152690      |
| Bagging                     |	0.9055258           |	0.8938283	         | 0.9169252      |
| Random Forest	              | 0.8941622           |	**0.9459750**      | 0.9261950      |
| Boosting – Breiman          |	0.8926025	          | 0.9266547          | 0.9338215      |
| Boosting – Freund           |	0.8941622	          | 0.9382826          | 0.9054083      |
| Boosting – Zhu              |	**0.9541554**	      | 0.8958824	         | 0.9204418      |
| SVM – Radial Basis kernel	  | 0.9055258           |	0.9287120	         | 0.9360320      |
| SVM – Polynomial kernel     |	0.8533868          	| 0.8919499	         | **0.9380887**  |
| SVM – Linear kernel	        | 0.8533868           | 0.8919499	         | **0.9380887**  |

Tab. 4


## Discussion

We will now go through the accuracies and the area under the curve of the ROC curves of the models built in the three approaches. In the first approach, the data is split into training data and test data. The accuracies of training data and the test data are recorded in Tab. 1. It is evident that the training data accuracies for all the models are higher than the accuracies of the test data. We have logistic regression, random forest, boosting by Breiman, boosting by Freund and boosting by Zhu models with 100% accuracy. Having mentioned that, we cannot fully rely on these accuracies since the training data itself was taken for predicting the accuracies. The rest of the models have good accuracies of above 90% for the training data.

When we move to the test data, we notice that the accuracies are not as high as the training data. We have the Boosting by Zhu model with highest accuracy of 95.79%. This accuracies can be relied on, since the fresh data is being used for prediction. With the exception being bagging, boosting by Zhu and SVM with radial basis kernel, all the remaining models have accuracies below 90%.

Coming to the area under the curve of the ROC curves with data splitting, these are recorded in Tab. 4. We notice that these areas are quite close to the test data accuracies. As agreed by the test data accuracies, the highest area of 0.95 corresponds to the Boosting model by Zhu which is built on SAMME algorithm.

In the second approach which samples data by replacement, the recorded training data accuracies and the test data accuracies are recorded in Tab. 2. It is evident that the random forest, boosting by Breiman, boosting by Freund and boosting by Zhu models performed exceptionally well with 100% accuracy on the training data since the same data is used for building the model. As with the first approach, the rest of the models have good accuracies of above 90%.

When we look at the test data accuracies of these models, we notice that the highest accuracy corresponds to the random forest model with 94.7%. We also notice that the accuracies of test data are lower than that of the training data. This behaviour is similar to the first approach. The test data acts as Out Of Box observations. So, the accuracies will not be as high as the training data accuracies. Compared to the test data accuracies of the first approach, we see a significant increase in test data accuracies of this bootstrapping approach, where most of the models achieve accuracies higher that 90%.

The areas under the ROC curves for bootstrapped data are shown in the Tab. 4. While we notice significant improvisation in the areas compared to the first approach, we see that random forest model has the highest area under the curve of 0.945. As earlier, accuracy and area under the curve agree that the random forest is the best model when bootstrapping is incorporated.

Coming to the third approach, the accuracies are recorded in Tab. 3. In this approach, k-Fold cross validation is done on the data with 10 data folds. In each iteration the fold becomes the test data and the rest of the data forms the training data. The accuracies of the test data are recorded here. We see that the accuracies of all the models are above 90%, indicating that the data is fit very well by the models. Though all the models have accuracies above 90%, the highest accuracy is 93.57%. This belongs to the support vector machine with polynomial and linear kernels. Both polynomial and linear kernels have the exact same accuracy when modelled by k-Fold cross validation.

The areas under the ROC curves are tabulated for k-Fold cross validation in Tab. 4. In agreement with the accuracies, the highest area under the curve correspond to SVM with polynomial and linear kernels. Also, the areas under the ROC curves for all models are more than 0.9 indicating that the models fitted the data well.

We have three different models with highest performances in the three approaches. This inconsistency is due to the random data being take for the training and the test data. The most reliable approach here is the k-Fold cross validation. This is because, we iteratively form different training and test data with each fold. Although it take quite some time to run the k-Fold cross validation (around 15 minutes), the results are highly reliable.

Also, it is evident that the highest  accuracies decrease as we move from first approach (95.79%) to second approach (94.7%) and finally the third approach (93.57%). This behaviour is also observed in the areas under the ROC curves, where the highest area in first observed is 0.95. In the second and third approaches, the areas under the curve are 0.94 and 0.93 respectively.

In the first approach, the accuracies had more variation throughout the various models (85% to 95%). Coming to the second approach, this variation was narrowed by bootstrapping the data. The different models have accuracies between 89% and 95%. With the k-Fold cross validation as our third approach, the accuracies of all models converged between 90% and 94%. This behaviour is also observed in the areas under the ROC curves. The first approach had areas between 0.85 and 0.95. The third approach narrowed the areas between 0.9 and 0.94.

## Conclusion

We examined how logistic regression, classification trees, bagging, random forest, boosting with AdaBoost.M1 by Breiman, boosting with AdaBoost.M1 by Freund and boosting with SAMME by Zhu, support vector machine with radial basis, polynomial and linear kernels models the data differently. The built the model in three approaches: by splitting data as test and training set, by bootstrapping and by k-Fold cross validation. To assess the performance, we used accuracy and area under the ROC curve metrics.

We observed that in the first approach the boosting with SAMME algorithm performed the best with accuracy of 95.79% and area under RC curve of 0.95. Moving to the bootstrapping approach, random forest performed the best with accuracy of 94.7% and area under the ROC curve of 0.94. In the k-Fold cross validation approach, support vector machine with polynomial and linear kernels performed the best with accuracies of 93.57% and areas under the ROC curve of 0.938.

In this analysis, k-Fold cross validation approach is most reliable since we build the models iteratively with different sets of training and test data. In this approach, support vector machine with polynomial and linear kernels performed the best with accuracy of 93.57% and area under the ROC curve of 0.938.


## References

*	Hewa, K. (2018). K-Fold Cross Validation. [Retrieved from Medium.com](https://medium.com/datadriveninvestor/k-fold-cross-validation-6b8518070833)

*	Solutions, S. (2018). What is Logistic Regression? [Retrieved from Statistics Solutions](https://www.statisticssolutions.com/what-is-logistic-regression/)

*	Seif, G. (2018). A Guide to Decision Trees for Machine Learning and Data Science. [Retrieved from towardsdatascience.com](https://towardsdatascience.com/a-guide-to-decision-trees-for-machine-learning-and-data-science-fe2607241956)

*	Brownlee, J. (2016). [Retrieved from machinelearningmastery.com](https://machinelearningmastery.com/bagging-and-random-forest-ensemble-algorithms-for-machine-learning/)

*	Donges, N. (2018). The Random Forest Algorithm. [Retrieved from towardsdatascience.com](https://towardsdatascience.com/the-random-forest-algorithm-d457d499ffcd)

*	D'Souza, J. (2018). A Quick Guide to Boosting in ML. [Retrieved from medium.com](https://medium.com/greyatom/a-quick-guide-to-boosting-in-ml-acf7c1585cb5)

*	Patel, S. (2017). Chapter 2 : SVM (Support Vector Machine) — Theory. [Retrieved from medium.com](https://medium.com/machine-learning-101/chapter-2-svm-support-vector-machine-theory-f0812effc72)

*	Brownlee, J. (2018). [Retrieved from machinelearningmastery.com](https://machinelearningmastery.com/a-gentle-introduction-to-the-bootstrap-method/)
