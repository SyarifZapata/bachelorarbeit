import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import {promise} from 'selenium-webdriver';
import {stringify} from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private ipc: IpcRenderer;

  constructor() {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Could not load electron ipc');
    }
  }

  async getFiles() {
    return new Promise<string[]>((resolve, reject) => {
      // subscribe once and return the argument if data is commin. unsubscribe when finished.
      this.ipc.once('getFilesResponse', (event, arg) => {
        resolve(arg);
      });
      // send the getfile request. this is a kind of RPC call.
      this.ipc.send('getFiles');
    });
  }


}
