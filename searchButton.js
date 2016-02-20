var html = '';
$(function (){
    html += '<li class="">' ;
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
    $('#search-form').submit(function(e) {
        search(queryText.val());
        queryText.val('');
        e.preventDefault();
    });
});
function search(data) {
    if (typeof(data) == 'undefined') return;
    var url = $.ajax({
        type: 'GET',
        url: '/CSE',
        data: '',
        async: false
    }).responseText;
    window.open(url+data, '_blank');
}