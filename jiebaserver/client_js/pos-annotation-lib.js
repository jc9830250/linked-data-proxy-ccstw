	$( "html" ).append( 
			"<div id='tagblock' class='tagblock'>"+
	        "<span class='glyphicon glyphicon-globe' aria-hidden='true' title='Search online'></span>"+
            "<button type='fullName' class='btn btn-xs btn-danger tagbtn'>姓名</button>"+
            "<button type='partialName' class='btn btn-xs btn-warning tagbtn'>別名</button>" +
            "<button type='timePeriod' class='btn btn-xs btn-success tagbtn'>時間</button>"+
            "<button type='placeName' class='btn btn-xs btn-primary tagbtn'>地名</button>"+
            "<button type='officialTitle' class='btn btn-xs btn-info tagbtn'>官名</button>" +
            "<button type='button' class='btn btn-xs deletebtn'>刪除</button>"+"</div>"	
	);
rangy.init();

highlighter = rangy.createHighlighter();
    highlighter.addClassApplier(rangy.createClassApplier("highlight", {
                ignoreWhiteSpace: true,
                tagNames: ["span", "a"]
            }));
    highlighter.addClassApplier(rangy.createClassApplier("fullName", {
                ignoreWhiteSpace: true,
                tagNames: ["span", "a"]
            }));
    highlighter.addClassApplier(rangy.createClassApplier("partialName", {
                ignoreWhiteSpace: true,
                tagNames: ["span", "a"]
            }));
    highlighter.addClassApplier(rangy.createClassApplier("timePeriod", {
                ignoreWhiteSpace: true,
                tagNames: ["span", "a"]
            }));
    highlighter.addClassApplier(rangy.createClassApplier("placeName", {
                ignoreWhiteSpace: true,
                tagNames: ["span", "a"]
            }));
    highlighter.addClassApplier(rangy.createClassApplier("officialTitle", {
                ignoreWhiteSpace: true,
                tagNames: ["span", "a"]
            }));
    
function highlightSelectedText_fullName() {
            highlighter.highlightSelection("fullName");
            highlighter.serialize();
        }
function highlightSelectedText_partialName() {
            highlighter.highlightSelection("partialName");
            highlighter.serialize();
        }
function highlightSelectedText_timePeriod() {
            highlighter.highlightSelection("timePeriod");
            highlighter.serialize();
        }
function highlightSelectedText_officialTitle() {
            highlighter.highlightSelection("officialTitle");
            highlighter.serialize();
        }

function showTagBlock(position){
	$(".tagblock").show();
	$(".tagblock").css("top", position.top + 35);
	$(".tagblock").css("left", position.left + 20);	
}
$(".deletebtn").click(function(){
            //$("span.selected").replaceWith($("span.selected").text());
            highlighter.unhighlightSelection();
            //console.log(rangy.serializeSelection()+"d");
            hideTagBlock();
	});

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

function hideTagBlock(){
	$("span.newSelected").replaceWith($("span.newSelected").text());
	$("span.selected").removeClass("selected");
	$(".tagblock").hide();	
}


