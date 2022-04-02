function populateCardsDynamically() {
    let fillerTemplate = document.getElementById("fillerTemplate");
    let fillerGroup = document.getElementById("fillerGroup");

    db.collection("fillers").orderBy('Start').get()
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

                if (fillerStart % 1 != 0) {
                    fillerCard.querySelector('#start').innerHTML = fillerStart - 0.5 + ":30";
                } else {
                    fillerCard.querySelector('#start').innerHTML = fillerStart + ":00";
                }
                if (fillerEnd % 1 != 0) {
                    fillerCard.querySelector('#end').innerHTML = fillerEnd - 0.5 + ":30";
                } else {
                    fillerCard.querySelector('#end').innerHTML = fillerEnd + ":00";
                }

                fillerCard.querySelector('#location').innerHTML = fillerLocation;
                fillerCard.querySelector('#address').innerHTML = fillerAddress;
                fillerCard.querySelector('#img').src = `./images/${fillerImage}.jpg`;
                fillerGroup.appendChild(fillerCard);
            })

        })
}
populateCardsDynamically();