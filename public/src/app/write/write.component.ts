import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

  oneAuthor = {
    name: "",
    createdAt: "",
    updatedAt: "",
  };
  authorid: any;
  content: string;

  errors = {
    content: {
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
      console.log(data.authorid); // not in an object form
      this.getAuthor(data.authorid);
      this.authorid = data.authorid;
    });
  }

  getAuthor(id) {
    let observable = this._httpService.getOneAuthor(id);
    observable.subscribe((data: any) => {
      console.log("Got one author!", data);
      this.oneAuthor = data['data'];
    });
  }

  submit() {
    console.log(this.content);
    let observable = this._httpService.addQuote(this.authorid, this.content);
    observable.subscribe( (data: any) => {
      // if (data[`success`]) { 
      //   console.log('success');
      //   this._router.navigate([`/quotes/${this.authorid}`]);
      // } else {
      //   console.log('error', data[`error`]);
      //   this.errors = data['error'];
      // }
      if ('error' in data) {
        console.log(data['error']);
        this.errors = data['error'];
        // console.log(this.errors);
      } else {
        console.log('success');
        this._router.navigate([`/quotes/${this.authorid}`]);
      }
    });
  }

}
