
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
const submitButton = document.getElementById("submit-button");
const cancelEditButton = document.getElementById("cancel-edit-button");
const searchInput = document.getElementById("search");
const statusFilter = document.getElementById("status-filter");

// Retrieve previous saved applications from localSorage
// getItem() will return null if nothing is saved
const savedApplications = localStorage.getItem("applications");

// If saved data exists, convert JSON text back into JavaScript array
// else start with empty array
const applications = savedApplications ? JSON.parse(savedApplications) : [];

let editingIndex = null;


// renderApplicaiton displays applications from applications[]
function renderApplications() {

    applicationsList.innerHTML = ""; // clear container before looping

    // Convert search test to lowercase
    const searchTerm = searchInput.value.toLowerCase();

    // Set selectedStatus to statusFilter value
    const selectedStatus = statusFilter.value;

    // Show only applications whose company/position matches search
    const filteredApplications = applications.filter(function(application) { // "filter" = new array containing relevant iterms
       
        // Check whether company or position contains search text
        const matchesSearch = 
            application.company.toLowerCase().includes(searchTerm) ||
            application.position.toLowerCase().includes(searchTerm);

        // Match all statuses if "All statuses" is selected,
        // else require application's status to match selected status
        const matchesStatus = 
            selectedStatus === "" ||
            application.status === selectedStatus;
        
        // Only keep applications that match both search and status filters.
        return matchesSearch && matchesStatus;
    
    });

    // loop through applications array
    filteredApplications.forEach(function(application, index){

        // Find current application's position in original array
        const originalIndex = applications.indexOf(application);

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

            // Add class 
            jobLink.classList.add("job-link");

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

        // Button to edit applcation
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-button");
        applicationElement.append(editButton);

        // Edit button listener
        editButton.addEventListener("click", function() {

            // Index to track application being edited
            editingIndex = originalIndex;

            // Show the "cancel edit" button while editing
            cancelEditButton.hidden = false;

            // Update submit button to show "Update Application"
            submitButton.textContent = "Update Application";

            // Load selected applcation's information into the form
            companyInput.value = application.company;
            positionInput.value = application.position;
            workTypeSelect.value = application.workType;
            locationInput.value = application.location;
            payInput.value = application.pay;
            statusSelect.value = application.status;
            dateAppliedInput.value = application.dateApplied;
            jobUrlInput.value = application.jobUrl;
            notesTextArea.value = application.notes;
        })

        // Cancel Edit button listener
        cancelEditButton.addEventListener("click", function(){
            editingIndex = null;
            applicationForm.reset();
            submitButton.textContent = "Add Application";
            cancelEditButton.hidden = true;
        });

        // Button to delete application
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        applicationElement.append(deleteButton);

    
        // Click listener for Delete button to remove application using index
        deleteButton.addEventListener("click", function(){
            // "confirm" = browser dialog box
            const confirmed = confirm("Delete application?");

            // If confirmed for deletion, delete application
            if (confirmed){
                applications.splice(originalIndex, 1); // start at "index" and remove 1 item
                localStorage.setItem("applications", JSON.stringify(applications)); // saves new aray
                renderApplications();     
            }
        })

        

        // Add completed application card to the Applications section
        applicationsList.append(applicationElement); 
        
        
    });
}

// Event listener for Search
searchInput.addEventListener("input", function(){
    renderApplications();
})

// Event listener for Status Filter
statusFilter.addEventListener("change", function(){
    renderApplications();
})


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

    // if we are editing, replace existing application. else, add new application
    if (editingIndex !== null) {
        applications[editingIndex] = application;
        editingIndex = null;
        // Reset form to "Add" mode after updating existing form
        submitButton.textContent = "Add Application";
        
        // Hide Cancel Edit button
        cancelEditButton.hidden = true;
    } else {
        applications.unshift(application); // adds newest application to the start of array
    }

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






