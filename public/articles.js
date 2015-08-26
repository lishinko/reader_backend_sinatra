var curPage = 1;
function refreshPager (page) {
	if (page <= 0) {page = 1};
	curPage = page;
	if (curPage <= 1) {
		$("#pager .previous").addClass("disabled")
	}else{
		$("#pager .previous").removeClass("disabled")
	}
}
function refreshNext(length){
	if(length < 10){
			$("#pager .next").addClass("disabled");
		}else{
			$("#pager .next").removeClass("disabled");
		}
}
function loadRss (url, page) {
	refreshPager(page);
	var url_page = url + curPage;
	$.get(url_page, function(data, status) {
		var json = JSON.parse(data);
		refreshNext(json.length);

		for (var i = 1;  i <= 10; i++) {
			var articleID = '#article' + i;
			var summaryID = '#summary' + i + ' .well';
			if (i <= json.length) {
				var article = json[i-1];
				$(articleID).text(article.title);
				$(summaryID).html(article.summary);
				$(articleID).show();
				$(summaryID).show();
			}else{
				$(articleID).hide();
				$(summaryID).hide();
			}
			
		};
	})
};

$(document).ready(function() {
	loadRss("/articles/", curPage);
	$("#pager .previous").click(function() {
		var page = curPage - 1;
		loadRss("/articles/", page);
	});
	$("#pager .next").click(function() {
		var page = curPage + 1;
		loadRss("/articles/", page);
	});
});

