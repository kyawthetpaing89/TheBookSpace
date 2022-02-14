function BindDropdown(model,url,ctrlID,key,value,defaultvalue) {
    CalltoApiController(url, model,'DropdownResponse',ctrlID,key,value,defaultvalue);
}

function DropdownResponse(response,ctrlID,key,value,defaultvalue) {
    var items = JSON.parse(response);
    $.each(items, function (i, item) {
        $("#"+ctrlID).append(
            $('<option></option>').val(item[key]).html(item[value]));
    });

    $("#" + ctrlID).val(defaultvalue);
}

function readURL(input, ctrl) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#'+ctrl)
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function removeImage(ctrl) {
    $('#' + ctrl)
        .attr('src',$("#noimage").val());
}

function getCurrentDate() {
    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();

    var output = d.getFullYear() + '/' +
        (month < 10 ? '0' : '') + month + '/' +
        (day < 10 ? '0' : '') + day;

    return new Date(output);
}