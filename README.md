## InstaPlan
* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)

## General Info
project description
This project was designed for COMP-1800 class. The project is under assumption that the Olympics will be held in Vancouver in 2030. Our web application allows users to select and add specific Olympic events to a personalized plan, where time gaps in between said events are filled in with fun activities. Users can also find information regarding events, restaurants, and attractions in Vancouver.
	
## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* JSON
* Bootstrap
* Firebase and Firestore 
	
## Content
Content of the project folder:

```
 Top level of project folder and files: 

├── .git                     # Folder for git repo
├── images                   # Folder for images

        /arcade.jpg
        /au-comptoirjpg.jpg
        /Beaty-Biodiversy-Museum.jpg
        /bubble_tea.jpg
        /buckstop.jpg
        /burnaby_museum_storefronts.jpg
        /cafe.jpg
        /diner.jpg
        /figure_skating.jpg
        /flower_garden.jpg
        /goldenParamountSeafoodRestaurant.jpg
        /granvile-island.jpg
        /grouseMtn.jpg
        /home-Dr.-Sun-Park-Horse-Drawn-Tours.jpg
        /InstaPlan.jpg
        /InstaTravelLogo.jpg
        /laser.jpg
        /library.jpg
        /lounge.jpg
        /mall.jpg
        /marutama-ra-men.jpg
        /mens_hockey.jpg
        /mens_snowboard_halfpipe.jpg 
        /mini_golf.jpg 
        /park.jpg 
        /picnic.jpg 
        /restaurant.jpg 
        /rink.jpg 
        /ski_big_air.jpg 
        /sushi.jpg 
        /theatre.jpg 
        /Vancouver.jpg 
        /vandusen-botanical-garden.jpg 
        /womens_alphine_skiing.jpg 
        /womens_hockey.jpg 
        /womens_speed_skating.jpg 
        /zoo.jpg 

├── data                   # Folder for JSON files.

        /attraction.json 
        /restaurant.json
        
├── scripts                # Folder for scripts
       
        /attractionDetail.js             # shows an attraction information in detail
        /attractionImageDetail.js        # shows an Image in detail
        /attractionList.js               # shows list of attractions
        /restaurantDetail.js             # shows an restaurant information in detail
        /restaurantImageDetail.js        # shows an Image in detail
        /restaurantList.js               # shows list of restaurants
        /main.js                         # authorizes user and display it on main page     
        /fillers.js                      # populates filler card with filler data from Firebase
        /firebaseAPI_TEAM26.js           # firebase API stuff, shared across pages
        /nav.js                          # logout function
        /profile.js                      # handles user information 
        /skeleton.js                     # loads the navbar and footer into html docs.
        /skeleton2.js                  	 # JS for login.html
        /sportList.js                    # shows a list of the Winter Olympic sports
        /gameDetails.js              	 # shows the game events for the sport.
        /travelPlanCreator1.js           # selects game events from a filtered-by-date list
        /travelPlan.js                   # filters filler events to fit into the selected game schedule

├── styles                  # Folder for styles
        /style.css                       # style for overall pages
        /listCardStyle.css               # style for card list layouts
       

├── text                    # Folder for Nav and footer layout.
        /footer.html                     # footer layout for the overall page
        /loginNav.html                   # navigation bar for the login page
        /nav.html                        # navigation bar for pages other than the login page

Firebase hosting files: 
├── .firebase
	/hosting..cache
├── .firebaserc
├── 404.html
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── storage.rules

HTML files: 
├── index.html                          # landing HTML file, this is what users see when you come to URL
├── main.html                           # main HTML file, the landing page after log-in or user set-up
├── attractionDetail.html
├── attractionImageDetail.html
├── attractionList.html
├── restaurantDetail.html
├── restaurantImageDetail.html
├── restaurantList.html
├── fillers.html
├── gameDetails.html
├── profile.html
├── sportList.html
├── travelPlan.html
├── travelPlanCreator1.html

├── .gitignore                # Git ignore file
└── README.md                 # woah, you're reading this now!
```

## Resources
- In-app icons from Feather v4.28.0 (Open Source https://feathericons.com/)
- Logo design from Adobe Creative Cloud
- Attraction images and text information from the Vancouver Attractions website (https://www.vancouverattractions.com/)
- Restaurant images and text information from the EATER website (https://www.eater.com/maps/best-vancouver-restaurants-canada)
- Sports list and game detail images (https://olympics.com/en/olympic-games/beijing-2022)
- Fun Activities pictures from the internet


## Contact 
* Amadeus Min - amin8@my.bcit.ca 
* Justin Ng - jng193@my.bcit.ca
* JinRong Jian (Lucas) - jjian6@my.bcit.ca

## Acknowledgements 
* <a href="https://fontawesome.com/">Font Awesome</a>
* <a href="https://fonts.adobe.com/">Adobe Fonts</a> 
* <a href="https://fonts.google.com/">Google Fonts</a>
* <a href="https://stock.adobe.com/images">Adobe Stock Images</a>
* <a href="https://getbootstrap.com/">Bootstrap</a>

