# Dev Detective — AI Prompts & Learning Log

## Project Overview

Project Name: Dev Detective — GitHub Profile Explorer  
Sprint: Sprint 3 — The API Hunter / Dev-Detective  
Technologies: HTML, CSS, Vanilla JavaScript, GitHub REST API




## 1. ui/ux (stitch)
Prompt:
# UI/UX DESIGN PROMPT — DEV-DETECTIVE

Act as a Senior UI/UX Designer and Frontend Design Engineer. Design a modern, premium, responsive web application called **Dev-Detective**, a GitHub profile search and repository explorer.

## 1. Product Goal
Build a polished developer tool that allows users to search GitHub profiles, explore their latest repositories, and optionally compare two developers using their repository stars.

The interface should look like a real production SaaS application, not a basic college assignment.

## 2. Design Direction
- Aesthetic: Minimal, modern, premium developer dashboard.
- Theme: Dark-first design with an optional light mode.
- Background: Deep charcoal or near-black.
- Cards: Subtle contrast with thin borders and clean spacing.
- Accent: GitHub-inspired blue or violet, used sparingly.
- Typography: Inter or a similar modern sans-serif font.
- Use consistent spacing, border radii, shadows, and visual hierarchy.
- Avoid excessive gradients, excessive animations, and unnecessary decorative elements.

## 3. Page Layout

### A. Navigation
- Brand logo and text: Dev-Detective.
- Navigation links: Explore, Repositories, Battle Mode.
- Theme toggle.
- Responsive mobile navigation.
- Keep the navbar clean and compact.

### B. Hero and Search Section
- Main heading: "Discover developers. Explore their code."
- Supporting text explaining GitHub profile discovery.
- Prominent GitHub username search input.
- Search button with a search icon.
- Example username suggestions such as octocat and torvalds.
- Clear input focus and hover states.

### C. GitHub Profile Card
Display the following API information:
- GitHub avatar.
- Full name and username.
- Bio.
- Account creation date in a readable format.
- Portfolio or website URL.
- GitHub profile link.
- Public repository count.
- Followers and following counts.
- Location, when available.

Use graceful fallbacks for missing names, bios, websites, and locations.

### D. Repository Section
- Section title: "Latest Repositories".
- Display the five most recently updated repositories.
- Each repository item should contain its name, description, primary language, star count, fork count, and last-updated date where available.
- Repository names must look clickable.
- External links should open in a new tab.
- Use a responsive card grid or clean list layout.

### E. Battle Mode
- Provide a clear toggle to activate Battle Mode.
- Show two independent GitHub username inputs.
- Present both profiles side by side on desktop and stacked on mobile.
- Display total repository stars for both users.
- Highlight the winner in green and the other user in red.
- Handle ties fairly.
- Display loading and error states independently where appropriate.

### F. Application States
Design polished UI states for:
1. Initial empty search screen.
2. Loading spinner or skeleton cards.
3. Successful profile results.
4. User not found (HTTP 404).
5. API rate limit (HTTP 403).
6. Network failure.
7. Empty repository list.
8. Partial API data or missing profile fields.

## 4. Responsive Design
- Mobile-first CSS.
- Mobile: single-column layout.
- Tablet: balanced two-column layout where appropriate.
- Desktop: centered content with a sensible maximum width.
- No horizontal overflow.
- Accessible touch targets.

## 5. Interaction and Accessibility
- Smooth, subtle hover and focus states.
- Keyboard-accessible search and navigation.
- Visible focus indicators.
- Semantic HTML and appropriate ARIA attributes.
- Sufficient color contrast.
- Reduced-motion support.
- Clear feedback for all user actions.


Prioritize usability, readability, maintainability, and professional visual quality over unnecessary decoration.
## 2. Understanding the Requirements

Prompt:

> I have a sprint assignment to build a GitHub profile explorer called Dev Detective. The application should allow users to search GitHub usernames, view profile information, display the latest five repositories, handle loading and 404 error states, and optionally compare two developers using their total repository stars.
>
> First, break down these requirements into small development tasks. Explain which features should be implemented first and how I can build the project using only HTML, CSS, and Vanilla JavaScript.

What I learned: 
I learned how to break a project into smaller tasks and prioritize core functionality before adding optional features.

## 3. Creating the HTML Structure

Prompt:

> Create a semantic HTML structure for a responsive GitHub profile explorer called Dev Detective. Include a navigation bar, username search form, status message area, profile section, repository grid, developer Battle Mode section, and footer.
>
> Use appropriate IDs for elements that will be accessed through JavaScript. Do not use React, Bootstrap, or any JavaScript framework. Keep the HTML separate from the CSS and JavaScript files.

What I learned:
I learned how to structure a web page using semantic HTML, forms, IDs, and separate files for different responsibilities.

## 4. Designing the CSS Interface

Prompt:

> Write a modern, responsive CSS design for my Dev Detective project. Use a dark theme with purple accents, CSS custom properties, profile cards, statistics, repository cards, and Battle Mode comparison cards.
>
> Add a light theme using a class on the body element. Make the layout responsive for mobile devices using CSS Grid, Flexbox, and media queries. Keep all styling in a separate style.css file.

