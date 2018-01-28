"use strict";

var protobotter = {
	items: [],
	constraints: [],
	language: "",
	loaded: false
}
	
function initialize() {
	var url = window.location.hash;
	var language = "";
	if (url.includes("de")){
		language = "de";
	} else if (url.includes("es")) {
		language = "es"
	} else if (url.includes("zh")){
		language = "zh"
	} else {
		language = "en";
	}
	load_words(language);
	protobotter.loaded = true;
	
	
	 // dropdown code
       $( ".language-dropdown").hide();
	  var menuShown = false;
	    $(".header-language").click(function(){
		    if(menuShown == false){
			    $(".language-dropdown").show();
			    menuShown = true;
		    }
		    else if(menuShown == true){
			    $(".language-dropdown").hide();
			    menuShown = false;
		    }
	    })
	    $(".language-dropdown").click(function(e){
		   var languageClicked = $(e.target).parents("li").attr("id");
		   language = languageClicked;
		   window.location.hash = language;
		   console.log(languageClicked);
		   $(".language-dropdown").hide();
		   
		    menuShown = false;
		    
	    })
	
}

function load_words(language){
	var path = "js/wordlist_" + language + ".json";
	$.getJSON(path, function(json){
		protobotter.items = json.items;
		protobotter.constraints = json.constraints;
		protobotter.language = language;
		console.log(protobotter.items);
		render();
	});
	
}

function render() {
// how many entries are there?
var r1 = Math.floor(Math.random() * (protobotter.items.length));
var r2 = Math.floor(Math.random() * (protobotter.constraints.length));
var designItem = protobotter.items[r1];
var designConstraint = protobotter.constraints[r2];

// updates the text

    $("#intro").html("");
    $("#intro").text("Design a");


    $("#design-item").html("");

    $("#design-item").text(designItem);

    $("#constraint").html("");
    $("#constraint").text(designConstraint);
    $("#constraint").append(".");
}




   
$("document").ready(initialize);
    