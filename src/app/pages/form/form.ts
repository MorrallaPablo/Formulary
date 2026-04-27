import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase-service';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  title = '';
  description = '';
  category = '';
  priority = 1;
  email = '';

  constructor(private supabaseService: SupabaseService){}

  async onFormSubmit(){
    try {
      const res = await this.supabaseService.createIssue({
        title: this.title,
        description: this.description,
        category: this.category,
        priority: this.priority,
        email: this.email
      });
      console.log('Issue created!', res);
    } 
    catch(error) {
      console.error('Error while creating issue: ', error);
    }
  }
}
