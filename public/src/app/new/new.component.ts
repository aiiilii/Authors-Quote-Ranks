import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  newAuthor = {
    name: ""
  };
  addedAuthor: boolean = false;

  errors = {
    name: {
      message: ""
    }
  };

  constructor(
    private _httpService: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  createAuthor() {
    // console.log(this.newAuthor);
    let observable = this._httpService.addAuthor(this.newAuthor);
    observable.subscribe( (data: any) => {
      // if (data[`message`] === 'success') {
      //   console.log(data[`message`], data[`data`]);
      //   this.newAuthor.name = "";
      // }
      if ('error' in data) {
        // console.log(data.error);
        this.errors = data['error'];
        console.log(this.errors);
      } else {
        this._router.navigate(['/index']);
      }
    });
  }

}
