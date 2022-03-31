function populateSchedule() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").orderBy("name", "desc");//.doc(user.uid);
            //get the document for current user.
            //currentUser
            db.collection("users").doc(user.uid)
                //.orderBy("schedule").collection("womensFreeskiBigAir").orderBy("startTime")
                .get()
                .then(userDoc => {
                    if (userDoc.exists) {
                        console.log("exists");
                        console.log(userDoc);
                    }
                    //userDoc.orderBy("schedule");
                    // var i = 0;
                    // userDoc.forEach(doc => {
                    //     console.log(doc.data());
                    // })


                    //get the data fields of the user-
                    var userName = userDoc.data().name;
                    var userSchedule = userDoc.data().schedule;
                    var scheduleList = "";

                    arrayData = [];

                    userSchedule[0].get().then(test => {
                        console.log(test.data());
                    });

                    // userSchedule.get().then(testData=>{
                    //     console.log(testData.data());
                    // })

                    console.log(arrayData);

                    // userSchedule.sort(function (a, b){
                    //     //console.log(a.startTime);
                    //     return parseInt(a.startTime) - parseInt(b.startTime);
                    // })


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