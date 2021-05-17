import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, timeout } from 'rxjs/operators';

import { State } from '../../interfaces/state';
import { Note } from '../../interfaces/note';
import { GetTasksService } from '../../services/get-tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  states: Array<State>;
  submitted: boolean = false;
  idParam: boolean = false;
  id: string;
  note: Note;
  response: boolean = false;

  constructor(
    private fb: FormBuilder,
    private noteService: GetTasksService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.states = [
      {value: 'abierto'},
      {value: 'en proceso'},
      {value: 'cerrado'}
    ];
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      state: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(150)]]
    });
    if (this.id) {
      this.noteService.GetNote(this.id)
        .pipe(first())
        .subscribe(note => {
          this.form.patchValue(note);
        });
      this.idParam = true;
    }
  }

  get f () {
    return this.form.controls;
  }

  onSubmit(): void {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if (this.route.snapshot.params['id']) {
      this.editNote();
    } else {
      this.createNote();
    }
  }

  private createNote() {
    this.noteService.PostNote(this.form.value)
      .pipe(first())
      .subscribe(res => {
        this.router.navigate(['/notes']);
      });
  }

  private editNote() {
    this.form.value.id = this.id;
    this.noteService.EditNote(this.id, this.form.value)
      .pipe(first())
      .subscribe(res => {
        if (res.ok) {
          this.router.navigate(['/notes']);
        }
      });
  }

  deleteNote(id: any) {
    this.noteService.DeleteNote(this.id)
      .pipe(first())
      .subscribe(res => {
        this.idParam = false;
        this.router.navigate(['/notes']);
      });
  }
}
