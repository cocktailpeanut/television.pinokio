const fs = require("fs/promises")

module.exports = {
  version: "7.0",
  title: "Television",
  description: "A visual workspace for your personal agent's documents, apps, and interactive artifacts.",
  icon: "icon.png",
  menu: async (kernel, info) => {
    const running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js")
    }

    if (running.update) {
      return [{ default: true, icon: "fa-solid fa-terminal", text: "Updating", href: "update.js" }]
    }
    if (running.reset) {
      return [{ default: true, icon: "fa-solid fa-terminal", text: "Resetting", href: "reset.js" }]
    }
    if (running.install) {
      return [{ default: true, icon: "fa-solid fa-plug", text: "Installing", href: "install.js" }]
    }

    const installed = info.exists("app/release/node_modules/@telepath-computer/television/dist/cli.cjs") &&
      info.exists("app/release/node_modules/@telepath-computer/television/dist/web/index.html") &&
      info.exists(`runtime/node_modules/node/bin/${kernel.platform === "win32" ? "node.exe" : "node"}`) &&
      info.exists("runtime/node_modules/npm/bin/npm-cli.js")

    if (!installed) {
      return [{ default: true, icon: "fa-solid fa-plug", text: "Install", href: "install.js" }]
    }
    if (running.start) {
      const local = info.local("start.js")
      if (local && local.url && info.exists("data/state/token")) {
        const token = (await fs.readFile(info.path("data/state/token"), "utf8")).trim()
        return [{
          default: true,
          icon: "fa-solid fa-rocket",
          text: "Open Web UI",
          href: `${local.url}/?token=${encodeURIComponent(token)}`
        }, {
          icon: "fa-solid fa-terminal",
          text: "Terminal",
          href: "start.js"
        }]
      }
      return [{ default: true, icon: "fa-solid fa-terminal", text: "Starting", href: "start.js" }]
    }
    return [{
      default: true,
      icon: "fa-solid fa-power-off",
      text: "Start",
      href: "start.js"
    }, {
      icon: "fa-solid fa-rotate",
      text: "Update",
      href: "update.js"
    }, {
      icon: "fa-solid fa-plug",
      text: "Reinstall",
      href: "install.js"
    }, {
      icon: "fa-solid fa-broom",
      text: "Reset",
      href: "reset.js"
    }, {
      icon: "fa-solid fa-book",
      text: "Documentation",
      href: "README.md"
    }]
  }
}
