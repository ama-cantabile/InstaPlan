// Display restaurant detailed image
function readRestaurant() {

    var restaurantID = localStorage.getItem("restaurantID");

    db.collection("restaurants").where("id", "==", restaurantID)
    .get()
    .then(restaurantData => {
        restaurants = restaurantData.docs;
        var thisRestaurant = restaurants[0].data();

        document.getElementById("text-title").innerHTML = "<b>" + thisRestaurant.name + " - Image</b>";
        document.getElementById("main-image").src = thisRestaurant.image;

    });
}
readRestaurant();