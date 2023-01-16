var version = "v"+require("./package.json").version;
const command = ("git tag -a "+version+" -m \"Tag version "+version+"\"");
if (process.argv.findIndex(x => x.toLowerCase() === "--run-command")) {
    console.log("Running command: "+command);
    require("child_process").execSync(command);
}else{
    console.log(command);
}