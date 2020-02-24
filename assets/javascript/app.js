$(document).ready(function(){
    var animals = ["cats", "dogs","birds", "rabbit"]
    function generateButtons(){
        for(var i=0; i<animals.length;i++){
            var button = $("<button>"); //<button></button>
            button.addClass("top-button");//<button class="top-button"></button>
            button.attr("data-type", animals[i]);//<button class="top-button" data-type="cats"></button>
            button.text(animals[i]);//<button class="top-button" data-type="cats">Cats</button>
            $("#buttons-container").append(button)

        }
    }
    generateButtons();
    $(document).on("click", ".top-button", function(){
        console.log("top button on click")
        var name = $(this).attr("data-type");
        console.log("button " +name +" is clicked")
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +name +"&api_key=mqxv51pLW3cWYuB4EfW8TRjoilATKddB";
        $.ajax({
            url: "http://api.giphy.com/v1/gifs/search?q=" +name +"&api_key=mqxv51pLW3cWYuB4EfW8TRjoilATKddB",
            method: "GET"
        }).then(function(res){
            console.log(res);
            var results = res.data;
            for (let i = 0; i < results.length; i++) {
               var animalDiv = $("<div class='animal-div'>");
               var rating = results[i].rating;
               var p = $("<p>").text("Rating: "+rating);
               var animalImage = $("<img>");
               var animatedGifUrl = results[i].images.fixed_height.url;
               animalImage.attr("src", animatedGifUrl);
               animalImage.attr("data-state", "animated")
               animalImage.addClass("animal-image");
                animalDiv.append(p)
                animalDiv.append(animalImage)
                $("#animal-container").append(animalDiv)


                
                
            }

        })
    })
})