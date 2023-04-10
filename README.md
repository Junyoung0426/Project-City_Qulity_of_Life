# City_Qulity_of_Life
1. Download and install Visual Studio Code from the official website.
2. Open Visual Studio Code and navigate to the HTML file you want to run.
3. Install the Live Server extension by clicking on the Extensions icon on the left-hand side of the window, searching for "Live Server," and clicking the "Install" button.
4. Once Live Server is installed, close the Extensions tab and reopen the HTML file you want to run.
5. To launch the HTML file with Live Server, press the ALT+L+O keys simultaneously. This will open a new tab in your default web browser with the HTML file running.

## Topic: Quality of Life by the City in the World.

## Number of data points: 265 Cities

## Attribute: 9 attributes ( Housing, Cost of Living, Commute, Safety, Business Freedom,

## Education Environmental Quality, Economy, Taxation)

## Source: City Quality of Life Dataset –
https://www.kaggle.com/datasets/orhankaramancode/city-quality-of-life-dataset
https://developers.teleport.org/api/

## Explaination
I decided to find the datasets about the Quality of Life in the City. There are a lot of topics that I really want to analyze, but I hope to analyze the city when I visited the United States. I decided to work in Newyork in the United States to become a global data analyst. However, the environment of New York is really different from my expectation and imagination compared with Seoul in Korea, the Republic. I thought that even if I can earn lots of money in New York, it will cost me more in living than income because of New York's prices and taxes. If I didn't have a dream, I thought it would be better to get a job in Seoul, where prices are about two-thirds cheaper and taxes are low. At this point, I think if there is lots of income, then there will be lots of tax and cost of living. Thus, I can analyze which city is better to live or work in through visualization. Also, I think I can find the relationship between education and business freedom. I wonder if the education score is high, employment is also high. In addition, the importance of commute will be shown through the economy, education and working.
For my dataset, there are 265 cities in the data sample, and 9 attributes (9 quantitative) with Housing, Cost of Living, Commute, Safety, Business Freedom, Education, Environmental Quality, Economy, and Taxation. With the 9 attributes, cities are scored with ‘Housing’ by the price of a large, medium, and small apartment, and the rent index. For the ‘Cost of Living’, the score is dependent on inflation score and daily prices such as lunch, monthly public transport, 5 km taxi ride, coffee, beer, bread, and meal at a restaurant. Furthermore, traffic handling score is used for ‘Commute’ and ‘Safety’ is measured with crime rate, Gun-related deaths per 100,000 residents per year, Guns per 100 residents. Business freedom, freedom from corruption, lack of labor restrictions, and time to open a business are used to decide the ‘Business Freedom’. In addition, university quality, percent of students’ happiness, and PISA ranking are used in ‘Education’ score. For ‘Environmental Quality, the percent of air quality, cleanliness, water quality, and urban greenery score determine the score. For ‘Economy’, the currency exchange rate per US dollar for an urban area, GDP growth rate (score), and GDP per capita (score) were used. Finally, ‘Taxation’ is scored by effective company profit tax rate on payouts as dividends, income tax level, Profit tax (% of the profit), time overhead to file company tax, and VAT (Sales Tax). Moreover, with the quantitative attributes data, cities are scored from 0 to 10. If the attributes’ scores are close to 10, then it is a good city for that attributes. For example, in Newyork, Housing: 1/ Cost of Living: 2.342 / Commute: 5.51925 / Safety: 7.022/ Healthcare: 6.1053 / Education: 8.0935/ Environment: 5.23375/ Economy: 6.5145 Taxation: 3.9205. From these scores, the costs of living and housing in New York have a low score which means average living expenses are significantly higher compared to other cities, and moving to New York will likely increase the living costs. In fact, New York is the 7th most expensive among the cities, especially in the housing market. When I visualize the city’s score, each data will allow me to make efficient choices by reviewing my preferred criteria first.

