console.log("Starting my first JS app");
// console.log() prints info to browser's dev console. helpful for testing/debugging

const companyInput = document.getElementById("company"); // finds HTML element matching "company"
const positionInput = document.getElementById("position");
const workTypeSelect = document.getElementById("work-type");
const locationInput = document.getElementById("location");
const payInput = document.getElementById("pay");
const dateAppliedInput = document.getElementById("date-applied");
const statusSelect = document.getElementById("status");
const jobUrlInput = document.getElementById("job-url");
const notesTextArea = document.getElementById("notes");
const applicationForm = document.getElementById("application-form");
const applicationsList = document.getElementById("applications-list");

// Retrieve previous saved applications from localSorage
// getItem() will return null if nothing is saved
const savedApplications = localStorage.getItem("applications");

// If saved data exists, convert JSON text back into JavaScript array
// else start with empty array
const applications = savedApplications ? JSON.parse(savedApplications) : [];


// renderApplicaiton displays applications from applications[]
function renderApplications() {
    applicationsList.innerHTML = ""; // clear container before looping

    // loop
    applications.forEach(function(application){
        
        const applicationElement = document.createElement("div");// creates new div 
        applicationElement.textContent = `${application.company} - ${application.position}`; // sets visible text for div
        applicationsList.append(applicationElement); // add newest application to top of list
        //console.log(application.company);
    });
}

applicationForm.addEventListener("submit", function(event) {
    event.preventDefault(); // event=form submission, preventDefault() prevents page from refreshing 


    const application = {
        // Properties -> Property: Value
        company: companyInput.value,
        position: positionInput.value,
        workType: workTypeSelect.value,
        location: locationInput.value,
        pay: payInput.value,
        status: statusSelect.value,
        dateApplied: dateAppliedInput.value,
        jobUrl: jobUrlInput.value,
        notes: notesTextArea.value

    }; // Object that represents a single job application

    applications.unshift(application); // adds newest application to the start of array
    
    localStorage.setItem("applications", JSON.stringify(applications)); // convert array to JSON text and save in localStorage

    renderApplications(); // calling function

    //console.log(applications);

    

    
    
    
}); 
// EventListerner waits for a specific action ("submit" the form in this case)
// and runs the code following function()


/*const testApplication ={
    company: "Netflix",
    position: "Cloud Engineer"
};

localStorage.setItem("testApplication", JSON.stringify(testApplication));

const savedApplication = localStorage.getItem("testApplication");

console.log(savedApplication);

const parsedApplication = JSON.parse(savedApplication);

console.log(parsedApplication.company);*/






