import { readFile } from "fs/promises";
import { promisify } from "node:util";
import { exec as execCallback } from "node:child_process";
const exec = promisify(execCallback);

(async function () {
    const packageJsonContent = await readFile("./package.json", "utf8");
    const packageJson = JSON.parse(packageJsonContent);
    const version = "v" + packageJson.version;
    const command =
        "git tag -f -a " + version + ' -m "Tag version ' + version + '"';
    if (process.argv.some((x) => x.toLowerCase() === "--run-command")) {
        console.log("Running command: " + command);
        await exec(command);
    } else {
        console.log(command);
    }
})();
