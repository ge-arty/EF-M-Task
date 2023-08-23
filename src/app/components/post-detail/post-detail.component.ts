import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Post from 'src/app/interfaces/post.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private loginService: LoginService
  ) {}
  isLogged: boolean = false;

  ngOnInit(): void {
    this.loginService.isLoggedObservable().subscribe((val) => {
      this.isLogged = val;
    });

    const postIdParam = this.route.snapshot.paramMap.get('id');
    if (postIdParam) {
      const postId = +postIdParam;

      this.apiService.getPostById(postId).subscribe((data: Post) => {
        this.post = data;
      });
    }
  }
}
