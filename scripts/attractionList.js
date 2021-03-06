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

// Fetch function
function fetchData(url) {
    fetch(url)
    return fetch(url)
        .then(response => response.json())
}

writeAttractionData();

//-----------------------------------------------------------------------------------------------------
// This function retrieves the data from Firebase and iterates through each attribute of the data. 
// Each iteration creates an html and passes the html to attractionList.html.   
//-----------------------------------------------------------------------------------------------------
function populateAttractionList() {
    db.collection("attractions")
        .get()
        .then((querySnapshot) => {
            let attractionDataHTML = "";
            querySnapshot.forEach((doc) => {
                attractionDataHTML += '<a href="attractionDetail.html" class="list-group-item list-group-item-action" aria-current="true" onclick = "setAttractionData(' + doc.data().id + ')" ><div class="d-flex w-100 justify-content-between"><p id="attraction-name"class="mb-1 text-bold">'
                    + doc.data().name + '</p><img src= "' + doc.data().image + '" style="width: 40%; height:150px;"></div><p class="mb-1" id="attraction-address"><span class="text-bold">Address: </span><span>'
                    + doc.data().address + '</span></p><p id="attraction-phone"><span class="text-bold">Contact: </span><span>' + doc.data().phone + '</span></p></a>'
            });

            console.log(querySnapshot[0]);

            document.getElementById("list-group-container").innerHTML = attractionDataHTML;
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

populateAttractionList();

// Saves the attraction ID to LocalStorage.
function setAttractionData(id) {
    localStorage.setItem('attractionID', id);
}
