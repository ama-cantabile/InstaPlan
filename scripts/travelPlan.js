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

                    console.log(userSchedule);
                    userSchedule.sort(function (a, b){
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