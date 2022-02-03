function GetNewBooks() {
    var obj = {
        CollectionType: '1',
        RowCount: 20,
    };
    CalltoApiController($("#HGetCollection").val(), obj, 'GetNewBookResponse');
}

function GetNewBookResponse(data) {
    var jsondata = JSON.parse(data);
    jsondata.forEach(function (o) {
        var bookdiv = '';
    })
}