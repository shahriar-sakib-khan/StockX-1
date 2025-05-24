# README:

- Run the project using: npm run dev
- Project runs on: http://localhost:5173/

# Dependencies (installed):

- npm install react-router-dom
- npm install zustand

# For future implementation:

- npm install jasonwebtoken (jwt)
- tanstack/react-query for connecting with the backend

# State Management:

- Global states of the project frontend will be managed using zustand
- Create a store for states that needs global access
- for in-page states, just use useState hook

# Folder Structure:

- Every folder has a purpose
- Placing things where they belong will help keeping the codebase maintainable
- The Pages should only act as containers for assembling components.
- Internal details should be in the components.
- Add as many components as you need for your page
- Excercise caution while adding new pages to the project

# Styling:

- For styling, use the variables declared in the index.css file
- The index.css file is preferably not to be touched, only the variables part may be updated
- Proper styling and color scheme is yet to be determined, only some basic colors are added so far
- The updates will be done after team disscussion or agreement
- Knowledge of css variables is mandatory for frontend developers

Rule of thumb:

- use className="wrapper" in every page main container to center the contents with margin
- use var(--primary-text-clr) for most normal text
- use var(--bg-clr-1) for page background (applied by default)
- use var(--bg-clr-2) for gray card backgrounds
- use var(--border) for consistent border (more variations may be added later)
- use var(--border-radius) for consistent border radius
- use var(--box-shadow) for consistent box shadow (yet to be settled)
