import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { first, timeout } from 'rxjs/operators';

import { NoteService } from '../../services/note.service';
import { Note } from '../../interfaces/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {

  notes: Array<Note> = [];
  aux: Array<any>;
  open: Array<Note> = [];
  inProgress: Array<Note> = [];
  closed: Array<Note> = [];
  private notesSubscription: Subscription;
  notesSubject = new Subject<Note[]>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.notesSubscription = this.noteService.GetNotes()
      .subscribe(res => {
        this.notes = res;
        this.open = this.notes.filter(note => note.state === 'abierto');
        this.inProgress = this.notes.filter(note => note.state === 'en proceso');
        this.closed = this.notes.filter(note => note.state === 'cerrado');
      });
  }

  editNote(id: any, state: any) {
    this.noteService.noteState = state;
    this.router.navigate([`/edit/${id}`]);
  }

  ngOnDestroy() {
    this.notesSubscription.unsubscribe();
  }

}
