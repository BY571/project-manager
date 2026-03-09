"use server";

import { spawn } from "child_process";
import { existsSync } from "fs";

export async function launchTerminal(dirPath: string) {
  if (!dirPath || !existsSync(dirPath)) {
    return { success: false, error: "Directory does not exist" };
  }

  const cmd = `cd ${JSON.stringify(dirPath)} && claude --dangerously-skip-permissions`;

  // Try common terminal emulators in order of preference
  const terminals = [
    { bin: "gnome-terminal", args: ["--", "bash", "-c", `${cmd}; exec bash`] },
    { bin: "konsole", args: ["-e", "bash", "-c", `${cmd}; exec bash`] },
    { bin: "xfce4-terminal", args: ["-e", `bash -c '${cmd}; exec bash'`] },
    { bin: "x-terminal-emulator", args: ["-e", `bash -c '${cmd}; exec bash'`] },
    { bin: "xterm", args: ["-e", `bash -c '${cmd}; exec bash'`] },
  ];

  for (const term of terminals) {
    try {
      const child = spawn(term.bin, term.args, {
        detached: true,
        stdio: "ignore",
        cwd: dirPath,
      });
      child.unref();
      return { success: true };
    } catch {
      continue;
    }
  }

  return { success: false, error: "No supported terminal emulator found" };
}
