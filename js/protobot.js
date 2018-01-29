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
	
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UUA-39317711-2', 'auto');
ga('send', 'pageview');
	
	
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
	
	setLanguage(language);
	
	protobotter.loaded = true;
	
}

function setLanguage(language){
	load_words(language);
	
	 // dropdown code
    $( ".language-dropdown").hide();
	$(".language-dropdown li").removeClass("current");
	// hide link that matches the currently selected language
	$(".language-dropdown li#"+ language).addClass("current");
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
		   setLanguage(language);
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
		
		// render header and button
		$(".header-text").text("");
		$(".header-text").prepend(protobotter.headerHtml);
		$(".current-language").text(protobotter.languageFull);
		$(".nextbutton .author a").text(protobotter.buttonText);
		
		// render page body
		render();
	});
	
}

function render() {
// google analytics

ga('send', 'event', 'button', 'render', protobotter.language);
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
    
    $(".language-dropdown").hide();
    
    var str = $("#design-item").text(); 
    var str2 = $("#constraint").text();
    
    // English
    if(protobotter.language == "en"){
	    $("#constraint").append(".");
    }
    
    // Chinese
    
    if (protobotter.language == "zh"){
	    $("#design-item").remove();
	    $("#constraint").remove();
	    if (str2.search("为") == 0){
		    $("#intro").before("<div id='constraint'>"+str2+"</div>");
			$("#intro").after("<div id='design-item'>"+str+".</div>");
			
	    } else {
			$("#intro").after("<div id='design-item'>"+str+"</div>");
			$("#design-item").after("<div id='constraint'>"+str2+".</div>");
	    }
    }
    
    // Deutsche Sprache, Schwere Sprache
    if (protobotter.language == "de"){
	    
	    $("#constraint").append(".");
	    
	    // we have to find a few key phrases and hide them 
	    

		// if there is a "für", we delete the "der/die/das"
		
		if (str2.search("für") == 0){
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
    