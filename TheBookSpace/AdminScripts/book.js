function BookListLoad() {
    $("#Name").focus();
    var obj = {};
    BindDropdown(obj, $("#HGetCategory").val(), 'Category', 'CategoryCD', 'CategoryName', $("#CategoryCD").val());

    BookSearch();

    $("#SeriesSearchModal").iziModal({
        title: 'Series Search',
        TransitionIn: 'FadeInRight',
        theme: 'light',
        headerColor: 'lightcyan',
        padding: 10,
        top: 70,
        width: '60%'
    });

    $("#PublisherSearchModal").iziModal({
        title: 'Publisher Search',
        TransitionIn: 'FadeInRight',
        theme: 'light',
        headerColor: 'lightcyan',
        padding: 10,
        top: 70,
        width: '60%'
    });

    $("#AuthorSearchModal").iziModal({
        title: 'Author Search',
        TransitionIn: 'FadeInRight',
        theme: 'light',
        headerColor: 'lightcyan',
        padding: 10,
        top: 70,
        width: '60%'
    });
}

function GetBookResponse(response) {
    table = $('#tblBook').DataTable({
        responsive: true,
        data: JSON.parse(response),
        datasrc: "",
        destroy: true,
        searching: false,
        "bPaginate": false,
        "ordering": false,
        "columns": [
            { "data": "DeleteFlg", "className": "align-center", width: "15%" },
            { "data": "CoverImageUrl", "className": "align-center", width: "10%" },
            { "data": "BookName", width: "30%" },
            { "data": "Author", "className": "align-center", width: "15%" },
            { "data": "SeriesName", "className": "align-center", width: "15%" },
            { "data": "PublisherName", "className": "align-center", width: "15%" },
        ],
        "columnDefs": [{
            "targets": 0,
            "data": "DeleteFlg",
            "render": function (data) {
                if (data == false) {
                    return '<button type="button" style="margin-right:5px" class="btn btn-info" title="Edit" onclick="BookEdit(this)"><i class="fa fa-pencil-alt"></i></button>' +
                        '<button type="button" style="margin-right:5px" class="btn btn-indigo" title="Copy" onclick="BookCopy(this)"><i class="fa fa-copy"></i></button>' +
                        '<button type ="button" style="margin-right:5px" class="btn btn-danger" title = "Delete" onclick = "BookDelete(this)" > <i class="fa fa-trash"></i></button > '
                } else {
                    return '<button type="button" style="margin-right:5px" class="btn btn-warning" title="Restore" onclick="BookRestore(this)"><i class="fa fa-recycle"></i></button>';
                }
            },
        },
        {
            "targets": 1,
            "data": "CoverImageUrl",
            "render": function (data) {
                return '<img class="imageresource" src="' + $("#himgpath").val() + data + '" style="max-width:100px; max-height:100px" />';
            },
        }],
    });
}

function BookSearch() {
    var obj = {
        BookName: $("#Name").val(),
        CategoryCD: $('#Category').children("option:selected").val(),
        SeriesCD: $('#SeriesCD').val(),
        PublisherCD: $('#PublisherCD').val(),
        LanguageCD: $('#Language').children("option:selected").val(),
        AuthorCD: $('#AuthorCD1').val(),
        IllustratorCD: $('#IllustratorCD1').val(),
    };
    CalltoApiController($("#HGetBook").val(), obj, 'GetBookResponse');
}

function BookEdit(row) {
    var currentRow = $(row).closest("tr");
    var data = $('#tblBook').DataTable().row(currentRow).data();

    var url = $("#HBookEntry").val() + '?BookCD=' + data["BookCD"] + '&Mode=Edit';
    location.href = url;
}

function BookCopy(row) {
    var currentRow = $(row).closest("tr");
    var data = $('#tblBook').DataTable().row(currentRow).data();

    var url = $("#HBookEntry").val() + '?BookCD=' + data["BookCD"] + '&Mode=Copy';
    location.href = url;
}

