// Display restaurant detailed image
function readRestaurant() {

    db.collection("restaurants").doc("0aamT2Fxr4JFFzqkDoIC").onSnapshot(restaurantData => {
        console.log(restaurantData.data());

        document.getElementById("main-image").src = restaurantData.data().image;

    });
}
readRestaurant();