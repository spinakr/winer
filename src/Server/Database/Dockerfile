FROM microsoft/aspnetcore

COPY /out /db
WORKDIR db

ENTRYPOINT ["dotnet", "database.dll", "Server=db;Database=winer;User Id=SA;Password=Qwer1234*"]