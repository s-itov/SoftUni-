import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Post } from 'src/types/post';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit{
   postsList: Post[] = [];

  constructor(private apiService: ApiService) {}
  isLoading: boolean = true;

  ngOnInit(): void {
    this.apiService.getPosts(5).subscribe({
      next: (posts) => {
        this.postsList = posts;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(`Error: ${err}` );
      },
    });
  }
}
