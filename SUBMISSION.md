# Submission Summary

## Track Chosen

<!-- Mark your choice with [x] -->

- [x] Backend Only
- [ ] Frontend Only
- [ ] Full-Stack (Both)

## GitHub Copilot Usage Summary

<!-- Describe how you used AI throughout the test. Be specific about when and how you leveraged AI tools. -->

Used GitHub Copilot throughout to:

- Generate boilerplate code for Express routes, controllers, and models
- Implement Zod validation schemas and error handling
- Add middleware for logging and error handling
- Refactor code for best practices (DRY, constants, utilities)
- Fix code quality issues and add security features (XSS protection)
- Implement priority-based due date calculation and sorting

## Key Prompts Used

<!-- List 3-5 important prompts you used with your AI assistant -->

1. "Build a Task Management Feature based on your chosen track (Backend)"
2. "use joi or zod for input validation and use enum for status, common function for repetitive code"
3. "Request Logging Middleware to log HTTP requests with execution time"
4. "Check whole code for any code compromisation just on quality level"
5. "Prioritize tasks => due date within 7 days, ensure priority is high due date should be 7 days"

## Design Decisions (optional)

<!-- Explain key architectural or implementation decisions you made and why -->

- **Decision 1:** In-memory storage with auto-incrementing IDs
  - **Reasoning:** Simple implementation without database setup, suitable for test requirements

- **Decision 2:** Zod for validation instead of Joi
  - **Reasoning:** Better TypeScript integration and type inference

- **Decision 3:** Priority determines due date automatically
  - **Reasoning:** Ensures consistency - HIGH=7 days, MEDIUM=14 days, LOW=30 days

- **Decision 4:** Completed tasks cannot be edited
  - **Reasoning:** Prevents accidental modification of finished work

## Challenges Faced

<!-- Optional: Describe any challenges encountered and how you overcame them -->

- Initial confusion on priority-dueDate relationship - clarified with user that priority drives due date calculation
- Error format consistency - standardized to {error: "message"} format across all endpoints

## Time Breakdown

<!-- Optional: Approximate time spent on each phase -->

Not tracked

## Optional Challenge

<!-- If you attempted an optional challenge, specify which one -->

- [ ] Not Attempted
- [x] Option 1: Request Logging Middleware
- [ ] Option 2: API Pagination
- [x] Option 3: Advanced Validation
- [ ] Option 4: Task Filtering & Search
- [ ] Option 5: Form Validation & UX
- [ ] Option 6: Drag-and-Drop Task Reordering
- [ ] Option 7: Local Storage / Offline Support
- [ ] Option 8: Real-time Updates
- [ ] Option 9: Task Statistics Dashboard

## Additional Notes

<!-- Any other information you'd like to share about your implementation -->

- Implemented XSS protection using validator.escape()
- Added sorting by due date (?sortBy=dueDate query parameter)
- Created formatZodError utility to avoid code duplication
- Used constants for validation constraints and error messages

---

## Submission Checklist

<!-- Verify before submitting -->

- [x] Code pushed to public GitHub repository
- [x] All mandatory requirements completed
- [x] Code is tested and functional
- [x] README updated (if needed)
- [x] This SUBMISSION.md file completed
- [x] MS Teams recording completed and shared
- [x] GitHub repository URL provided to RM
- [x] MS Teams recording link provided to RM
