FROM microsoft/aspnetcore:2.0
COPY /build /app
WORKDIR /app
EXPOSE 8080
ENTRYPOINT ["dotnet", "api.dll"]