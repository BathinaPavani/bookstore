var welcomeMessage = ["Bibliophile","Bookworm","Bookman","Scholar","Intellectual","Reader","Savant"]

window.addEventListener("load",function(){
    this.document.getElementById("welcome-heading").innerHTML += welcomeMessage[Math.floor(Math.random() * 7)];
    this.document.getElementById("cart-btn").addEventListener("click",function(){
        alert("Go to explore and add your items! Then you will be able to see the cart.");
    },false);
},false);