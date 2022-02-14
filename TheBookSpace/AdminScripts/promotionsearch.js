function ShowPublisherSearchModal() {

    if ($("#").val() = '1') {

    }


    $('#PromotionSearchModal').iziModal('open');

    var obj = {};
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
                return '<button type="button" class="btn btn-indigo" title="Select" onclick="PublisherSelect(this)"><i class="fa fa-check"></i> Select</button>'
            },
        }],
    });
}

function PublisherSelect(row) {
    var currentRow = $(row).closest("tr");
    var data = $('#tblPublisher').DataTable().row(currentRow).data();

    $("#PublisherCD").val(data["PublisherCD"]);
    $("#PublisherName").val(data["PublisherName"]);

    $('#PublisherSearchModal').iziModal('close');
}

function PublisherClear() {
    $("#PublisherCD").val('');
    $("#PublisherName").val('');
}