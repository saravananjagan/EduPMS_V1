﻿var _partCounter = 0;
var _questionCounter = 0;
$(document).ready(function () {
    GetExaminationTypes();
    GetQuestionTypes();
    GetQuestionPaperTemplate('F3A0C98F-2E41-47B9-9308-2169CA3728B1', 'B636FF4F-DA25-4D5A-8365-9ABAF78AA696');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id != null && id != '' && id != undefined) {
        GetQuestionPaperDetailsById(id);
    }
});
//#region ExaminationTypes
function GetExaminationTypes() {
    showLoader();
    $.ajax({
        url: 'http://localhost:57460/api/GetExaminationTypes',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            FillExaminationTypeDetails(data);
        },
        error: function () {
            console.log("Error Please Try Again After Sometime, Propably Connection/Network Issue. \n For Immediate assistance Contact Support.");
        }
    });
}
function FillExaminationTypeDetails(ExaminationTypeData) {
    $.each(ExaminationTypeData, function () {
        var formattedExamDuration = this.duration.replace("PT", "").replace("H", ":").replace("M", "").replace("S", "");
        var formattedExamDurationHours = (formattedExamDuration.split(":")[0] != '') ? formattedExamDuration.split(":")[0] : "00";
        var formattedExamDurationMinutes = (formattedExamDuration.split(":")[1] != '') ? formattedExamDuration.split(":")[1] : "00";
        var ExamTypeDuration = formattedExamDurationHours + ':' + formattedExamDurationMinutes;
        var anchor = $("<a>", { "class": "dropdown-item", "id": this.ExaminationTypeId.toString(), "href": "#", "onclick": "SelectExaminationType('" + this.ExaminationTypeId.toString() + "','" + this.ExaminationType1.toString() + "','" + ExamTypeDuration + "','" + this.totalmarks.toString() + "')" });
        anchor.html(this.ExaminationType1.toString());
        $("#ExaminationTypeDropDown").append(anchor);
        $("#ExaminationTypeDropDown").append("<div class=\"dropdown-divider\"></div>");
    });
    $("#ExaminationTypeDropDown .dropdown-divider").last().remove();
    endLoader();
}
function SelectExaminationType(ExaminationTypeId, ExaminationType, ExaminationDuration, ExaminationTotalMarks) {
    $("#ExaminationTypeSelectedText").html(ExaminationType);
    $("#ExaminationTypeId").val(ExaminationTypeId);
    if (ExaminationType != 'Others') {
        $("#ExaminationName").val(ExaminationType + ' Examination');
    }
    else {
        $("#ExaminationName").prop('disabled', false);
        $("#ExaminationDuration").prop('disabled', false);
        $("#ExaminationTotalMarks").prop('disabled', false);
    }
}
//#endregion

//#region AddPart
function AddPart() {
    _partCounter++;
    $(".PartTemplate .PartTemplate_Initial").clone().appendTo("#PartsContainer");
    $("#PartsContainer").append("<br>");
    $("#PartsContainer .PartTemplate_Initial").last().attr("id", "Part_" + _partCounter);
    $("#Part_" + _partCounter).find(".add-questions").attr("onclick", "AddQuestions('Part_" + _partCounter + "',null)");
    $("#Part_" + _partCounter).find(".remove-part").attr("onclick", "RemovePart('Part_" + _partCounter + "')");
}
//#endregion

//#region RemovePart
function RemovePart(PartContainerId) {
    $("#" + PartContainerId).next("br").remove();
    $("#" + PartContainerId).remove();
}
//#endregion

