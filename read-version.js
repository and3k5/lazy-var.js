var version = "v"+require("./package.json").version;
console.log("git tag -a "+version+" -m \"Tag version "+version+"\"");