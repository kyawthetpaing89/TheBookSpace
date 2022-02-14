function ShowAuthorSearchModal() {

    $('#AuthorMultiSearchModal').iziModal('open');

    var obj = {
    };
    CalltoApiController($("#HGetAuthor").val(), obj, 'GetAuthorResponse');
}

function GetAuthorResponse(response) {
    table = $('#tblAuthor').DataTable({
        responsive: true,
        data: JSON.parse(response),
        datasrc: "",
        destroy: true,
        "bPaginate": false,
        "ordering": false,
        "columns": [
            { "data": "AuthorCD", "className": "align-center", width: "15%" },
            { "data": "AuthorName", width: "85%" },
        ],
        "columnDefs": [{
            "targets": 0,
            "data": "AuthorCD",
            "render": function (data) {
                return '<input type="checkbox" class="chkStatus big-checkbox" name="a"/>';
            },
        }],
    });
}

function AddAuthor() {
    let table = $('#tblAuthor').DataTable();
    var jsonObj = [];
    $(table.$('input:checked')).each(function () {
        var currentRow = $(this).closest("tr")[0];
        var data = table.row(currentRow).data();
        item = {};
        item["CD"] = data["AuthorCD"];
        item["Type"] = '4';
        item["TypeName"] = 'Author';
        item["Name"] = data["AuthorName"];

        jsonObj.push(item);
    });

    AddPromotionItem(jsonObj);

    $('#AuthorMultiSearchModal').iziModal('close');
}