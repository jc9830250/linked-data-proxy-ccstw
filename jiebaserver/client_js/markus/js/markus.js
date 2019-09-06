$( document ).ready(function() {
//    rangy.deserializeSelection("0/1/3/1/1/4/2:0,0/1/3/1/1/4/2:0");
//	rangy.deserializeSelection("12/7/3/1/1/4/2:2,12/7/3/1/1/4/2:2");
//	
    var position;
	//�I������
	$("div.jumbotron").click(function(){
		hideTagBlock();
		var userSelection = window.getSelection().getRangeAt(0);
		if( $(event.target).is("span.tagtext") ){
			$(event.target).addClass("selected");
			 position= $(event.target).offset();
			showTagBlock(position);
		}
		else if(userSelection != ""){	
			//var newNode = document.createElement("span");
			//newNode.className += "tagtext newSelected";
			//userSelection.surroundContents(newNode);
			position= $(event.target).offset();
			showTagBlock(position);
		}
                
	});

	//tag���s
	$( ".tagbtn" ).click(function() {
		$("span.newSelected").addClass("selected");
		$("span.newSelected").removeClass("newSelected");
		
		var currentType = $("span.selected").attr("type");
		
		if( currentType!="" ){
			$("span.selected").removeClass(currentType).attr("type", "");	
		}
		
		var newType = $(this).attr("type");

		//$("span.selected").addClass(newType).attr("type", newType);
                if(newType=="fullName"){
			highlightSelectedText_fullName();
		}else if(newType=="partialName"){
			highlightSelectedText_partialName();
		}else if(newType=="timePeriod"){
			highlightSelectedText_timePeriod();
		}else if(newType=="placeName"){
			highlightSelectedText_placeName();
		}else if(newType=="officialTitle"){
			highlightSelectedText_officialTitle();
		}
//		console.log(rangy.serializeSelection()+ newType);
		hideTagBlock();
	});
        
	//�R�����s
	$(".deletebtn").click(function(){
            //$("span.selected").replaceWith($("span.selected").text());
            highlighter.unhighlightSelection();
            //console.log(rangy.serializeSelection()+"d");
            hideTagBlock();
	});


	//�έp���P���Otag���s
	$(".tagSumbtn").click(function() {
		hideTagBlock();
		var selectedType = $(this).attr("type");
		typeSum(selectedType);
	});
	
	//tagBlock�����j�M���s
	$(".glyphicon-globe").click(function(){
		var currentText = $("span.selected").text();
		
		if( currentText == "" ){
			currentText = $("span.newSelected").text();
		}

		showSearchResult(currentText);
		$("input.form-control").attr("value", currentText);
		hideTagBlock();
	});
	
	//�����k��j�M���s
	$(".nav-tabs>li").click(function(){
		$("div.searchResultDiv").hide();
		$(".nav-tabs>li.active").removeClass("active");
		$(this).addClass("active");
		
		var selectedType = $(this).attr("type");
		$("div[type=" + selectedType + "]").show();
		
	});
	
	//�����j�M��enter��
	$("input.form-control").keypress(function(key){
		var keycode = (key.keyCode ? key.keyCode : key.which);
		if( keycode == 13 ){
			var currentText = $(this).val();
			showSearchResult(currentText);
		}
	});
	
});


//tagBlock�X�{�b�Q������r���U��
function showTagBlock(position){
	$(".tagblock").show();
	$(".tagblock").css("top", position.top + 35);
	$(".tagblock").css("left", position.left + 20);	
}

//����tagBlock
function hideTagBlock(){
	$("span.newSelected").replaceWith($("span.newSelected").text());
	$("span.selected").removeClass("selected");
	$(".tagblock").hide();	
}

//�N�Ҧ��Q����������r����highlight
function typeSum(type){
	$("span[type=" + type + "]").addClass("selected");
}

//��ܦU�Ӻ����j�M���G
function showSearchResult(currentText){
	var CBDBurl = "http://cbdb.fas.harvard.edu/cbdbapi/person.php? name=" + currentText;
	$("#CBDBResult").attr("src", CBDBurl);
	
	var TGAZurl = "http://dh.chinese-empires.eu/beta/chgis.html?n=" + currentText;
	$("#TGAZResult").attr("src", TGAZurl);
	
	var ZDicturl = "http://www.zdic.net/search/?c=3&q=" + currentText;
	$("#ZDictResult").attr("src", ZDicturl);

	var Wikipediaurl = "https://zh.m.wikipedia.org/wiki/" + currentText;
	$("#WikipediaResult").attr("src", Wikipediaurl);	
}




/*
function showSearchBar(type){
	$("div.input-group").hide();
	$("div[type=" + type + "]").show();
}
*/




/*

$( ".tagbtn" ).click(function() {
	var tagColor = $(this).css("backgroundColor");
	console.log(tagColor);
    var userSelection = window.getSelection().getRangeAt(0);
    highlightRange(userSelection, tagColor);

$("span").click(function() {
    //$(this).addClass("selected");
	alert("span.tagtext click");
    
});	
	
	
});
*/

/*
function highlightRange(range, color) {

	var newNode = document.createElement("span");
	newNode.setAttribute(
       "style",
       "color: "+ color + ";" + "font-size: 30px;"
    );
	
	newNode.className += "tagtext selected";
	newNode.id = "tagtext";
	
	
	newNode.setAttribute(
       "style",
       "color: red;"
    );
    range.surroundContents(newNode);
	
	//var position = $("span.selected").position();
	//alert(position.left);
}

*/
/*
$("span").click(function() {
    //$(this).addClass("selected");
	//alert("span.tagtext click");
    
});
*/
