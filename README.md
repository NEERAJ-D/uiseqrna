# uiseqrna
CSE 549 Project deals with UI rna SEQUENCE

Problem Statement

The quantifiers like RSEM, sailfish, kallisto are used to report the expression level of different transcripts in the sample corresponding to the reads. The output from these quantifiers are numerically intensive and visually provide little visual aid to the user. The development of this interactive web application provides visual comparisons and important statistics regarding the data. The user can select the abundance estimates and can plot various charts like line, bar , scatter plots that shall enable the user to compare the different metrics and would enable the user to carry out comparative studies.

Introduction:
The project deals with UI visualization and the web application provides a rich user interface that is connected to the backend server technologies that provide the user with the capabilities such as selection of the various abundance estimates that the user can select and can plot against each other. The web application also provides a combined plot where the different quantifier results are plotted in the same chart. The different capabilites provided include providing a log transform to plot the graph of small values that the log transform sufficiently magnifies to provide a better scale aspect ratio.

Dataset:

The quantifier output files are produced in the form of CSV files. These CSVs are parsed and converted to MySQL tables. The MySQL tables have specified schema and parsing these different CSVs into tables is performed using some specific SQL, "INTO" clauses that allow the transformation of the CSV content into MySQL tables. The different quantifier outputs can be joined by taking INNER JOINS and some combined queries can be obtained by using the joins.
Consider the following mapping for the MySQL tables to the data files that are present
RSEM 
rsem_quant.csv -> rsem_quant
kallisto.csv -> kallisto
sailfish.csv -> sailfish
config.pro -> truth

The Data that is used for the purpose of plotting is the output of the quantifiers like sailfish, rsem , kallisto against the truth shall be used for the purpose of plotting the comparison plots. The statistics like the standard deviation, mean , variance is stored for each table. These statistics can be displayed for each table, which gives a comprehensive view of the entire dataset. The data varies differently for each quantifier and its relation with the actual truth data can be seen quantitatively using the statistics provided.
The CSV files contained the results from different quantifiers and these outputs were parsed and converted into MySQL tables using following techniques:-

Parsing into SQL tables post cleaning:-

LOAD DATA LOCAL INFILE 'config.pro' INTO TABLE truthtable

FIELDS TERMINATED BY ',' 

ENCLOSED BY '' 

LINES TERMINATED BY '\r\n'

IGNORE 1 LINES

(col1, col2, col3, col4, col5...);

Such sort of a query enabled the data to be loaded into SQL tables directly that allowed ease of processing.

Problems Encountered:

The problems encountered with the dataset. The dataset has different kinds of values that are not well formatted in nature such that some columns are expected to have values but a null value is observed in such cases.

Front End:
The front end technlogy stack explored consists of Highcharts, Amcharts which present different interactive functions that enable the user to plot the graphs by selecting different abundance estimates. The controls and the selections in the Web Application are 

Back End:
The backend server side technology used is NodeJS. NodeJS which is a part of the MEAN stack, provides the server side technology to take care of data ingestion and hosting. The hosting has been taken care on an Amazon EC2 instance. The backend database that takes care of the data handling is MySQL. The backend MySQL is used to store the different tables like kallisto, rsem , sailfish and truth. Since Node has been used as the backend it provides different routes that can successfully differentiate between the different URLs. Thes different routes enable the front-end technology to use GET requests on different URLs. The different URLs enable the backend to separate the functionality based on the type of the functionality chosen. 

NodeJS:
Node JS is flexible in terms of using several different backends and in terms of future compatibility if in case the application needs to migrate to a NoSQL backend database NodeJS still performs well as the server side technology. NodeJS has been used in tandem with the Express Library that provides several advanced features for Node and also enables the ease of coding.

MySQL:
The SQL style backend enables us to perform powerful query processing and is extermely useful since we have used the power of SQLusing indexing and joins. The frequent queries can be stored in specially formed indexes and can be retrieved in a faster manner. With respect to MySQL the number of threads accessing the database is fine tunable and in this case no hard limit has been set, but as the web application scales to the next level this parameter can be tuned further to make the performance better.In terms of writing optimized queries the queries itself are simple INNER joins of tables that represent the data. The queries are formatted in JSON format and transferred to the fron end as simple key value pairs. The simplicity of the key-value pair structure enables the front-end to easily plot the data and use the key-names as the xaxis parameter as well as the key-value sent as the actual value used in the plot.

Conclusion:
The web application project provides the user a rich user interface that the user can access and comparatively study and plot different parameters against each other. The study of the abundance estimates graphically enhances the quality of the study and provides better insights into observing visual trends. The visual help definitely propels the quality of study and would be able to present a complete picture of the output of the quantifiers.

References:

[1] Pearson Correlation
https://en.wikipedia.org/wiki/Pearson_product-moment_correlation_coefficient

[2]Spearman Correlation Coefficient
https://en.wikipedia.org/wiki/Spearman%27s_rank_correlation_coefficient

[3]Mean Absolute Error
https://en.wikipedia.org/wiki/Mean_absolute_error

[4]NodeJS
https://nodejs.org/en/

[5]NodeJS connectivity
http://www.sitepoint.com/using-node-mysql-javascript-client/

[6]MySQL
http://www.w3schools.com/sql/

[7] Data Ingestion in SQL
http://stackoverflow.com/questions/14127529/mysql-import-data-from-csv-using-load-data-infile

[8] Highcharts
http://www.highcharts.com/

[9] Amcharts
http://www.amcharts.com/

[10] c3 scripting library
http://c3js.org/



