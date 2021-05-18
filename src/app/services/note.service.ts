import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  endPoint: string = "http://localhost:4000/api/v1";
  noteEdited: Note;
  noteState: string;

  constructor(private service: HttpClient) { }

  PostNote(note: Note) {
    return this.service.post(this.endPoint, note);
  }

  GetNotes() {
    return this.service.get<Note[]>(this.endPoint);
  }

  EditNote(id: string, body: Note) {
    this.noteEdited = body;
    return this.service.put<Note>(`${this.endPoint}/${id}`, body);
  }

  DeleteNote(id: string) {
    return this.service.delete<Note>(`${this.endPoint}/${id}`);
  }

  GetNote(id: string) {
    return this.service.get<Note>(`${this.endPoint}/${id}`);
  }
}