//#region QuestionTypes
function GetQuestionTypes() {
    $.ajax({
        url: 'http://localhost:57460/api/GetQuestionTypes',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            FillQuestionTypes(data);
        },
        error: function () {
            console.log("Error Please Try Again After Sometime, Propably Connection/Network Issue. \n For Immediate assistance Contact Support.");
        }
    });
}
function FillQuestionTypes(QuestionTypeData) {
    $.each(QuestionTypeData, function () {
        var anchor = $("<a>", { "class": "dropdown-item", "id": this.QuestionTypeId.toString(), "href": "#", "onclick": "SelectQuestionType('" + this.QuestionTypeId.toString() + "','" + this.QuestionType1.toString() + "',this)" });
        anchor.html(this.QuestionType1.toString());
        $("#QuestionTypeDropdown").append(anchor);
        $("#QuestionTypeDropdown").append("<div class=\"dropdown-divider\"></div>")
    });
    $("#QuestionTypeDropdown .dropdown-divider").last().remove();
}
function SelectQuestionType(QuestionTypeId, QuestionType, element) {
    $(element).parent().siblings(".QuestionTypeSelectedText").html(QuestionType);
    $(element).parent().siblings(".QuestionTypeSelectedText").attr("id", "QuestionType_" + QuestionTypeId);
    var partContainerId = $(element).closest(".PartTemplate_Initial").attr("id");
    $(element).closest(".PartTemplate_Initial").find(".add-questions").attr("onclick", "AddQuestions('" + partContainerId + "','" + QuestionTypeId + "')");
    $(element).closest(".PartTemplate_Initial").find(".QuestionType").val(QuestionTypeId);
    $(element).closest(".PartTemplate_Initial").find(".QuestionTypeText").val(QuestionType);
}
//#endregion

//#region TotalMarksCalculation
function TotalMarksCalculation(element, classString) {
    if (classString == 'NumberOfQuestions') {
        if ($(element).siblings(".MarksPerQuestion").val() != '' && $(element).siblings(".MarksPerQuestion").val() != undefined && $(element).siblings(".MarksPerQuestion").val() != null) {
            var totalMarks = $(element).val() * $(element).siblings(".MarksPerQuestion").val();
            $(element).siblings(".TotalMarks").val(totalMarks);
        }
    } else {
        if ($(element).siblings(".NumberOfQuestions").val() != '' && $(element).siblings(".NumberOfQuestions").val() != undefined && $(element).siblings(".NumberOfQuestions").val() != null) {
            var totalMarks = $(element).val() * $(element).siblings(".NumberOfQuestions").val();
            $(element).siblings(".TotalMarks").val(totalMarks);
        }
    }
}
//#endregion

//#region AddQuestions
function AddQuestions(partContainerId, QuestionTypeId) {
    RemovePartError("#" + partContainerId + " .partError", false);
    $("#" + partContainerId + " .QuestionTypeSelectedText").removeClass("btn-outline-danger");
    $("#" + partContainerId + " .QuestionTypeSelectedText").addClass("btn-outline-primary");
    if (QuestionTypeId != undefined && QuestionTypeId != null) {
        _questionCounter++;
        if (QuestionTypeId.toUpperCase() == 'DD0EBD1E-DE86-4A1F-AF2B-A0FA38DE2B9A') {
            $("#QuestionTemplate .QuestionInputDiv").clone().appendTo("#" + partContainerId + " .Questions");
            $("#" + partContainerId + " .Questions .QuestionInputDiv").last().attr("id", "Question_" + _questionCounter);
            AddChoice(true, partContainerId, "Question_" + _questionCounter, 0);
        } else {
            $("#QuestionTemplate .QuestionInputDiv").clone().appendTo("#" + partContainerId + " .Questions");
            $("#" + partContainerId + " .Questions .QuestionInputDiv").last().attr("id", "Question_" + _questionCounter);
        }
        $("#Question_" + _questionCounter + " .remove-question").attr("onclick", "RemoveQuestion('Question_" + _questionCounter + "')");
    }
    else {
        AddPartError("#" + partContainerId + " .partError", "Please select the question type", true);
        $("#" + partContainerId + " .QuestionTypeSelectedText").removeClass("btn-outline-primary");
        $("#" + partContainerId + " .QuestionTypeSelectedText").addClass("btn-outline-danger");
    }
}
//#endregion

//#region RemoveQuestion
function RemoveQuestion(QuestionContainerId) {
    $("#" + QuestionContainerId).remove();
}
//#endregion

