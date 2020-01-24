import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { 
    console.log("In the service constructor");
  }

  getAuthors() {
    return this._http.get('/authors');
  }

  getOneAuthor(id: string) {
    return this._http.get('/authors/' + id);
  }

  addAuthor(newAuthor: any){
    return this._http.post('/authors', newAuthor)
  }

  updateAuthor(id, author) {
    return this._http.put('/authors/' + id, author);
  }

  removeAuthor(id: string) {
    return this._http.delete(`/authors/${id}`);
  }


  addQuote(authorid: string, content: string) {
    console.log('httpservice', content);
    return this._http.post(`/authors/${authorid}/quotes`, {content});
  }

  updateQuote(quoteid: string, value: number, authorid: string) {
    return this._http.post(`/authors/${authorid}/quotes/${quoteid}`, {value});
  }

  deleteQuote(quoteid: string) {
    return this._http.delete(`/quotes/${quoteid}`);
  }
}
