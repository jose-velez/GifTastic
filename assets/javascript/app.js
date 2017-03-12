////////////////////////////////////////////////////////////////
//															  //
//					Gif Gif Gif 						     //
//															 //
///////////////////////////////////////////////////////////////

var apiKey = "dc6zaTOxFJmzC";
var topic = ["animals","nature", "beach", "cars", "superheroe", "technology", "anger", "space", "funny", "disney"];
var queryUrl = "https://api.giphy.com/v1/gifs/search?q="+ search + "/&api_key=dc6zaTOxFJmzC&limit=10";
var search = "";
var state;
var animate;
var still;
var gif;



$(document).ready(function(){


//for loop to create the buttons from the topic list 
function createButton(){
	for(var i = 0; i<topic.length; i++)
	{
		var button = $("<button>")
		button.attr("class", "gifButton")
		button.text(topic[i]);
		button.attr("data", topic[i]);
		$("#buttons-view").append(button); 
	}
}
//get the value from the input field and add it to the array
$("#add-gif").on("click", function(){
	event.preventDefault();
	gif = $("#gif").val().trim();
	topic.push(gif);
	console.log(gif);
	console.log(topic);
	var button = $("<button>")
	button.attr("class", "gifButton");
	button.text(gif);
	button.attr("data", gif);
	$("#buttons-view").append(button); 
	$("#gif").val("");
}) 

createButton();

// Function to play or pause the gif 
$("#gif-view").on("click", '.gifImg' ,function(){
	// get the status form the image to se if it's moving or not 
	state = $(this).attr("data-image");
	console.log(state);
	//if it's not movig it will animate 
	if(state === "still")
	{
		animate = $(this).attr("data-moving")
		// change the source from the still image to the moving image
		$(this).attr("src",animate);


		// Change the data image to moving 
		state = $(this).attr("data-image", "moving");

	}
	// if it's moving the it's going to make it still 
	else if(state === "moving")
	{
		still = $(this).attr("data-still");
		$(this).attr("src", still);
		state = $(this).attr("data-image", "still");
	}
});

// Api call with ajax
$('#buttons-view').on('click', '.gifButton', function(event) {
	var buttonClicked = $(event.target).attr('data');
	search= buttonClicked;
	queryUrl = "https://api.giphy.com/v1/gifs/search?q="+ search + "/&api_key=dc6zaTOxFJmzC&limit=10";
	$.ajax({
		url: queryUrl,
		method: "GET",
	}).done(function(response)
	{
		
		var result = response.data;
		for(var i=0; i<result.length; i++)
		{
			var givDiv = $("<div class = 'item'>")
			var img = $("<img>");
			img.attr("class", "gifImg col-md-4 col-sm-4")
			img.attr("src", result[i].images.fixed_height_still.url);
			img.attr("data-image", "still");
			img.attr("data-still", result[i].images.fixed_height_still.url);
			img.attr("data-moving", result[i].images.fixed_height.url);
			givDiv.append(img);
			$("#gif-view").prepend(givDiv);
		}
		
		
	})

	console.log(buttonClicked);
});
	
})