function BookDelete(row) {
    var currentRow = $(row).closest("tr");
    var data = $('#tblBook').DataTable().row(currentRow).data();

    var url = $("#HBookEntry").val() + '?BookCD=' + data["BookCD"] + '&Mode=Delete';
    location.href = url;
}

function BookRestore(row) {
    var currentRow = $(row).closest("tr");
    var data = $('#tblBook').DataTable().row(currentRow).data();

    var url = $("#HBookEntry").val() + '?BookCD=' + data["BookCD"] + '&Mode=Restore';
    location.href = url;
}

function BookEntryLoad() {
    $("#BookName").focus();

    new Cleave('.publishyear', {
        numeral: true,
        numeralThousandsGroupStyle: 'none'
    });

    new Cleave('.totalpages', {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand'
    });

    new Cleave('.p1', {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand'
    });

    new Cleave('.p2', {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand'
    });

    new Cleave('.p3', {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand'
    });

    new Cleave('.p4', {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand'
    });

    var obj = {};
    BindDropdown(obj, $("#HGetCategory").val(), 'Category', 'CategoryCD', 'CategoryName',$("#CategoryCD").val());

    $("#Language").val($("#LanguageCD").val());
    $("#AgeFrom").val($("#RecommandAgeFrom").val());
    $("#AgeTo").val($("#RecommandAgeTo").val());
    $("#GradeFrom").val($("#HGradeFrom").val());
    $("#GradeTo").val($("#HGradeTo").val());
    $("#PaperSize").val($("#HPaperSize").val());

    if ($("#Mode").val() == 'Edit') {

        $("#imgcover").attr("src", $("#himgpath").val() + $("#CoverImageUrl").val());
        $("#img1").attr("src", $("#himgpath").val() + $("#SampleImageUrl1").val());
        $("#img2").attr("src", $("#himgpath").val() + $("#SampleImageUrl2").val());
        $("#img3").attr("src", $("#himgpath").val() + $("#SampleImageUrl3").val());
        $("#img4").attr("src", $("#himgpath").val() + $("#SampleImageUrl4").val());
        $("#img5").attr("src", $("#himgpath").val() + $("#SampleImageUrl5").val());

        $("#btnText").text('Update');
        
    } else if ($("#Mode").val() == 'Copy') {
        $("#CoverImageUrl").val('');
        $("#SampleImageUrl1").val('');
        $("#SampleImageUrl2").val('');
        $("#SampleImageUrl3").val('');
        $("#SampleImageUrl4").val('');
        $("#SampleImageUrl5").val('');
    }
    else if ($("#Mode").val() == 'Delete') {

        $("#imgcover").attr("src", $("#himgpath").val() + $("#CoverImageUrl").val());
        $("#img1").attr("src", $("#himgpath").val() + $("#SampleImageUrl1").val());
        $("#img2").attr("src", $("#himgpath").val() + $("#SampleImageUrl2").val());
        $("#img3").attr("src", $("#himgpath").val() + $("#SampleImageUrl3").val());
        $("#img4").attr("src", $("#himgpath").val() + $("#SampleImageUrl4").val());
        $("#img5").attr("src", $("#himgpath").val() + $("#SampleImageUrl5").val());

        $("#divbookbody :input").prop('disabled', true);
        $("#divbookimages :input").prop('disabled', true);
        
        $("#btnText").html('Delete');
        $("#btnSave").removeClass('btn btn-green');
        $("#btnSave").addClass('btn btn-red');
    } else if ($("#Mode").val() == 'Restore') {
        $("#imgcover").attr("src", $("#himgpath").val() + $("#CoverImageUrl").val());
        $("#img1").attr("src", $("#himgpath").val() + $("#SampleImageUrl1").val());
        $("#img2").attr("src", $("#himgpath").val() + $("#SampleImageUrl2").val());
        $("#img3").attr("src", $("#himgpath").val() + $("#SampleImageUrl3").val());
        $("#img4").attr("src", $("#himgpath").val() + $("#SampleImageUrl4").val());
        $("#img5").attr("src", $("#himgpath").val() + $("#SampleImageUrl5").val());

        $("#divbookbody :input").prop('disabled', true);

        $("#btnText").html('Restore');
        $("#btnSave").removeClass('btn btn-green');
        $("#btnSave").addClass('btn btn-warning');
    }

    $("#SeriesSearchModal").iziModal({
        title: 'Series Search',
        TransitionIn: 'FadeInRight',
        theme: 'light',
        headerColor: 'lightcyan',
        padding: 10,
        top: 70,
        width: '60%'
    });

    $("#PublisherSearchModal").iziModal({
        title: 'Publisher Search',
        TransitionIn: 'FadeInRight',
        theme: 'light',
        headerColor: 'lightcyan',
        padding: 10,
        top: 70,
        width: '60%'
    });

    $("#AuthorSearchModal").iziModal({
        title: 'Author Search',
        TransitionIn: 'FadeInRight',
        theme: 'light',
        headerColor: 'lightcyan',
        padding: 10,
        top: 70,
        width: '60%'
    });
}

