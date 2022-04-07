/**
 * @author Amadeus Min
 */

// This function fetch a attraction JSON file and save on the Firebase storage if the collection size is 0.
function writeRestaurantData() {
    const url = './data/restaurant.json';
    let data = fetchData(url);

    const test = () => {
        data.then((attractions) => {

            attractions.forEach((doc) => {

                db.collection("restaurants").get().then(snap => {
                    size = snap.size;
                    if (size == 0) {
                        db.collection("restaurants").add({
                            id: doc.id,
                            name: doc.name,
                            address: doc.address,
                            phone: doc.phone,
                            information: doc.information,
                            image: doc.image
                        })
                            .then(() => {
                                console.log("Document successfully written!");
                            })
                            .catch((error) => {
                                console.error("Error writing document: ", error);
                            });
                    }
                });
            });
        });
    }
    test();
}

// Fetch function
function fetchData(url) {
    fetch(url)
    return fetch(url)
        .then(response => response.json())
}

writeRestaurantData();

/* This function retreieve the data from firebase and iterates the each attributes of the data. 
 * The each iteration creates own html and pass the html to the attractionList.html page.   
*/
function displayRestaurantLists() {
    db.collection("restaurants")
        .get()
        .then((querySnapshot) => {
            let restaurantDataHTML = "";
            querySnapshot.forEach((doc) => {
                restaurantDataHTML += '<a href="restaurantDetail.html" class="list-group-item list-group-item-action" aria-current="true" onclick = "setRestaurantData(' + doc.data().id + ')"><div class="d-flex w-100 justify-content-between"><p id="restaurant-name" class="mb-1 text-bold">'
                    + doc.data().name + '</p><img src= "' + doc.data().image + '" style="width: 40%; height:150px;"></div><p id="attraction-address" class="mb-1"><span class="text-bold">Address: </span><span>'
                    + doc.data().address + '</span></p><small id="restaurant-phone"><span class="text-bold">Contact: </span><span>' + doc.data().phone + '</span></small></a>'
            });

            console.log(querySnapshot[0]);

            document.getElementById("list-group-container").innerHTML = restaurantDataHTML;
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

displayRestaurantLists();

// Saves a user selected ID to the local storage.
function setRestaurantData(id) {
    localStorage.setItem('restaurantID', id);
}