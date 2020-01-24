import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';
import { QuoteComponent } from './quote/quote.component';
import { WriteComponent } from './write/write.component';


const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'create', component: NewComponent },
  { path: 'show/:id', component: ShowComponent },
  { path: 'edit/:id', component: EditComponent},

  { path: 'quotes/:authorid', component: QuoteComponent},
  { path: 'write/:authorid', component: WriteComponent},
  
  { path: '', pathMatch: 'full', redirectTo: '/index' },
  { path: '**', redirectTo: '/index' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
