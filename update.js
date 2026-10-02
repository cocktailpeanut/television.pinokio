const { spawnSync } = require("node:child_process")

module.exports = async (kernel) => {
  const git = kernel.which("git")
  const hasOrigin = git && spawnSync(git, ["remote", "get-url", "origin"], {
    cwd: __dirname,
    encoding: "utf8"
  }).status === 0

  return {
    run: [
      ...(hasOrigin ? [{
        method: "shell.run",
        params: {
          message: "git pull --ff-only"
        }
      }] : []),
      {
        method: "script.start",
        params: {
          uri: "install.js"
        }
      }
    ]
  }
}
