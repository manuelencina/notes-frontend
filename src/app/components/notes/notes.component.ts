import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { first, timeout } from 'rxjs/operators';

import { GetTasksService } from '../../services/get-tasks.service';
import { NoteGetResolveService } from '../../services/note-get-resolve.service';
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
  loadedData: Promise<boolean>;
  notesSubject = new Subject<Note[]>();

  constructor(
    private notesService: GetTasksService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    // this.notes = this.route.snapshot.data.notes;
    // console.log('Notas',this.notes);
    // this.activatedRoute.data.subscribe((data) => {
    //   console.log(data)
    //   this.notes = data.notes;
    //   this.open = this.notes.filter(note => note.state === 'abierto');
    //   this.inProgress = this.notes.filter(note => note.state === 'en proceso');
    //   this.close = this.notes.filter(note => note.state === 'cerrado');
    // });

    this.notesSubscription = this.notesService.GetNotes()
      .subscribe(res => {
        this.notes = res;
        this.open = this.notes.filter(note => note.state === 'abierto');
        this.inProgress = this.notes.filter(note => note.state === 'en proceso');
        this.closed = this.notes.filter(note => note.state === 'cerrado');
      });
  }

  editNote(id: any) {
    this.router.navigate([`/edit/${id}`]);
  }

  ngOnDestroy() {
    this.notesSubscription.unsubscribe();
  }

}
