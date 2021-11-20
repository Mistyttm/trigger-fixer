var refreshRate;

chrome.storage.sync.get([
	'refreshMs'
], function(result) {
	console.log("hi");
	console.log(result.refreshMs);
        refreshRate = result.refreshMs;

	var slider = document.getElementById("myRange");
	var output = document.getElementById("demo");
	var x = document.getElementById("myRange").value;
	document.getElementById("myRange").value = refreshRate;
	output.innerHTML = slider.value;

	slider.oninput = function() {
	output.innerHTML = this.value;
	console.log(slider.value);
	refreshRate = slider.value;
	console.log(refreshRate);
	
	chrome.storage.sync.set({
            'refreshMs': refreshRate
        });
}

});
