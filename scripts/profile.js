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
                    var user_address = userDoc.data().address;
                    var user_city = userDoc.data().city;
                    var user_province = userDoc.data().province;
                    var user_postalCode = userDoc.data().province;
                    //var user_Email = userDoc.data().email;
                    
                    //method #1:  insert with html only
                    //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
                    //method #2:  insert using jquery
                    // $("#name-goes-here").value(user_Name);                         //using jquery
                    // $("#email-goes-here").text(user_Email);

                    document.getElementById("inputName").value = user_Name;

                })
        } else {
            // No user is signed in.
        }
    });
}
insertName();

function saveUserInfo() {
    userName = document.getElementById('inputName').value;       //get the value of the field with id="nameInput"
    userAddress = document.getElementById('inputAddress').value;     //get the value of the field with id="schoolInput"
    userCity = document.getElementById('inputCity').value;       //get the value of the field with id="cityInput"
    userProvince = document.getElementById('inputProvince').value;
    userPostalCode = document.getElementById('inputPostalCode').value;

    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)

            // write/update the databse
            currentUser.update({
                name: userName,
                address: userAddress,
                city: userCity,
                province: userProvince,
                postalCode: userPostalCode
            })
                .then(() => {
                    console.log("Document successfully updated!");
                    //document.getElementById('personalInfoFields').disabled = true;
                })
        }
    })
}