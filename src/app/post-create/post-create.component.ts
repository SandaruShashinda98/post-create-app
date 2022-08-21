import { PostsService } from './../services/post-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  content = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(
    private postService: PostsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onAddPost() {
    const postData = {
      id: null,
      title: this.title.value,
      content: this.content.value,
    };
    console.log(postData);
    this.postService.addPost(postData).subscribe((res) => {
      if (res) {
        this.openSnackBar('Post added successfully');
        this.title.reset;
        this.content.reset;
      } else this.openSnackBar('Oops Something Went Wrong');
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
