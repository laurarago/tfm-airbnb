# TFM MVTEC
# Catalonia: The land of touristic apartments

## Introduction

Our goal for this project was to analyze the rise of tourism in Catalonia using Airbnb (or other tourist rental) data. We achieved that goal, though weren’t able to come to the kind of firm conclusions we were hoping to find through our data analysis. Our original intention was to correlate the rise of rent prices with the proliferation of tourist rentals, but our statistical analysis actually showed that though there was a correlation in some places, it wasn’t strong and couldn’t be tied to an increase in rental homes. 

Instead, we decided to focus on the defining characteristic we discovered: that there are really two Catalonias. One is full of tourists — in some places there are more tourist apartments than regular ones — and the other is all locals. 

Our story focuses mainly on the 87.4% of municipalities that have Airbnb listings and the patterns we could find, especially by organizing the municipalities into the nine tourist brands that the Catalan government uses: 

* **Barcelona**,
* **Costa Daurada**,
* **Costa Brava**,
* **Costa Barcelona**,
* **Val d’Aran**,
* **Pirineus**,
* **Terres de Lleida**,
* **Paisatges de Barcelona**,
* **Terres de l’Ebre**,

The final piece tells the story of these two Catalonias, and how tourism impacts them each individually.



## Data source & ethical considerations

The data is the basis and the starting point of this work. And the data has been one of the headaches, because they do not exist or because they are incomplete. Airbnb does not facilitate access to its catalog: you have to resort to scraping or, as we have done, to other projects that have opened this data. In our case the main source of information has been DataHippo. And we have focused on the Airbnb offering, as it is the largest shared hosting platform.

