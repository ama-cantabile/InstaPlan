function readAttraction() {

    db.collection("restaurants").doc("0aamT2Fxr4JFFzqkDoIC").onSnapshot(restaurantData => {
        document.getElementById("header-title").innerHTML = restaurantData.data().name;
        document.getElementById("header-text").innerHTML = restaurantData.data().information;
        document.getElementById("phone").innerHTML = restaurantData.data().phone;
        document.getElementById("address").innerHTML = restaurantData.data().address;
        document.getElementById("header-image").src = restaurantData.data().image;

    });
}
readAttraction();