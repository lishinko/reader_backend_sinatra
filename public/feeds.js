function newFeed(feed_url){
	$.post("/feeds/new",JSON.stringify( {link:feed_url}), function(data, status){
		alert(data);
	})
}
function removeFeed(ele, id){
	var feed = $(ele).siblings("span").text();
	$.ajax({
		url: 'feeds/' + id,
		type: 'delete',
		success: function(data, status){
			alert(status);
			loadFeeds('/feeds');
		}
	});
	return false;
}
function addFeed(link, id){
	var element = '<li class="list-group-item"><span name="feed">' + link + '</span><a href="#"><span class="text-right">删除</span></a></li>';
	$("#feed-list").append(element);
	$("#feed-list > li:last > a").click(function(){
		removeFeed(this, id);
	});
}
function loadFeeds(url){
	$.get(url, function(data, status) {
		$("#feed-list").find("li").remove();
		var json = JSON.parse(data);
		for (var i = 0;  i < json.length; i++) {
			var feed = json[i];
			var link = feed.link;
			var id = feed.id;
			addFeed(link, id);
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
		input.val("");
		return false;
	});
})	
