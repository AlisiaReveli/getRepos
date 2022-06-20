A simple web page where you can get a list of your github repos.
You can access repos by clicking the <Sign in With Github> tag and redirecting to github application,
or by adding your personal access token.
  
  
This web-page is not based on authentication logic.
The main idea was to create a 'one way' application, where any user can add the git account and check the repos.
  
For starting :
  ```
  git clone https://github.com/AlisiaReveli/getRepos.git 
  
  ```
 
  Make sure you have docker installed and type in the main directory the commands below:
  ```
  docker-compose build
  
  ```
  ...and after building write:
  
  ```
  docker-compose up
  
  ```
  Wait till the containers will be created and search on browser :
  ```
  localhost:3000
  
  ```
  
  You will be directed here:
  <img width="934" alt="image" src="https://user-images.githubusercontent.com/77354184/174685584-25b93087-07d7-44ee-8773-8908e0504e87.png">
  
  <img width="957" alt="image" src="https://user-images.githubusercontent.com/77354184/174686459-0e02d853-aa3d-492a-92e9-f3988ca714a8.png">

  

