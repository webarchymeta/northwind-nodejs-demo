# Northwind nodejs data service demo
A demo data service for our representation of the Northwind relational database in memory (.NET based) hosted by nodejs via edgejs. Node 5.x is required to run the demo.

## Entry point:
The entry file of the data service is under the "server-hosts" directory and is named __app.js__. The npm libraries are not included in the repo so they should be downloaded by runing __npm update --save__ under the entry directory.

## User interface:
The data service has a user interface (read only at present) for a user to query the relational data sets. Go to  _http://localhost:10961_ using a browser after starting up the service and follow the initial link to explore the database.

## Where nodejs meets .NET
All the javascript files in which the .NET backend (in process and in memory) database is accessed are under the "services/adapters/servers/Northwind/api" directory. The __NorthwindService.js__ file is for database level operations. There is a corresponding file for each table under the "sets" sub-directory.
