function populateSchedule() {
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


                    let planTemplate = document.getElementById("planTemplate");
                    let planGroup = document.getElementById("planGroup");

                   currentUser.collection("savedPlan").orderBy('Date').get()
                        .then(plan => {
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


                    console.log(userSchedule);
                    userSchedule.sort(function (a, b) {
                        //console.log(a.startTime);
                        return parseInt(a.startTime) - parseInt(b.startTime);
                    })


                    for (var i = 0; i < userSchedule.length; i++) {
                        userSchedule[i].get()
                            .then(scheduleDoc => {
                                // let testData = scheduleDoc.data().startTime.split(":")
                                // console.log(testData[0]);
                                scheduleList += '<ul class="list-group-item"><div class="d-flex w-100 justify-content-between" ><div class="d-flex flex-column bd-highlight mb-3"><h5 class="mb-1">'
                                    + scheduleDoc.data().event + '</h5><br /><h6 class="mb-4">Time: ' + scheduleDoc.data().startTime + "-" + scheduleDoc.data().endTime + '</h6><p class="mb-1">Location: ' + scheduleDoc.data().location
                                    + '</p></div><small>3 days ago</small><img src="./images/Vancouver.jpg" style="width: 20%; height:150px;"></div></ul >';

                                document.getElementById("schedule-list-container").innerHTML = scheduleList;
                            })


                        //if the data fields are not empty, then write them in to the form.
                        if (userName != null) {
                            //document.getElementById("nameInput").value = userName;
                        }
                    }


                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateSchedule();