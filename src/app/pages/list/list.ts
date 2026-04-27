import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SupabaseService } from '../../services/supabase-service';
import { IssueDto } from '../../../model/IssueDto';

@Component({
  selector: 'app-list',
  imports: [RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit {
  loading = signal(false);
  error = signal(null);

  issues = signal<IssueDto[]|null>(null);
  
  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.getIssues();
  }

  getIssues(){
    this.loading.set(true);
    this.error.set(null);
    this.issues.set(null);

    this.supabaseService.getIssues().then(
      (issues) => { //success
        this.loading.set(false);
        this.error.set(null);
        this.issues.set(issues)

        console.log('Loaded issues!', issues);
      },

      (error) => { //failure
        this.loading.set(false);
        this.error.set(error);
        this.issues.set(null);

        console.log('Error while loading: ', error);
      }
    );
  }
}
