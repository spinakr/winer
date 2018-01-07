#r "../packages/FAKE/tools/FakeLib.dll"

open Fake
open System

let apiPath = "../src/api/" |> FullName
let apiOutPath = "../src/api/out" |> FullName
let appPath = "../src/app/" |> FullName
let appOutPath = "../src/app/build" |> FullName
let databasePath = "../src/database/" |> FullName
let databaseOutPath = "../src/database/out" |> FullName

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
    dotnetExePath <- DotNetCli.InstallDotNetSDK "2.1.3"
)

Target "Clean" ( fun _ -> 
    CleanDirs [apiOutPath; appOutPath; databaseOutPath]
)

Target "BuildApp" (fun _ ->
    runYarn appPath ""
    runYarn appPath "build"
)

Target "BuildDatabase" (fun _ ->
    let buildArgs = "publish -c Release -o \"" + FullName databaseOutPath + "\""
    runDotnet databasePath buildArgs
)

Target "BuildApi" (fun _ ->
    let buildArgs = "publish -c Release -o \"" + FullName apiOutPath + "\""
    runDotnet apiPath buildArgs
)

Target "TestApp" (fun _ -> 
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
    let runWebServer = async { runDotnet apiPath "watch run" }
    let runWebApp = async { runYarn appPath "start" }
    let openBrowser = async {
        System.Threading.Thread.Sleep(5000)
        Diagnostics.Process.Start("http://localhost:4000/#") |> ignore }

    Async.Parallel [| runWebServer; runWebApp; openBrowser |]
    |> Async.RunSynchronously
    |> ignore
)

//-----Pipeline definition-----

Target "Build" DoNothing
Target "Release" DoNothing

"Clean"
    ==> "InstallDotNetCore"
    ==> "BuildApp"
    ==> "BuildDatabase"
    ==> "BuildApi"
    ==> "TestApp"
    ==> "TestServer"
    ==> "BuildDockerImages"
    ==> "RunComposeUp"


"BuildApi"
    ==>"Build"

"RunComposeUp"
    ==> "Release"

RunTargetOrDefault "Build"