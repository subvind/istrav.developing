istrav.dev
========

rough sketch:
1. Raft consensus between multiple node.js threads
2. markov chain tries to predict the next command that you want to run
3. commands are queued into a folder from the CLI
4. CLI over REST is available for websites and machine to machine communication
5. gulp watches for commands: assigns it to a exec thread with a task to perform
6. gulp watches for ideas: assigns it to a release for the next version of code to be deployed
7. we innovate by writing test cases around the CRUD of our ideas
8. NLP.js is trained to turn test cases into task code
9. geneticjs evolves task's code over time in order to optimize for speed and functionality
10. source code performs rolling updates to github while other machines perform rolling downloads

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
