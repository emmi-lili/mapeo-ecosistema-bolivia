#!/usr/bin/env node
/**
 * Cierra puertos de desarrollo, arranca Next solo en :3000 y abre el navegador.
 * Usage: npm run fresh
 */
import { execSync, spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = 3000;
const URL = `http://localhost:${PORT}`;
const EXTRA_PORTS = [
  3000, 3001, 3002, 3003, 4000, 4173, 5000, 5173, 5174, 8000, 8080, 8888,
];

const selfPid = String(process.pid);
const parentPid = String(process.ppid);

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

function freePorts() {
  const toKill = new Map();

  for (const port of EXTRA_PORTS) {
    for (const pid of pidsOnPort(port)) {
      if (pid === selfPid || pid === parentPid) continue;
      toKill.set(pid, `port ${port}`);
    }
  }

  for (const row of listeningRows()) {
    if (row.pid === selfPid || row.pid === parentPid) continue;
    const cmd = row.command.toLowerCase();
    if (
      cmd.includes("node") ||
      cmd.includes("next") ||
      cmd === "npm" ||
      cmd === "npx"
    ) {
      toKill.set(row.pid, `${row.command} on port ${row.port}`);
    }
  }

  if (toKill.size === 0) {
    console.log("No hay puertos de desarrollo ocupados.");
    return;
  }

  for (const [pid, reason] of toKill) {
    try {
      process.kill(Number(pid), "SIGKILL");
      console.log(`Cerrado ${reason} (pid ${pid})`);
    } catch (err) {
      console.log(`No se pudo cerrar pid ${pid}: ${err.message}`);
    }
  }

  console.log(`${toKill.size} proceso(s) terminado(s).`);
}

function openBrowser() {
  if (process.platform === "darwin") run(`open ${URL}`);
  else if (process.platform === "win32") run(`start ${URL}`);
  else run(`xdg-open ${URL}`);
}

async function waitForPort(port, retries = 60) {
  for (let i = 0; i < retries; i++) {
    if (pidsOnPort(port).length > 0) return true;
    await sleep(250);
  }
  return false;
}

freePorts();
await sleep(400);

console.log(`Arrancando Next en ${URL}…`);

const child = spawn("npx", ["next", "dev", "-p", String(PORT)], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, PORT: String(PORT) },
});

waitForPort(PORT).then((ready) => {
  if (ready) {
    openBrowser();
    console.log(`Abierto ${URL}`);
  } else {
    console.log(`El puerto ${PORT} no respondió a tiempo; ábrelo manualmente.`);
  }
});

child.on("exit", (code, signal) => {
  if (signal) process.exit(1);
  process.exit(code ?? 0);
});
