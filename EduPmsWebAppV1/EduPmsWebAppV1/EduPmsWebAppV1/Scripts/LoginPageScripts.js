function SignIn() {
    var UserName = $("#UserName").val();
    var Password = $("#Password").val();
    /*
     * mandatory vaildation
     * */
    if (UserName == null || UserName == '') {
        $("#UserName").addClass("is-invalid");
        $("#MandatoryUsername").show();
    }
    if (Password == null || Password == '') {
        $("#Password").addClass("is-invalid");
        $("#MandatoryPassword").show();
    }
    /*
     * credential validation
     * */
    if (UserName != null && UserName != '' && Password != null && Password != '') {
        $("#MandatoryUsername").hide();
        $("#MandatoryPassword").hide();
        checkCredential(UserName, Password); 
    }
}
function checkCredential(UserName, Password) {
    showLoader();
    $.ajax({
        url: 'http://localhost:63601/api/ValidateCredentials',
        type: 'POST',
        data: { UserName: UserName, Password: Password },
        success: function (data) {
            alert("success");
            endLoader();
        },
        error: function (e) {
            alert("error");
            console.log(e);
            endLoader();
        }
    });
}

