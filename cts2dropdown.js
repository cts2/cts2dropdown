var Cts2DropdownConfig = {
    serviceUrl: "http://localhost:8080/webapp/"
};
  
String.prototype.trim=function(){return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');};

var init = function() {

	$(document).ready(
			function() {
				$('[class*="cts2-valueset("]').each(function(index) {
					var optionString = $(this).attr('class').match(/.*cts2-valueset\((.*)\)/i)[1]
				
					var options = optionString.split(';');
					
					var valueSetName;
					for(var j in options){
						var tokens = options[j].split(':')
						var optionName = tokens[0].trim();
						if(optionName == "name"){
							valueSetName = tokens[1].trim();
						}
					}
			
					var $select = $(this);
					
					var url = Cts2DropdownConfig.serviceUrl + "/valueset/${valueSetName}/resolution?format=json&callback=?";
					$.getJSON(url.replace("${valueSetName}", valueSetName), function(data) {
						
						for(var i in data.iteratableResolvedValueSet.entryList) {
							var entry = data.iteratableResolvedValueSet.entryList[i];
							var key = entry.name;
							var value = entry.name;
							var designation = entry.designation;
							
							$select.append($("<option></option>")
							         .attr("value",key)
							         .text(value + " - " + designation)); 
						}
					});
				});
			});
}

if (typeof $ == "undefined") {
	var e = document.createElement("script");
	e.src = "http://code.jquery.com/jquery-1.7.1.min.js";
	e.type = "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(e);

	e.onload = init;
} else {
	init();
}