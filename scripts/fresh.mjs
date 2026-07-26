#!/usr/bin/env node
/**
 * Frees common local/dev ports (and any port held by node/next).
 * Usage: npm run fresh
 */
import { execSync } from "node:child_process";

const EXTRA_PORTS = [
  3000, 3001, 3002, 3003, 4000, 4173, 5000, 5173, 5174, 8000, 8080, 8888,
];

function run(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

function pidsOnPort(port) {
  const out = run(`lsof -tiTCP:${port} -sTCP:LISTEN`);
  return out ? out.split("\n").filter(Boolean) : [];
}

function listeningRows() {
  const out = run("lsof -nP -iTCP -sTCP:LISTEN");
  if (!out) return [];
  return out
    .split("\n")
    .slice(1)
    .map((line) => {
      const parts = line.trim().split(/\s+/);
      const command = parts[0];
      const pid = parts[1];
      const name = parts[parts.length - 1] || "";
      const match = name.match(/:(\d+)$/);
      const port = match ? Number(match[1]) : null;
      return { command, pid, port, name };
    })
    .filter((row) => row.pid && row.port);
}

const toKill = new Map(); // pid -> reason

for (const port of EXTRA_PORTS) {
  for (const pid of pidsOnPort(port)) {
    toKill.set(pid, `port ${port}`);
  }
}

for (const row of listeningRows()) {
  const cmd = row.command.toLowerCase();
  if (cmd.includes("node") || cmd.includes("next") || cmd === "npm" || cmd === "npx") {
    toKill.set(row.pid, `${row.command} on port ${row.port}`);
  }
}

if (toKill.size === 0) {
  console.log("No hay puertos de desarrollo ocupados.");
  process.exit(0);
}

for (const [pid, reason] of toKill) {
  try {
    process.kill(Number(pid), "SIGKILL");
    console.log(`Cerrado ${reason} (pid ${pid})`);
  } catch (err) {
    console.log(`No se pudo cerrar pid ${pid}: ${err.message}`);
  }
}

console.log(`Listo. ${toKill.size} proceso(s) terminado(s).`);
