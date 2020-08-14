# Basic Book Manager
This app will manage a list of books and their authors

### Stack
Node.js, Express.js & Typescript (Backend)\
React (Frontend)\
MongoDB (Database - hosted on mlab)

### Scripts

* npm run build (compiles the typescript files into javascript)\
* npm run client (runs only the frontend react app)\
* npm run client-install (npm install for the client folder)\
* npm run dev (runs bothe the backend and frontend)
* npm run dev-server (runs only the backend)\

## Commentary
I was able to implement most of the requirements here [Holidog Full Stack Challenge](https://github.com/Holidog-com/Full-stack-challenge). The api endpoints all work >perfectly. I didn't have time to implement the\
bonus api endpoints (i.e. for PUT requests).

#### Problems (Bugs, Errors and Warnings)
* There is a bug that occurs when you go from the 'book list' to the 'add book' form. For some reason, the state returns undefined when I push the array of books to the state of the 'add book' component. There is a most\
likely a more efficient way of doing this but i was short on time.
* There is an "Unhandled Promise Rejection" Warning. It doesn't seem to have any noticeable effect on performance.
* There is no error component so if you type a random component like '/test' it won't take you to an error page. It just won't load any information beyond the standard App.js component
