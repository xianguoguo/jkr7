/* usage

var viewmodel = new jkr7("url");
viewmodel.fetch();
// should return xhr object with data

viewmodel.add() // optionally can pass data, if no parameter it still creates new object
// returns new xhr

viewmodel.save() // optionally can pass data, else it takes from viewmodel.model
// sends data with update method, returns xhr

viewmodel.remove()
// sends entire object with delete method, returns xhr

*/

var jkr7 = (function () {

    "use strict";

    // private variables / functions
    var defaults, ajaxData, methods, Client;

    defaults = {
        ajax: {
            dataType: "json"
        }
    };

    ajaxData = function (settings) {
        var config = $.extend(true, {}, defaults.ajax, settings);
        return $.ajax(config);
    };

    methods = {
        "create": "POST",
        "read": "GET",
        "update": "PUT",
        "delete": "DELETE"
    };

    // public methods
    Client = function (url, options) {
        this.model = {};
        this.options = $.extend(true, {}, defaults, options);
        this.options.ajax.url = url;
        if (typeof url === "undefined") {
            throw {
                name: "init error",
                message: "no URL defined"
            };
        }
    };

    Client.prototype.read = function (options) {
        var _this = this,
            settings = $.extend(true, {}, this.options.ajax, options);

        settings.type = methods["read"];
        settings.success = function (data) {
            // merge data, with data from API/DB taking precedence
            $.extend(true, _this.model, data);
        };
        return ajaxData(settings);
    };

    Client.prototype.add = function (data, options) {
        var settings = $.extend(true, {}, this.options.ajax, options);

        // if no data is passed, create an empty object and let the API/DB handle it
        data = data || {};
        settings.data = data;
        settings.type = methods["create"];
        return ajaxData(settings);
    };

    Client.prototype.save = function (data, options) {
        var settings = $.extend(true, {}, this.options.ajax, options);

        // if no data is passed, assume we should use the model object
        settings.data = data || this.model;
        settings.contentType = "application/json";
        settings.type = methods["update"];
        return ajaxData(settings);
    };

    Client.prototype.remove = function (options) {
        var settings = $.extend(true, {}, this.options.ajax, options);

        // assume API/DB can parse the id from the url/object
        settings.data = this.model;
        settings.type = methods["delete"];
        return ajaxData(settings);
    };

    return Client;

})();