function BookErrorCheck() {
    if (!$("#BookName").val()) {
        ShowMessage('E001', 'Book Name');
        $("#BookName").focus();
        return false;
    }else if (!$("#Category").val()) {
        ShowMessage('E001', 'Category');
        $("#Category").focus();
        return false;
    } else if (!$("#Language").val()) {
        ShowMessage('E001', 'Language');
        $("#Language").focus();
        return false;
    } else if (!$("#FolderUrl").val()) {
        ShowMessage('E001', 'Folder Url');
        $("#FolderUrl").focus();
        return false;
    } 
    return true;
}

function BookSaveClick() {
    $('#divloader').show();

    if ($("#Mode").val() == 'Delete') {
        ShowConfirmMessage('Q001', 'BookDeleteConfirm');
    }
    else if ($("#Mode").val() == 'Restore') {
        ShowConfirmMessage('Q002', 'BookRestoreConfirm');
    } else {
        if (BookErrorCheck()) {
            var obj = {
                BookCD: $("#BookCD").val(),
                BookName: $("#BookName").val(),
                CategoryCD: $('#Category').children("option:selected").val(),
                LanguageCD: $('#Language').children("option:selected").val(),
                PublicationYear: $("#PublicationYear").val(),
                NoOfPages: $("#NoOfPages").val(),
                SeriesCD: $("#SeriesCD").val(),
                PublisherCD: $('#PublisherCD').val(),
                AuthorCD1: $("#AuthorCD1").val(),
                AuthorCD2: $("#AuthorCD2").val(),
                AuthorCD3: $("#AuthorCD3").val(),
                IllustratorCD1: $("#IllustratorCD1").val(),
                IllustratorCD2: $("#IllustratorCD2").val(),
                IllustratorCD3: $("#IllustratorCD3").val(),
                FolderUrl: $("#FolderUrl").val(),
                CoverImageUrl: $("#CoverImageUrl").val(),
                SampleImageUrl1: $("#SampleImageUrl1").val(),
                SampleImageUrl2: $("#SampleImageUrl2").val(),
                SampleImageUrl3: $("#SampleImageUrl3").val(),
                SampleImageUrl4: $("#SampleImageUrl4").val(),
                SampleImageUrl5: $("#SampleImageUrl5").val(),
                RecommandAgeFrom: $('#AgeFrom').children("option:selected").val(),
                RecommandAgeTo: $('#AgeTo').children("option:selected").val(),
                GradeFrom: $('#GradeFrom').children("option:selected").val(),
                GradeTo: $('#GradeTo').children("option:selected").val(),
                PaperSize: $('#PaperSize').children("option:selected").val(),
                BNW_White_Price: $("#BNW_White_Price").val(),
                BNW_Creamy_Price: $("#BNW_Creamy_Price").val(),
                Color_White_Price: $("#Color_White_Price").val(),
                Color_Creamy_Price: $("#Color_Creamy_Price").val(),
                BookContent: $("#BookContent").val(),
                UpdatedBy: $("#LoginID").val(),
                Mode: $("#Mode").val(),
            }


            var formdata = new FormData();

            var filecover = $('#fcover')[0];
            var f1 = $('#f1')[0];
            var f2 = $('#f2')[0];
            var f3 = $('#f3')[0];
            var f4 = $('#f4')[0];
            var f5 = $('#f5')[0];

            formdata.append('fcover', filecover.files[0]);
            formdata.append('f1', f1.files[0]);
            formdata.append('f2', f2.files[0]);
            formdata.append('f3', f3.files[0]);
            formdata.append('f4', f4.files[0]);
            formdata.append('f5', f5.files[0]);
            formdata.append('BookModel', JSON.stringify(obj));

            $.ajax({
                url: $("#HBookUploadFile").val(),
                type: "POST",
                cache: false,
                contentType: false,
                processData: false,
                data: formdata,
                success: function (data) {
                    if ($("#Mode").val() == 'New' || $("#Mode").val() == 'Copy') {
                        ShowMessage('I001');
                        BookEntryClear();
                    }
                    else if ($("#Mode").val() == 'Edit') {
                        ShowMessage('I002');
                    }
                    else {
                        ShowMessage('I003');
                    }
                },
                fail: function (data) {
                    ShowMessage('E003');
                },
                complete: function (data) {
                    $('#divloader').hide();
                }
            });

            //CalltoApiController($("#HBookCUD").val(), obj, 'SaveResponse');
        }
    }
}

