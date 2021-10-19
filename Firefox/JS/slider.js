var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
var refreshRate;
var x = document.getElementById("myRange").value;
var div = document.getElementById('slider');
output.innerHTML = slider.value;

slider.oninput = function() {
	output.innerHTML = this.value;
	console.log(slider.value);
	refreshRate = slider.value
	
	chrome.storage.sync.set({
            'refreshMs': refreshRate
        });
}
