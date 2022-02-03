function ShowSeriesSearchModal() {
    $('#SeriesSearchModal').iziModal('open');

    var obj = {
        SeriesName: '',
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
                return '<button type="button" class="btn btn-indigo" title="Select" onclick="SeriesSelect(this)"><i class="fa fa-check"></i> Select</button>'
            },
        }],
    });
}

function SeriesSelect(row) {
    var currentRow = $(row).closest("tr");
    var data = $('#tblSeries').DataTable().row(currentRow).data();

    $("#SeriesCD").val(data["SeriesCD"]);
    $("#SeriesName").val(data["SeriesName"]);

    $('#SeriesSearchModal').iziModal('close');
}

function SeriesClear() {
    $("#SeriesCD").val('');
    $("#SeriesName").val('');
}