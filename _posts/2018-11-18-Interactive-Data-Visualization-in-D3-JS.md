---
title: "Interactive Data Visualization in D3-JS"
date: 2018-11-18
tags: [Data Visualization, Data Science, Machine Learning, D3, Java Script, Interactive]
header:
  image: "/images/ucdblue.JPG"
categories: Programming
---

**Data Visualization in D3 JS library.**

## World-o-pedia:
The visualization has become the integral part of the day to day activities. In this scenario visualizing the data with the proper mode or type along with the colour, shape and size makes an individual to understand it better with better effectiveness. As the name suggest this visualization is mixture of world information with the encyclopaedia along the years from 1960 to 2017.  

## Dataset: The world bank population data set has been used to get the population from 1960 to 2017
**Link** : [worldbank](https://data.worldbank.org/)

## Population information:
The dataset is a json file describing the population of all the countries. But we have selected 15 counties from different continents. We have the loaded the dataset as json in java script and fed to D3 library to plot.

## Wikipedia information:
Wikipedia provides an option to select the information about the country with selected year. We have used this feature to obtain the information of the country in that particular year.

Radio box to select the year: I tried many features to select the years like drop down and slide. But found that Radio button is the best fit for this particular case.
Bar graph with select and hover option: As I wanted to display the information of the country using the wiki page, Bar graph was the best fit to avail this option. Also, when the cursor is hovered over the particular country it will display the country name and the population in the selected year.

### The Interactive webpage is built by utilizing the D3JS JavaScript library

### To interact, please select the desired year to display the population of the 15 countries in the bar graph. Then, click on the desired bar (country). The wikipedia page of the corresponding country in the selected year will be loaded.

[Interactive Data Visualization](https://abhishek7kulkarni.github.io/d3/){:target="_blank" rel="noopener" }
