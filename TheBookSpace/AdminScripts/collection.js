function CollectionListLoad() {
    $("#Name").focus();
    if ($("#CollectionType").val() == 1) {
        $("#lblTitle").html('New Arrival')
    }
    CollectionSearch();

    $("#BookMultiSearchModal").iziModal({
        title: 'Book Search',
        TransitionIn: 'FadeInRight',
        theme: 'light',
        headerColor: 'lightcyan',
        padding: 10,
        top: 70,
        width: '80%',
        zindex: 9999
    });
}


function CollectionSearch() {
    var obj = {
        CollectionType: $('#CollectionType').val(),
        RowCount: 1000,
    };
    CalltoApiController($("#HGetCollection").val(), obj, 'GetCollectionResponse');
}

function GetCollectionResponse(response) {
    table = $('#tblCollection').DataTable({
        responsive: true,
        data: JSON.parse(response),
        datasrc: "",
        destroy: true,
        searching: false,
        "bPaginate": false,
        "ordering": false,
        "columns": [
            { "data": "BookCD", "className": "align-center", width: "10%" },
            { "data": "BookName", "className": "align-center", width: "50%" },
            { "data": "CollectionName", "className": "align-center", width: "50%" },
        ],
        "columnDefs": [{
            "targets": 0,
            "data": "BookCD",
            "render": function (data) {
                return '<button type="button" style="margin-right:5px" class="btn btn-danger" title="Restore" onclick="CollectionDelete(this)"><i class="fa fa-trash"></i></button>';
            },
        }],
    });
}

function CollectionDelete(row) {
    var currentRow = $(row).closest("tr");
    var data = $('#tblCollection').DataTable().row(currentRow).data();

    ShowConfirmMessage('Q001', 'CollectionDeleteConfirm',data["BookCD"]);
}

function CollectionDeleteConfirm(bookCD) {
    var obj = {
        BookCD : bookCD,
        CollectionType: $('#CollectionType').val(),
        Mode: 'Delete',
    };
    CalltoApiController($("#HCollectionCUD").val(), obj, 'CollectionDeleteResponse');
}

function CollectionDeleteResponse(response) {
    if (response == 'true') {
        ShowMessage('I003');
        CollectionSearch();
    }
}