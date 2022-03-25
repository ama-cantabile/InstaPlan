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

                    currentUser.collection("savedPlan").orderBy('Start').get()
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
                                var event = doc.data().Event;
                                var date = doc.data().Date;
                                var start = doc.data().Start;
                                var end = doc.data().End;
                                var location = doc.data().Location;
                                var img = doc.data().Img;

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
                        var gap = plan.docs[i + 1].data().Start - plan.docs[i].data().End;
                        console.log(gap);

                        db.collection("fillers").where("Start", "==", "10:00").where("End", "==", "11:00").where("gap", "===", gap)
                        
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

//call the function to run it 
function callFunction(){
    setTimeout(function(){
        populateSchedule()}, 3000);
}
callFunction();
addFiller();
//populateSchedule();