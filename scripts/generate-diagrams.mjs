import { run } from "@mermaid-js/mermaid-cli";
import fs from "fs";
import path from "path";

const root_folder = path.resolve();

const mermaidInputPath = path.join(root_folder, "mermaid", "mmd");
const mermaidOutputPath = path.join(root_folder, "mermaid", "svg");

// create the output folder if it doesn't exist
if (!fs.existsSync(mermaidOutputPath)) {
  fs.mkdirSync(mermaidOutputPath);
}

const generateMermaidGraph = async (inputPath) => {
  const fileName = path.parse(inputPath).name;

  const outputPath = path.join(mermaidOutputPath, `${fileName}.svg`);

  console.log(`Generating ${outputPath}`);

  await run(inputPath, outputPath, {
    outputFormat: "svg",
  });

  console.log(`Generated ${outputPath}`);
};

// loop through all files in the mermaid input folder
fs.readdirSync(mermaidInputPath).forEach(async (file) => {
  const inputPath = path.join(mermaidInputPath, file);

  await generateMermaidGraph(inputPath);
});
