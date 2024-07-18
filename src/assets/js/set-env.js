import { writeFileSync } from "fs";

const targetPath = "./src/environments/environment.js";
const envConfigFile = `(() => {
  window.__env = {
    apiUrl: '${process.env.API_URL}'
  };
})();`;

writeFileSync(targetPath, envConfigFile);
