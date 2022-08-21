import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from '../models';
import { PostsService } from '../services/post-service.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  constructor(
    private postService: PostsService,
    private snackBar: MatSnackBar
    ) { }
   posts: Post[] = [];

  ngOnInit(): void {
    this.postService.getPosts().subscribe((res)=>{
     if(res){
      this.posts = res.posts;
     }else{
      this.openSnackBar("Oops Something Went Wrong");
     }
    })
  }

  onDelete(post: any) {
    this.postService.deletePost(post._id).subscribe((res)=>{
      if(res){
        this.openSnackBar("Post deleted successfully");
      }else{
        this.openSnackBar("Oops Something Went Wrong");
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
        duration: 5000,
    });
  }

}
