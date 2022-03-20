const sportIdList = [];

function readGameGroupData(collection) {
    let gameTemplate = document.getElementById("gameTemplate");
    let gameGroup = document.getElementById("gameGroup");

    db.collection(collection).get()
        .then(allDateGames => {
            let sportListHtml = "";
            allDateGames.forEach(doc => {
                var title = doc.data().title;
                var sportId = doc.data().id;
                sportIdList.push(sportId);

                sportListHtml += `<p>
                                    <a id="gameTitle" class="btn btn-primary" data-bs-toggle="collapse" href="#` + sportId + `" role="button"
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

                // let gameCollapse = gameTemplate.content.cloneNode(true);
                gameTemplate.innerHTML = sportListHtml;
            })

            for (i = 0; i < sportIdList.length; i++) {
                readGameDetailsCollections(sportIdList[i]);
            }
        })
}
readGameGroupData("sportList");

// Read game detail collection and store document data in a string.
function readGameDetailsCollections(sportId) {
    db.collection(sportId).get()
        .then(allSport => {

            var gameDetails = [];
            allSport.forEach(doc => {
                db.collection(sportId).doc(doc.id).set({
                    id: doc.id
                }, {merge: true})
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
                col6.innerHTML = '<a class="btn btn-outline-primary" href="#" role="button" id = "'+ gameId +'">Select</a>';

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
            gameDetailTableBody.addEventListener("click", function(e) {
                
                targetId = e.target.id;
                console.log(targetId);
                console.log(e);
                // writeGameEvent(sportId, targetId);
                writeGameEventToSubcollection(sportId, targetId);
                console.log(1);

            })
            $(document).ready(function(){
                $("a.btn.btn-outline-primary").click(function(){
                    $(this).addClass("highlight");
                    // $(this).toggleClass("btn-lg");
                });
            });
        })
}


// Write sport collection and selected game event documents to the schedule field of the logged-in user document
function writeGameEvent(sportId, gameDocumentId) {

    // Add sport collection and game event document as reference data type
    var gameEventData =db.doc("/" + sportId + "/" + gameDocumentId);
    console.log(gameEventData);
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userId = user.uid;
            console.log(user.uid);

            const data = currentUser.get().schedule;
            if(data == null) {
                const addSchedule = currentUser.update({
                    schedule: fieldValue.arrayUnion(gameEventData)
                }, {merge: true})
            }

        }
    })
}


function writeGameEventToSubcollection(sportId, gameDocumentId) {

    // Add sport collection and game event document as reference data type
    // var gameEventData =db.doc("/" + sportId + "/" + gameDocumentId);
    // console.log(gameEventData);
    firebase.auth().onAuthStateChanged(user => {
        if (user) { 
            var currentUser = db.collection("users").doc(user.uid);
            var scheduleWrite = db.collection(sportId).doc(gameDocumentId);
            scheduleWrite.onSnapshot(plan => {               
                currentUser.collection("savedPlan").add({
                Event: plan.data().event,
                Date: plan.data().date,
                Location: plan.data().location,
                Start: plan.data().startTime,
                End: plan.data().endTime,
                Img: plan.data().img
            })
            })
            console.log(user.uid);



        }
    })
}

function planConfirm() {
    if(confirm("Please click 'OK' to create the plan. Otherwise, click 'Cancel' to remain on the page.")) {
        window.location.href = "travelPlan.html";
    } else {
        window.location.href = "#";
    }
}
