function StaffLoginLoad() {
    $("#StaffCD").focus();
}

$("#StaffPassword").keydown(function (e) {
    if (e.which == 13) {
        SigninClick();
    }
});

function StaffLoginErrorCheck() {
    if (!$("#StaffCD").val()) {
        ShowMessage('E001', 'StaffCD');
        $("#StaffCD").focus();

        return false;
    } else if (!$("#StaffPassword").val()) {
        ShowMessage('E001', 'Password');
        $("#StaffPassword").focus();

        return false;
    }

    return true;
}

function SigninClick() {
    if (StaffLoginErrorCheck()) {
        var obj = {
            StaffCD: $("#StaffCD").val(),
            StaffPassword: $("#StaffPassword").val(),
        };
        CalltoApiController($("#HGetStaff").val(), obj,'Signin');
    }
}

function Signin(response) {
    var userdata = JSON.parse(response);
    if (userdata.length > 0) {
        var userinfo = userdata[0].StaffCD + '_' + userdata[0].StaffName;
        $.post($("#HSession").val(),
            { key: "UserInfo", value: userinfo }, function (data) {
                location.href = $("#HDashBoard").val();
            });
    }
    else {
        ShowMessage("E002");
        return false;
    }
}