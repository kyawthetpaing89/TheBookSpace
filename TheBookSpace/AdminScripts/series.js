function SeriesListLoad() {
    $("#Name").focus();
    SeriesSearch();
}

function GetSeriesResponse(response) {
    table = $('#tblSeries').DataTable({
        responsive: true,
        data: JSON.parse(response),
        datasrc: "",
        destroy: true,
        searching: false,
        "bPaginate": false,
        "ordering": false,
        "columns": [
            { "data": "DeleteFlg", "className": "align-center", width: "10%" },
            { "data": "SeriesName", "className": "align-center", width: "80%" },
            { "data": "DeleteFlg", "className": "align-center", width: "10%" },
        ],
        "columnDefs": [{
            "targets": 0,
            "data": "DeleteFlg",
            "render": function (data) {
                if (data == false) {
                    return '<button type="button" style="margin-right:5px" class="btn btn-info" title="Edit" onclick="SeriesEdit(this)"><i class="fa fa-pencil-alt"></i></button>' +
                        '<button type ="button" style="margin-right:5px" class="btn btn-danger" title = "Delete" onclick = "SeriesDelete(this)" > <i class="fa fa-trash"></i></button > '
                } else {
                    return '<button type="button" style="margin-right:5px" class="btn btn-warning" title="Restore" onclick="SeriesRestore(this)"><i class="fa fa-recycle"></i></button>';
                }
            },
        },
        {
            "targets": 2,
            "data": "DeleteFlg",
            "render": function (data) {
                if (data == true)
                    return '<span style="width:80%;font-size:13px" class="badge bg-danger">Deleted</span>';
                else
                    return '<span style="width:80%;font-size:13px" class="badge bg-success">Active</span>';
            },
        }],
    });
}

function SeriesSearch() {
    var obj = {
        SeriesName: $("#Name").val(),
    };
    CalltoApiController($("#HGetSeries").val(), obj, 'GetSeriesResponse');
}

function SeriesEdit(row) {
    var currentRow = $(row).closest("tr");
    var data = $('#tblSeries').DataTable().row(currentRow).data();

    var url = $("#HSeriesEntry").val() + '?SeriesCD=' + data["SeriesCD"] + '&Mode=Edit';
    location.href = url;
}

function SeriesDelete(row) {
    var currentRow = $(row).closest("tr");
    var data = $('#tblSeries').DataTable().row(currentRow).data();

    var url = $("#HSeriesEntry").val() + '?SeriesCD=' + data["SeriesCD"] + '&Mode=Delete';
    location.href = url;
}

function SeriesRestore(row) {
    var currentRow = $(row).closest("tr");
    var data = $('#tblSeries').DataTable().row(currentRow).data();

    var url = $("#HSeriesEntry").val() + '?SeriesCD=' + data["SeriesCD"] + '&Mode=Restore';
    location.href = url;
}

function SeriesEntryLoad() {
    $("#SeriesName").focus();
    $("#Type").val($("#xType").val());
    if ($("#Mode").val() == 'Edit') {
        $("#btnText").text('Update');
    } else if ($("#Mode").val() == 'Delete') {
        $("#SeriesName").attr("disabled", true);
        $("#Type").attr("disabled", true);
        $("#AboutSeries").attr("disabled", true);

        $("#btnText").html('Delete');
        $("#btnSave").removeClass('btn btn-green');
        $("#btnSave").addClass('btn btn-red');
    } else if ($("#Mode").val() == 'Restore') {
        $("#SeriesName").attr("disabled", true);
        $("#Type").attr("disabled", true);
        $("#AboutSeries").attr("disabled", true);

        $("#btnText").html('Restore');
        $("#btnSave").removeClass('btn btn-green');
        $("#btnSave").addClass('btn btn-warning');
    }
}

function SeriesErrorCheck() {
    if (!$("#SeriesName").val()) {
        ShowMessage('E001', 'Series Name');
        $("#SeriesName").focus();

        return false;
    }

    return true;
}

function SeriesSaveClick() {
    if ($("#Mode").val() == 'Delete') {
        ShowConfirmMessage('Q001', 'SeriesDeleteConfirm');
    }
    else if ($("#Mode").val() == 'Restore') {
        ShowConfirmMessage('Q002', 'SeriesRestoreConfirm');
    } else {
        if (SeriesErrorCheck()) {
            var obj = {
                SeriesCD: $("#SeriesCD").val(),
                SeriesName: $("#SeriesName").val(),
                Type: $('#Type').children("option:selected").val(),
                AboutSeries: $("#AboutSeries").val(),
                UpdatedBy: $("#LoginID").val(),
                Mode: $("#Mode").val(),
            }

            CalltoApiController($("#HSeriesCUD").val(), obj, 'SaveResponse');
        }
    }
}

function SaveResponse(response) {
    if (response == 'true') {
        if ($("#Mode").val() == 'New') {
            ShowMessage('I001');
            SeriesEntryClear();
        }
        else if ($("#Mode").val() == 'Edit') {
            ShowMessage('I002');
        }
        else {
            ShowMessage('I003');
        }
    }
}

function SeriesEntryClear() {
    $("#SeriesName").val('');
    $('#Type').children("option:selected").text('');
    $("#AboutSeries").val('');
}

function SeriesDeleteConfirm() {
    var obj = {
        SeriesCD: $("#SeriesCD").val(),
        UpdatedBy: $("#LoginID").val(),
        Mode: $("#Mode").val(),
    }

    CalltoApiController($("#HSeriesCUD").val(), obj, 'SeriesDeleteResponse');
}

function SeriesDeleteResponse(response) {
    if (response == 'true') {
        ShowMessage('I003');
        window.setTimeout(function () {
            location.href = $("#HSeriesList").val();
        }, 1500);
    }
}

function SeriesRestoreConfirm() {
    var obj = {
        SeriesCD: $("#SeriesCD").val(),
        UpdatedBy: $("#LoginID").val(),
        Mode: $("#Mode").val(),
    }

    CalltoApiController($("#HSeriesCUD").val(), obj, 'SeriesRestoreResponse');
}

function SeriesRestoreResponse(response) {
    if (response == 'true') {
        ShowMessage('I004');
        window.setTimeout(function () {
            location.href = $("#HSeriesList").val();
        }, 1500);
    }
}