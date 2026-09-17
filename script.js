```javascript
// =====================================
// 1. BURGER MENU
// =====================================

const burger = document.getElementById("burger");

const navMenu = document.getElementById("navMenu");


burger.onclick = function () {

    // Show / Hide navigation menu

    navMenu.classList.toggle("show");

};


// Close menu when clicking a link

document.querySelectorAll("#navMenu a").forEach(function (link) {

    link.onclick = function () {

        navMenu.classList.remove("show");

    };

});



// =====================================
// 2. CONTACT FORM
// =====================================

const form = document.getElementById("contactForm");


form.onsubmit = function (event) {

    // Stop page from refreshing

    event.preventDefault();


    // Verify HTML required + pattern

    if (!form.checkValidity()) {

        form.reportValidity();

        return;

    }


    // Get values from user's input

    let name =
        document.getElementById("name").value;

    let email =
        document.getElementById("email").value;

    let phone =
        document.getElementById("phone").value;

    let message =
        document.getElementById("message").value;


    // Sanitize the values

    name = sanitize(name);

    email = sanitize(email);

    phone = sanitize(phone);

    message = sanitize(message);


    // Store values in JavaScript variables

    let contactName = name;

    let contactEmail = email;

    let contactPhone = phone;

    let contactMessage = message;


    // Show values in browser console

    console.log("Name:", contactName);

    console.log("Email:", contactEmail);

    console.log("Phone:", contactPhone);

    console.log("Message:", contactMessage);


    // Success message

    document.getElementById("formMessage").textContent =
        "Thank you, " + contactName +
        ". Your message has been received.";


    // Clear form

    form.reset();

};



// =====================================
// 3. SANITIZATION
// =====================================

function sanitize(value) {

    return value

        .trim()

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");
}



// =====================================
// 4. WEBSITE VISITOR COUNTER
// =====================================

let visitors =
    localStorage.getItem("websiteVisitors");


if (visitors === null) {

    visitors = 1;

} else {

    visitors = Number(visitors) + 1;

}


// Save visitor number

localStorage.setItem(
    "websiteVisitors",
    visitors
);


// Show visitor number

document.getElementById(
    "visitorCount"
).textContent = visitors;



// =====================================
// 5. CAROUSEL
// =====================================

const projects = [

    {
        image: "project1.svg",

        title: "Web Development",

        description:
            "A responsive website created using HTML, CSS and JavaScript."
    },

    {
        image: "project2.svg",

        title: "Computer Networking",

        description:
            "A university networking project using routers, switches and access points."
    },

    {
        image: "project3.svg",

        title: "University Project",

        description:
            "An academic IT project created during my university studies."
    }

];


let currentProject = 0;



// Show project

function showProject() {

    document.getElementById(
        "projectImage"
    ).src =
        projects[currentProject].image;


    document.getElementById(
        "projectTitle"
    ).textContent =
        projects[currentProject].title;


    document.getElementById(
        "projectDescription"
    ).textContent =
        projects[currentProject].description;


    document.getElementById(
        "projectNumber"
    ).textContent =
        "0" + (currentProject + 1) + " / 03";


    // Active dot

    document.querySelectorAll(".dot").forEach(
        function (dot, index) {

            dot.classList.toggle(
                "active",
                index === currentProject
            );

        }
    );

}



// Next project

function nextProject() {

    currentProject++;

    if (currentProject >= projects.length) {

        currentProject = 0;

    }

    showProject();

}



// Previous project

function previousProject() {

    currentProject--;

    if (currentProject < 0) {

        currentProject =
            projects.length - 1;

    }

    showProject();

}



// Buttons

document.getElementById("next").onclick =
    nextProject;


document.getElementById("prev").onclick =
    previousProject;



// Create dots

projects.forEach(function (_, index) {

    const dot =
        document.createElement("span");


    dot.className = "dot";


    dot.onclick = function () {

        currentProject = index;

        showProject();

    };


    document.getElementById("dots")
        .appendChild(dot);

});


// First project

showProject();


// Automatic carousel

setInterval(
    nextProject,
    5000
);
```
