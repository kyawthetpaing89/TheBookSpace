function ShowSeriesSearchModal() {

    $('#SeriesMultiSearchModal').iziModal('open');

    var obj = {
    };
    CalltoApiController($("#HGetSeries").val(), obj, 'GetSeriesResponse');
}

function GetSeriesResponse(response) {
    table = $('#tblSeries').DataTable({
        responsive: true,
        data: JSON.parse(response),
        datasrc: "",
        destroy: true,
        "bPaginate": false,
        "ordering": false,
        "columns": [
            { "data": "SeriesCD", "className": "align-center", width: "15%" },
            { "data": "SeriesName", width: "85%" },
        ],
        "columnDefs": [{
            "targets": 0,
            "data": "SeriesCD",
            "render": function (data) {
                return '<input type="checkbox" class="chkStatus big-checkbox" name="a"/>';
            },
        }],
    });
}

function AddSeries() {
    let table = $('#tblSeries').DataTable();
    var jsonObj = [];
    $(table.$('input:checked')).each(function () {
        var currentRow = $(this).closest("tr")[0];
        var data = table.row(currentRow).data();
        item = {};
        item["CD"] = data["SeriesCD"];
        item["Type"] = '2';
        item["TypeName"] = 'Series';
        item["Name"] = data["SeriesName"];

        jsonObj.push(item);
    });

    AddPromotionItem(jsonObj);

    $('#SeriesMultiSearchModal').iziModal('close');
}