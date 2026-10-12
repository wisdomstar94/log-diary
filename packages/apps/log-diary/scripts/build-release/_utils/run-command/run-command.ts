import { spawnSync } from "node:child_process";

export function runCommand(command: string, args: string[], cwd: string) {
  const result = spawnSync(command, args, { cwd, stdio: "inherit" });
  if (result.status !== 0) {
    throw new Error(`명령이 실패했습니다 : ${command} ${args.join(" ")}`);
  }
}
