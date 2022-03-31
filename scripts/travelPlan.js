
//-----------------------------------------------------------------------------
// This function sorts the selected sport events and filtered filler event 
// in the savedPlan subcollection of the user by start time.  It then populates
// the doucuments to the travelPlan.html page
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
                            // for (var i = 0; i < plan.size; i++) {
                            //     var gap = plan.docs[i + 1].data().Start - plan.docs[i].data().End;

                            //     db.collection("fillers").where("Start", "==", "10:00").where("End", "==", "11:00")
                            //         .get()
                            //         .then(test => {
                            //             console.log(test.docs[0].data());
                            //             currentUser.collection("savedPlan").add({
                            //                 Event: test.docs[0].data().Details,
                            //                 Date: "Mar 27",
                            //                 Location: test.docs[0].data().Location,
                            //                 Start: test.docs[0].data().Start,
                            //                 End: test.docs[0].data().End,
                            //                 Img: test.docs[0].data().Image,
                            //             })
                            //         });
                            // }
                            // console.log(plan.docs[0].data());
                            // console.log(plan.size);
                            // var gap = plan.docs[1].data().Start - plan.docs[0].data().End;
                            // console.log(gap);

                            // db.collection("fillers").where("Start", "==", "10:00").where("End", "==", "11:00")
                            //     .get()
                            //     .then(test => {
                            //         console.log(test.docs[0].data());
                            //         currentUser.collection("savedPlan").add({
                            //             Event: test.docs[0].data().Details,
                            //             Date: "Mar 27",
                            //             Location: test.docs[0].data().Location,
                            //             Start: test.docs[0].data().Start,
                            //             End: test.docs[0].data().End,
                            //             Img: test.docs[0].data().Image,
                            //         })
                            //     });

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
                                planCard.querySelector('#start').innerHTML = start;
                                planCard.querySelector('#end').innerHTML = end;
                                planCard.querySelector('#location').innerHTML = location;
                                planCard.querySelector('#img').src = `./images/${img}.jpg`;
                                planGroup.appendChild(planCard);
                            })

                        })

                });
        }

    })
}

function addFiller() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.collection("savedPlan")
                .orderBy('Start')
                .get()
                .then(plan => {
                    console.log(plan.docs[0].data());
                    for (var i = 0; i < plan.size; i++) {
                        // var gap = plan.docs[i + 1].data().Start - plan.docs[i].data().End;
                        // console.log(gap);

                        db.collection("fillers").where("Start", "==", "10:00").where("End", "==", "11:00")

                            .get()
                            .then(test => {
                                console.log(test.docs[0].data());
                                currentUser.collection("savedPlan").add({
                                    Event: test.docs[0].data().Details,
                                    Date: "Mar 27",
                                    Location: test.docs[0].data().Location,
                                    Start: test.docs[0].data().Start,
                                    End: test.docs[0].data().End,
                                    Img: test.docs[0].data().Image,
                                })
                            });
                    }
                })
        }
    })

}

// async function addFiller2() {

//     var fillerSortedByStart = await sortFillerByStart();
//     console.log(fillerSortedByStart);
//     // await sortFillerByEnd(fillerSortedByStart);

// }


//-----------------------------------------------------------------------------
// This function is called when the user clicks on the "Finish" button after 
// seleting the sport event they are going for the date.  It then filters the
// filler collection to determine all the filler events that fits before the first
// sport event, in between the gap of sport events, and after the last sport event
// of the day. Then it invoke the addFillerToSavedPlan() function.
//-----------------------------------------------------------------------------
function filterFillerForSportEvent() {

    var savedSportEvents = [];
    var fillerSortedByStart = [];

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

                    for (var i = 1; i <= savedSportEvents.length; i++) {
                        eventEnd = savedSportEvents[i - 1].end;
                        if (savedSportEvents.length >= i + 1) {
                            eventStart = savedSportEvents[i].start;
                        } else {
                            eventStart = 0;
                        }

                        if (i < savedSportEvents.length) {
                            db.collection("fillers").where("Start", "==", eventEnd + 1).where("End", "<=", eventStart)
                                .get()
                                .then(test => {
                                    console.log(1);
                                    test.forEach(doc => {
                                        fillerSortedByStart.push(doc.data());
                                        console.log(fillerSortedByStart);
                                    })
                                })

                        } else if (i == savedSportEvents.length) {
                            var testFiller = []
                            db.collection("fillers").where("Start", ">", eventEnd)
                                .get()
                                .then(test => {
                                    console.log(1);
                                    test.forEach(doc => {
                                        testFiller.push(doc.data());
                                    })
                                    addFillerToSavedPlan(fillerSortedByStart);
                                    addFillerToSavedPlan(testFiller);
                                })
                        }
                    }
                })
        }
    })
}


//-----------------------------------------------------------------------------
// This function adds the filtered filler events of the day to the savedPlan
// subcollection of the logged-in user as new generated documents.
//-----------------------------------------------------------------------------
function addFillerToSavedPlan(fillerList) {

    // Get slected filter data from the local storage and use as the filler date
    let fillerDate = localStorage.getItem("filterDate");

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


callFunction();
// addFiller();
// populateSchedule();
// addFiller2();
filterFillerForSportEvent();