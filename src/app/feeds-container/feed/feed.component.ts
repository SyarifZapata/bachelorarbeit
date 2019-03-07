import { Component, OnInit } from '@angular/core';
import {FileService} from '../../file.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  feeds;

  constructor(private _fileService: FileService) {
    this._fileService.getPosts().then((results)=>{
      this.feeds = results;
    })
  }

  ngOnInit() {
  }

}
