##SQL data in docker
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=Qwer1234\*' -p 1401:1433 --name development-sql -v dev-sql:/dev-sql-data -d microsoft/mssql-server-linux

#Setup dns to match docker container, needed when running dev servers
Add "127.0.0.1 db" to your "/private/etc/hosts"-file and flush the dns settings with `dscacheutil -flushcache`

# List files in directory in container 
docker exec -it winer_db_1 ls /var/opt/mssql/data/

# Copy file from container 
docker cp winer_db_1:/var/opt/mssql/data/winer-2018127-10-20-1.bak .