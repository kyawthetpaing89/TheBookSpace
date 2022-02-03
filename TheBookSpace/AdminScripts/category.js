function CategoryListLoad() {
    $("#Name").focus();
    CategorySearch();
}

function GetCategoryResponse(response) {
    table = $('#tblCategory').DataTable({
        responsive: true,
        data: JSON.parse(response),
        datasrc: "",
        destroy: true,
        searching: false,
        "bPaginate": false,
        "ordering": false,
        "columns": [
            { "data": "DeleteFlg", "className": "align-center", width: "10%" },
            { "data": "CategoryName", "className": "align-center", width: "80%" },
            { "data": "DeleteFlg", "className": "align-center", width: "10%" },
        ],
        "columnDefs": [{
            "targets": 0,
            "data": "DeleteFlg",
            "render": function (data) {
                if (data == false) {
                    return '<button type="button" style="margin-right:5px" class="btn btn-info" title="Edit" onclick="CategoryEdit(this)"><i class="fa fa-pencil-alt"></i></button>' +
                        '<button type ="button" style="margin-right:5px" class="btn btn-danger" title = "Delete" onclick = "CategoryDelete(this)" > <i class="fa fa-trash"></i></button > '
                } else {
                    return '<button type="button" style="margin-right:5px" class="btn btn-warning" title="Restore" onclick="CategoryRestore(this)"><i class="fa fa-recycle"></i></button>';
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

function CategorySearch() {
    var obj = {
        CategoryName: $("#Name").val(),
        Type: $('#Type').children("option:selected").val(),
    };
    CalltoApiController($("#HGetCategory").val(), obj, 'GetCategoryResponse');
}

function CategoryEdit(row) {
    var currentRow = $(row).closest("tr");
    var data = $('#tblCategory').DataTable().row(currentRow).data();

    var url = $("#HCategoryEntry").val() + '?CategoryCD=' + data["CategoryCD"] + '&Mode=Edit';
    location.href = url;
}

function CategoryDelete(row) {
    var currentRow = $(row).closest("tr");
    var data = $('#tblCategory').DataTable().row(currentRow).data();

    var url = $("#HCategoryEntry").val() + '?CategoryCD=' + data["CategoryCD"] + '&Mode=Delete';
    location.href = url;
}

function CategoryRestore(row) {
    var currentRow = $(row).closest("tr");
    var data = $('#tblCategory').DataTable().row(currentRow).data();

    var url = $("#HCategoryEntry").val() + '?CategoryCD=' + data["CategoryCD"] + '&Mode=Restore';
    location.href = url;
}

function CategoryEntryLoad() {
    $("#CategoryName").focus();
    $("#Type").val($("#xType").val());
    if ($("#Mode").val() == 'Edit') {
        $("#btnText").text('Update');
    } else if ($("#Mode").val() == 'Delete') {
        $("#CategoryName").attr("disabled", true);
        $("#Type").attr("disabled", true);

        $("#btnText").html('Delete');
        $("#btnSave").removeClass('btn btn-green');
        $("#btnSave").addClass('btn btn-red');
    } else if ($("#Mode").val() == 'Restore') {
        $("#CategoryName").attr("disabled", true);
        $("#Type").attr("disabled", true);

        $("#btnText").html('Restore');
        $("#btnSave").removeClass('btn btn-green');
        $("#btnSave").addClass('btn btn-warning');
    }
}

function CategoryErrorCheck() {
    if (!$("#CategoryName").val()) {
        ShowMessage('E001', 'Category Name');
        $("#CategoryName").focus();

        return false;
    }

    return true;
}

function CategorySaveClick() {
    if ($("#Mode").val() == 'Delete') {
        ShowConfirmMessage('Q001', 'CategoryDeleteConfirm');
    }
    else if ($("#Mode").val() == 'Restore') {
        ShowConfirmMessage('Q002', 'CategoryRestoreConfirm');
    } else {
        if (CategoryErrorCheck()) {
            var obj = {
                CategoryCD: $("#CategoryCD").val(),
                CategoryName: $("#CategoryName").val(),
                Type: $('#Type').children("option:selected").val(),
                AboutCategory: $("#AboutCategory").val(),
                UpdatedBy: $("#LoginID").val(),
                Mode: $("#Mode").val(),
            }

            CalltoApiController($("#HCategoryCUD").val(), obj, 'SaveResponse');
        }
    }
}

function SaveResponse(response) {
    if (response == 'true') {
        if ($("#Mode").val() == 'New') {
            ShowMessage('I001');
            CategoryEntryClear();
        }
        else if ($("#Mode").val() == 'Edit') {
            ShowMessage('I002');
        }
        else {
            ShowMessage('I003');
        }
    }
}

function CategoryEntryClear() {
    $("#CategoryName").val('');
    $('#Type').children("option:selected").text('');
    $("#AboutCategory").val('');
}

function CategoryDeleteConfirm() {
    var obj = {
        CategoryCD: $("#CategoryCD").val(),
        UpdatedBy: $("#LoginID").val(),
        Mode: $("#Mode").val(),
    }

    CalltoApiController($("#HCategoryCUD").val(), obj, 'CategoryDeleteResponse');
}

function CategoryDeleteResponse(response) {
    if (response == 'true') {
        ShowMessage('I003');
        window.setTimeout(function () {
            location.href = $("#HCategoryList").val();
        }, 1500);
    }
}

function CategoryRestoreConfirm() {
    var obj = {
        CategoryCD: $("#CategoryCD").val(),
        UpdatedBy: $("#LoginID").val(),
        Mode: $("#Mode").val(),
    }

    CalltoApiController($("#HCategoryCUD").val(), obj, 'CategoryRestoreResponse');
}

function CategoryRestoreResponse(response) {
    if (response == 'true') {
        ShowMessage('I004');
        window.setTimeout(function () {
            location.href = $("#HCategoryList").val();
        }, 1500);
    }
}