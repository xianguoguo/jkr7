test("basic setup", function() {
	ok(typeof jkr7 === "function", "jkr7 function exists");
	var viewmodel = new jkr7("../scripts/sample.json");
	ok(typeof viewmodel.model === "object", "model object is set");
	try {
		new jkr7();
	} catch (e) {
		ok(e.name === "init error", "no url throws init error");
	}
});


asyncTest("read", function () {
	var viewmodel = new jkr7("../scripts/sample.json");
	ok(typeof viewmodel.read === "function", "read is a function");
	viewmodel.model = { "notfun": "no", "fun": "test" };
	var read = viewmodel.read();
	ok(read.promise, "read returns a promise");
	read.done(function () {
		ok(viewmodel.model.notfun && viewmodel.model.fun, "merged the model");
		ok(viewmodel.model.fun === "yes", "data returned from API overrites local data");
		start();
	});
});

asyncTest("add", function () {
	var viewmodel = new jkr7("../scripts/sample.json");
	ok(typeof viewmodel.add === "function", "add is a function");
	var add = viewmodel.add();
	ok(add.promise, "add returns a promise");
	add.done(function () {
		start();
	});
});

test("save", function () {
	var viewmodel = new jkr7("../scripts/sample.json");
	ok(typeof viewmodel.save === "function", "save is a function");
	var save = viewmodel.save();
	ok(save.promise, "save returns a promise");
	/*save.done(function () {
		start();
	});*/
});

test("remove", function () {
	var viewmodel = new jkr7("../scripts/sample.json");
	ok(typeof viewmodel.remove === "function", "remove is a function");
	var remove = viewmodel.remove();
	ok(remove.promise, "remove returns a promise");
	/*remove.done(function () {
		start();
	});*/
});