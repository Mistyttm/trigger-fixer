//variable declaration

//comma delimited variables, putting the arrays in these variables
var replaceThisCommaDel = ",";
var replaceWithCommaDel = ",";


//setting body as the body element
var body = document.getElementsByTagName("body")[0];

//setting arrays
var replaceThisArr;
var replaceWithArr;


//big function, everything goes in here because chrome storage get is asynchronous, so it has to be like this
chrome.storage.sync.get([
    'replaceThis',
    'replaceWith',
], function(result) {

    //declare submit event listener
    document.getElementById("submit").addEventListener("click", submitClicked);

    //if there is anything in storage, set variables to that value
    if (result.replaceThis !== undefined) {
        replaceThisCommaDel = replaceThisCommaDel + String(result.replaceThis)
    };
    if (result.replaceWith !== undefined) {
        replaceWithCommaDel = replaceWithCommaDel + String(result.replaceWith)
    };
	if (result.replaceWith !== undefined) {
        refreshrate = result.replaceWith
    };

    //remove the first character (comma)
    replaceThisCommaDel = replaceThisCommaDel.substring(1);
    replaceWithCommaDel = replaceWithCommaDel.substring(1);


    //put comma delimited values into an array
    var replaceThisArr = replaceThisCommaDel.split(',');
    var replaceWithArr = replaceWithCommaDel.split(',');
	
	//adds the special div element to a variable
	var div = document.getElementById('div1');


    //display all the resulty things
    for (i = 1; i < replaceThisArr.length - 1; i++) {
		
        //display replaceThisWord value
        let thisWord = document.createElement('span');
        thisWord.setAttribute("id", "replaceThisWord" + i);
        thisWord = replaceThisArr[i];
		
		//display filler
		let fillerPhrase = document.createElement('span');
        fillerPhrase.setAttribute("id", "fillerPhrase" + i);
        fillerPhrase = "is replaced by";

        //display replaceWithWord value
        let withWord = document.createElement('span');
        withWord.setAttribute("id", "replaceWithWord" + i);
        withWord = replaceWithArr[i];

		
		
        //line breaks go brrrrrrrrrrr
        div.append(thisWord + " " + fillerPhrase + " " + withWord);
        div.append(document.createElement("br"));
		


        //add button
        let removeButton = document.createElement("button");
        removeButton.setAttribute("id", "removeButton" + i);
		removeButton.setAttribute("class", "buttona button2");
        removeButton.innerHTML = 'Remove';
        div.appendChild(removeButton);
        var withID = "replaceWithWord" + i;
		div.append(document.createElement("br"));
		div.append(document.createElement("br"));


        //button click listener function
        removeButton.addEventListener("click", function() {

            //get the position (1, 2, 3 or whatever) from the button ID
            let positionNumber = removeButton.id;
            positionNumber = Number(positionNumber.slice(12));


            //remove specified things from the arrays
            let replaceThisArrRemoved = replaceThisArr.splice(positionNumber, 1);
            let replaceWithArrRemoved = replaceWithArr.splice(positionNumber, 1);


            //set these variables to nothing
            replaceThisCommaDel = "";
            replaceWithCommaDel = "";


            //reconstruct the comma delimited string
            for (i = 0; i < replaceThisArr.length; i++) {
                replaceThisCommaDel = replaceThisCommaDel + replaceThisArr[i] + ",";
                replaceWithCommaDel = replaceWithCommaDel + replaceWithArr[i] + ",";
            };


            //remove comma at the end
            replaceThisCommaDel = replaceThisCommaDel.slice(0, -1);
            replaceWithCommaDel = replaceWithCommaDel.slice(0, -1);


            //save in chrome storage
            chrome.storage.sync.set({
                'replaceThis': replaceThisCommaDel
            });
            chrome.storage.sync.set({
                'replaceWith': replaceWithCommaDel
            });

            //reload, to display the new list (without the thing you just removed)
            location.reload()
        });



        //line break go brrrrrr again
        body.append(document.createElement("br"));
        body.append(document.createElement("br"));
        body.append(document.createElement("br"));




    }

    //submit click listener
    function submitClicked() {


        //get value of input boxes
        var replaceThisWord = (String(document.getElementById("replaceThis").value));
        var replaceWithWord = (String(document.getElementById("replaceWith").value));

        //add input box values to the end of the arrays
        replaceThisArr = replaceThisArr.push(replaceThisWord);
        replaceWithArr = replaceWithArr.push(replaceWithWord);

        //if theres no comma at the start, add a comma (comma delimited strings should be in the form ",apples,bananas,pears," for this code to work
        if (replaceThisCommaDel.charAt(0) !== ",") {
            replaceThisCommaDel = "," + replaceThisCommaDel;
            replaceWithCommaDel = "," + replaceWithCommaDel;
        };

        //create the comma delimited string
        for (i = 0; i < replaceThisArr.length; i++) {
            replaceThisCommaDel = replaceThisCommaDel + replaceThisArr[i] + ",";
            replaceWithCommaDel = replaceWithCommaDel + replaceWithArr[i] + ",";
        };

        //dont know why this is here, but it works while it is here so it can stay
        replaceThisCommaDel = replaceThisCommaDel + replaceThisWord + ",";
        replaceWithCommaDel = replaceWithCommaDel + replaceWithWord + ",";

        //save to chrome storage
        chrome.storage.sync.set({
            'replaceThis': replaceThisCommaDel
        });
        chrome.storage.sync.set({
            'replaceWith': replaceWithCommaDel
        });



    }
});

