
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

        const formattedWorkType = application.workType.charAt(0).toUpperCase() + application.workType.slice(1);
        const formattedStatus = application.status.charAt(0).toUpperCase()+application.status.slice(1);
        
        const applicationElement = document.createElement("div");// creates new div 
        
        const applicationTitle = document.createElement("h3");
        applicationTitle.textContent = `${application.company} - ${application.position}`;
        applicationElement.append(applicationTitle);

        const applicationDetails = document.createElement("p");
        applicationDetails.textContent = `${formattedWorkType} | ${application.location} | ${application.pay} | ${formattedStatus}`;
        applicationElement.append(applicationDetails);

        const applicationDate = document.createElement("p");
        applicationDate.textContent = application.dateApplied;
        applicationElement.append(applicationDate);

        if (application.jobUrl) {
            const jobLink = document.createElement("a");
            jobLink.href = application.jobUrl;
            jobLink.textContent = "View Job";
            jobLink.target = "_blank";
            jobLink.rel = "noopener noreferrer";
            applicationElement.append(jobLink);
        }

        if (application.notes) {
            const applicationNotes = document.createElement("p");
            applicationNotes.textContent = `Notes: ${application.notes}`;
            applicationElement.append(applicationNotes);
        }

        applicationsList.append(applicationElement); // add newest application to top of list/div
        
    });
}

renderApplications(); // Display saved applications upon loading page

// EventListerner waits for a specific action ("submit" the form in this case)
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

    renderApplications(); // calling function to display saved applications

    applicationForm.reset(); // Reset all fields upon submitting 


    
}); 

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