What I learned:
I learned how CSS variables support consistent styling, how Flexbox and Grid help with layouts, and how media queries make a design responsive.

## 5. Connecting to the Real GitHub REST API

Prompt:

> Help me connect my Vanilla JavaScript application to the real GitHub REST API using the Fetch API.
>
> Use `https://api.github.com` as the base URL. Retrieve a user's profile from `/users/{username}` and their five most recently updated public repositories using the repositories endpoint with `sort=updated&per_page=5`.
>
> Explain how async/await works, how to check HTTP response status codes, and how to handle a username that does not exist. Do not use dummy profile data.

What I learned:  
I learned how to make real API requests with `fetch()`, work with JSON responses, use `async/await`, and handle HTTP errors.

## 6. Rendering Profile Information and Repositories

Prompt:

> Help me write a JavaScript function that renders GitHub profile information from the API response. Show the user's name, username, avatar, bio, location, company, account creation date, followers, following, public repositories, and website when available.
>
> Also render the latest five repositories with their names, descriptions, programming languages, star counts, forks, update dates, and clickable repository links. Handle missing profile fields gracefully and explain how the rendering logic works.

What I learned:
I learned how to read properties from API responses, render dynamic content, handle missing values, and format numbers and dates for users.

## 7. Implementing Loading and 404 Error States

Prompt:

> Review the loading and error-handling logic in my GitHub profile search feature. Display a loading message while the API request is running, disable the search button during the request, show a clear error message when a GitHub user returns HTTP 404, and restore the button after the request finishes.
>
> Handle API rate limits and network failures where possible. Explain the purpose of try/catch/finally and make sure the application does not crash when a request fails.

What I learned: 
I learned why loading states matter, how `try/catch/finally` works with asynchronous requests, and how to give users useful feedback when an API call fails.

## 8. Implementing Developer Battle Mode

Prompt:

> Help me implement a Battle Mode that compares two GitHub developers using their public profile statistics and the total stars across their public repositories.
>
> Fetch the two developers' data in parallel with `Promise.all()`. Retrieve repository pages using `per_page=100` and pagination where necessary. Display both developers in comparison cards, highlight the developer with more total stars, and display a draw message when their star totals are equal.
>
> Prevent users from comparing the same username against itself. Explain the code and mention any performance or API rate-limit concerns.

What I learned: 
I learned how `Promise.all()` runs asynchronous operations concurrently, how pagination works, how to aggregate repository stars, and how to compare results.

## 9. Improving Code Safety and Handling URLs

Prompt:

> Review my JavaScript rendering code for basic security and reliability issues. Explain why inserting API-provided text directly into innerHTML can be risky. Show how to escape text values before inserting them into HTML, validate external URLs, and open external links safely using `rel="noopener noreferrer"` with `target="_blank"`.
>
> Keep the solution understandable for a beginner working with Vanilla JavaScript.

What I learned: 
I learned to treat API data as external input, escape user-provided text in HTML templates, and validate URLs before creating clickable links.

## 10. Debugging JavaScript and File-Path Errors

Prompt:

> My browser console shows a 404 error for script.js and says that the returned MIME type is text/html instead of executable JavaScript. Help me diagnose the problem.
>
> Explain how to check the project folder structure, verify the script path in index.html, confirm the JavaScript filename, and use Live Server correctly. Also explain how to identify JavaScript syntax errors in the browser console.

What I learned:
I learned how to troubleshoot missing JavaScript files, correct file paths, understand browser console errors, and verify that my HTML loads the right script.

## 11. Testing the Application

Prompt:

> Create a practical manual testing checklist for Dev Detective. Cover valid GitHub usernames, invalid usernames, loading indicators, missing profile fields, latest repository links, date formatting, Battle Mode, identical usernames, API rate limits, light/dark theme switching, and mobile responsiveness.
>
> For every test, describe the action to perform, the expected result, and how to identify a failure. Keep the tests suitable for a beginner who needs to record a short QA demonstration.

What I learned: 
I learned to test both successful and unsuccessful scenarios instead of checking only whether the page looks correct.

## 12. Reviewing and Understanding the Final Code

Prompt:

> Review my completed Dev Detective project against the sprint requirements. Identify missing features, possible bugs, unnecessary complexity, and edge cases. Explain your recommendations instead of simply rewriting the entire project.
>
> Help me understand the purpose of each major function so that I can explain the HTML, CSS, API integration, asynchronous JavaScript, error handling, and Battle Mode during my project demonstration.

What I learned: 
I learned that AI-generated code needs to be reviewed and tested. I also focused on understanding what each function does and why the implementation works.



## My AI-Assisted Development Approach

I used AI as a coding assistant to understand requirements, explore implementation approaches, troubleshoot errors, and review my code. I worked with HTML, CSS, Vanilla JavaScript, and the GitHub REST API to build the project.

My goal was not only to produce a working application but also to understand the concepts behind it, including asynchronous programming, API responses, error handling, dynamic rendering, and manual testing.
