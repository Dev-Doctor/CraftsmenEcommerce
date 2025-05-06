import { isTokenValid } from "./postFunctions.js";

const SESSION_TOKEN = "session_token";

$(document).ready(function () {
    if (localStorage.getItem(SESSION_TOKEN)) {
        // check if the token is valid
        const result = isTokenValid(localStorage.getItem(SESSION_TOKEN));


        result.then(result => {
            if (result) {
                console.log("The token is still valid");
            } else {
                console.log("The token is NOT valid anymore")
                localStorage.removeItem(SESSION_TOKEN);
            }
        });
    }

    $('#add-token').on("click", function () {
        localStorage.setItem(SESSION_TOKEN, "7c3f97b20693ad0e9035944a4015b32bed31fadf60ea6a2c7fd86641f9f1ab114c4333f780b6fbeb922730cdbb0b39b86782ff9dd2663aa5fdb15960569c2c89");
    });

    $('#addf-token').on("click", function () {
        localStorage.setItem(SESSION_TOKEN, "7c3f97b20695944a4015b32bed31fadf60ea6a2c7fd86641f9f1ab114c4333f780b6fbeb922730cdbb0b39b86782ff9dd2663aa5fdb15960569c2c89");
    });

    $('#remove-token').on("click", function () {
        localStorage.removeItem(SESSION_TOKEN);
    });

    $('#testing-btn').on("click", function () {
        const result = isTokenValid(localStorage.getItem(SESSION_TOKEN));

        if (result) {
            alert("YEEEE");
        } else {
            alert(" I H A T E N I G G E R S");
        }
    });

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

// window.onload = function () {
//     $('.moai').on("mouseover", function () {
//         var audio = document.getElementById("skibidi");
//         audio.load();
//         audio.play();
//     });
// };