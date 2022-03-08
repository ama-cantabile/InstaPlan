function readFiller() {
    db.collection("fillers").doc("tjvmfG2ZE0Mi5coBeVX8").onSnapshot(fillerData => {
        console.log("Coffee Detail: " + fillerData.data());
        document.getElementById("coffee_details").innerHTML = fillerData.data().Details;
        document.getElementById("coffee_start").innerHTML = fillerData.data().Start_time;
        document.getElementById("coffee_end").innerHTML = fillerData.data().End_time;
        document.getElementById("coffee_location").innerHTML = fillerData.data().Location;
        document.getElementById("coffee_address").innerHTML = fillerData.data().Address;
        document.getElementById("coffee_img").src = fillerData.data().Image;

    });
}
readFiller();
