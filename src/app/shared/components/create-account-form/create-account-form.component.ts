import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DxCheckBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services';
import { ValidationCallbackData } from 'devextreme/ui/validation_rules';

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent {
  loading = false;
  formData: any = {};
  selectedCountryCode: string = '';  // selected country code for the phone number
  countryPhoneCodes: {
    name: string;
    code: string;
  }[] = [];  // list of country phone codes
  agreedToTerms: boolean | null | undefined = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.loadCountryPhoneCodes();
  }

  /**
   * loads country phone codes from a JSON file
   */
  loadCountryPhoneCodes(): void {
    this.http.get<any[]>('/assets/data/country-phone-codes.json').subscribe(
      data => {
        // sort by name
        this.countryPhoneCodes = data.sort((a, b) => a.name.localeCompare(b.name));
      },
      error => {
        console.error('Error loading country phone codes:', error);
      }
    );
  }

  /**
   * handles form submission
   * @param e 
   */
  async onSubmit(e: Event) {
    e.preventDefault();

    const { email, password, displayName, phoneNumber } = this.formData;
    const selectedCountryCode = this.selectedCountryCode;

    // complete phone number
    const completePhoneNumber = `${selectedCountryCode}${phoneNumber}`;

    this.loading = true;

    const result = await this.authService.createAccount(
      email,
      password,
      displayName,
      completePhoneNumber
    );

    this.loading = false;

    if (result.isOk) {
      this.router.navigate(['/login-form']);
      this.toastr.success('Registration successful!', 'Success');
    } else {
      notify(result.message, 'error', 2000);
    }
  }

  confirmPassword = (e: ValidationCallbackData) => {
    return e.value === this.formData.password;
  }

  strongPassword = (e: ValidationCallbackData) => {
    const password = e.value;
    // at least 8 characters, with uppercase, lowercase, a number and a special character
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  validatePhoneNumber = (e: ValidationCallbackData) => {
    const phonePattern = /^[\d\s]{4,14}$/;
    return phonePattern.test(e.value);
  };
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxSelectBoxModule,
    DxCheckBoxModule
  ],
  declarations: [CreateAccountFormComponent],
  exports: [CreateAccountFormComponent]
})
export class CreateAccountFormModule { }
