import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { CreateIssueDto } from '../../model/CreateIssueDto';
import { IssueDto } from '../../model/IssueDto';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  async createIssue(issue: CreateIssueDto) {
    const { data, error } = await this.supabase
      .from('issues')
      .insert([issue]);
    
    if (error) {
      console.error('Error while creating issue: ', error);
      throw error;
    }

    return data;
  }

  async getIssues() {
    const { data, error } = await this.supabase
      .from('issues')
      .select('*')
      .order('timestamp', {ascending: false})
    
    if (error) {
      console.error('Error while retrieving issues: ', error);
      throw error;
    }

    return data;
  }
}