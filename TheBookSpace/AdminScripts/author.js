function AuthorListLoad() {
    $("#Name").focus();
    AuthorSearch();
}

function GetAuthorResponse(response) {
    table = $('#tblAuthor').DataTable({
        responsive: true,
        data: JSON.parse(response),
        datasrc: "",
        destroy: true,
        searching: false,
        "bPaginate": false,
        "ordering": false,
        "columns": [
            { "data": "DeleteFlg", "className": "align-center",width:"10%" },
            { "data": "AuthorName", "className": "align-center",width:"20%" },
            { "data": "TypeName", "className": "align-center",width:"10%" },
            { "data": "AboutAuthor", "className": "align-center",width:"50%" },
            { "data": "DeleteFlg", "className": "align-center",width:"10%" },
        ],
        "columnDefs": [{
            "targets": 0,
            "data": "DeleteFlg",
            "render": function (data) {
                if (data == false) {
                    return '<button type="button" style="margin-right:5px" class="btn btn-info" title="Edit" onclick="AuthorEdit(this)"><i class="fa fa-pencil-alt"></i></button>' +
                        '<button type ="button" style="margin-right:5px" class="btn btn-danger" title = "Delete" onclick = "AuthorDelete(this)" > <i class="fa fa-trash"></i></button > '
                } else {
                    return '<button type="button" style="margin-right:5px" class="btn btn-warning" title="Restore" onclick="AuthorRestore(this)"><i class="fa fa-recycle"></i></button>';
                }
            },
        },
        {
            "targets": 4,
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

function AuthorSearch() {
    var obj = {
        AuthorName: $("#Name").val(),
        Type: $('#Type').children("option:selected").val(),
    };
    CalltoApiController($("#HGetAuthor").val(), obj, 'GetAuthorResponse');
}

function AuthorEdit(row) {
    var currentRow = $(row).closest("tr");
    var data = $('#tblAuthor').DataTable().row(currentRow).data();

    var url = $("#HAuthorEntry").val() + '?AuthorCD=' + data["AuthorCD"] + '&Mode=Edit';
    location.href = url;
}

function AuthorDelete(row) {
    var currentRow = $(row).closest("tr");
    var data = $('#tblAuthor').DataTable().row(currentRow).data();

    var url = $("#HAuthorEntry").val() + '?AuthorCD=' + data["AuthorCD"] + '&Mode=Delete';
    location.href = url;
}

function AuthorRestore(row) {
    var currentRow = $(row).closest("tr");
    var data = $('#tblAuthor').DataTable().row(currentRow).data();

    var url = $("#HAuthorEntry").val() + '?AuthorCD=' + data["AuthorCD"] + '&Mode=Restore';
    location.href = url;
}

function AuthorEntryLoad() {
    $("#AuthorName").focus();
    $("#Type").val($("#xType").val());
    if ($("#Mode").val() == 'Edit') {
        $("#btnText").text('Update');
    } else if ($("#Mode").val() == 'Delete') {
        $("#AuthorName").attr("disabled", true);
        $("#Type").attr("disabled", true);
        $("#AboutAuthor").attr("disabled", true);

        $("#btnText").html('Delete');
        $("#btnSave").removeClass('btn btn-green');
        $("#btnSave").addClass('btn btn-red');
    } else if ($("#Mode").val() == 'Restore') {
        $("#AuthorName").attr("disabled", true);
        $("#Type").attr("disabled", true);
        $("#AboutAuthor").attr("disabled", true);

        $("#btnText").html('Restore');
        $("#btnSave").removeClass('btn btn-green');
        $("#btnSave").addClass('btn btn-warning');
    }
}

function AuthorErrorCheck() {
    if (!$("#AuthorName").val()) {
        ShowMessage('E001', 'Author Name');
        $("#AuthorName").focus();

        return false;
    }

    return true;
}

function AuthorSaveClick() {
    if ($("#Mode").val() == 'Delete') {
        ShowConfirmMessage('Q001', 'AuthorDeleteConfirm');
    }
    else if ($("#Mode").val() == 'Restore') {
        ShowConfirmMessage('Q002', 'AuthorRestoreConfirm');
    } else {
        if (AuthorErrorCheck()) {
            var obj = {
                AuthorCD: $("#AuthorCD").val(),
                AuthorName: $("#AuthorName").val(),
                Type: $('#Type').children("option:selected").val(),
                AboutAuthor: $("#AboutAuthor").val(),
                UpdatedBy: $("#LoginID").val(),
                Mode: $("#Mode").val(),
            }

            CalltoApiController($("#HAuthorCUD").val(), obj, 'SaveResponse');
        }
    }
}

function SaveResponse(response) {
    if (response == 'true') {
        if ($("#Mode").val() == 'New') {
            ShowMessage('I001');
            AuthorEntryClear();
        }
        else if ($("#Mode").val() == 'Edit') {
            ShowMessage('I002');
        }
        else {
            ShowMessage('I003');
        }
    }
}

function AuthorEntryClear() {
    $("#AuthorName").val('');
    $('#Type').children("option:selected").text('');
    $("#AboutAuthor").val('');
}

function AuthorDeleteConfirm() {
    var obj = {
        AuthorCD: $("#AuthorCD").val(),
        UpdatedBy: $("#LoginID").val(),
        Mode: $("#Mode").val(),
    }

    CalltoApiController($("#HAuthorCUD").val(), obj,'AuthorDeleteResponse');
}

function AuthorDeleteResponse(response) {
    if (response == 'true') {
        ShowMessage('I003');
        window.setTimeout(function () {
            location.href = $("#HAuthorList").val();
        }, 1500);
    }
}

function AuthorRestoreConfirm() {
    var obj = {
        AuthorCD: $("#AuthorCD").val(),
        UpdatedBy: $("#LoginID").val(),
        Mode: $("#Mode").val(),
    }

    CalltoApiController($("#HAuthorCUD").val(), obj, 'AuthorRestoreResponse');
}

function AuthorRestoreResponse(response) {
    if (response == 'true') {
        ShowMessage('I004');
        window.setTimeout(function () {
            location.href = $("#HAuthorList").val();
        }, 1500);
    }
}