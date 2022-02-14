function ShowCategorySearchModal() {

    $('#CategoryMultiSearchModal').iziModal('open');

    var obj = {
    };
    CalltoApiController($("#HGetCategory").val(), obj, 'GetCategoryResponse');
}

function GetCategoryResponse(response) {
    table = $('#tblCategory').DataTable({
        responsive: true,
        data: JSON.parse(response),
        datasrc: "",
        destroy: true,
        "bPaginate": false,
        "ordering": false,
        "columns": [
            { "data": "CategoryCD", "className": "align-center", width: "15%" },
            { "data": "CategoryName", width: "85%" },
        ],
        "columnDefs": [{
            "targets": 0,
            "data": "CategoryCD",
            "render": function (data) {
                return '<input type="checkbox" class="chkStatus big-checkbox" name="a"/>';
            },
        }],
    });
}

function AddCategory() {
    let table = $('#tblCategory').DataTable();
    var jsonObj = [];
    $(table.$('input:checked')).each(function () {
        var currentRow = $(this).closest("tr")[0];
        var data = table.row(currentRow).data();
        item = {};
        item["CD"] = data["CategoryCD"];
        item["Type"] = '2';
        item["TypeName"] = 'Category';
        item["Name"] = data["CategoryName"];

        jsonObj.push(item);
    });

    AddPromotionItem(jsonObj);

    $('#CategoryMultiSearchModal').iziModal('close');
}