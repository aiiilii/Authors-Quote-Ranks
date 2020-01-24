import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  oneAuthor = {
    name: "",
    createdAt: "",
    updatedAt: ""
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
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
      // this.show = true;
    });
  }

  deleteAuthor(id) {
    let observable = this._httpService.removeAuthor(id);
    observable.subscribe((data: any) => {
      console.log("Deleting!", data);
      this._router.navigate(['/index']);
    });
  }

}
