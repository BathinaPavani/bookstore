
var userReviewList = []; // Create empty array for adding the user reviews 
var userRatingList = []; // Create empty array for adding the user rating 

function displayReviews() {
    let reviewsOutput = document.getElementById('reviewsList');
    let output = '';
    for (let i=0 ; i < userReviewList.length ; i++) {
        output += "<p>" + (i+1) + "." + "Review: "+ userReviewList[i] +" . Rating:"+ userRatingList[i] +"</p> ";
    }

    reviewsOutput.innerHTML = output;
} // End function displayReviews

function addReview() {
    let userReview = document.getElementById('reviewTextBox').value;
    let userRating = document.getElementById('rating').value;
    if (!userRating || !userReview) {
        alert('Please enter a review and rating');
        return;
    }// end if 
    // add user review, rating to array
    userReviewList.push(userReview); 
    userRatingList.push(userRating);

    // Clear the review and rating fields
    document.getElementById('reviewTextBox').value = '';
    document.getElementById('rating').value = '';
} // End function addReview()

window.addEventListener('load',function() {
    document.getElementById('reviewButton').addEventListener('click', addReview, false); // Event listener for reviewSubmit button
    document.getElementById('listButton').addEventListener('click', displayReviews, false); // Function to display reviews
},false); // Page load event