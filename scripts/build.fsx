#r "../packages/FAKE/tools/FakeLib.dll"

open Fake
open System

let appPath = "../src/Client/" |> FullName
let serverPath = "../src/Server/" |> FullName
let databasePath = "../src/Server/Database" |> FullName
let apiPath = "../src/Server/Api" |> FullName

let appOutPath = "../src/Client/build/" |> FullName
let apiOutPath = "../src/Server/Api/bin/Release/netcoreapp2.0/publish/" |> FullName
let databaseOutPath = "../src/Server/Database/bin/Release/netcoreapp2.0/publish/" |> FullName

let mutable dotnetExePath = "dotnet"

let runDotnet workingDir args =
    let result =
        ExecProcess (fun info ->
            info.FileName <- "dotnet"
            info.WorkingDirectory <- workingDir
            info.Arguments <- args) TimeSpan.MaxValue
    if result <> 0 then failwithf "dotnet %s failed" args

let runYarn workingDir args =
    let result =
        ExecProcess (fun info ->
            info.FileName <- "yarn"
            info.WorkingDirectory <- workingDir
            info.Arguments <- args) TimeSpan.MaxValue
    if result <> 0 then failwithf "yarn %s failed" args

//-----Tasks-----
Target "InstallDotNetCore" (fun _ ->
    dotnetExePath <- DotNetCli.InstallDotNetSDK "2.1.4"
)

Target "Clean" ( fun _ -> 
    CleanDirs [apiOutPath; appOutPath; databaseOutPath]
)

Target "BuildClient" (fun _ ->
    runYarn appPath ""
    runYarn appPath "build"
    CreateDir (apiOutPath + "/wwwroot")
    CopyDir (apiOutPath + "/wwwroot") appOutPath allFiles
)

Target "BuildServer" (fun _ ->
    let buildArgs = "publish -c Release Server.sln" 
    runDotnet serverPath buildArgs
)

Target "TestClient" (fun _ -> 
    ()
)

Target "TestServer" (fun _ -> 
    ()
)

Target "BuildDockerImages" (fun _ -> 
    let result =
        ExecProcess (fun info ->
            info.FileName <- "docker-compose"
            info.UseShellExecute <- false
            info.Arguments <- "build") TimeSpan.MaxValue
    if result <> 0 then failwith "Docker build failed"
)

Target "RunComposeUp" (fun _ -> 
    let result =
        ExecProcess (fun info ->
            info.FileName <- "docker-compose"
            info.UseShellExecute <- false
            info.Arguments <- "up -d") TimeSpan.MaxValue
    if result <> 0 then failwith "Docker compose failed"
)

//Run for development
Target "RunDev" (fun _ ->
    printfn "Running database migrations"
    runDotnet databasePath "run"
    let runWebServer = async { runDotnet apiPath "watch run" }
    let runWebApp = async { runYarn appPath "start" }
    let openBrowser = async {
        System.Threading.Thread.Sleep(5000)
        Diagnostics.Process.Start("http://localhost:4000/#") |> ignore }

    printfn "Starting server and client dev servers"
    Async.Parallel [| runWebServer; runWebApp; openBrowser |]
    |> Async.RunSynchronously
    |> ignore
)

//-----Pipeline definition-----

Target "Build" DoNothing
Target "Test" DoNothing
Target "Release" DoNothing

"Clean"
    ==> "InstallDotNetCore"
    ==> "BuildServer"
    ==> "BuildClient"
    ==> "TestClient"
    ==> "TestServer"
    ==> "BuildDockerImages"
    ==> "RunComposeUp"

"TestServer"
    ==> "Test"

"BuildClient"
    ==> "Build"

"RunComposeUp"
    ==> "Release"

RunTargetOrDefault "Build"