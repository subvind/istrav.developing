istrav.dev
========
Innovation Management Software (IMS)

istrav source code:
- istrav.com: https://github.com/trabur/istrav.com
- trabur.workers.dev: https://github.com/trabur/istrav-global
- istrav.net: https://github.com/trabur/istrav-platform-frontgate
- meta.istrav.net: https://github.com/trabur/istrav-platform-frontend
- istrav.istrav.dev: https://github.com/trabur/istrav-platform-backend
- istrav-load-balancer: https://github.com/trabur/istrav-load-balancer
- istrav.dev: https://github.com/trabur/istrav.dev
- istrav-headquarters: https://github.com/trabur/istrav-headquarters
- istrav.stream: https://github.com/trabur/istrav.stream

istrav.dev tech:
- NestJS
- nlpjs
- gulp
- commander

### start
```bash
# so that scripts may run file by child_process.spawn
$ sudo chmod -R a+rwx ./index.js
```

```bash
# node index.js --help
Usage: Network AI [options] [command]

Here are the CLI docs for interacting with our
local servers behind ... https://istrav.dev

Network AI:
- Run a command ... > tasks log
- Platforms integration ... /community_folder/ Hello there!
- Direct messaging ... @john: Hello there!
- Default ... Hello there!

Options:
  -V, --version                                             output the version number
  -h, --help                                                display help for command

Commands:
  tasks <gulpfile>                                          Run a gulp task from the tasks folder.
  nlp-document <container> <language> <utterance> <intent>  Add an utterance and intent for the NLP.
  nlp-answer <container> <language> <intent> <response>     Add an intent and response for the NLP.
  nlp-train <container> <language>                          Teach a program how to act using documents and answers.
  nlp-process <container> <language> <run>                  Tell a trained program something.
  platform-run <name>                                       Tell PM2 to run a new platform process.
  platform-stop <name>                                      Tell PM2 to stop a running platform process.
  help [command]                                            display help for command
```
