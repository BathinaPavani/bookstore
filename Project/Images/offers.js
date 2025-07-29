
$(document).ready(function() {
    function fetchOffers() {
        $.ajax({
            url: "offers.json",
            dataType: "json",
            success: function(data) {
                $.each(data.offers.offer, function(index, offer) {
                    displayOffers(offer.title, offer.description, offer.image);
                }); 
            },// sucess
            error: function(xhr, textStatus, errorThrown) {
                intervalClear();
                console.error("An error occurred: " + (errorThrown ? errorThrown : xhr.textStatus + " " + textStatus));
            }//error 
        });// ajax
    }// end fetch offers
    
    function displayOffers(title ,description , image ) {
        var offerMessage = $('#offersPara');
        // create elements
        var offersDiv = $('<div>');
        var titleTD = $('<p>');
        var descriptionTD = $('<p>');
        var imageTag = $('<img>');

        titleTD.text(title);
        descriptionTD.text(description);
        imageTag.attr('src', 'images/offers/' + image);

        offersDiv.append(imageTag);
        offersDiv.append(titleTD);
        offersDiv.append(descriptionTD);
        
        // dispaly offers
        offerMessage.append(offersDiv);
    }// end function displayOffers

    // Fetch and display offers initially
    fetchOffers();

    // Fetch and display offers every 30 seconds
    interavlSetter = setInterval(fetchOffers, 30000);

    function intervalClear(){
        window.clearInterval(interavlSetter);
    }// end function intervalClear
});// ready 