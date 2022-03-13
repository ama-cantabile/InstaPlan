/**
 * @author Amadeus Min
 * 
 */

// This function fetch a attraction JSON file and save on the Firebase storage if the collection size is 0.
function writeAttractionData() {
    const url = './data/attraction.json';
    let data = fetchData(url);

    const test = () => {
        data.then((attractions) => {

            attractions.forEach((doc) => {

                db.collection("attractions").get().then(snap => {
                    size = snap.size;
                    if (size == 0) {
                        db.collection("attractions").add({
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

// fetch function
function fetchData(url) {
    fetch(url)
    return fetch(url)
        .then(response => response.json())
}

writeAttractionData();

/* This function retreieve the data from firebase and iterates the each attributes of the data. 
 * The each iteration creates own html and pass the html to the attractionList.html page.   
*/
function displayRestaurantLists() {
    db.collection("attractions")
        .get()
        .then((querySnapshot) => {
            let attractionDataHTML = "";
            querySnapshot.forEach((doc) => {
                attractionDataHTML += '<a href="attractionDetail.html" class="list-group-item list-group-item-action" aria-current="true" onclick = "setAttractionData(' + doc.data().id + ')" ><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">'
                    + doc.data().name + '</h5><img src= "' + doc.data().image + '" style="width: 40%; height:150px;"></div><p class="mb-1">'
                    + doc.data().address + '</p><small>' + doc.data().phone + '</small></a>'
            });

            console.log(querySnapshot[0]);

            document.getElementById("list-group-container").innerHTML = attractionDataHTML;
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

displayRestaurantLists();

function setAttractionData(id) {
    localStorage.setItem('attractionID', id);
}

// function readAttraction() {

//     db.collection("attractions").get().then(snap => {
//         size = snap.size;
//         console.log(size);
//     });

//     db.collection("attractions").doc("hFyoMNQixdq2xaa3kKCt").onSnapshot(attractionData => {
//         console.log(attractionData.data());
//         document.getElementById("attractionName").innerHTML = attractionData.data().name;
//         document.getElementById("attractionAddress").innerHTML = attractionData.data().address;
//         document.getElementById("attractionContact").innerHTML = attractionData.data().phone;
//         document.getElementById("attractionImage").src = attractionData.data().imgae;

//     });
// }
// readAttraction();