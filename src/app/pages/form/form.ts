import { Component, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase-service';
import { maxLength } from '@angular/forms/signals';
import { CreateIssueDto } from '../../../model/CreateIssueDto';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  form: FormGroup;

  successMessage = signal<string|null>(null);
  errorMessage = signal<string|null>(null);

  constructor(
    private supabaseService: SupabaseService,
    private formBuilder: FormBuilder
  ){
    this.form = formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
      description: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]),
      category: new FormControl('', [Validators.required, Validators.maxLength(32)]),
      priority: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(5)]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  get title() {
    return this.form.get('title');
  }

  get description() {
    return this.form.get('description');
  }

  get category() {
    return this.form.get('category');
  }

  get priority() {
    return this.form.get('priority');
  }

  get email() {
    return this.form.get('email');
  }

  isInvalid(control: AbstractControl|null){
    return (control?.invalid && (control?.touched || control?.dirty))
  }

  async onFormSubmit(){
    try {
      const res = await this.supabaseService.createIssue({
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value,
        category: this.form.get('category')?.value,
        priority: this.form.get('priority')?.value,
        email: this.form.get('email')?.value
      });

      console.log('Issue created!', res);
      this.successMessage.set('Issue created successfully.');
    } 
    catch(error) {
      console.error('Error while creating issue: ', error);
      this.successMessage.set('There was an error creating the issue. Try again later.');
    }
  }
}
