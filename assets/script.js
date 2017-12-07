$(document).ready(function() {
    var startingList = ["monk", "paladin", "wizard", "fighter", "bard"];

    function displayGifs() {
        var searchTerm = $(this).attr("data-name");
        console.log(searchTerm);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            console.log(response);
            $("#gif-dump").empty();

            var results = response.data;
            var gifDiv;
            var rating;
            var p;
            var image;
            for (var i = 0; results.length; i++) {
                gifDiv = $("<div class='gifItem'>");
                rating = results[i].rating;
                p = $("<p>").text("Rating: " + rating);
                image = $("<img>");

                image.addClass("gif");
                image.attr("data-state", "still");
                image.attr("data-still", results[i].images.fixed_height_still.url);
                image.attr("data-animate", results[i].images.fixed_height.url);
                image.attr("src", results[i].images.fixed_height_still.url);
                gifDiv.append(p);
                gifDiv.append(image);

                $("#gif-dump").prepend(gifDiv);
            }
           
        });
    } 

    function makeButtons() {
  
        $("#button-dump").empty();

        for (var i = 0; i < startingList.length; i++) {
            var button = $("<button>");
            button.addClass("gifButton");
            button.attr("data-name", startingList[i]);
            button.text(startingList[i]);
            $("#button-dump").append(button);
        }
    } 

    $("#go").click(function(event) {
        
        event.preventDefault();
      
        var searchInput = $("#term-input").val().trim();
      
        startingList.push(searchInput);
   
        makeButtons();
    });
    
    function toggleGif() {
        var state = $(this).attr('data-state');
        console.log(state);
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        console.log(state);
    } 

   
    $(document).on("click", ".gif", toggleGif)
    makeButtons();

}); 