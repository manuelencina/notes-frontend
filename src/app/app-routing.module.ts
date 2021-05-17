import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NotesComponent } from './components/notes/notes.component';
import { NoteGetResolveService } from './services/note-get-resolve.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'edit/:id', component: HomeComponent},
  // {path: 'notes', component: NotesComponent}
  {path: 'notes', component: NotesComponent, resolve: { notes: NoteGetResolveService }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