We started with the data on tourist apartments offered by the National [Institute of Statistics (INE)](https://ine.es/experimental/viv_turistica/experimental_viv_turistica.htm), but when we found that they were clearly insufficient, we discarded them. This institution only collects the apartments that are officially registered: when comparing them with those of DataHippo, which offers a real photograph of the number of accommodations, we saw that it did not fit.

[DataHippo's](https://datahippo.org/es/data/) loyalty, however, has a weak point: it only portrays 2018. And the INE, only 2020 and 2021. We are left without the possibility of observing how this phenomenon has developed in Catalonia, how it has evolved and what its effects have been growth phases.

In order to know what aspects the presence of Airbnb affects in the municipalities, we also resorted to data from the INE (income, rental prices, elderly people, foreigners) and the [Institut d'Estadística de Catalunya (Idescat)](https://www.idescat.cat/): population and park household. In that case, the information is from 2011 (it is only updated every ten years, for the census) and, furthermore, it does not count 111 municipalities.

Finally, the information from DataHippo, despite being the closest to reality, has not allowed us to work with the price variable: more than half of the apartments and/or rooms lack this information in the database, thus that the result would not have been reliable.


## Data processing & analysis

After cleaning the data to avoid possible duplications (we were left with the geolocated apartments more than 10 meters apart), we chose the variables that we think could be related to the expansion of Airbnb.

There are studies and articles that affirm that the proliferation of tourist apartments promotes gentrification and increases the price of rents in general (in large cities): we analyze the price relationship of rental apartments in Catalonia between 2015 and 2020 (data from the INE ) with the Airbnb number in each of the 947 Catalan municipalities: we do not see a correlation.

We calculate the percentage of Airbnb accommodations over the total number of homes in each location, to see if there are populations colonized by the platform, as [The Guardian](https://www.theguardian.com/technology/2020/feb/20/revealed-the-areas-in-the-uk-with-one-airbnb-for-every-four-homes) did. But the Institut d'Estadística de Catalunya (Idescat, from which we obtained these data) doesn’t collect information for all the municipalities. Despite not obtaining the complete sample, we take advantage of the results to have an approximation of the municipalities with the greatest weight of Airbnb.

We also analyze the relationship between tourist apartments and the percentage of foreigners, the percentage of people over 65 years of age and the population as a whole in each locality (with data from the INE and Idescat): some correlation in each case, but of little plot weight.


## Visualization & interaction design
Because our data lead us to telling a story about individual tourist brands and municipalities, we knew we wanted to have a visual design that enabled us to look at specific examples but stay within the broader context. We didn’t have more detailed data to dig into about certain municipalities or regions — we had one large dataset that we could slice up in different ways. 

That format made scrollying a useful format, since we wanted to take the reader on a sort of tour around Catalonia, guiding them through the data in a similar way that we had explored it initially. We were also inspired by a specific example by Cuthbert Chow, who published a guide to how he made a scrollytelling piece using a single dataset. We didn’t necessarily want to copy his style, but the code was a useful framework for understanding how we could implement what we wanted. We especially liked that it didn’t use Svelte — while it’s a wonderful framework, we knew we were likely to want to use Mapbox, which doesn’t play nicely with Svelte, and having had lots of opportunities to use the Svelte scrollytelling components we wanted to try our hand at a standard HTML/CSS/JS format. 

Once we had decided on that design, in which one graph appears at a time and new text appears to explain it, we set out to establish which graphs would be helpful. To begin, we knew we needed a map, but didn’t want the first image to be a standard choropleth map. Instead, we wanted something more visually interesting and unusual. We were inspired by the gridded maps made of the US, where there’s one square or hexagon to represent each state. We wanted to do the same for Catalonia, with one square or dot for each of the 947 municipalities. We had some challenges trying to implement that vision, which we (mostly) overcame, and there are more details on that in the section below. 

After the initial map, the other graphs were simpler: scatterplots, if a little standard, were the perfect way to show the outliers we wanted to talk about. 

We had originally conceived of the project as only being this main dataset, but we also had more detailed data about individual Airbnb locations, and wanted to include it. That data turned out to be a nice way to focus on individual municipalities, so we were able to use Mapbox to take the reader on a much more geographic tour of the region. 

As for the visual style, we aimed for a very clean, modern look to align with the story itself — Airbnb itself is such a modern company, and its design is extremely sleek yet cozy. Our design is similar, with color evoking the coast (where most of the Airbnbs are) and the relaxed vibes that Airbnb puts off.


## Implementation details
Moving from top to bottom on the page, our introduction was built using kepler.gl, because we want to do a video of the map of catalonia and the data, and we like the aesthetics and easy way to do the animation with this library.  Then we export the videos to AfterEffects to do the edition, and use that in the background in the cover of the webpage.

The next large chunk of the project was built using mostly vanilla d3.js, with one or two elements from the [d3-legend](https://d3-legend.susielu.com/) library and annotations through the [d3-annotation](https://github.com/susielu/d3-annotation=library) (both by Susie Lu). As mentioned above, we were heavily inspired by (and took bits of code from) Cuthbert Chow’s scrollytelling example. Our project uses a very similar framework: the idea is essentially that all of the graph elements, including the circles themselves, are created when the page loads, but everything except the first graph is hidden. As you scroll, a series of functions reveal and then hide the appropriate elements and change the cx, cy, and r attributes of the circles. 

Our main challenge, really, wasn’t implementing the code to create these graphs, but rather was figuring out how to make the gridded map of Catalonia. The versions used in the US (one dot = one state) are all handmade, but that’s only possible because there are only 50 states. There are 947 municipalities in Catalonia, though, and hand-placing 947 points wouldn’t be feasible. 

We ended up finding an R package, [geogrid](https://github.com/jbaileyh/geogrid), which does exactly what we wanted. You feed in geospatial data, run a function (calculate_grid()), and it spits out a map of either squares or hexagons for each of the shapes. What comes out of calculate_grid(), though, is just shapes — no data. To attach the data, you need to run assign_polygons(), and the processing time for that function goes up exponentially with the number of shapes. We originally tried to simply take the gridded map that calculate_grid() gave us and manually assign each municipality to a square. But in the end, the real solution was simply to wait the 24+ hours that it took to run the algorithm. 

For the map path we used the library [Mapbox GlJS](https://www.mapbox.com/mapbox-gljs) to create an scrolly map to get to know better de different places that were struggling with tourism issues. We used the plugin [mini-mapbox](https://github.com/aesqe/mapboxgl-minimap) to create thumbnail on the left bottom corner to show the position in the map. The data file was first processed by QGIS and then exported as a geojson. In order to reduce the size file we used the library [tippecanoe](https://github.com/mapbox/tippecanoe) that converts geojson to a tileset for Mapbox. 

## Conclusions
We haven’t seen any correlation with the most common topics against to Airbnb, maybe because our focus has been all Catalonia, not a big city only: 
* **Increase of the rental’s price**,
* **Gentrification**,

We haven’t find strong correlations related to:
* **Population’s income**,
* **Population’s age**,

However, there is a clear division among the coast and the interior. And, in the coast towns the listings tend to be close to the beach. Among the municipalities with no Airbnb, the population tends to be aged and 42% has no other tourist accommodation, such as campsite, hotel or rural lodging.


## What's on this folder
 



## Teams
| **Students &rightarrow;**  | Ànnia, Laura, Rocío, Sara |
| **Mentors &rightarrow;**  | Apple, Carla, Karma |

## Timeline
* Hackathon:  Jun 5th and 6th
* Deadline:  Jun 26th
