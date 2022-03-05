/**
 * @author Amadeus Min
 * 
 */

// This function retrieve current loggged in user and display the user's info on profile.html page
function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // Do something for the current logged-in user here: 
            console.log(user.uid);
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var user_Name = userDoc.data().name;
                    var user_Email = userDoc.data().email;
                    console.log(user_Name);
                    console.log(user_Email);
                    //method #1:  insert with html only
                    //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
                    //method #2:  insert using jquery
                    $("#name-goes-here").text(user_Name);                         //using jquery
                    $("#email-goes-here").text(user_Email);
                })
        } else {
            // No user is signed in.
        }
    });
}
insertName();
