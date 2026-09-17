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

const applications = []; // empty array that will hold applications

// renderApplicaiton displays applications from applications[]
function renderApplications() {
    applicationsList.innerHTML = ""; // clear container before looping

    // loop
    applications.forEach(function(application){
        
        const applicationElement = document.createElement("div");// creates new div 
        applicationElement.textContent = `${application.company} - ${application.position}`; // sets visible text for div
        applicationsList.append(applicationElement); // add newest application to top of list
        console.log(application.company);
    });
}

applicationForm.addEventListener("submit", function(event) {
    event.preventDefault(); // event=form submission, preventDefault() prevents page from refreshing 
    
    /*
    console.log("Form submitted");
    console.log(companyInput.value); // retrieves user input for company
    console.log(positionInput.value); // retrieves user input for position
    console.log(workTypeSelect.value);
    console.log(locationInput.value);
    console.log(payInput.value);
    console.log(statusSelect.value);
    console.log(dateAppliedInput.value);
    console.log(jobUrlInput.value);
    console.log(notesTextArea.value); 
    */

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
    
    renderApplications(); // calling function

    console.log(applications);

    

    
    
    
}); 
// EventListerner waits for a specific action ("submit" the form in this case)
// and runs the code following function()




