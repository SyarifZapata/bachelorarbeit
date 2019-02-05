import {Component, OnInit} from '@angular/core';
import {FileService} from './file.service';
import {Remote, IpcRenderer} from 'electron';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ssb-electron';
  text: string;


  constructor(private _fileService: FileService){

  }

  ngOnInit(){
  }

}
