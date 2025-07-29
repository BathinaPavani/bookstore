var cartArray = [];

$(function(){
    $("#cart-btn").click(function(){
        if(cartArray.length){
            
            displayCart();
        }else{
            alert("Add items to the cart first.");
        }
    });
    let xhrData;
    $.ajax({
        url:"books.xml",
        dataType: "xml",
        success: function(xml){
            xhrData = xml;
            console.log('success');
            $(xml).find("book").each(function(){
                //call functions and send data
                displayBooks($(this).find("title").text(), $(this).find("author").text(), $(this).find("genre").text(), $(this).find("price").text(),$(this).find("description").text(),$(this).find("image").text());
            })//each
        }, //success
        error: function(xhr,textStatus,errorThrown){
            alert("An error occurred!" + (errorThrown? errorThrown: xhr.status + " " + textStatus));
        }//error
    });//ajax


    $("#filter").on("change",function(){
        clearBooks();
        const option = $(this).val();
        if(option=="all"){
            $(xhrData).find("book").each(function(){
                //call functions and send data
                displayBooks($(this).find("title").text(), $(this).find("author").text(), $(this).find("genre").text(), $(this).find("price").text(),$(this).find("description").text(),$(this).find("image").text());
            })//each
        }else{
            $(xhrData).find("book").each(function(){
                //call functions and send data
                if($(this).find("genre").text().toLowerCase()==option){
                    displayBooks($(this).find("title").text(), $(this).find("author").text(), $(this).find("genre").text(), $(this).find("price").text(),$(this).find("description").text(),$(this).find("image").text());
                }
            })//each
        }
    });

    $("#searchBtn").click(function(){
        clearBooks();
        const bookSearch = $("#searchText").val().toLowerCase();
        const option = $("#filter").val();
        var gotBooks = false;
        $(xhrData).find("book").each(function(){
            //call functions and send data
            const myTitle = $(this).find("title").text().toLowerCase();
            if(myTitle.match(bookSearch) && (option=="all" || (option!="all" && option==$(this).find("genre").text().toLowerCase()))){
                displayBooks($(this).find("title").text(), $(this).find("author").text(), $(this).find("genre").text(), $(this).find("price").text(),$(this).find("description").text(),$(this).find("image").text());
                gotBooks=true;
            }
        })//each
        if(!gotBooks){
            $("#booksShow").append("<p>No match found!!! for the title you searched for.</p>");
        }
    });

    

    function displayBooks(title, author, genre, price, description, image){
        var bookDiv = document.createElement("div");
        var titleP = document.createElement("h3");
        var authorP = document.createElement("p");
        // var genreP = document.createElement("p");
        var priceP = document.createElement("p");
        // var descriptionP = document.createElement("p");
        var imageImg = document.createElement("img");
        var addBtn = document.createElement("button");

        $(titleP).text(title);
        $(titleP).attr("class","book-title");

        $(authorP).text(author);
        $(authorP).attr("class","book-author");
        // $(genreP).text(genre);
        $(priceP).text("$"+price);
        $(priceP).attr("class","book-price");
        // $(descriptionP).text(description);
        $(imageImg).attr("src",image);
        $(imageImg).attr("alt","image");
        $(imageImg).attr("class","book-image");

        $(addBtn).text("Add to Cart")
        $(addBtn).attr("class","add-to-cart-btn");
        $(addBtn).attr("id","add-to-cart-btn");

        $(addBtn).click(function(){
            const result = cartArray.find(item => item.key === title);
            if(result){
                result.value.qty+=1;
            }
            else{
                cartArray.push({key:title,value: {"image":image,"price":price,"qty":1}});
            }
            
        });

        $(bookDiv).attr("class","bookDiv");
        $(bookDiv).append(imageImg,titleP, authorP, priceP,addBtn);

        $("#booksShow").append(bookDiv);
    }

    function calcTotal(){
        var total_price = 0;
        cartArray.forEach(item => {
            total_price += parseFloat(item.value.price)*item.value.qty;
        });
        return total_price;
    }
    
   function displayCart(){
        $("#explore-main").empty();
        let booksCart = document.createElement("div");
        $(booksCart).attr("class","cart-show");
        $(booksCart).attr("id","cart-show");
        $("#explore-main").append(booksCart);
        if(!cartArray.length){
            $("#cart-show").append("<p>You don't have any items in your cart.</p>")
        }
        cartArray.forEach(item => {

            var bookDiv = document.createElement("div");
            var titleP = document.createElement("h3");
            var priceP = document.createElement("p");
            var imageImg = document.createElement("img");
            var labelQty = document.createElement("label");
            var qty = document.createElement("input");
            var deleteBtn = document.createElement("button");
            console.log(item.key);
            $(titleP).text(item.key);
            $(titleP).attr("class","cart-book-title");

            $(priceP).text("$"+item.value.price);
            $(priceP).attr("class","cart-book-price");

            $(imageImg).attr("src",item.value.image);
            $(imageImg).attr("alt","cart-image");
            $(imageImg).attr("class","cart-book-image");

            $(labelQty).text("Quantity: ");
            $(labelQty).append(qty);
            $(qty).attr("type","number");
            $(qty).attr("min","1");
            $(qty).attr("class","cart-qty");
            $(qty).attr("value",item.value.qty);

            $(qty).on("change",function(){

            });

            $(deleteBtn).text("Delete")
            $(deleteBtn).attr("class","delete-cart-btn");
            $(deleteBtn).attr("id","delete-cart-btn");

            $(deleteBtn).click(function(){
                cartArray = cartArray.filter(i => i.key !== item.key);
                displayCart();
                
            });

            $(bookDiv).attr("class","cartBookDiv");
            $(bookDiv).append(imageImg, titleP, priceP,labelQty,deleteBtn);
            $("#cart-show").append(bookDiv);
            
            /*$(checkoutBtn).click(function() {
                const totalBill = calcTotal() * 1.065; // Include tax in total
                const url = `checkout.html?bill=${totalBill.toFixed(2)}`;
                window.location.href = url;
            });*/
        });

        var subTotal =calcTotal();

        var subTotalPrice = document.createElement("h4");
        $(subTotalPrice).text(`Sub-total Price: ${subTotal}`);

        var subTotalTax = document.createElement("h5");
        $(subTotalTax).text(`Tax: ${(subTotal*0.065).toFixed(2)}`);

        var totalDiv = document.createElement("div");
        var totalPrice = document.createElement("h4");
        $(totalPrice).text(`Total Price: ${(subTotal*1.065).toFixed(2)}`);

        var checkoutBtn = document.createElement("button");
        $(checkoutBtn).text("Proceed to Checkout");
        $(checkoutBtn).click(function () {
            const totalBill = (subTotal * 1.065).toFixed(2); // Calculate total with tax
            window.location.href = `checkout.html?bill=${totalBill}`; // Redirect to checkout
        });
        
        totalDiv.append(subTotalPrice, subTotalTax,totalPrice,checkoutBtn);
        $("#explore-main").append(totalDiv);
        
    }

    function clearBooks(){
        $("#booksShow").empty();
    }
});


