import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

  oneAuthor = {
    name: "",
    createdAt: "",
    updatedAt: "",
  };
  authorid: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((data: any) => {
      console.log(data.authorid); // not in an object form
      this.getAuthor(data.authorid);
      this.authorid = data.authorid;
    });
    // this._route.params.subscribe(params => {
    //   this.authorid = params.authorid;
    //   console.log(this.authorid);
    //   let observable = this._httpService.getOneAuthor(this.authorid);
    //   observable.subscribe( (data: any) => {
    //     if ('success' in data) { 
    //       this.oneAuthor = data['data']; 
    //     } else { 
    //       console.log('error', data['error']); 
    //     }
    //   });
    // });
  }

  getAuthor(id) {
    let observable = this._httpService.getOneAuthor(id);
    observable.subscribe((data: any) => {
      console.log("Got one author!", data);
      this.oneAuthor = data['data'];
    });
  }

  vote(num: number, quoteid: string) {
    let observable = this._httpService.updateQuote(quoteid, num, this.authorid);
    observable.subscribe( (data: any) => {
      if ('error' == data.message) { 
        console.log('error', data[`error`]);
        // this._router.navigate([`/quotes/${this.authorid}`]); 
      } else { 
        this.ngOnInit();
      }
    });
  }

  delete(quoteid: string) {
    console.log(quoteid, this.authorid);
    let observable = this._httpService.deleteQuote(quoteid);
    observable.subscribe( (data: any) => {
      console.log(data);
      if ('success' == data.message) { 
        console.log("in success");
        this.ngOnInit();
        // this._router.navigate([`/quotes/${this.authorid}`]); 
      } else { 
        console.log("in error");
        console.log('error', data['error']);
      }
    });
  }

}
