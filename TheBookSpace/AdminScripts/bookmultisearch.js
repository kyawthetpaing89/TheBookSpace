function ShowBookMultiSearchModal() {
    $('#BookMultiSearchModal').iziModal('open');
    BookSearch();  
}

function BookSearch() {
    var obj = {
        BookName: $("#Name").val(),
        SeriesName: $("#Series").val(),
    };
    CalltoApiController($("#HGetBook").val(), obj, 'GetBookResponse');
}

function GetBookResponse(response) {
    table = $('#tblBook').DataTable({
        responsive: true,
        data: JSON.parse(response),
        datasrc: "",
        destroy: true,
        searching: false,
        "bPaginate": false,
        "ordering": false,
        "columns": [
            { "data": "BookCD", "className": "align-center", width: "10%" },
            { "data": "BookName", width: "45%" },
            { "data": "Author", "className": "align-center", width: "15%" },
            { "data": "SeriesName", "className": "align-center", width: "15%" },
            { "data": "PublisherName", "className": "align-center", width: "15%" },
        ],
        "columnDefs": [{
            "targets": 0,
            "data": "BookCD",
            "render": function (data) {
                return '<input type="checkbox" class="chkStatus big-checkbox" name="a"/>';
            },
        }],
    });
}

function btnAddMultiBook() {
    let table = $('#tblBook').DataTable();
    var jsonObj = [];
    $(table.$('input:checked')).each(function () {
        var currentRow = $(this).closest("tr")[0];
        var data = table.row(currentRow).data();
        item = {};
        item["BookCD"] = data["BookCD"];

        jsonObj.push(item);  
    });

    var obj = {
        BookJson: JSON.stringify(jsonObj),
        CollectionType: $("#CollectionType").val(),
        Mode: 'New',
    };
    CalltoApiController($("#HCollectionCUD").val(), obj, 'CollectionCUDResponse');
}

function CollectionCUDResponse(data) {
    if (data == 'true') {
        ShowMessage('I001');

        CollectionSearch();
    }

    $('#BookMultiSearchModal').iziModal('close');
}
