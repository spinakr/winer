##SQL data in docker
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=Qwer1234\*' -p 1401:1433 --name development-sql -v dev-sql:/dev-sql-data -d microsoft/mssql-server-linux
