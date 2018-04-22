FROM microsoft/aspnetcore
COPY /bin/Release/netcoreapp2.0/publish /api
WORKDIR /api

EXPOSE 80
ENTRYPOINT ["dotnet", "Api.dll"]