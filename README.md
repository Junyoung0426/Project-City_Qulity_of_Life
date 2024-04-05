# City Quality of Life

## Overview

This project focuses on analyzing the quality of life in various cities worldwide. The dataset comprises 265 cities and includes 9 attributes: Housing, Cost of Living, Commute, Safety, Business Freedom, Education, Environmental Quality, Economy, and Taxation. The dataset source is [City Quality of Life Dataset](https://www.kaggle.com/datasets/orhankaramancode/city-quality-of-life-dataset) and [Teleport API](https://developers.teleport.org/api/).

## Dashborad
http://127.0.0.1:5500/City_Qulity_of_Life/Dashboard/lab5.html


## Objectives

The main objectives of this project are:

1. Analyze and compare the quality of life in different cities.
2. Explore the relationships between attributes such as Housing, Cost of Living, Education, and Economy.
3. Visualize the data to help individuals make informed decisions about where to live or work.

## Dataset Attributes

The dataset contains 9 attributes with scores from 0 to 10:

- Housing
- Cost of Living
- Commute
- Safety
- Business Freedom
- Education
- Environmental Quality
- Economy
- Taxation

## Data Analysis Techniques

The project employs various data analysis techniques, including:

- **Correlation Matrix**: Visualizes correlations between attributes.
- **Scatterplot Matrix**: Demonstrates the relationships between attributes.
- **Parallel Coordinates**: Reduces data dimensionality for visualization.
- **PCA Plot**: Uses PCA for dimension reduction and visualization.
- **Biplot**: Illustrates correlations between principal components and original variables.
- **MDS (Euclidean Distance)**: Visualizes data dissimilarity.
- **MDS (1-|correlation| Distance)**: Visualizes attribute correlations based on distance.

## ClusterwithInteraction

This section includes a histogram graph for attribute selection. You can choose an attribute, and the corresponding data will be highlighted in various plots, such as Biplot, MDS Plot, and Parallel Coordinates. The project uses K-means clustering for cluster analysis.

## Dashboard

The dashboard integrates multiple visualizations:

- **Histogram**: Allows attribute selection to highlight data points.
- **Biplot**: Visualizes the correlation between principal components and original variables.
- **MDS Plot**: Visualizes data dissimilarity based on Euclidean distance.
- **Parallel Coordinates**: Shows the relationship between data attributes.
- **Chord Diagram**: Represents the relationships between attributes using a new chart.

### Interaction

The dashboard provides interactivity with brushes for highlighting data points. You can select points on the Biplot and see their corresponding positions on the MDS Plot and Parallel Coordinates. This feature enhances the ability to explore and analyze the data effectively.

## Conclusion

This project provides valuable insights into the quality of life in different cities. It assists individuals in making informed decisions about where to live or work based on their preferences and priorities.
