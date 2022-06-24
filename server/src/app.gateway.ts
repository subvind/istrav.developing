import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import * as cp  from 'child_process'

// text read from the command line needs to be trimmed
String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, "");
};

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer() 
  private server: Server;

  wsClients=[];
  afterInit() {
    this.server.emit('testing', { do: 'stuff' });
  }

  handleConnection(client: any) {
    this.wsClients.push(client);
  }

  handleDisconnect(client) {
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i].id === client.id) {
        this.wsClients.splice(i, 1);
        break;
      }
    }
  }

  private broadcast(event, message: any) {
    const broadCastMessage = message;
    for (let c of this.wsClients) {
      c.emit(event, broadCastMessage);
    }
  }

  private logVerbose () {

  }

  @SubscribeMessage('my-event')
  onChgEvent(client: any, payload: any) {
    let container: string = payload.container || 'test'
    let language: string = payload.language || 'en'
    let message: string = payload.message || '> help'
    let verbose: string = payload.verbose || false
    
    let cmd
    let first = message.toString().charAt(0)
    // console.log('first', first)
    if (first === '>') {
      // remove first > char
      let commandToRun = message.substring(1); // trims first char off the front of the string
      commandToRun = commandToRun.replace(/\;/g, ':semicolon:');
      commandToRun = commandToRun.replace(/\|/g, ':pipe:');

      console.log('my-event:command', container, language, `"${commandToRun}"`)

      // run a command:
      let file = `${__dirname}/../../index.js`
      console.log('file', file)

      cmd = cp.exec(`node ${file} ${commandToRun}`)

      cmd.stdout.on('data', (data) => {
        console.log(data.toString());
        this.broadcast('my-event', data.toString());
      });
      cmd.stderr.on('data', (data) => {
        console.log(data.toString());
        this.broadcast('my-event', data.toString());
      });
    } else {
      // run default:
      let utter = message.toString().replace(/"/g, '&quot;');
      console.log('my-event:nlp', container, language, `"${utter}"`)

      cmd = cp.exec(`node ../index.js nlp-process ${container} ${language} "${utter}"`)
      cmd.stdout.on('data', (data) => {
        data = data.toString()
        if (verbose) {
          // send all messages back
          this.broadcast('my-event', data);
        } else {
          // only return results prefixed with: ~~~
          if (
            data.charAt(0) === '~' &&
            data.charAt(1) === '~' &&
            data.charAt(2) === '~'
          ) {
            let utterResponse = data.substring(3);
            this.broadcast('my-event', utterResponse.trim());
          }
        }
      });
      cmd.stderr.on('data', (data) => {
        // console.log(data.toString());
        this.broadcast('my-event', data.toString());
      });
    }
  }
}
