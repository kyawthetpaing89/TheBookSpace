function PromotionListLoad() {
    $("#Name").focus();
    PromotionSearch();
}

function GetPromotionResponse(response) {
    table = $('#tblPromotion').DataTable({
        responsive: true,
        data: JSON.parse(response),
        datasrc: "",
        destroy: true,
        searching: false,
        "bPaginate": false,
        "ordering": false,
        "columns": [
            { "data": "PromotionStatus", "className": "align-center", width: "10%" },
            { "data": "PromotionName", "className": "align-center", width: "40%" },
            { "data": "PromotionTypeName", "className": "align-center", width: "15%" },
            { "data": "PromotionDate", "className": "align-center", width: "20%" },
            { "data": "PromotionStatus", "className": "align-center", width: "15%" },
        ],
        "columnDefs": [{
            "targets": 0,
            "data": "PromotionStatus",
            "render": function (data) {
                if (data == '1') {
                    return '<button type="button" style="margin-right:5px" class="btn btn-info" title="Start" onclick="PromotionStart(this)"><i class="fa fa-start"></i></button>';
                } else {
                    return '<button type="button" style="margin-right:5px" class="btn btn-danger" title="Stop" onclick="PromotionStop(this)"><i class="fa fa-stop"></i></button>';
                }
            },
        },
        {
            "targets": 4,
            "data": "PromotionStatus",
            "render": function (data) {
                if (data == '1')
                    return '<span style="width:80%;font-size:13px" class="badge bg-warning">Waiting</span>';
                else if (data == '2')
                    return '<span style="width:80%;font-size:13px" class="badge bg-info">Inprogress</span>';
                else
                    return '<span style="width:80%;font-size:13px" class="badge bg-success">Finished</span>';
            },
        }],
    });
}

function PromotionSearch() {
    var obj = {
        PromotionName: $("#Name").val(),
    };
    CalltoApiController($("#HGetPromotion").val(), obj, 'GetPromotionResponse');
}

function PromotionEntryLoad() {
    $("#BookMultiSearchModal").iziModal({
        title: 'Series Search',
        TransitionIn: 'FadeInRight',
        theme: 'light',
        headerColor: 'lightcyan',
        padding: 10,
        top: 70,
        width: '60%',

    });

    $("#SeriesMultiSearchModal").iziModal({
        title: 'Series Search',
        TransitionIn: 'FadeInRight',
        theme: 'light',
        headerColor: 'lightcyan',
        padding: 10,
        top: 70,
        width: '60%',

    });

    $("#PublisherMultiSearchModal").iziModal({
        title: 'Publisher Search',
        TransitionIn: 'FadeInRight',
        theme: 'light',
        headerColor: 'lightcyan',
        padding: 10,
        top: 70,
        width: '60%'
    });

    $("#AuthorMultiSearchModal").iziModal({
        title: 'Author Search',
        TransitionIn: 'FadeInRight',
        theme: 'light',
        headerColor: 'lightcyan',
        padding: 10,
        top: 70,
        width: '60%'
    });

    $("#CategoryMultiSearchModal").iziModal({
        title: 'Category Search',
        TransitionIn: 'FadeInRight',
        theme: 'light',
        headerColor: 'lightcyan',
        padding: 10,
        top: 70,
        width: '60%'
    });

    $("#PromotionName").focus();

    new Cleave('.promotionpercent', {
        numeral: true,
        numeralThousandsGroupStyle: 'none'
    });

    $('#PromotionStartDate').datetimepicker(
        { format: "DD/MM/YYYY" },
    );

    $('#PromotionEndDate').datetimepicker(
        { format: "DD/MM/YYYY" },
    );

    $("#PromotionType").val($("#PromotionType").val());
    if ($("#Mode").val() == 'Edit') {
        $("#btnText").text('Update');
    } else if ($("#Mode").val() == 'Stop') {
        $("#promotionbody :input").prop('disabled', true);

        $("#btnText").html('Delete');
        $("#btnSave").removeClass('btn btn-green');
        $("#btnSave").addClass('btn btn-red');
    } else if ($("#Mode").val() == 'Start') {
        $("#promotionbody :input").prop('disabled', true);

        $("#btnText").html('Restore');
        $("#btnSave").removeClass('btn btn-green');
        $("#btnSave").addClass('btn btn-warning');
    }

    $('#tblPromotion').DataTable();
}

