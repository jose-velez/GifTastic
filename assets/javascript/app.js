////////////////////////////////////////////////////////////////
//															  //
//					Gif Gif Gif 						     //
//															 //
///////////////////////////////////////////////////////////////

var apiKey = "dc6zaTOxFJmzC";
var topic = ["animals","nature", "beach", "cars", "superheroe", "technology", "anger", "space", "funny", "disney"];
var queryUrl = "http://api.giphy.com/v1/gifs/search?q="+ search + "/&api_key=dc6zaTOxFJmzC&limit=10";
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
	button.attr("class", "gifButton")
	button.text(gif);
	button.attr("data", gif);
	$("#buttons-view").append(button); 
	$("#gif").val("");
}) 

createButton();
// Api call with ajax
$(".gifButton").on("click", function()
{
	

});

$("#gif-view").on("click", '.gifImg' ,function(){
	state = $(this).attr("data-image");
	console.log(state);
	if(state === "still")
	{
		// change the source from the still image to the moving image
		//$(this).attr("src",)

		// Change the data image to moving 

	}
});

$('#buttons-view').on('click', '.gifButton', function(event) {
	var buttonClicked = $(event.target).attr('data');
	search= buttonClicked;
	queryUrl = "http://api.giphy.com/v1/gifs/search?q="+ search + "/&api_key=dc6zaTOxFJmzC&limit=10";
	// console.log(search);
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
			img.attr("class", "gifImg")
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

