function removeFeed(ele){
	var feed = $(ele).siblings("span").text();
	alert(feed);
}
function addFeed(link){
	var element = '<li class="list-group-item"><span name="feed">' + link + '</span><a href="#"><span class="text-right">删除</span></a></li>';
	$("#feed-list").append(element);
}
function loadFeeds(url){
	$.get(url, function(data, status) {
		var json = JSON.parse(data);
		for (var i = 0;  i < json.length; i++) {
			var link = json[i];
			addFeed(link);
		}
	});
}

$(document).ready(function() {
	$("#feeds").click(function() {
		$("#feed-list").toggleClass("hide");
		loadFeeds('/feeds');
	});
	$("#feed-list > li > a").click(function(){
		removeFeed(this);
	});
})	
