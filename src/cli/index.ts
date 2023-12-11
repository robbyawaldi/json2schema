import { program } from "commander";
import fs from "fs";
import path from "path";
import { jsonToOpenApiSchema } from "../jsonToSchema";
import prettier from "prettier";
import config from "../prettier";
import YAML from "json-to-pretty-yaml";

program
  .argument("<string>", "filename")
  .option("-f, --format", "json or ymal")
  .action(async (str, options) => {
    try {
      const file = fs.readFileSync(path.resolve("./", str), "utf-8");
      const obj = JSON.parse(file);
      const schema = jsonToOpenApiSchema(obj);
      const jsonFormat = await prettier.format(JSON.stringify(schema), config);
      const ymalFormat = YAML.stringify(schema);
      const format = options.format ?? "json";
      if (format === "json") {
        console.log(jsonFormat);
      } else {
        console.log(ymalFormat);
      }
    } catch (err) {}
  });

program.parse(process.argv);
