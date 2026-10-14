# Job Application Tracker

A browser-based application for tracking job applications, including company, position, work type, status, application date, job URL, and notes.

## Features

- Add new job applications
- Edit existing applications
- Delete applications with confirmation
- Search by company or position
- Filter applications by status
- Store application date in browser localStorage

## Technologies Used

- HTML
- CSS
- JavaScript
- Web Storage API (`localStorage`)
- Git
- GitHub

## How It Works

The application uses JavaScript to read form input, create job application objects, and render them as cards on the page. Application data is saved in the browser using `localStorage`, allowing entries to persist after the page is refreshed. Search and status filters create filtered views of the saved applications without changing the original stored data.

## Project Structure

- `index.html` - Contains the page structure and form fields
- `style.css` - Controls the layout and visual styling
- `app.js` - Handles application data, rendering, editing, deleting, searching, filtering, and `localStorage`
- `READ.md` - Documents the project

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/larry-gu/job-application-tracker.git
```

2. Open the project folder.

3. Open `index.html` in a web browser.


## Future Improvements

- Replace `localStorage` with a backend API and database
- Deploy the application to the cloud
- Add user authentication
- Add analytics for application trends and status changes
- Explore AI-assisted job description analysis
