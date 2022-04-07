/**
 * @author Amadeus Min
 */

// This function retrieve current loggged in user and display the user's info on profile.html page
function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid);
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get()
                .then(userDoc => {
                    var user_Name = userDoc.data().name;
                    var user_address = userDoc.data().address;
                    var user_city = userDoc.data().city;
                    var user_province = userDoc.data().province;
                    var user_postalCode = userDoc.data().postalCode;

                    document.getElementById("inputName").value = user_Name;
                    document.getElementById("inputAddress").value = user_address;
                    document.getElementById("inputCity").value = user_city;
                    document.getElementById("inputProvince").value = user_province;
                    document.getElementById("inputPostalCode").value = user_postalCode;

                })
        } else {
            console.log("No user is signed in")
        }
    });
}
insertName();

// Receive the input from the html input fields and update the data to the Firestore
function saveUserInfo() {
    userName = document.getElementById('inputName').value;
    userAddress = document.getElementById('inputAddress').value;
    userCity = document.getElementById('inputCity').value;
    userProvince = document.getElementById('inputProvince').value;
    userPostalCode = document.getElementById('inputPostalCode').value;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid)

            currentUser.update({
                name: userName,
                address: userAddress,
                city: userCity,
                province: userProvince,
                postalCode: userPostalCode
            })
                .then(() => {
                    console.log("Document successfully updated!");
                })
        }
    })
}

document.getElementById("save").addEventListener("click", confirm);

// Alert a user whether the updating is successful or not.
function confirm() {
    alert("Saved!");
}