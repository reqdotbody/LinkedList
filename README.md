# LinkedList

##Setting up the Database Locally
1. You'll need to make sure that you have postgres installed. (http://www.postgresql.org/)
2. You'll need to run the postgres server
  a. You can do this from the app (http://postgresapp.com/)
  b. Or, you should be able to run "postgres -D /usr/local/var/postgres" to start up your server via the command line.
3. You'll then need to start up the postgres (client) terminal interface. You can do this by running "psql" from the command line in another tab. 
4. "CREATE DATABASE linked_list;"
5. npm start (this will run the latest knex migration and set up your database!)

####* HOT KEYS *#####
Basic SQL terminal interaction keys for understanding your space immediately:
"CREATE DATABASE linked_list;" - creates new database of the name "linked_list"
"\list" - lists all databases 
"\connect mydatabase;" - connects to certain database
"\dt;" - shows all tables in current database


