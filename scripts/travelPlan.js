//-----------------------------------------------------------------------------
// This function is called when the filterFillerForSportEvent() function finishes
// filtering the filler events for the selected sports events. It sorts the selected 
// sport events and filtered filler events in the savedPlan subcollection of the user 
// by start time.  It then populates the doucuments to the travelPlan.html page.
//-----------------------------------------------------------------------------
async function populateSchedule() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userSchedule = userDoc.data().schedule;
                    var scheduleList = "";
                    console.log(user.uid);

                    let planTemplate = document.getElementById("planTemplate");
                    let planGroup = document.getElementById("planGroup");

                    currentUser.collection("savedPlan").orderBy('start').get()
                        .then(plan => {
                            plan.forEach(doc => {
                                var event = doc.data().event;
                                var date = doc.data().date;
                                var start = doc.data().start;
                                var end = doc.data().end;
                                var location = doc.data().location;
                                var img = doc.data().img;

                                let planCard = planTemplate.content.cloneNode(true);
                                planCard.querySelector('#event').innerHTML = event;
                                planCard.querySelector('#date').innerHTML = date;
                                if (start % 1 != 0) {
                                    planCard.querySelector('#start').innerHTML = start - 0.5 + ":30";
                                } else {
                                    planCard.querySelector('#start').innerHTML = start + ":00";
                                }
                                if (end % 1 != 0) {
                                    planCard.querySelector('#end').innerHTML = end - 0.5 + ":30";
                                } else {
                                    planCard.querySelector('#end').innerHTML = end + ":00";
                                }
                                planCard.querySelector('#location').innerHTML = location;
                                planCard.querySelector('#img').src = `./images/${img}.jpg`;
                                planGroup.appendChild(planCard);
                            })

                        })

                });
        }

    })
}

// Get slected filter data from the local storage and use as the filler date
var fillerDate = localStorage.getItem("filterDate");

//-----------------------------------------------------------------------------
// This function is called when the user clicks on the "Finish" button after 
// seleting the sport event they are going for the date.  It then filters the
// filler collection to determine all the filler events that fits before the first
// sport event, in between the gap of sport events, and after the last sport event
// of the day. Then it invoke the addFillerToSavedPlan() function.
//-----------------------------------------------------------------------------
function filterFillerForSportEvent() {

    var savedSportEvents = [];
    var fillerBeforeFirstEvent = [];
    var fillerBetweenEvents = [];
    var fillerAfterLastEvent = []
    var eventStart = 0;
    var eventEnd = 0;
    var firstEventStart = 0;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {

            var currentUser = db.collection("users").doc(user.uid);
            currentUser.collection("savedPlan")
                .orderBy('start')
                .get()
                .then(plan => {

                    plan.forEach(doc => {
                        savedSportEvents.push(doc.data());
                    })
                    console.log(savedSportEvents);

                    // Get the end-time of the current sports event and start-time of the next sport event for comparsion.
                    for (var i = 1; i <= savedSportEvents.length; i++) {
                        eventEnd = savedSportEvents[i - 1].end;
                        if (savedSportEvents.length >= i + 1) {
                            eventStart = savedSportEvents[i].start;
                        } else {
                            eventStart = 0;
                        }

                        // Filters the filler event by the selected date; then filters the available ones before the first sports event.
                        if (i == 1) {
                            firstEventStart = savedSportEvents[i - 1].start;
                            db.collection("fillers").where('date', 'array-contains', fillerDate).where("End", "<", firstEventStart)
                                .get()
                                .then(test => {
                                    console.log(1);
                                    test.forEach(doc => {
                                        fillerBeforeFirstEvent.push(doc.data());
                                        console.log(fillerBeforeFirstEvent);
                                    })
                                })
                        }

                        // Filters the filler event by the selected date; then filters the available ones between the sports events.
                        if (i < savedSportEvents.length) {
                            db.collection("fillers").where('date', 'array-contains', fillerDate).where("Start", "==", eventEnd + 1).where("End", "<=", eventStart)
                                .get()
                                .then(test => {
                                    console.log(1);
                                    test.forEach(doc => {
                                        fillerBetweenEvents.push(doc.data());
                                        console.log(fillerBetweenEvents);
                                    })
                                })

                            // Filters the filler event by the selected date; then filters the available ones after the last sports event.
                        } else if (i == savedSportEvents.length) {
                            db.collection("fillers").where('date', 'array-contains', fillerDate).where("Start", ">", eventEnd)
                                .get()
                                .then(test => {
                                    console.log(1);
                                    test.forEach(doc => {
                                        fillerAfterLastEvent.push(doc.data());
                                    })

                                    // Add the filler events to the savedPlan subcollection of the logged-in user
                                    addFillerToSavedPlan(fillerBeforeFirstEvent);
                                    addFillerToSavedPlan(fillerBetweenEvents);
                                    addFillerToSavedPlan(fillerAfterLastEvent);
                                    populateSchedule()
                                })
                        }
                    }
                })
        }
    })
}

// Call this function when the /travelPlan.html page loads
filterFillerForSportEvent();

//-----------------------------------------------------------------------------
// This function adds the filtered filler events of the day to the savedPlan
// subcollection of the logged-in user as new generated documents.
//-----------------------------------------------------------------------------
function addFillerToSavedPlan(fillerList) {

    console.log(fillerList);
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);

            for (var i = 0; i < fillerList.length; i++) {
                currentUser.collection("savedPlan").add({
                    event: fillerList[i].Details,
                    date: fillerDate,
                    location: fillerList[i].Location,
                    address: fillerList[i].Address,
                    start: fillerList[i].Start,
                    end: fillerList[i].End,
                    img: fillerList[i].Image

                })
            }
        }
    })

}

//call the function to run it 
function callFunction() {
    setTimeout(function () {
        populateSchedule()
    }, 3000);
}

//-----------------------------------------------------------------------------
// This function is called when users click the "Delete Travel Plan" button. It
// deletes the savedPlan subcollection of the logged-in user.
//-----------------------------------------------------------------------------
function deletePlan() {
    if (confirm("Are you sure you want to delete the plan? Click 'Ok' to delete.")) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                var currentUser = db.collection("users").doc(user.uid);
                currentUser.collection("savedPlan").get()
                    .then(plan => {
                        plan.forEach(doc => {
                            var docToDelete = doc.id;
                            currentUser.collection("savedPlan").doc(docToDelete).delete();
                        })
                        document.getElementById("planGroup").remove();
                        document.getElementById("planMessage").innerHTML = "<b>The Plan Has Been Deleted!</b>";
                        document.getElementById("planButton").innerHTML = "Create Another Plan";
                        document.getElementById("planButton").setAttribute("href", "travelPlanCreator1.html");
                        document.getElementById("planButton").setAttribute("onclick", "");
                        console.log("The plan has been deleted.");
                    })
            } else {
                windows.location.assign("login.html");
            }
        }
        )
    } else {
        window.location.href = "#";
    }
}