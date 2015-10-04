$(function (){
	var html = '<li class="">' ;
	html += ' <form id="search-form" class="navbar-form navbar-right hidden-xs">';
	html += '   <div id="search-fields">';
	html += '    <div class="form-group">';
	html += '       <span class="visible-xs-inline">Unread</span>';
	html += '     <input id="txtQuery" type="text" class="form-control" placeholder="Search" name="search" value="">';
	html += '   </div>';
	html += '  <button id="search-submit" type="submit" class="btn btn-default"><i class="fa fa-search fa-fw" title="Search"></i></button>';
	html += ' </div>';
	html += ' </form>';
	html += '</li>';

	var navBar = $('#main-nav');
	navBar.append(html);

	var queryText = $('#txtQuery');
	$('#search-submit').on('click',function() {
		$('#search-form').submit(function(e) {
			search(queryText.val());
			queryText.val('');
			e.preventDefault();
		});
	});
	$('#search-form').on('submit', function(e) {
		search(queryText.val());
		queryText.val('');
		e.preventDefault();
	});
});
function search(data) {
	if (typeof(data) == 'undefined') data = '';
  $.ajax({
   url: 'http://yourserver/',
   data: 'your image',
   success: function(){window.open(someUrl);},
   async: false
  });

  $.get('/CSE', function(res) {
     window.open(res+data, '_blank');
   });
}
