import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Employee } from './model/employee.model';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent {
  @Input() employee: Employee | undefined;

  constructor() { }

}

@NgModule({
  declarations: [ProfileCardComponent],
  imports: [CommonModule, RouterModule],
  exports: [ProfileCardComponent]
})
export class ProfileCardModule { }


