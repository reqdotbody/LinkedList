# LinkedList
=======
Platform for dev-to-dev collaboration.

LinkedList provides web developers with the collaboration tools they need to ship code. Project owners can create a new LinkedList project, and specify which aspects, frameworks, or tools they wish for collaborators to work on. Other users can then express interest in a project position as long as the project owner desires. Then the owner simply looks over the profiles and on-site reputations of the developers who have signed up, and picks the best match for each collaborator position on the project. Upon project completion, both the project owner and the collaborators have the opportunity to rate and review each other, allowing good collaborators to build up their community reputation and protecting project owners from collaborators who are unpleasant to work with. 

## Getting Started
Getting started on LinkedList is easy! Simply signup, fill in a couple of basic details about your skills and preferred frameworks, and you are ready to get collaborating! We make it simple so you can spend your time shipping code. 

##Setting up the Database Locally
1. You'll need to make sure that you have postgres installed. (http://www.postgresql.org/)
2. You'll need to run the postgres server
  a. You can do this from the app (http://postgresapp.com/)
  b. Or, you should be able to run "postgres -D /usr/local/var/postgres" to start up your server via the command line.
3. You'll then need to start up the postgres (client) terminal interface. You can do this by running "psql" from the command line in another tab. 

####* HOT KEYS *#####
Basic SQL terminal interaction keys for understanding your space immediately:
"CREATE DATABASE mydatabase;" - creates new database
"\list" - lists all databases 
"\connect mydatabase;" - connects to certain database
"\dt;" - shows all tables in current database


