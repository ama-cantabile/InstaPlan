function populateCardsDynamically() {
    let fillerTemplate = document.getElementById("fillerTemplate");
    let fillerGroup = document.getElementById("fillerGroup");
    
    db.collection("fillers").get()
        .then(allFillers => {
            allFillers.forEach(doc => {
                var fillerDetail = doc.data().Details;
                var fillerStart = doc.data().Start;
                var fillerEnd = doc.data().End;
                var fillerLocation = doc.data().Location;
                var fillerAddress = doc.data().Address;
                var fillerImage = doc.data().Image;
                let fillerCard = fillerTemplate.content.cloneNode(true);
                fillerCard.querySelector('#details').innerHTML = fillerDetail;
                fillerCard.querySelector('#start').innerHTML = fillerStart;
                fillerCard.querySelector('#end').innerHTML = fillerEnd;
                fillerCard.querySelector('#location').innerHTML = fillerLocation;
                fillerCard.querySelector('#address').innerHTML = fillerAddress;
                fillerCard.querySelector('#img').src = `./images/${fillerImage}.jpg`;
                fillerGroup.appendChild(fillerCard);
            })

        })
}
populateCardsDynamically();
