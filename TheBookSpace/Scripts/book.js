function GetNewBooks() {
    var obj = {
        CollectionType: '1',
        RowCount: 20,
    };
    CalltoApiController($("#HGetCollection").val(), obj, 'GetNewBookResponse');
}

function GetNewBookResponse(data) {

}