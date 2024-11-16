import { Component } from '@angular/core';
import { Employee } from 'src/app/shared/components/profile-card/model/employee.model';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
  employee: Employee;
  colCountByScreen: object;
  employeeFields: { name: string, content: any, edit: boolean, displayedName?: string }[];

  constructor() {
    this.employee = {
      ID: 7,
      DisplayName: 'Sandra Johnson', // read-only
      FirstName: 'Sandra',
      LastName: 'Johnson',
      PhoneNumber: '+91 923232873', // read-only
      Prefix: 'Mrs.',
      Position: 'Controller',
      Picture: 'images/employees/06.png',
      BirthDate: new Date('1974/11/5'),
      HireDate: new Date('2005/05/11'),
      AssignedTasks: 33,
      /* tslint:disable-next-line:max-line-length */
      Notes: 'Sandra is a CPA and has been our controller since 2008. She loves to interact with staff so if you`ve not met her, be certain to say hi.\r\n\r\nSandra has 2 daughters both of whom are accomplished gymnasts.',
      Address: '4600 N Virginia Rd.'
    };

    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };

    // Employee profile fields with their values and edit permissions
    this.employeeFields = [
      { name: 'ID', content: this.employee.ID, edit: true },
      { name: 'DisplayName', content: this.employee.DisplayName, edit: false, displayedName: 'Display Name' },
      { name: 'FirstName', content: this.employee.FirstName, edit: true, displayedName: 'First Name' },
      { name: 'LastName', content: this.employee.LastName, edit: true, displayedName: 'Last Name' },
      { name: 'PhoneNumber', content: this.employee.PhoneNumber, edit: false, displayedName: 'Phone Number' },
      { name: 'Prefix', content: this.employee.Prefix, edit: true },
      { name: 'Position', content: this.employee.Position, edit: true },
      { name: 'Picture', content: this.employee.Picture, edit: true },
      { name: 'BirthDate', content: this.employee.BirthDate, edit: true, displayedName: 'Birth Date' },
      { name: 'HireDate', content: this.employee.HireDate, edit: true, displayedName: 'Hire Date' },
      { name: 'AssignedTasks', content: this.employee.AssignedTasks, edit: true, displayedName: 'Assigned Tasks' },
      { name: 'Notes', content: this.employee.Notes, edit: true },
      { name: 'Address', content: this.employee.Address, edit: true }
    ];
  }
}
