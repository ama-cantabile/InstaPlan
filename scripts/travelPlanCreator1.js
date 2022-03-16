function planConfirm() {
    if(confirm("Please click 'OK' to create the plan. Otherwise, click 'Cancel' to remain on the page.")) {
        window.location.href = "travelPlan.html";
    } else {
        window.location.href = "#";
    }
}
