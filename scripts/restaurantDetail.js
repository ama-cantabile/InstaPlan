var restaurantID = localStorage.getItem("restaurantID");

function readRestaurant() {

    db.collection("restaurants").where("id", "==", restaurantID)
        .get()
        .then(restaurantData => {
            restaurants = restaurantData.docs;
            var thisRestaurant = restaurants[0].data();

            document.getElementById("header-title").innerHTML = "<b>" + thisRestaurant.name + "</b>";
            document.getElementById("header-text").innerHTML = thisRestaurant.information;
            document.getElementById("phone").innerHTML = thisRestaurant.phone;
            document.getElementById("address").innerHTML = thisRestaurant.address;
            document.getElementById("header-image").src = thisRestaurant.image;

        });
}

readRestaurant();