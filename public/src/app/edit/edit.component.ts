import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  oneAuthor = {
    name: ""
  };
  
  errors = {
    name: {
      message: ""
    }
  };

  constructor(
    private _httpService: HttpService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.params.subscribe((data: any) => {
      console.log(data.id); // not in an object form
      this.getAuthor(data.id);
    });
  }

  getAuthor(id) {
    let observable = this._httpService.getOneAuthor(id);
    observable.subscribe((data: any) => {
      console.log("Got one author!", data);
      this.oneAuthor = data['data'];
    });
  }

  editAuthor(id) {
    console.log(this.oneAuthor);
    let observable = this._httpService.updateAuthor(id, this.oneAuthor);
    observable.subscribe((data: any) => {
      // debugger;
      if ('error' in data) {
        this.errors = data.error;
        console.log("WE HAD A PROBLEM");
        console.log(this.errors);
      } else {
        this._router.navigate(['/index']);
      }
    })
  }

}
