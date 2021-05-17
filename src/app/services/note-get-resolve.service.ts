import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import { GetTasksService } from './get-tasks.service';
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NoteGetResolveService implements Resolve<Note[]> {

  constructor(private noteService: GetTasksService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Note[]> | Promise<Note[]> | Note[] {
    return this.noteService.GetNotes();
  }
}
