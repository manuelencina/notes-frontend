import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class GetTasksService {

  endPoint: string = "http://localhost:4000/api/v1";
  noteEdited: Note;

  constructor(private service: HttpClient) { }

  PostNote(note: Note) {
    return this.service.post(this.endPoint, note);
  }

  GetNotes(): Observable<Note[]> {
    return this.service.get<Note[]>(this.endPoint);
  }

  EditNote(id: string, body: Note) {
    this.noteEdited = body;
    return this.service.put<any>(`${this.endPoint}/${id}`, body);
  }

  DeleteNote(id: string) {
    return this.service.delete<Note>(`${this.endPoint}/${id}`);
  }

  GetNote(id: string) {
    return this.service.get<Note>(`${this.endPoint}/${id}`);
  }
}
