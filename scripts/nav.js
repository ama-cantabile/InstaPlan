function searchPage() {
    let page;
    page = document.getElementById("searchText").value;
    console.log(page);

    switch (page) {
        case "Travel Plan" || "travel plan":
            location.href = "travelPlanCreator1.html";
            break;
        case "Home" || "home":
            location.href = "main.html";
            break;
        case "Fillers" || "fillers":
            location.href = "fillers.html";
            break;
        default:
            location.href = "#";
    }
}