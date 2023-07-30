// last modified 25.07.2023

function postData(input) {
    $.ajax({
        type: "POST",

        // link to Python script
        url: "/reverse_pca.py",
        data: { param: input },
        success: callbackFunc
    });
}


var reply_click = function(){
    postData(document.getElementById("regler").value);
}
document.getElementById('start').onclick = reply_click;