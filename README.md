# SuperiorTaskerReactFrontendforSB
Version of Superior tasker that will be connected to Spring Boot

## Description
Login Screen works like this: User enters email and password. If that user exists backend will return userModel data and token that frontend saves to browser local storage. We use that token to access to all other protected routes that are generally forbidden to reach.

Register Screen saves valid user and relocates to login screen so we can login with new user.

Main page shows user data and all its projects. We can also search projects and edit our user or account. We can also create new project and logout. User can see compleation rate of its projects and inspect them. User then has access to all tasks and project data that he can update and manipulate.
