var animals = ["cats", "dogs", "birds", "rabbit"];

$(document).ready(function(){
    function generateButtons(){
        for(var i=0; i<animals.length;i++){
            var button = $("<button>"); //<button></button>
            button.addClass("top-button");//<button class="top-button"></button>
            button.attr("data-type", animals[i]);//<button class="top-button" data-type="cats"></button>
            button.text(animals[i]);//<button class="top-button" data-type="cats">Cats</button>
            $("#buttons-container").append(button)

        }
    }

    function clearBTNs () {
        $("#butons-container").empty();
    }
    
    $("#clear-animalBTN").on("click", function(){
         
        clearBTNs ();
        
    } );

    $("#add-animalBTN").on("click", function(event){
        
        event.preventDefault();
        
        var newAnimal = $('input').eq(0).val();
        
        if (newAnimal.length > 2) {
            animals.push(newAnimal);
            console.log("new animal " + newAnimal + " was added.")
        }

        generateButtons();
        
    } );

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
                animalDiv.prepend(p)
                animalDiv.prepend(animalImage)
                $("#animal-container").prepend(animalDiv)


                
                
            }

        })
    })
})