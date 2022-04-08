// Reads the user's name from Firebase and displays it on the main.html.
function addUserName() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid);
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get()
                .then(userDoc => {
                    var userName = userDoc.data().name;
                    console.log(userName);
                    $("#name").text(userName);
                })
        } else {
        }
    });
}
addUserName();