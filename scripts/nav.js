// Logs the user out from the app.
function logOut() {
    firebase.auth().signOut().then(() => {
        location.href = "login.html";
    }).catch((error) => {
        console.log("Cannot log out.")
    });
}

let url = location.href;

console.log(url);
