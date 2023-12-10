import { program } from "commander";
import fs from "fs";
import path from "path";
import { jsonToOpenApiSchema } from "../jsonToSchema";
import prettier from "prettier";
import config from "../prettier";

program.argument("<string>", "filename").action(async (str) => {
  try {
    const file = fs.readFileSync(path.resolve("./", str), "utf-8");
    const obj = JSON.parse(file);
    const schema = jsonToOpenApiSchema(obj);
    const formattedCode = await prettier.format(JSON.stringify(schema), config);
    console.log(formattedCode);
  } catch (err) {}
});

program.parse(process.argv);
