window.onload = function () {
    $('.moai').on("mouseover", function () {
        var audio = document.getElementById("skibidi");
        audio.load();
        audio.play();
    });
};