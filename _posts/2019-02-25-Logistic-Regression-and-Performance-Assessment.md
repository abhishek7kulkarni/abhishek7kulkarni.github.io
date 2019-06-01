---
title: "Logistic Regression and Performance Assessment"
date: 2019-02-25
tags: [Logistic Regression, Regression, Data Science, Machine Learning]
header:
  image: "/images/ucdblue.JPG"
categories: datascience
---
Let us explore the Titanic Dataset and use Logistic Regression to explore the survival of passengers on the Titanic. The dataset includes 1313 rows corresponding to the people that boarded the Titanic. We have 10 columns of which, we are interested in passengers’ Age, Gender, Class and Survival State. Of these 4 variables, Gender, Class and Survival State are categorical and Age is numeric.

In our dataset, 51% of Age values are missing. Since this is quite a big share of our observations, it would be unwise to delete the rows with missing values. So, we will impute these missing values for Age. For this, we used Random Forest method in mice library. The resulting Age variable had roughly the similar means and boxplots as before, suggesting that the core statistics we not affected by the imputation. Since we intend to predict the survival state, which is a binary categorical variable, this dataset is perfect for Logistic Regression Analysis. If the response variable had more than 2 factors, we would have to use Multinomial Regression.

Prior to analysis in Logistic Regression, let us check if there are any significant interactions in our predictor variables. In this analysis, we included the possible combinations of interactions between Passenger Class, Age and Gender. We introduced these interaction terms in our glm function along with the individual predictors: pclass:age, pclass:sex and age:sex. Since the interactions pclass:age and age:sex were not significant (odds ratios were close to 1 and coefficients were marginally insignificant), we excluded these interactions and refit the model. In addition, we computed the Odds Ratios and Confidence Intervals for the coefficients. These values are shown in Tab. 1:


Tab. 1

Firstly, it is notable that the categorical coefficients are appended with a particular category, with the first factor as a reference. For instance, the coefficients of pclass (Passenger’s Class) expressed as pclass2nd is with respect to pclass1st as base. It is evident that the Intercept, pclass2nd, pclass3rd, age, sexmale and pclass3rd:sexmale are significant terms. Let us now understand these coefficients in terms of the odds ratios, which are the exponentiated coefficients. Since we have categorical predictors, our logistic regression equation changes according to the corresponding Beta values for each factor. For example, for a male second class passenger, the equation is:
log⁡(P(Survival)/P(Death) )=(3.6750-0.9517-3.4206-0.3687)-0.0253〖age〗i  
Similarly, for a female first class passenger, the equation is:
log⁡(P(Survival)/P(Death) )=(3.675-0.9517)-0.0253〖age〗i

The intercept value of 3.675 and odds ratio of 39 indicates that the odds of surviving the Titanic disaster is 39 when all other variables are zero. This means that age is 0 (hypothetically), gender is female and Class is 1st. Regarding the passenger classes, holding all other predictors at a fixed value, the odds of surviving on the Titanic for 2nd class passengers over the odds of surviving on the Titanic for 1st class passengers is exp(-0.9517-0.3687) = 0.267 for men and exp(-0.9517)= 0.386 for women. So, the odds are better (3.74 for men and 2.59 for women) in favour of 1st class passengers, when compared with that of 3rd class passengers. So, it is probabilistically worse to have a 2nd class seat than a 1st class seat. Similarly, holding all other predictors at a fixed value, the odds of surviving on the Titanic for 3nd class passengers over the odds of surviving on the Titanic for 1st class passengers is exp(-3.5+1.91) = 0.2 for men and exp(-3.5) = 0.03. The inversions of these are is 5 and 33. So, the odds are better in favour of 1st class passengers, when compared with that of 3rd class passengers. In essence, the odds are better for a 1st class passenger than a second class passenger, which in turn is better that the 3rd class.

We will now see how age is a predictor in our analysis. The coefficient for age says that, holding passenger class (1st) and gender (female) at a fixed value, we will see that the odds of surviving for a one-unit increase in age since exp(-0.0253) = 0.9750. Holding all other predictors at a fixed value, the odds of surviving for women over the odds of surviving for men is 6.51 (1/0.1536). So, the possibilities of surviving are definitely better for women than men in 1st class.

We will now have a look at the graph of Residuals vs. Predicted values. We extracted the residuals and plotted the predicted probabilities against them. From the graph in Fig. 1, it follows that the red dots that follow a curved line corresponds to the survival case and the blue line signifies the cases where the individual did not survive. We then fitted a local regression using loess function and depicted as a black line. We also computed the confidence intervals as segments as indicated by the green vertical lines. It is worth noting that we have a clear bifurcation between the red and blue lines and it follows a standard log line. Also, we have very few points between predicted values between 0.6 and 0.8. The black local regression line is almost follows the 0 residual line which indicates that we have a good fit. The confidence intervals are very narrower.


Fig. 1 						Fig. 2

Let us assess goodness of fit for our logistic regression model. The goodness of fit methods generally compare the observed value of the response variable to the expected value under the fitted model. We used Hosmer and Lemeshow’s test here. The output is shown in Fig. 2. The observed and expected counts grouped in 10 groups for Survival = 1 and Survival = 0 and shown along with the Pearson residuals. By the Chi-square and P-values, we have a good fit.

We will now assess the performance of our model. The predicted and true values are cross tabulated and several Performance Measures are computed with varying the threshold: Sensitivity, Sensitivity, Precision, Negative Predictive Value, Accuracy and False Positive Rate. All these performance measures are computed with varying the threshold tau. The first five observations are shown in Tab. 2.

Threshold	Sensitivity	Specificity	Precision	NPV	Accuracy	FPR
1.000	0.000	1.000		0.658	0.658	0.000
0.974	0.002	0.998	0.500	0.658	0.658	0.001
0.972	0.004	0.998	0.667	0.658	0.658	0.001
0.971	0.006	0.998	0.750	0.659	0.659	0.001
0.969	0.008	0.998	0.800	0.659	0.660	0.001
Tab. 2

The main aim here is to find the best cut-off threshold that maximizes the predicting capacity of our model. We choose the best threshold by maximizing the sum of Sensitivity and Specificity. For this, we plotted the sum of Sensitivity and Specificity vs the threshold as shown in Fig. 3 and fund that the best threshold is 0.318.

Fig. 3 					Fig. 4
Now, we will look at the Receiver Operator Characteristic (ROC) curves that plot False Positive Rate against True Positive Rate, as depicted in Fig. 4. A model that predicts at chance will have an ROC curve that looks like the diagonal grey dotted line. That is not a discriminating model. The further the curve is from the diagonal line, the better the model is at discriminating between positives and negatives in general. The blue dotted line indicates a perfect model with full predicting capability. Since we have considerably gone further from the diagonal, our model has considerably good predicting capacity. The Area Under the Curve (AUC) is 0.8426. The red point corresponds to the maximized threshold. This pint is the closest on the curve from the point (0, 1). Thus, we have maximized the predicting power of our model with the given data.

To sum up, the Titanic dataset is perfect for Logistic Regression analysis. We looked at how numerical and categorical predictors influence the odds ratio. We evaluated how interactions between the predictors decide the odds ratios for different factored variables. We gained several insights from the model such as,
	The odds are better for a 1st class passenger than a 2nd class passenger, which in turn is better that the 3rd class.
	As age increases, for every 1 unit increase in age, the odds of survival decreases by 0.975.
	Overall, women have higher chances of survival than men.
We assessed our model with performance and our model has a considerably good predicting capacity. We maximized the predicting power of the model by choosing the optimal threshold of 0.318, which is the best threshold for the given data model.
