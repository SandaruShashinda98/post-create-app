import { Injectable } from "@angular/core";
import { HttpClient,HttpParams } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { Post } from "../models";

@Injectable({ providedIn: "root" })

export class PostsService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
   return this.http.get<{ message: string; posts: Post[] }>("http://localhost:5000/api/posts");
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(postData:Post) {
    return this.http.post("http://localhost:5000/api/posts", postData);
  }

  deletePost(postId: string) {
    return this.http.delete("http://localhost:5000/api/posts/" + postId);
  }
}
