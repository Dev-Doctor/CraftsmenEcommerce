$(document).ready(function () {
    const trigger = $('#collapseTrigger');
    const menu = $('#collapseExample');

    // Show menu on hover in
    trigger.hover(
        function () {
            menu.stop(true, true).fadeIn(200);
        },
        function () {
            // Delay fade out to allow hover into menu
            setTimeout(function () {
                if (!menu.is(':hover')) {
                    menu.stop(true, true).fadeOut(200);
                }
            }, 100);
        }
    );

    // Also hide menu when cursor leaves the menu itself
    menu.hover(
        function () { },
        function () {
            menu.stop(true, true).fadeOut(200);
        }
    );
});

window.onload = function () {
    $('.moai').on("mouseover", function () {
        var audio = document.getElementById("skibidi");
        audio.load();
        audio.play();
    });
};