FROM microsoft/aspnetcore

COPY /bin/Release/netcoreapp2.0/publish /db
WORKDIR db

ENTRYPOINT ["dotnet", "Database.dll", "Server=db;Database=winer;User Id=SA;Password=Qwer1234*"]