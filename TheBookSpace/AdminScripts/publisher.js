function PublisherListLoad() {
    $("#Name").focus();
    PublisherSearch();
}

function GetPublisherResponse(response) {
    table = $('#tblPublisher').DataTable({
        responsive: true,
        data: JSON.parse(response),
        datasrc: "",
        destroy: true,
        searching: false,
        "bPaginate": false,
        "ordering": false,
        "columns": [
            { "data": "DeleteFlg", "className": "align-center", width: "10%" },
            { "data": "PublisherName", "className": "align-center", width: "80%" },
            { "data": "DeleteFlg", "className": "align-center", width: "10%" },
        ],
        "columnDefs": [{
            "targets": 0,
            "data": "DeleteFlg",
            "render": function (data) {
                if (data == false) {
                    return '<button type="button" style="margin-right:5px" class="btn btn-info" title="Edit" onclick="PublisherEdit(this)"><i class="fa fa-pencil-alt"></i></button>' +
                        '<button type ="button" style="margin-right:5px" class="btn btn-danger" title = "Delete" onclick = "PublisherDelete(this)" > <i class="fa fa-trash"></i></button > '
                } else {
                    return '<button type="button" style="margin-right:5px" class="btn btn-warning" title="Restore" onclick="PublisherRestore(this)"><i class="fa fa-recycle"></i></button>';
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

function PublisherSearch() {
    var obj = {
        PublisherName: $("#Name").val(),
        Type: $('#Type').children("option:selected").val(),
    };
    CalltoApiController($("#HGetPublisher").val(), obj, 'GetPublisherResponse');
}

function PublisherEdit(row) {
    var currentRow = $(row).closest("tr");
    var data = $('#tblPublisher').DataTable().row(currentRow).data();

    var url = $("#HPublisherEntry").val() + '?PublisherCD=' + data["PublisherCD"] + '&Mode=Edit';
    location.href = url;
}

function PublisherDelete(row) {
    var currentRow = $(row).closest("tr");
    var data = $('#tblPublisher').DataTable().row(currentRow).data();

    var url = $("#HPublisherEntry").val() + '?PublisherCD=' + data["PublisherCD"] + '&Mode=Delete';
    location.href = url;
}

function PublisherRestore(row) {
    var currentRow = $(row).closest("tr");
    var data = $('#tblPublisher').DataTable().row(currentRow).data();

    var url = $("#HPublisherEntry").val() + '?PublisherCD=' + data["PublisherCD"] + '&Mode=Restore';
    location.href = url;
}

function PublisherEntryLoad() {
    $("#PublisherName").focus();
    $("#Type").val($("#xType").val());
    if ($("#Mode").val() == 'Edit') {
        $("#btnText").text('Update');
    } else if ($("#Mode").val() == 'Delete') {
        $("#PublisherName").attr("disabled", true);
        $("#Type").attr("disabled", true);
        $("#AboutPublisher").attr("disabled", true);

        $("#btnText").html('Delete');
        $("#btnSave").removeClass('btn btn-green');
        $("#btnSave").addClass('btn btn-red');
    } else if ($("#Mode").val() == 'Restore') {
        $("#PublisherName").attr("disabled", true);
        $("#Type").attr("disabled", true);
        $("#AboutPublisher").attr("disabled", true);

        $("#btnText").html('Restore');
        $("#btnSave").removeClass('btn btn-green');
        $("#btnSave").addClass('btn btn-warning');
    }
}

function PublisherErrorCheck() {
    if (!$("#PublisherName").val()) {
        ShowMessage('E001', 'Publisher Name');
        $("#PublisherName").focus();

        return false;
    }

    return true;
}

function PublisherSaveClick() {
    if ($("#Mode").val() == 'Delete') {
        ShowConfirmMessage('Q001', 'PublisherDeleteConfirm');
    }
    else if ($("#Mode").val() == 'Restore') {
        ShowConfirmMessage('Q002', 'PublisherRestoreConfirm');
    } else {
        if (PublisherErrorCheck()) {
            var obj = {
                PublisherCD: $("#PublisherCD").val(),
                PublisherName: $("#PublisherName").val(),
                Type: $('#Type').children("option:selected").val(),
                AboutPublisher: $("#AboutPublisher").val(),
                UpdatedBy: $("#LoginID").val(),
                Mode: $("#Mode").val(),
            }

            CalltoApiController($("#HPublisherCUD").val(), obj, 'SaveResponse');
        }
    }
}

function SaveResponse(response) {
    if (response == 'true') {
        if ($("#Mode").val() == 'New') {
            ShowMessage('I001');
            PublisherEntryClear();
        }
        else if ($("#Mode").val() == 'Edit') {
            ShowMessage('I002');
        }
        else {
            ShowMessage('I003');
        }
    }
}

function PublisherEntryClear() {
    $("#PublisherName").val('');
    $('#Type').children("option:selected").text('');
    $("#AboutPublisher").val('');
}

function PublisherDeleteConfirm() {
    var obj = {
        PublisherCD: $("#PublisherCD").val(),
        UpdatedBy: $("#LoginID").val(),
        Mode: $("#Mode").val(),
    }

    CalltoApiController($("#HPublisherCUD").val(), obj, 'PublisherDeleteResponse');
}

function PublisherDeleteResponse(response) {
    if (response == 'true') {
        ShowMessage('I003');
        window.setTimeout(function () {
            location.href = $("#HPublisherList").val();
        }, 1500);
    }
}

function PublisherRestoreConfirm() {
    var obj = {
        PublisherCD: $("#PublisherCD").val(),
        UpdatedBy: $("#LoginID").val(),
        Mode: $("#Mode").val(),
    }

    CalltoApiController($("#HPublisherCUD").val(), obj, 'PublisherRestoreResponse');
}

function PublisherRestoreResponse(response) {
    if (response == 'true') {
        ShowMessage('I004');
        window.setTimeout(function () {
            location.href = $("#HPublisherList").val();
        }, 1500);
    }
}