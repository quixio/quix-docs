# Types of processing

Types of processing:

* Transformation - transform data from raw data to clean structured data tables (we expect this to happen in Quix, clean data before persisting it).
* Exploratory data analysis (EDA) - using external tools like Jupyter Notebooks to understand data and find insights
* Feature engineering - using external tools like Jupyter Notebooks to derive new data columns by making calculations from actual data columns eg calculate distance from time and speed. In ML distance would be a new feature (in McLaren Racing we called these 'virtual parameters') (this would happen outside of Quix, in Jupyter)
* ML model training - using clean data to train a model (this would happen outside of Quix in Jupyter)
* Back testing - using unseen data to test the model (traditionally this would happen outside of Quix in Jupyter, but now DS's can test their code in Quix against historic or live data)
