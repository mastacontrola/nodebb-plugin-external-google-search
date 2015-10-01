<h1>Google CSE</h1>

<form class="form">
	<div class="row">
		<div class="col-sm-4 col-xs-12">
			<div class="form-group">
				<label>Engine ID</label>
				<input id="engineID" type="text" class="form-control" placeholder="Engine ID" value="{engineID}">
			</div>
		</div>
	</div>
</form>

<button class="btn btn-primary" id="save">Save</button>

<input id="csrf_token" type="hidden" value="{csrf}" />

<script type="text/javascript">
'use strict';
/* globals app, socket */
$(document).ready(function() {
	$('#save').on('click', function() {
		$.post(config.relative_path + '/api/admin/plugins/externalCSE/save', {
			_csrf : $('#csrf_token').val(),
			engineID : $('#engineID').val()
		}, function(data) {
			if(typeof data === 'string') {
				app.alertSuccess('Settings saved');
			}
		});

		return false;
	});
});

</script>
