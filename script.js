

const $ = (id) => document.getElementById(id);


let toastTimer;

function showToast(message) {

    $("toastMessage").textContent = message;

    $("toast").classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        $("toast").classList.remove("show");

    }, 3000);

}

/*
   PASSWORD SHOW / HIDE
*/

$("togglePassword").addEventListener("click", () => {

    const password = $("password");

    if (password.type === "password") {

        password.type = "text";

        $("togglePassword").innerHTML =
            '<i class="fa-regular fa-eye"></i>';

    }

    else {

        password.type = "password";

        $("togglePassword").innerHTML =
            '<i class="fa-regular fa-eye-slash"></i>';

    }

});


/* =
   MOBILE NUMBER INPUT
 */

$("mobile").addEventListener("input", () => {

    $("mobile").value =
        $("mobile").value.replace(/\D/g, "");

});


/*
   LOGIN FORM
 */

$("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();


    const mobile =
        $("mobile").value.trim();

    const password =
        $("password").value.trim();


    let valid = true;


    /* Clear previous errors */

    $("mobileError").textContent = "";

    $("passwordError").textContent = "";


    /* MOBILE VALIDATION */

    if (!/^[6-9]\d{9}$/.test(mobile)) {

        $("mobileError").textContent =
            "Enter a valid 10-digit Indian mobile number.";

        valid = false;

    }


    /* PASSWORD VALIDATION */

    if (password.length < 6) {

        $("passwordError").textContent =
            "Password must contain at least 6 characters.";

        valid = false;

    }


    /* LOGIN SUCCESS */

    if (valid) {

        localStorage.setItem(
            "kisanSarthiLoggedIn",
            "true"
        );


        showToast(
            "Login successful! Welcome back 🌱"
        );


        setTimeout(() => {

            showPortal();

        }, 500);

    }

});


/* =
   SHOW PORTAL
 */

function showPortal() {

    $("loginPage").classList.add("hidden");

    $("portalPage").classList.remove("hidden");


    setDefaultDate();

    updateQueue();

}


/* 
   DEFAULT BOOKING DATE
*/

function setDefaultDate() {

    const dateInput =
        $("slotDate");


    if (!dateInput.value) {

        const date = new Date();


        /* Demo:
           default date = 5 days from today */

        date.setDate(
            date.getDate() + 5
        );


        dateInput.value =
            date.toISOString().split("T")[0];

    }

}



/*
   REGISTER
 */

$("registerLink").addEventListener(
    "click",
    function(event) {

        event.preventDefault();


        showToast(
            "Registration module can be connected to your backend."
        );

    }
);


/* SIDEBAR NAVIGATION
*/

document
    .querySelectorAll(".nav-item")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                switchSection(
                    button.dataset.section
                );

            }
        );

    });


/*
   BUTTON NAVIGATION
 */

document
    .querySelectorAll("[data-go]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                switchSection(
                    button.dataset.go
                );

            }
        );

    });


/*
   SWITCH PORTAL SECTION
 */

function switchSection(sectionId) {


    /* Hide every section */

    document
        .querySelectorAll(".content-section")
        .forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


    /* Show selected section */

    const section =
        $(sectionId);


    if (section) {

        section.classList.add(
            "active-section"
        );

    }


    /* Update sidebar */

    document
        .querySelectorAll(".nav-item")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.section === sectionId
            );

        });


    /* Scroll to top */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* 
   QUEUE SYSTEM
 */

let queuePosition = 12;


/* Update queue UI */

function updateQueue() {

    /* Dashboard */

    $("queueNumber").textContent =
        queuePosition;

    $("dashQueue").textContent =
        queuePosition;


    /* Queue page */

    $("bigQueue").textContent =
        queuePosition;

    $("aheadCount").textContent =
        `${queuePosition} farmers`;


    /* Waiting time */

    const waitingTime =
        queuePosition * 4;

    $("waitTime").textContent =
        `${waitingTime} minutes`;

    $("bigWait").textContent =
        `${waitingTime} minutes`;


    /* Progress */

    const progress =
        Math.max(
            20,
            90 - queuePosition * 2
        );


    $("queueProgress").style.width =
        progress + "%";

    $("bigProgress").style.width =
        progress + "%";

    $("queueProgressText").textContent =
        progress + "%";

}


/* =
   DEMO LIVE QUEUE


   Every 20 seconds the queue position
   decreases by one.

*/

setInterval(() => {


    if (
        !$("portalPage")
            .classList
            .contains("hidden")
        &&
        queuePosition > 1
    ) {

        queuePosition--;

        updateQueue();

    }

}, 30000);


/* 
   BOOKING FORM
 */

$("bookingForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const crop =
            $("crop").value;


        const quantity =
            $("quantity").value;


        const centre =
            $("centre").value;


        const dateValue =
            $("slotDate").value;


        const time =
            $("slotTime").value;


        /* Check date */

        if (!dateValue) {

            showToast(
                "Please select a procurement date."
            );

            return;

        }


        /* Check future date */

        const selectedDate =
            new Date(
                dateValue + "T00:00:00"
            );


        const today =
            new Date();


        today.setHours(
            0,
            0,
            0,
            0
        );


        if (selectedDate < today) {

            showToast(
                "Please select a future date."
            );

            return;

        }


        /* Format date */

        const formattedDate =
            selectedDate.toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );


        /* Update booking summary */

        $("summaryDate").textContent =
            formattedDate;


        $("summaryCrop").textContent =
            crop;


        $("summaryCentre").textContent =
            centre;


        /* Success */

        showToast(
            `Slot confirmed for ${formattedDate} at ${time.split(" - ")[0]} ✅`
        );


        switchSection("booking");

    }
);


/* 
   NOTIFICATION POPUP
 */

$("notificationBtn").addEventListener(
    "click",
    function() {

        $("notificationPanel")
            .classList
            .toggle("hidden");

    }
);


/* CLOSE NOTIFICATION */

$("closeNotifications").addEventListener(
    "click",
    function() {

        $("notificationPanel")
            .classList
            .add("hidden");

    }
);


/* CLOSE WHEN CLICKING OUTSIDE */

document.addEventListener(
    "click",
    function(event) {


        if (
            !event.target.closest(
                "#notificationPanel"
            )
            &&
            !event.target.closest(
                "#notificationBtn"
            )
        ) {

            $("notificationPanel")
                .classList
                .add("hidden");

        }

    }
);


/* 
   LOGOUT
 */

$("logoutBtn").addEventListener(
    "click",
    function() {


        localStorage.removeItem(
            "kisanSarthiLoggedIn"
        );


        $("portalPage")
            .classList
            .add("hidden");


        $("loginPage")
            .classList
            .remove("hidden");


        $("loginForm").reset();


        showToast(
            "You have been logged out."
        );

    }
);


/* 
   AUTO LOGIN
 */

if (
    localStorage.getItem(
        "kisanSarthiLoggedIn"
    ) === "true"
) {

    showPortal();

}
