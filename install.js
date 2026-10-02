module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: 'npm install --prefix runtime --no-audit --no-fund node@24 npm@11'
      }
    },
    {
      method: "shell.run",
      params: {
        conda: { skip: true },
        env: {
          PATH: [
            "{{path.resolve(cwd, 'runtime/node_modules/node/bin')}}",
            "{{path.resolve(cwd, 'runtime/node_modules/.bin')}}"
          ]
        },
        message: "npm install --prefix app/release --no-audit --no-fund @telepath-computer/television@latest"
      }
    }
  ]
}
