"use strict";

var protobotter = {
	items: [],
	constraints: [],
	language: "",
	languageFull: "",
	loaded: false,
	headerHtml: "",
	buttonText: "",
	prependText: ""
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
		   $(".language-dropdown").hide();
		   load_words(language);
		   
		    menuShown = false;
		    
	    })
	
}

function load_words(language){
	$(".wrapper").removeClass("de", "en", "es", "zh");
	$(".wrapper").addClass(language);
	
	// create word list
	var path = "js/wordlist_" + language + ".json";
	$.getJSON(path, function(json){
		
		protobotter.items = json.items;
		protobotter.constraints = json.constraints;
		protobotter.language = language;
		protobotter.languageFull = json.languageFull;
		protobotter.headerHtml = json.headerHtml;
		protobotter.buttonText = json.buttonText;
		protobotter.prependText = json.prependText;
		
		// render header
		$(".header-text").text("");
		$(".header-text").prepend(protobotter.headerHtml);
		$(".current-language").text(protobotter.languageFull);
		$(".nextbutton .author a").text(protobotter.buttonText);
		
		// render page body
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
    $("#intro").text(protobotter.prependText + " ");


    $("#design-item").html("");

    $("#design-item").text(designItem);

    $("#constraint").html("");
    $("#constraint").text(designConstraint);
    $("#constraint").append(".");
    $(".language-dropdown").hide();
    
    // Deutsche Sprache, Schwere Sprache
    if (protobotter.language == "de"){
		
	    
	    
	    // we have to find a few key phrases and hide them 
	    var str = $("#design-item").text(); 
	  
		// if there is a "für", we delete the "der/die/das"
		var str2 = $("#constraint").text();
		console.log(str2);
		if (str2.search("für") > -1){
			if (str.search(", die") > -1){ 
			str = str.replace(", die","");
			} 
		else if (str.search(", den") > -1){ 
			str = str.replace(", den",""); 
			} 
		else if (str.search(", das") > -1){ 
			str = str.replace(", das",""); 
			}
		}
		
		// make the ending den/die/das blue
		if (str.search(", die") > -1){ 
			str = str.replace(", die",", <span class='de-temp'>die</span>");
			} 
		else if (str.search(", den") > -1){ 
			str = str.replace(", den",", <span class='de-temp'>den</span>");
			} 
		else if (str.search(", das") > -1){ 
			str = str.replace(", das",", <span class='de-temp'>das</span>");
			}
		 
		$("#design-item").html(str); 
		
	    
    }
}




   
$("document").ready(initialize);
    