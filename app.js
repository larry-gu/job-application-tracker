
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

    // loop through applications array
    applications.forEach(function(application){

        // Format dropdown values for display - uppercase first letters
        const formattedWorkType = application.workType.charAt(0).toUpperCase() + application.workType.slice(1);
        const formattedStatus = application.status.charAt(0).toUpperCase()+application.status.slice(1);
        
        // Create main container for one application
        const applicationElement = document.createElement("div");// creates new div 
        applicationElement.classList.add("application-card");
        
        // Create and display company and position
        const applicationTitle = document.createElement("h3");
        applicationTitle.textContent = `${application.company} - ${application.position}`;
        applicationElement.append(applicationTitle);

        // Create and display work type, location, pay, and status
        const applicationDetails = document.createElement("p");
        applicationDetails.textContent = `${formattedWorkType} | ${application.location} | ${application.pay} | ${formattedStatus}`;
        applicationElement.append(applicationDetails);

        // Create and display application date
        const applicationDate = document.createElement("p");
        applicationDate.textContent = application.dateApplied;
        applicationElement.append(applicationDate);

        // Only create a job post link if URL was provided
        if (application.jobUrl) {
            const jobLink = document.createElement("a"); // Create clickable element
            jobLink.href = application.jobUrl;          // Set link URL to job URL
            jobLink.textContent = "View Job";           // Visible text for link
            jobLink.target = "_blank";                  // Open link in new tab

            jobLink.rel = "noopener noreferrer";        // Add extra security/privacy protection in new tab
            // "noopener" = new tab can't control original tab
            // "noreferrer" = new site cannot see original page URL as HTTP Referer
            applicationElement.append(jobLink);
        }

        // Only display notes if "Notes" field was used
        if (application.notes) {
            const applicationNotes = document.createElement("p");
            applicationNotes.textContent = `Notes: ${application.notes}`;
            applicationElement.append(applicationNotes);
        }

        // Add completed application card to the Applications section
        applicationsList.append(applicationElement); 
        
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






