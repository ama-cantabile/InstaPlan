// This function implements filter-by-date to the game event table. The date slection
// is populated into a dropdown menu button from the filterDate collection. 
function readDateFilterData(collection) {

    // Addd a dropdown menu to select date filter for the Olympics game events
    let dateFilterContainer = document.getElementById("dateFilter");
    var date = "";
    // Define a default game event date for initial event display
    var buttonDate = "Mar 08";

    db.collection("dateFilter").orderBy("date").get().then(allDate => {
        let dateFilterHtml = "";
        allDate.forEach(doc => {

            // Svee document id as docId field
            db.collection("dateFilter").doc(doc.id).set({
                docId: doc.id
            }, { merge: true })
            date = doc.data().date;
            var docId = doc.data().docId;
            console.log(docId)

            dateFilterHtml += `<li><a id=` + docId + ` class="dropdown-item" href="#">` + date + `</a></li>`
            dateFilterContainer.innerHTML = dateFilterHtml;

        })

        var targetId = 0;
        document.getElementById("dateFilter").addEventListener("click", function (e) {

            targetId = e.target.id;
            console.log(targetId);
            db.collection("dateFilter").doc(targetId).get().then(doc => {
                buttonDate = doc.data().date;
                document.getElementById("dropdownMenuLink").innerHTML = buttonDate;

                readGameGroupData(buttonDate);
                setFilterDate(buttonDate);

            })

        })
    })
}
readDateFilterData();


// Store the selected filter date in local storage for later use of filler insertion
function setFilterDate(id) {
    localStorage.setItem ('filterDate', id);
  }


function readGameGroupData(buttonDate) {

    // Create table container to listen to call to add game event table body
    let gameTemplate = document.getElementById("gameTemplate");
    let gameGroup = document.getElementById("gameGroup");
    const sportIdList = [];

    db.collection("sportList").where('date', 'array-contains', buttonDate).get()
        .then(allDateGames => {
            let sportListHtml = "";
            allDateGames.forEach(doc => {
                var title = doc.data().title;
                var sportId = doc.data().id;
                sportIdList.push(sportId);

                sportListHtml += `<p>
                                    <a id="gameTitle" class="btn btn-primary" data-bs-toggle="collapse"  style="width: 200px;" href="#` + sportId + `" role="button"
                                        aria-expanded="false" aria-controls="collapseExample"> 
                                    ` + title + `</a>
                                 </p>
                                <div class="collapse" id="` + sportId + `">
                                    <div class="card card-body">
                                        <table class="table table-light table-striped" id="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Start</th>
                                                    <th scope="col">End</th>
                                                    <th scope="col">Location</th>
                                                    <th scope="col">Event</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody id="id` + sportId + `"></tbody>
                                        </table>
                                    </div>
                                </div> `

                gameTemplate.innerHTML = sportListHtml;
            })

            for (i = 0; i < sportIdList.length; i++) {
                readGameDetailsCollections(buttonDate, sportIdList[i]);
            }

        })
}

// Read game detail collection and store document data in a string.
function readGameDetailsCollections(dateFilter, sportId) {
    db.collection(sportId).where('date', '==', dateFilter).get()
        .then(allSport => {

            var gameDetails = [];
            allSport.forEach(doc => {
                db.collection(sportId).doc(doc.id).set({
                    id: doc.id
                }, { merge: true })
                gameDetails.push(doc.data());
                console.log(gameDetails);
                // gameDetails.push(doc.id);

            })

            // Define game detail table body container
            var gameDetailTableBody = document.getElementById("id" + sportId);
            gameDetailTableBody.innerHTML = "";
            gameDetails.forEach(element => {

                var row = document.createElement("tr");
                var col1 = document.createElement("td");
                var col2 = document.createElement("td");
                var col3 = document.createElement("td");
                var col4 = document.createElement("td");
                var col5 = document.createElement("td");
                var col6 = document.createElement("td");
                var gameId = element.id;

                col1.innerHTML = element.date;
                col2.innerHTML = element.startTime;
                col3.innerHTML = element.endTime;
                col4.innerHTML = element.location;
                col5.innerHTML = element.event;
                col6.innerHTML = '<a class="btn btn-outline-primary" href="#" role="button" id = "' + gameId + '">Select</a>';

                row.appendChild(col1);
                row.appendChild(col2);
                row.appendChild(col3);
                row.appendChild(col4);
                row.appendChild(col5);
                row.appendChild(col6);
                gameDetailTableBody.appendChild(row);
            })

            // Add event listener on all buttons with references of sport collection and game event documents
            var targetId = 0;
            gameDetailTableBody.addEventListener("click", function (e) {

                targetId = e.target.id;
                console.log(targetId);
                console.log(e);

                var element = document.getElementById(targetId);

                if (!element.classList.contains("highlight")) {
                    writeGameEventToSubcollection(sportId, targetId);

                } else {
                    deleteGameEventFromSubcollection(targetId);
                }

                element.classList.toggle("highlight");

            })
        })
}


// Write sport collection and selected game event documents to the schedule field of the logged-in user document
function writeGameEvent(sportId, gameDocumentId) {

    // Add sport collection and game event document as reference data type
    var gameEventData = db.doc("/" + sportId + "/" + gameDocumentId);
    console.log(gameEventData);
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userId = user.uid;
            console.log(user.uid);

            const data = currentUser.get().schedule;
            if (data == null) {
                const addSchedule = currentUser.update({
                    schedule: fieldValue.arrayUnion(gameEventData)
                }, { merge: true })
            }

        }
    })
}


function writeGameEventToSubcollection(sportId, gameDocumentId) {

    // Add sport collection and game event document as reference data type
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var scheduleWrite = db.collection(sportId).doc(gameDocumentId);
            scheduleWrite.get().then(plan => {
                currentUser.collection("savedPlan").add({
                    event: plan.data().event,
                    date: plan.data().date,
                    location: plan.data().location,
                    start: plan.data().startTime,
                    end: plan.data().endTime,
                    img: plan.data().img,
                    gameId: gameDocumentId,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })

                // Save document id as field docId
                currentUser.collection("savedPlan").get()
                    .then(allSport => {
                        allSport.forEach(doc => {
                            currentUser.collection("savedPlan").doc(doc.id).set({
                                docId: doc.id
                            }, { merge: true })
                        })
                    })
            })

        }
    })
}


function deleteGameEventFromSubcollection(gameDocumentId) {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);

            currentUser.collection("savedPlan").where('gameId', '==', gameDocumentId).get()
                .then(allSport => {
                    allSport.forEach(doc => {
                        var docToDelete = doc.data().docId;
                        currentUser.collection("savedPlan").doc(docToDelete).delete();

                    })
                })
        }
    })
}


function planConfirm() {
    if (confirm("Please click 'OK' to create the plan. Otherwise, click 'Cancel' to remain on the page.")) {
        window.location.href = "travelPlan.html";
    } else {
        window.location.href = "#";
    }
}