//#region AddChoice
function AddChoice(AddChoiceIntial, PartContainerId, QuestionContainerId, ChoiceCounter) {
    if (AddChoiceIntial) {
        $("#OptionTemplate .OptionInputDiv").clone().appendTo("#" + PartContainerId + " #" + QuestionContainerId);
        $("#" + PartContainerId + " #" + QuestionContainerId + " .choice-div").attr("id", PartContainerId + QuestionContainerId + "Choice_" + ChoiceCounter);
        $("#" + PartContainerId + " #" + QuestionContainerId + " .remove-choice").attr("onclick", "RemoveChoice('" + PartContainerId + QuestionContainerId + "Choice_" + ChoiceCounter + "')");
        ChoiceCounter++;
        $("#OptionTemplate .OptionInputDiv .choice-div").clone().insertBefore("#" + PartContainerId + " #" + QuestionContainerId + " .OptionInputDiv .add-choice");
        $("#" + PartContainerId + " #" + QuestionContainerId + " .choice-div").last().attr("id", PartContainerId + QuestionContainerId + "Choice_" + ChoiceCounter);
        $("#" + PartContainerId + " #" + QuestionContainerId + " .remove-choice").last().attr("onclick", "RemoveChoice('" + PartContainerId + QuestionContainerId + "Choice_" + ChoiceCounter + "')");
        ChoiceCounter++;
        $("#" + PartContainerId + " #" + QuestionContainerId + " .add-choice").attr("onclick", "AddChoice(false,'" + PartContainerId + "','" + QuestionContainerId + "','" + ChoiceCounter + "')");
    }
    else {
        $("#OptionTemplate .OptionInputDiv .choice-div").clone().insertBefore("#" + PartContainerId + " #" + QuestionContainerId + " .OptionInputDiv .add-choice");
        $("#" + PartContainerId + " #" + QuestionContainerId + " .choice-div").last().attr("id", PartContainerId + QuestionContainerId + "Choice_" + ChoiceCounter);
        $("#" + PartContainerId + " #" + QuestionContainerId + " .remove-choice").last().attr("onclick", "RemoveChoice('" + PartContainerId + QuestionContainerId + "Choice_" + ChoiceCounter + "')");
        ChoiceCounter++;
        $("#" + PartContainerId + " #" + QuestionContainerId + " .add-choice").attr("onclick", "AddChoice(false,'" + PartContainerId + "','" + QuestionContainerId + "','" + ChoiceCounter + "')")
    }
}
//#endregion

//#region RemoveChoice
function RemoveChoice(ChoiceContainerId) {
    $("#" + ChoiceContainerId).remove();
}
//#endregion

//#region ErrorConfig
function AddPartError(Selector, ErrorText, IsError) {
    $(Selector).html(ErrorText);
    if (IsError) {
        $(Selector).addClass("alert-danger");
    } else {
        $(Selector).addClass("alert-success");
    }
    $(Selector).show();
}
function RemovePartError(Selector, IsError) {
    $(Selector).html("");
    if (IsError) {
        $(Selector).removeClass("alert-danger");
    } else {
        $(Selector).removeClass("alert-success");
    }
    $(Selector).hide();
}
//#endregion

