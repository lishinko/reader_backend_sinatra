function newFeed(feed_url){
	$.post("/feeds/new",JSON.stringify( {link:feed_url}), function(data, status){
		alert(data);
	})
}
function removeFeed(ele){
	var feed = $(ele).siblings("span").text();
	alert(feed);
}
function addFeed(link){
	var element = '<li class="list-group-item"><span name="feed">' + link + '</span><a href="#"><span class="text-right">删除</span></a></li>';
	$("#feed-list").append(element);
	$("#feed-list > li:last > a").click(function(){
		removeFeed(this);
	});
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
	
	$("#new-feed > button").click(function(){
		var input = $("#new-feed > input");
		var url = input.val();
		newFeed(url);
		return false;
	});
})	
