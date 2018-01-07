FROM microsoft/aspnetcore:2.0

COPY /out /db
WORKDIR db

ENTRYPOINT ["dotnet", "database.dll", "Server=db;Database=winer;User Id=SA; Password=Qwer1234*"]