function PromotionBookSearch() {
    if ($("#PromotionType").val() == '1') {
        ShowBookMultiSearchModal();
    } else if ($("#PromotionType").val() == '2') {
        ShowSeriesSearchModal();
    } else if ($("#PromotionType").val() == '3') {
        ShowCategorySearchModal();
    } else if ($("#PromotionType").val() == '4') {
        ShowAuthorSearchModal();
    } else if ($("#PromotionType").val() == '5') {
        ShowPublisherSearchModal();
    }
}

function PromotionErrorCheck() {
    if (!$("#PromotionName").val()) {
        ShowMessage('E001', 'Promotion Name');
        $("#PromotionName").focus();

        return false;
    } else if (!$("#PromotionPercent").val()) {
        ShowMessage('E001', 'Promotion Percent');
        $("#PromotionPercent").focus();

        return false;
    } else if (!$("#PromotionStartDate").val()) {
        ShowMessage('E001', 'Start Date');
        $("#PromotionStartDate").focus();

        return false;
    } else if (!$("#PromotionEndDate").val()) {
        ShowMessage('E001', 'End Date');
        $("#PromotionEndDate").focus();

        return false;
    } else {
        var start = $("#PromotionStartDate").val().split("/")
        var s1 = new Date(start[2], start[1] - 1, start[0])

        var end = $("#PromotionEndDate").val().split("/")
        var e1 = new Date(end[2], end[1] - 1, end[0])

        var currentdate = getCurrentDate();

        if (s1 > e1) {
            ShowMessage('E004', '');
            $("#PromotionStartDate").focus();
            return false;
        } else if (s1 < currentdate) {
            ShowMessage('E005', '');
            $("#PromotionStartDate").focus();
            return false;
        }
    }

    return true;
}

function PromotionSaveClick() {
    if ($("#Mode").val() == 'Start') {
        ShowConfirmMessage('Q001', 'PromotionStartConfirm');
    }
    else if ($("#Mode").val() == 'Stop') {
        ShowConfirmMessage('Q002', 'PromotionStopConfirm');
    } else {
        if (PromotionErrorCheck()) {

            var start = $("#PromotionStartDate").val().split("/")
            var s1 = new Date(start[2], start[1], start[0])

            var end = $("#PromotionEndDate").val().split("/")
            var e1 = new Date(end[2], end[1], end[0])

            var pstart = s1.getMonth() + '-' + s1.getDate() + '-' + s1.getFullYear();
            var pend = e1.getMonth() + '-' + e1.getDate() + '-' + e1.getFullYear();

            var obj = {
                PromotionCD: $("#PromotionCD").val(),
                PromotionName: $("#PromotionName").val(),
                PromotionPercent: $("#PromotionPercent").val(),
                PromotionType: $('#Type').children("option:selected").val(),
                PromotionStartDate: pstart, 
                PromotionEndDate: pend,
                UpdatedBy: $("#LoginID").val(),
                Mode: $("#Mode").val(),
            }

            CalltoApiController($("#HPromotionCUD").val(), obj, 'SaveResponse');
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

function PromotionStart() {
    ShowConfirmMessage('Q001', 'PromotionStartConfirm');
}

function PromotionStop() {
    ShowConfirmMessage('Q001', 'PromotionStopConfirm');
}

function AddPromotionItem(jsonObj) {
    $.each(jsonObj, function (i, obj) {
        $('#tblPromotion').append('<tr><td class="hide">' + obj["CD"] +'</td><td class="hide">'+ obj["Type"] +'</td><td>'+ obj["TypeName"] +'</td><td>' + obj["Name"] +'</td></tr>');
    });
}
