//declaration time
var time;
var refreshRate;

//declare everything on the page as elements
var elements = document.getElementsByTagName('*');

//same old boring variable/comma delimited string variable declaration
var replaceThisWord = "";
var replaceWithWord = "";

var replaceThisCommaDel;
var replaceWithCommaDel;


//get stuff from storage
chrome.storage.sync.get([
    'replaceThis',
    'replaceWith',
	'refreshMs'
], function(result) {


    //if there is anything in storage, set variables to that value
    if (result.replaceThis !== undefined) {
        replaceThisCommaDel = result.replaceThis
    };
    if (result.replaceWith !== undefined) {
        replaceWithCommaDel = result.replaceWith
    };
	if (result.refreshMs !== undefined) {
        refreshRate = result.refreshMs
    };

    //remove commas from the start and end, for comma delimitated string to array conversion
    replaceThisCommaDel = replaceThisCommaDel.substring(1);
    replaceWithCommaDel = replaceWithCommaDel.substring(1);

    replaceThisCommaDel = replaceThisCommaDel.slice(0, -1);
    replaceWithCommaDel = replaceWithCommaDel.slice(0, -1);

    //convert to array
    var replaceThisArr = replaceThisCommaDel.split(',');
    var replaceWithArr = replaceWithCommaDel.split(',');

    //set length to array length
    var length = (replaceThisArr.length);

    //for every item in the array, run the function
    function rep(){
		for (i = 0; i < length; i++) {

			replaceThisWord = replaceThisArr[i];
			replaceWithWord = replaceWithArr[[i]];
			replaceWords(replaceThisWord, replaceWithWord);
		}
	}

    //replace the words
    function replaceWords(replaceThisText, ReplaceWithText) {

        //create the regex
        re = new RegExp(`\\b${replaceThisText}\\b`, 'gi');

        //if there is something to check
        if (replaceThisText !== "") {

            //look at everythign
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];

                for (var j = 0; j < element.childNodes.length; j++) {
                    var node = element.childNodes[j];

                    //and replace anything that matches the regex with the new string
                    if (node.nodeType === 3) {
                        var text = node.nodeValue;
                        var replacedText = text.replace(re, String(ReplaceWithText));

                        if (replacedText !== text) {
                            element.replaceChild(document.createTextNode(replacedText), node);
                        }
                    }
                }
            }
        }
    }
	
	//Run every few seconds
	function timer() {
		time = setInterval(rep, refreshRate);
		console.log(refreshRate);
	}
	
	//runs on load and runs after loading
	timer();
});

