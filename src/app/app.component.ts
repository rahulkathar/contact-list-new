import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddContactComponent } from './add-contact/add-contact.component';
import { MatTable } from '@angular/material/table';

export interface PeriodicElement {
  serialNumber: number,
  lastName: string;
  firstName: string;
  email: string;
  phoneNo: number;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {serialNumber: 1,firstName: 'John', lastName: 'Hydrogen', email:'dummy@gmail.com', phoneNo:8087883045},
  {serialNumber: 2,firstName: 'John', lastName: 'Helium', email:'dummy@gmail.com', phoneNo:8087883045},
  {serialNumber: 3,firstName: 'John', lastName: 'Lithium', email:'dummy@gmail.com', phoneNo:8087883045},
  {serialNumber: 4,firstName: 'John', lastName: 'Beryllium', email:'dummy@gmail.com', phoneNo:8087883045},
  {serialNumber: 5,firstName: 'John', lastName: 'Boron', email:'dummy@gmail.com', phoneNo:8087883045},
  {serialNumber: 6,firstName: 'John', lastName: 'Carbon', email:'dummy@gmail.com', phoneNo:8087883045},
  {serialNumber: 7,firstName: 'John', lastName: 'Nitrogen', email:'dummy@gmail.com', phoneNo:8087883045},
  {serialNumber: 8,firstName: 'John', lastName: 'Oxygen', email:'dummy@gmail.com', phoneNo:8087883045},
  {serialNumber: 9,firstName: 'John', lastName: 'Fluorine', email:'dummy@gmail.com', phoneNo:8087883045},
  {serialNumber: 10,firstName: 'John',lastName: 'Neon', email:'dummy@gmail.com', phoneNo:8087883045},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'contact-list';
  displayedColumns: string[] = ['serialNumber','firstName', 'lastName', 'email', 'phoneNo', 'action'];
  dataSource = ELEMENT_DATA;
  formValue: any= {};

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  constructor(public dialog: MatDialog) {}
  
  openDialog(action,obj): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AddContactComponent, {
      width: '500px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed', result.data);
      if(result.event == 'Add'){
        this.addRowData(result.data);
        console.log('The dialog was closed', result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
        console.log('The dialog was closed', result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }
  addRowData(row_obj){
    this.dataSource.push({
      serialNumber: this.dataSource.length + 1,
      firstName:row_obj.firstName,
      lastName:row_obj.lastName,
      email: row_obj.email,
      phoneNo: row_obj.phoneNo
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.serialNumber == row_obj.serialNumber){
        value.firstName = row_obj.firstName;
        value.lastName = row_obj.lastName;
        value.email = row_obj.email;
        value.phoneNo = row_obj.phoneNo;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.serialNumber != row_obj.serialNumber;
    });
  }
}
