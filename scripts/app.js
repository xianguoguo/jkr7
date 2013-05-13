(function () {

	$(function() {

		var client = new jkr7("scripts/sample.json");

		$("#model .fetch").on("click", function () {
			var elem = $("#model textarea");
			client.read().done(function (data) {
				elem.val(JSON.stringify(data));
			});
			return false;
		});

		$("#model .save").on("click", function () {
			var model = $("#model textarea").val();
			client.save(model).fail(function (e) {
				alert(e.statusText);
			});
			return false;
		});

	});

})();