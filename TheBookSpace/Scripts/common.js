function CalltoApiController(url, model,returnFunction) {
    var result = '';
    $.ajax({
        url: url.replace("%2F", "/"),
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(model),
        async: false,
        headers:
        {
            Authorization: 'Basic ' + btoa('KTP' + ':' + 'KTP12345!')
        },
        success: function (data) {
            result = data;
            var fn = window[returnFunction];
            fn(result);
        },
    });
}