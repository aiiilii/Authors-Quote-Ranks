import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  authors = [];

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    let observable = this._httpService.getAuthors();
    observable.subscribe((data: any) => {
      console.log("Got our data!", data);
      // let temp = data['data'].sort();
      this.authors = data['data'];
      console.log(this.authors);
    })
  }

  deleteAuthor(id) {
    let observable = this._httpService.removeAuthor(id);
    observable.subscribe((data: any) => {
      console.log("Deleting!", data);
      this.getAuthors();
    });
  }
}
