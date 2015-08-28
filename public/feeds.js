function newFeed(feed_url){
	//$.post("/feeds/new", {link:feed_url}, function(data, status){
	//	alert(data);
//	})
	$.ajax({
		url: '/feeds/new',
		data: {
			link: feed_url,
		},
		type: 'post',
		dataType:'json',
		success:function(data, status){
			alert(data);
		},
		error:function(){
			alert('error');
		}
	});
}
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
	$("#new-feed > button").click(function(){
		var input = $("#new-feed > input");
		var url = input.val();
		newFeed(url);
	});
})	
