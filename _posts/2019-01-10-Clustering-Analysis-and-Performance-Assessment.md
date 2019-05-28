title: "Clustering Analysis and Performance Assessment"
date: 2018-12-15
tags: [K-Means, K-Medoids, Clustering Analysis, Data Mining, Data Science, Machine Learning]
header:
  image: "/images/liffey.jpg"
---


Let us explore the US Congress Dataset and analyse clustering algorithms to examine if we have any groups of similar observations in data. The dataset consists of sixteen key votes from 1984 by 435 members of congress and their political party. The data contains lots of NA values and is binary (“y” for a ‘Yes’ vote and “n” for a ‘No’ vote). In this analysis, we converted the y/n data to 1/0 values, since it is easier to work with binary factored data.

Since we have 47% of the rows with one or more NA values, it makes sense to impute these NA values rather than removing NA infested rows entirely or considering an NA value as a “No” vote. To impute, we used mice (Multivariate Imputation by Chained Equations) package in R. Here, we imputed by the method of logreg (Logistic Regression) which is suitable for binary data, as is our case.

K-means: A continuous data would be ideal for k-means clustering, since we can visualize the points and the clusters better. Though our data is binary, we will start our analysis with K-means clustering to look for any well-defined groups in US Congress Data. The k-means algorithm is based on the Euclidean distance between the object and the centroid. The clustering that minimizes the objective function is the k-means solution.

The k-means algorithm may give different answers when started with different values, since the starting values are randomly selected. So, to avoid being stuck in a local minimum, we repeatedly started the algorithm with different values (nstart) until we found the minimum ‘Total Within Sum of Squares’ of 1656.9.

We calculated the within group sum of squares (WGSS) for several k values ranging from 1 to 10. The following plot in Fig. 1 shows the relationship:


			Fig. 1						Fig. 2

By this plot, it is evident that beyond k = 2, the reduction of WGSS is not significant and the plot is almost flat. To visualize the clusters, we used fviz_cluster() function from factoextra package. The plot is shown in Fig. 2 with the boundaries for 2 clusters. If we plotted this graph with k = 3, the clusters overlapped with each other. So, we will be considering k = 2 for the further analysis. Though we have marked the boundaries, we do not have distinct boundaries between the clusters and the inter-cluster distance is low. This may be due to binary nature of the data. With two clusters, the corresponding cluster sizes are 232 and 203 respectively. Thus, we have a fair split of data in both the classes.

K-Medoids: We will now explore K-Medoids algorithm and validate if both the algorithms have agreement. We calculated the SWAP vector for a range of values of k (1 through 10) and plotted SWAP with k using different distance metric. We used several distance metrics such as, Euclidean, Manhattan and Binary and our SWAP vs k plots looked similar to each other. As an instance, the SWAP vs k plot for Manhattan distance is shown in Fig. 3. Using different distance measures, it is evident that all of them concurred that we have 2 clusters. But in a similar plot, we used ‘Maximum’ as distance measure and the plot was almost a straight line with negative slope. Since the majority of the distance metrics suggest 2 clusters, we can infer that the K-Medoids validated that we have 2 clusters.


			Fig. 3						Fig. 4

By the cluster plot in Fig. 4, we can interpret that K-medoids found 2 clusters similar to the Kmeans algorithm. It can be seen that the boundaries of 2 clusters intersect suggesting that the distance between 2 clusters is very less.

Since we are introduced to several distance measures here, let us analyse the efficiency of these distance measures in K-Medoid algorithm, to find the best distance measure for our dataset. For this, we cross-tabulated the 2 clusters of predicted cluster membership, with the 2 actual cluster membership (Democrats and Republicans). Then, we calculated the misclassification rate as the ratio between misclassified and total data points. The results are tabulated in Tab. 1.

Distance Metric	Misclassification Rate
Binary	0.1333
Euclidean	0.1425
Manhattan	0.1425
Maximum	0.3517
Tab. 1

From the table, it is evident that Binary distance is most efficient (13% misclassification rate) for our dataset in predicting the clusters. This is followed by Euclidean and Manhattan at 14% misclassification rate. Maximum distance is the least efficient, with misclassification rate at 35%.

Furthermore, we explored the fclust library which gives the “fuzzy” cluster membership for each observation (between 0 and 1). We used FKM() and FKM.med() functions for Kmeans and K-medoid clustering respectively. For Fuzzy K-means, we found 2 clusters. Surprisingly, we found 3 clusters when we applied K-Medoid algorithm. This is due to the fact that in Fuzzy Medoid, observations are allowed to belong to more than one cluster simultaneously.