//#region FormSubmit
function FormSubmit(FormId) {
    showLoader();
    var Formdetails = $("#" + FormId);
    var SerializedFormArray = Formdetails.serializeArray();
    var init_flag = 0;
    var QuestionPaperModel = {};
    var partForms = [];
    var partJson = {};
    var questionsArray = [];
    var Question = {};
    var Choice = {};
    var choiceArray = [];
    
    //QuestionPaperModel.SubjectName = $("#SubjectName").val();
    //QuestionPaperModel.ExaminationTypeId = $("#ExaminationTypeId").val();
    //QuestionPaperModel.ExaminationType = $("#ExaminationTypeSelectedText").html();
    //QuestionPaperModel.duration = $("#ExaminationDuration").val();
    //QuestionPaperModel.totalmarks = $("#ExaminationTotalMarks").val();
    //$.each(SerializedFormArray, function () {
    //    if (this.name == 'partOrdinal' && init_flag == 0) {
    //        partJson.partOrdinal = this.value;
    //    }
    //    else if (this.name == 'partOrdinal' && init_flag != 0) {
    //        partJson.Questions = questionsArray;
    //        partForms.push(partJson);
    //        partJson = {};
    //        questionsArray = [];
    //        partJson.partOrdinal = this.value;
    //    }
    //    else if (this.name == 'PartName') {
    //        partJson.PartName = this.value;
    //    }
    //    else if (this.name == 'QuestionTypeId') {
    //        partJson.QuestionTypeId = this.value;
    //    }
    //    else if (this.name == 'QuestionType') {
    //        partJson.QuestionType = this.value;
    //    }
    //    else if (this.name == 'TotalMarks') {
    //        partJson.MarksPerPart= this.value;
    //    }
    //    else if (this.name == 'MarksPerQuestion') {
    //        partJson.MarksPerQuestion= this.value;
    //    }
    //    else if (this.name == 'NumberOfQuestions') {
    //        partJson.NumberOfQuestions= this.value;
    //    }
    //    else if (this.name == 'questionOrdinal') {
    //        Question = {};
    //        Question.questionOrdinal = this.value;
    //    }
    //    else if (this.name == 'Question') {
    //        Question.question = this.value;
    //        if (choiceArray != []) {
    //            Question.choices = choiceArray;
    //        }
    //        questionsArray.push(Question);
    //    }
    //    else if (this.name == 'choiceOrdinal') {
    //        Choice = {};
    //        Choice.choiceOrdinal = this.value;
    //    }
    //    else if (this.name == 'choice') {
    //        Choice.choice = this.value;
    //        choiceArray.push(Choice);
    //    }
    //    init_flag++;
    //});

    //partJson.Questions = questionsArray;
    //partForms.push(partJson);
    //QuestionPaperModel.partForms = partForms;
    //$.ajax({
    //    url: 'http://localhost:57460/api/SubmitQuestions',
    //    type: 'POST',
    //    data: { QuestionPaperModel },
    //    success: function (data) {
    //        //window.location.href = "http://localhost:57460/Examination/QuestionPaper?id=" + data.QuestionPaperId;
    //        GetQuestionPaperTemplate('F3A0C98F-2E41-47B9-9308-2169CA3728B1', 'B636FF4F-DA25-4D5A-8365-9ABAF78AA696');
    //        endLoader();
    //    },
    //    error: function (e) {
    //        endLoader();
    //    }
    //});
    ExportQuestionPaper('F3A0C98F-2E41-47B9-9308-2169CA3728B1', 'B636FF4F-DA25-4D5A-8365-9ABAF78AA696');
            endLoader();
}
//#endregion

//#region Get Question Paper Details
function GetQuestionPaperDetailsById(Id) {
    showLoader();
    $.ajax({
        url: 'http://localhost:57460/api/GetQuestionPaperById',
        type: 'GET',
        data: {Id},
        success: function (data) {
            GetQuestionPaperTemplate('F3A0C98F-2E41-47B9-9308-2169CA3728B1', 'B636FF4F-DA25-4D5A-8365-9ABAF78AA696');
            endLoader();
        },
        error: function () {
            console.log("Error Please Try Again After Sometime, Propably Connection/Network Issue. \n For Immediate assistance Contact Support.");
        }
    });
}
//#endregion

//#region Question Paper Template and Export
function GetQuestionPaperTemplate(CustomerId, SubjectId) {
    $.ajax({
        url: 'http://localhost:57460/api/GetQuestionPaperTemplateBySubjectIdandCustomerId',
        type: 'GET',
        data: { CustomerId: CustomerId, SubjectId: SubjectId},
        success: function (data) {
            $("#ExportPreview").html(data.QuestionPaperTemplateData);            
        },
        error: function () {
            console.log("Error Please Try Again After Sometime, Propably Connection/Network Issue. \n For Immediate assistance Contact Support.");
        }
    });
}
function ExportQuestionPaper(CustomerId, SubjectId) {
    window.location.href = "http://localhost:57460/Examination/ExportQuestionPaper?CustomerId=" + CustomerId + "&SubjectId=" + SubjectId;
    //var questionPaperData = $("#ExportPreview").html();
    //$.ajax({
    //    url: 'http://localhost:57460/Examination/ExportQuestionPaper',
    //    type: 'POST',
    //    data: { questionPaperData },
    //    success: function (data) {
    //        $("#ExportSpace").html(data);
    //    },
    //    error: function () {
    //        console.log("Error Please Try Again After Sometime, Propably Connection/Network Issue. \n For Immediate assistance Contact Support.");
    //    }
    //});
}
//#endregion