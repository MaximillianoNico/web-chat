### Repository

https://github.com/MaximillianoNico/web-chat


### Date of submission

27 Nov 2023, 12AM

### Instructions to run assignment locally
Currently we using Nx Monorepo for handle multiple apps in one repository </br>
for running the Monorepo first need to install globally Nx by following this script
```
# yarn (recommended)
yarn global add nx@latest

#npm
npm install --global nx@latest
```

After install Nx globally, we can continue to next step for run multiple app
```
nx docker-build chat-svc

docker-compose up && nx serve web-chat-app
```

### Time spent
For time development we split into 4 section

- **Initialize and Setup:** (4 hours) <br />
for setup Nx, Dockerize and Initialize Code Web and Service

- **Slicing:** (5 hours) <br />
Creating UI Components, Providers and Helpers on the frontend side
  - Join room Page
  - Chat room Page
  - UI Component such as Chat Card

- Create Service (4 hours)
Create new Service API for chat include business logic, authentication (session) and Socket for event-driven lib handle real-time chat

- Integration (4 hours 30 minutes)
Develop for integration between Frontend and Backend Side

### Assumptions made
For Create new Chat Service, here is the assumptions
- **Security:** will be take more time on development cause need to take care of the security for example XSS Attack
- **Timeline**: need Dashboard Admin and also new one page for Create new Room chat so need to breakdown for requirement of Dashboard Admin and also logic Room Chat ex. create new room or send image file
- **Technology**: we use Nx Monorepo cause it will be easier for use to maintain apps in one repository and also one version of packages used.

### What would be your approach to ensuring the application is ready for production
before release to production, we need to implement unit testing and also QA Test for make sure the feature is ready to use. and also implement versioning and feature_flag for make easy for us to rollback if there is bugs still shown on the apps

### How would you ensure a smooth user experience as 1000’s of users start using your app simultaneously?
First we need to make sure no bugs when release to production, the required server requirements, implement clustering on NodeJS and create master slave for mongodb.

### What key steps would you take to ensure application security?
Need to ensure which parts need to be authenticated before accessing data, for example message endpoints. on the message endpoint we need an authorization header to ensure that it comes from a user in that room. 
Make sure no XSS Attack by adding validation on the send message.


### What did you not include in your solution that you want us to know about? Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it 
I think almost done by implement the new chat app, but need more time to create more secure chat app for example prevent XSS Attack and Whitelist in the Backend side for make sure only our app able to access to the chat service

### Your feedback on this technical challenge
no from my side, all is pretty clear
