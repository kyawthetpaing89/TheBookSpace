function ShowPublisherSearchModal() {

    $('#PublisherMultiSearchModal').iziModal('open');

    var obj = {
    };
    CalltoApiController($("#HGetPublisher").val(), obj, 'GetPublisherResponse');
}

function GetPublisherResponse(response) {
    table = $('#tblPublisher').DataTable({
        responsive: true,
        data: JSON.parse(response),
        datasrc: "",
        destroy: true,
        "bPaginate": false,
        "ordering": false,
        "columns": [
            { "data": "PublisherCD", "className": "align-center", width: "15%" },
            { "data": "PublisherName", width: "85%" },
        ],
        "columnDefs": [{
            "targets": 0,
            "data": "PublisherCD",
            "render": function (data) {
                return '<input type="checkbox" class="chkStatus big-checkbox" name="a"/>';
            },
        }],
    });
}

function AddPublisher() {
    let table = $('#tblPublisher').DataTable();
    var jsonObj = [];
    $(table.$('input:checked')).each(function () {
        var currentRow = $(this).closest("tr")[0];
        var data = table.row(currentRow).data();
        item = {};
        item["CD"] = data["PublisherCD"];
        item["Type"] = '5';
        item["TypeName"] = 'Publisher';
        item["Name"] = data["PublisherName"];

        jsonObj.push(item);
    });

    AddPromotionItem(jsonObj);

    $('#PublisherMultiSearchModal').iziModal('close');
}