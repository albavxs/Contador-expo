#!/usr/bin/env node

/**
 * This script resets the project to a blank state.
 * It moves the /app, /components, /hooks, /scripts, and /constants directories to /app-example
 * and creates a new /app directory with index.tsx and _layout.tsx files.
 * After running it, you can safely delete this file and remove the `reset-project` script from package.json.
 */

const fs = require("fs");
const path = require("path");

const root = process.cwd();
const oldDirs = ["app", "components", "hooks", "constants", "scripts"];
const newDir = "app-example";
const newAppDir = "app";

const indexContent = `
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
`;

const layoutContent = `
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`;

const moveDirectories = async () => {
  try {
    // Create app-example directory
    await fs.promises.mkdir(path.join(root, newDir), { recursive: true });
    console.log(`📁 /${newDir} directory created.`);

    // Move old directories to app-example
    await Promise.all(
      oldDirs.map(async (dir) => {
        const oldDirPath = path.join(root, dir);
        const newDirPath = path.join(root, newDir, dir);
        if (fs.existsSync(oldDirPath)) {
          await fs.promises.rename(oldDirPath, newDirPath);
          console.log(`➡️ /${dir} moved to /${newDir}/${dir}.`);
        } else {
          console.log(`➡️ /${dir} does not exist, skipping.`);
        }
      })
    );

    // Create new /app directory and files
    const newAppDirPath = path.join(root, newAppDir);
    await fs.promises.mkdir(newAppDirPath, { recursive: true });
    console.log("\n📁 New /app directory created.");

    // Create index.tsx and _layout.tsx files
    await Promise.all([
      fs.promises.writeFile(
        path.join(newAppDirPath, "index.tsx"),
        indexContent
      ),
      fs.promises.writeFile(
        path.join(newAppDirPath, "_layout.tsx"),
        layoutContent
      ),
    ]);
    console.log("📄 app/index.tsx created.");
    console.log("📄 app/_layout.tsx created.");

    console.log("\n✅ Project reset complete. Next steps:");
    console.log(
      "1. Run `npx expo start` to start the development server.\n2. Edit app/index.tsx to modify the main screen.\n3. Delete the /app-example directory once you're done referencing it."
    );
  } catch (error) {
    console.error(`Error during script execution: ${error}`);
  }
};

moveDirectories();
