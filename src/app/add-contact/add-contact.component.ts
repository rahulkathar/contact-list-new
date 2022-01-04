import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface PeriodicElement {
  serialNumber: number,
  lastName: string;
  firstName: string;
  email: string;
  phoneNo: number;
}

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  addContactForm: FormGroup;
  submitted: boolean = false;
  action: string;
  local_data: any;

  constructor(public dialogRef: MatDialogRef<AddContactComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: PeriodicElement,
    private formBuilder: FormBuilder) {
    console.log(data);
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  ngOnInit() {
    this.addContactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      status: ['']
    })
  }

  // onSubmit() {
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.addContactForm.invalid) {
  //     return;
  //   }

  //   // display form values on success
  //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addContactForm.value, null, 4));
  //   console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.addContactForm.value, null, 4));
  // }

  doAction(){
    // console.log('do action');
    this.dialogRef.close({event:this.action,data:this.local_data});
    // console.log(this.addContactForm.value);
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
