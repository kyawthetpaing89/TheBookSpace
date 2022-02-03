function ShowAuthorSearchModal(authorNo) {
    $("#AuthorNo").val(authorNo);

    $('#AuthorSearchModal').iziModal('open');

    var obj = {
        Type : '1'
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
                return '<button type="button" class="btn btn-indigo" title="Select" onclick="AuthorSelect(this)"><i class="fa fa-check"></i> Select</button>'
            },
        }],
    });
}

function AuthorSelect(row) {
    var currentRow = $(row).closest("tr");
    var data = $('#tblAuthor').DataTable().row(currentRow).data();

    if ($("#AuthorNo").val() == 1) {
        $("#AuthorCD1").val(data["AuthorCD"]);
        $("#AuthorName1").val(data["AuthorName"]);
    } else if ($("#AuthorNo").val() == 2) {
        $("#AuthorCD2").val(data["AuthorCD"]);
        $("#AuthorName2").val(data["AuthorName"]);
    } else if ($("#AuthorNo").val() == 3) {
        $("#AuthorCD3").val(data["AuthorCD"]);
        $("#AuthorName3").val(data["AuthorName"]);
    }

    $('#AuthorSearchModal').iziModal('close');
}

function AuthorClear(p1) {
    if (p1 == 1) {
        $("#AuthorCD1").val('');
        $("#AuthorName1").val('');
    } else if (p1 == 2) {
        $("#AuthorCD2").val('');
        $("#AuthorName2").val('');
    } else if (p1 == 3) {
        $("#AuthorCD3").val('');
        $("#AuthorName3").val('');
    }
}

function ShowIllustratorSearchModal(IllustratorNo) {
    $("#IllustratorNo").val(IllustratorNo);

    $('#AuthorSearchModal').iziModal('open');

    var obj = {
        Type: '2'
    };
    CalltoApiController($("#HGetAuthor").val(), obj, 'GetIllustratorResponse');
}

function GetIllustratorResponse(response) {
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
                return '<button type="button" class="btn btn-indigo" title="Select" onclick="IllustratorSelect(this)"><i class="fa fa-check"></i> Select</button>'
            },
        }],
    });
}

function IllustratorSelect(row) {
    var currentRow = $(row).closest("tr");
    var data = $('#tblAuthor').DataTable().row(currentRow).data();

    if ($("#IllustratorNo").val() == 1) {
        $("#IllustratorCD1").val(data["AuthorCD"]);
        $("#IllustratorName1").val(data["AuthorName"]);
    } else if ($("#IllustratorNo").val() == 2) {
        $("#IllustratorCD2").val(data["AuthorCD"]);
        $("#IllustratorName2").val(data["AuthorName"]);
    } else if ($("#IllustratorNo").val() == 3) {
        $("#IllustratorCD3").val(data["AuthorCD"]);
        $("#IllustratorName3").val(data["AuthorName"]);
    }

    $('#AuthorSearchModal').iziModal('close');
}

function IllustratorClear(p1) {
    if (p1 == 1) {
        $("#IllustratorCD1").val('');
        $("#IllustratorName1").val('');
    } else if (p1 == 2) {
        $("#IllustratorCD2").val('');
        $("#IllustratorName2").val('');
    } else if (p1 == 3) {
        $("#IllustratorCD3").val('');
        $("#IllustratorName3").val('');
    }
}