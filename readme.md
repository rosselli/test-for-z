# Test for Z

Implement a simple task list application, which tracks done/pending status of each task, and the date it is supposed to be finished.
AC:
- [ ] User must log in to create tasks.
- [ ] After login, user gets redirected to a page which shows her list of tasks.
- [ ] In the same page, the user can add tasks. Only description and estimated date of completion are required.
- [ ] The user can mark a task as done/pending.
- [ ] The tasks are sorted by estimated date of completion.
- [ ] The client communicates with the server through a REST API.

## Out of scope:
- [ ] Auth system. You can use a list of users stored in a text/JSON file, and complex auth methods aren't required; a simple user/pass request is enough. KISS.
- [ ] DB. Store everything in memory (even the list of users can be done this way, if you prefer so). Don't worry about keeping state across different app executions.
- [ ] Deployment. Just send the repo URL across, and clear instructions on how to run the app.

## Hint:
- [ ] Use project starters for both FE and BE. Don't waste time scaffolding everything by yourself. DRY.

## Nice to Have:
- [ ] Tests. (100% coverage NOT required).
- [ ] UI/UX awareness.
- [ ] Well modelled API (this is of course quite subjective, but there are common practices nonetheless).
