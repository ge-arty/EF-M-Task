import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Post from 'src/app/interfaces/post.interface';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  constructor(private http: HttpClient, private loginService: LoginService) {}
  isLogged: boolean = false;
  ngOnInit(): void {
    this.loginService.isLoggedObservable().subscribe((val) => {
      this.isLogged = val;
    });

    this.http
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe((data) => {
        this.posts = data;
      });
  }
}