To conclude our analysis on K-means and K-Medoids, we found 2 clusters in our dataset in both algorithms with Binary distance being the best distance metric for the K-Medoid algorithm.
Silhouettes: We will now assess how well our clustering is working with the help of silhouette plots. We plotted the silhouettes of K-Means clustering for k = 2 and k = 3. The corresponding silhouette plots are depicted in Fig. 4 an d Fig. 5 respectively.

			Fig. 5						Fig. 6

From the above plots, it is evident that clustering is performed better when there are 2 clusters. Silhouettes are lengthier when we have 2 clusters and we have a fair split of observations, compared to the silhouettes of 3 clusters. For the 3rd cluster, while half of the points are positive, the other half are negative, This alone shows uncertainty in clustering. The negative silhouettes for the 3rd cluster indicate that these points would be more appropriately assigned to another cluster. Thus, our understanding that the data had 2 clusters is strongly confirmed.

Let us have a look at the silhouettes of K-Medoid clusters, with 2 and 3 clusters. The corresponding silhouette plots of 2 and 3 clusters are shown in Fig. 7 and Fig. 8 respectively. In the plot of 2 clusters, the observations are almost equally split between the 2 clusters. While we may have a few negative silhouettes, the average silhouette width is high and silhouettes are dense. In the silhouette plot of 3 clusters as shown in Fig. 8, we do not have a fair split of data. 3rd cluster is having around half of the data, which indicates instability in the clustering. Also, in the 1st cluster, half of the silhouettes are negative, suggesting that these data would more appropriately belong to anther cluster. The 2nd cluster is to steep and average silhouette width is lower. Furthermore, comparing Fig. 5 and Fig. 7, we can notice that the average silhouettes are greater for K-means than that of K-Medoids suggesting that K-means is better fit for our dataset.

Fig.7						Fig. 8
Rand Index: This metric is used to measure the degree of agreement between two clusterings, with values ranging from 0 to 1. The adjusted Rand Index ranging from -1 to +1 gives the metric corrected for agreement by chance. In our analysis, we fed the clustering results of K-Means and K-Medoids algorithms to the classAgreement() function which calculates this metric.
K	Rand Index	Adjusted Rand Index
2	0.9332	0.8665
3	0.7444	0.4505
Tab. 2

We calculated Rand Index and Adjusted Rand Index for K = 2 and K = 3. The values are tabulated in Tab. 2. It is clear that the Rand Index and Adjusted Rand Index values are very much higher in the cases of K = 2. This indicates that both the clustering algorithms together suggest that we have 2 clusters, as also indicated by the silhouettes. We will now look at the tabulation (Tab. 3) of Rand Index and Adjusted Rand Index values for different distance measures used in K-Medoids clustering.

Distance	Rand Index	Adjusted Rand Index
Binary	0.9817	0.9635
Euclidean	0.9332	0.8665
Manhattan	0.9332	0.8665
Maximum	0.5074	0.0124
Tab. 3

It follows that Binary distance has the highest agreement. So, for our binary dataset, K-Means clustering is almost exactly equivalent to the K-Medoids clustering with binary distance measure. This might be due to the fact that both algorithms consumed binary data and perform in a similar way on binary data. Then, we have Euclidean and Manhattan distanced K-Medoid clustering performing well with Rand Index and Adjusted Rand Index values of 0.93 and 0.87 respectively. As seen in misclassification rates, Maximum distanced K-Medoids performed poorly even in Rand Index scores. The Adjusted Rand Index value of 0.01 indicates that there is negligible agreement between the two clustering algorithms.

Conclusion: Initially we handled missing values in our binary dataset by imputation by logistic regression and went into clustering analysis. We examined K-Means and K-Medoids clustering techniques with different number of potential clusters. We found out that both the techniques suggested that we have 2 clusters. This was later strongly confirmed by the Silhouette plots. In K-Medoids clustering technique, we also came across several distance measures, out of which Binary distance performed most efficiently as indicated concretely by the misclassification rates and the Rand Index values.

With the help of Silhouette plots, we witnessed that K-Means performed better than K-Medoids. We computed Rand Index for different number of clusters and different distance metrics, and witnessed that 2 clustered algorithms and Binary distanced algorithm performed very well for out dataset.
