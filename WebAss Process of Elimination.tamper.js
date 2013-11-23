// ==UserScript==
// @name         WebAss Process of Elimination
// @namespace    https://github.com/hypershadsy/webass
// @version      0.1
// @description  Allows the user to more easily find an answer to multiple choice questions by adding the ability to exclude possible answers by right-clicking on them.
// @match        http*://www.webassign.net/web/Student/*
// @copyright    2013, Hypershadsy
// @licence      https://raw.github.com/hypershadsy/webass/master/LICENSE
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

//get elements that contain radio buttons
var radioContainers = $("input[type='radio']").parent();

//when those elements are right clicked
radioContainers.mousedown(function(e){
    if (e.which != 3) return false;
    
    //invert the faded attribute
    var faded = $(this).attr('faded');
    if (!faded) {
        //and hide it
        $(this).fadeTo("idunnolol", 0.25, function() {
            $(this).attr('faded', 'faded');
        });
    } else {
        //and show it
        $(this).fadeTo("irlydunnolol", 1, function() {
            $(this).removeAttr('faded');
        });
    }
    return true;
});