chrome.storage.sync.get([
	'refreshMs'
]), function(result) {
    //if there is anything in storage, set variables to that value
	if (result.refreshMs !== undefined) {
        var refreshRate = result.refreshMs;
    };
}


var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
var x = document.getElementById("myRange").value;
output.innerHTML = slider.value;

slider.value=refreshRate;

slider.oninput = function() {
	output.innerHTML = this.value;
	console.log(slider.value);
	refreshRate = slider.value;
	
	chrome.storage.sync.set({
            'refreshMs': refreshRate
        });
}