## Correlation, Parallel file explaination
● Correlation matrix
The correlation matrix shows the difference in color according to the correlation between
the two attributes. The closer the correlation coefficient is to 1, the redder it is, the closer
it is to 0, the white it is, and the closer it is to -1, the bluer it is. The closer to blue and red
the two variables are, the greater the association between the two variables is, and the
closer to white they are, the weaker they are. I can know Housing and the Economy has a
strong correlation. One thing I was fascinated that the color is symmetric diagonally and
that the correlation can be expressed in color so that the data can be quickly recognized
unless accurate figures are needed. Therefore, this makes it easy for people who are not
used to analyzing large amounts of data to recognize the relationship and correlation
between the two variables through color differences. However, because of the use of
color, it is impossible to get information on the exact correlation value.
● Scatterplot matrix plot selection
This is a plot represented by determining the five variables with the highest sum of
absolute values of the correlations. This is most appropriate to indicate a correlation. If
the shape of the plot is similar to the linear graph of y = x, the correlation becomes closer
to 1, and if y = -x, the correlation becomes closer to -1. If the points are variously
distributed regardless, it can be seen that they are close to zero. When I set the 5
attributes with the highest sums of absolute values of the correlations and made a plot, I
found that the correlation between the variables I chose represents the form of a y=x or
y=-x graph. This graph shows the graph according to the degree of correlation and the
exact number of correlations. However, I think a visual search is necessary because the
visualization part is lower than the correlation matrix seen before.
● Parallel coordinates
This is a graph made by connecting values with lines according to the value of attributes
of each data sample. Parallel coordinates can reduce the dimension of data by
representing high-dimensional data as a two-dimensional visualization. I can see that the
left half of this graph has a high correlation, and it has a similar shape to the patterns in
Parallel Coordinate when the correlation is 1, 0, and -1. As the data is expressed in the
form of lines, it is possible to easily perceive the trend shown by the data input of
visualization. But as you can see from my plot, if the number of samples increases too
much, it becomes difficult to identify the data of the sample I want to get.
● PCA plot (top 2 eigenvectors) with associated scree plot (8 bars)
PCA plot is expressed as a scatter plot by converting high-dimensional data into
low-dimensional data using PCA. The goal is to find a coordinate system that can
represent variance on some axes. When you create a PCA plot, you must also create a
screen plot, which serves to show how well each PC axis represents the entire data.
Looking at my PCA plot, I found that each data was distributed closer to PC1. Also, in
the scree plot, PC1 displaces almost 34% variance and PC2 displaces almost 20%.
Through my visualization, I could see that PC2 and PC3 have similar influences on
variance. This has the advantage of reducing the dimension of the data and visualizing
and interpreting the data to find a new axis that preserves the variance of the original data
as much as possible, and projecting the data on that axis. However, when dimensional
reduction occurs, it is only a difference in degree compared to the original data, and
inevitably, information loss occurs. In addition, it is difficult to interpret dimensionally
reduced data compared to the original data.
● Biplot
A biplot is a graph showing the correlation between the principal components (PC1 and
PC2) found in PCA analysis and the variables in the original data. The method of
interpreting Biplot is as follows. The variable that is parallel to the PC axis is the variable
that affects the PC the most. The length of each dashed line represents the variance of the
original variable, and the longer the length, the more variance has. In addition, through
Biplot, it can be seen that the closer each blue line is, the more correlated it is, and on the
contrary, the farther the distance, the less correlated it is. Through visualization, I found
that the correlation between the cost of living and housing was large, and the correlation
between housing and the economy was low due to the opposite characteristics. This has
the advantage of reducing multidimensional data to two dimensions and knowing the
variance and correlation of the original variable. However, there can be some projection
ambiguity, and if there are more than 2 significant PCA vectors, some data and variability
will be lost and not be used for visualization.
● MDS (use Euclidian distance)
This is a statistical data analysis technique that visually expresses the relationship
structure between the values of the data based on the Euclidean distance. Based on the
dissimilarity distance of the data, it is a technique to lower multidimensional data to two
or three dimensions. The fact that the data are located far away means that the
dissimilarity is higher, and the closer the data, the lower the similarity, that is, the higher
the similarity. In my visualization, I expected clustering to appear clearly when I used this
technique, but I found that my data did not. The biggest advantage of the method of
visualizing data using MDS is that it is possible to check the similarity of the data.
However, the MDS technique can be used when it consists only of numerical variables.
● MDS(use 1-|correlation| distance)
This is a statistical data analysis technique that visually expresses the relationship
structure between attributes based on the correlation distance(1-|correlation|). According
to the similarity of the correlation between each attribute, the indolence is plotted, and the
closer the distance between the two points, the closer the correlation is to 1 or -1, but the
farther the correlation, the closer the value is to 0. Compared to the correlation matrix
initially created, the cost of living and housing was found to be close to red due to the
strong correlation, which also showed that the correlation was strong through the
proximity of the distance between the two variables in this plot. This was thought to be
easy to grasp the degree of correlation through visualization according to distance.
However, I think there is a limit to grasping the exact value of the correlation in this plot.

## ClusterwithInteraction file explaination
This graph is a histogram graph that expresses the number of data corresponding to the attributes [0, 2], [2, 4], [4, 6], [6, 8] and [8, 10) intervals when I select the attribute in the selection box. If I choose a bar on the graph, the selected bar will change color, and the corresponding data in Biplot, MDS plot, and Parallel Coordinates plot will change color. The graphs on the left are the graphs that appear before I select the bars, and on the right are the graphs that appear when I select all the bars. It was interesting that depending on which attribute I chose, the colored points on each graph and the position of the lines changed, and this did not seem to represent the cluster clearly. Yellow for greater than or equal to 0 and less than 2 and blue for less than 4 and orange for less than 4 and less than 6 and purple for less than 8 and red for less than 8 and less than 10. This graph was good in that the location of the points corresponding to the bar can be expressed in Biplot or MDS plot according to the attribute I choose. It can find the data well on the graph by selecting a bar that corresponds to the value I want. However, apparently, Parallel Coordinates are complicated when I clicked all bars with different colors, making it difficult to identify
The graph below used K-means clustering, and according to clustering, the number of data was expressed in the size of a bar graph. In K-means clustering, the number of clustering varies depending on the value of k, which can be seen through the elbow method. In the case of my data, I found that clustering works well when the k value is 6. Therefore, six bars were created, and each bar was pressed to color the points corresponding to each bar cluster. We can see that this graph is clustering well, and if it is about clustering, it will be more useful than the
preceding graphs. I thought it was easy in that I could express the data of the cluster I want to see the location in biplot or MDS Parallel. In addition, If k was set to 3 or 4 and k means, the distinction between each clustering was more clear, so it was a bit disappointing that my k value had to be 6. It was easy to locate the data in the cluster that I wanted to see, and I could see that the points selected in the graph were clustered well. However, I find that the data of noise and outliers have a significant impact on clustering performance, and it has been difficult to set the number of clustering to cluster, k. Although there is an Elbow method, I thought there was a limitation that it only gives the answer to the optimal k and is not the correct answer.

