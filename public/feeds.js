function removeFeed(ele){
	var feed = $(ele).parent().text();
	alert(feed);
}
$(document).ready(function() {
	$("#feeds").click(function() {
		$("#feed-list").toggleClass("hide")
	});
	$("#feed-list > li > a").click(function(){
		removeFeed(this);
	});
})	
