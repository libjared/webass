// ==UserScript==
// @name         WebAss Question Collapse
// @namespace    https://github.com/hypershadsy/webass
// @version      0.1
// @description  Allows the user to hide questions with a checkbox, and optionally hide completed and correct questions on page load.
// @match        http*://www.webassign.net/web/Student/*
// @copyright    2013, Hypershadsy
// @licence      https://raw.github.com/hypershadsy/webass/master/LICENSE
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

/*************************/
/* USER SETTINGS GO HERE */
//on page load, automatically collapse questions that have been given full credit
var autoCollapseCompleted = true;
/*************************/

//get questions, titles
var questions = $("div[id^=question]");
var titles = questions.find(".title");

//add the checkboxes, make them slide based on checkedness 
var checkboxes = titles.append("<input class='hypercollapse' type='checkbox'>").find("input[type=checkbox]");
checkboxes.bind("change", function() {
    console.log(this);
    console.log(this.checked);
    if (this.checked) {
        $(this).parent().parent().parent().find(".qUtility").slideUp(); //triple parent is UGLY!
    } else {
        $(this).parent().parent().parent().find(".qUtility").slideDown();
    }
});

if (autoCollapseCompleted) {
    //get question scores
    var topTable = $(".assignmentQuestionDetails .columnElastic tbody");
    var questionData = topTable.find("tr").last().find("td");
    
    var checkboxes = $(".hypercollapse");
    
    //for each question
    for (var i = 0; i < questionData.length; i++) {
        var dataHere = questionData.eq(i);
        var checkboxHere = checkboxes.eq(i);
        //if the question's done
        if (dataHere.hasClass("full_credit")) {
            //then check the corresponding checkbox and trigger the event
            checkboxHere.prop("checked", true);
            checkboxHere.trigger("change");
        }
    }
}