function SaveResponse(response) {
    if (response == 'true') {
        if ($("#Mode").val() == 'New' || $("#Mode").val() == 'Copy') {
            ShowMessage('I001');
            BookEntryClear();
        }
        else if ($("#Mode").val() == 'Edit') {
            ShowMessage('I002');
        }
        else {
            ShowMessage('I003');
        }
    }
}

function BookEntryClear() {
    $("#BookName").val('');
    $('#Type').children("option:selected").text('');
    $("#AboutBook").val('');
}

function BookDeleteConfirm() {
    var obj = {
        BookCD: $("#BookCD").val(),
        UpdatedBy: $("#LoginID").val(),
        Mode: $("#Mode").val(),
    }

    CalltoApiController($("#HBookCUD").val(), obj, 'BookDeleteResponse');
}

function BookDeleteResponse(response) {
    if (response == 'true') {
        ShowMessage('I003');
        window.setTimeout(function () {
            location.href = $("#HBookList").val();
        }, 1500);
    }
}

function BookRestoreConfirm() {
    var obj = {
        BookCD: $("#BookCD").val(),
        UpdatedBy: $("#LoginID").val(),
        Mode: $("#Mode").val(),
    }

    CalltoApiController($("#HBookCUD").val(), obj, 'BookRestoreResponse');
}

function BookRestoreResponse(response) {
    if (response == 'true') {
        ShowMessage('I004');
        window.setTimeout(function () {
            location.href = $("#HBookList").val();
        }, 1500);
    }
}

function RemoveImageClick(v1) {
    if (v1 == 0) {
        removeImage('imgcover');
        $("#fcover").val('');
    } else if (v1 == 1) {
        removeImage('img1');
        $("#f1").val('');
    } else if (v1 == 2) {
        removeImage('img2');
        $("#f2").val('');
    } else if (v1 == 3) {
        removeImage('img3');
        $("#f3").val('');
    } else if (v1 == 4) {
        removeImage('img4');
        $("#f4").val('');
    } else if (v1 == 5) {
        removeImage('img5');
        $("#f5").val('');
    }
}

