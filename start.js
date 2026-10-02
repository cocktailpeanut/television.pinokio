module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        conda: { skip: true },
        env: {
          PATH: [
            "{{path.resolve(cwd, 'runtime/node_modules/node/bin')}}",
            "{{path.resolve(cwd, 'runtime/node_modules/.bin')}}"
          ]
        },
        message: [
          "node release/node_modules/@telepath-computer/television/dist/cli.cjs --home ../data config set port {{port}} listen 127.0.0.1 auth true",
          "node release/node_modules/@telepath-computer/television/dist/cli.cjs --home ../data serve"
        ],
        on: [{
          event: "/(http:\\/\\/[0-9.:]+)/",
          done: true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[1]}}"
      }
    }
  ]
}
