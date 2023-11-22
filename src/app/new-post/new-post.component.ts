import { Component, OnInit } from '@angular/core';
import { Posts } from '../class/posts';
import { User } from '../class/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { switchMap } from 'rxjs/operators';
import { PostService } from '../shared/post.service';
import { UserService } from '../shared/user.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  selectedFile: File;
  newPost!: FormGroup;

  post: Posts = new Posts();
  user: User = new User();
  userId: string = '';
  username: string = "";
  loadingStatus: boolean = true;

  constructor(
    private auth: AuthService,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private matDialog: MatDialog) {
    this.newPost = this.formBuilder.group({
      description: [''], // Initial value for the description
      image: [''] // Initial value for the image
    });
  }

  ngOnInit(): void {
    this.userId = this.auth.userId;
    console.log('userId from auth service: ' + this.userId)

    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getDetails(this.userId).subscribe(res => {
      this.user = Object(res);
      this.username = this.user.username;
    })
    this.userService.getDetails(this.userId).subscribe(res => {
      this.user = Object(res);
      //this.username=this.user.username;
    })
  }

  onPicSelection(ref: HTMLInputElement) {
    this.loadingStatus = false;
    this.postService.hostMethod(ref.files[0]).subscribe(data => {
      this.loadingStatus = true;
      console.log(data);
      this.newPost.get('image')?.setValue(data);

    }, err => {
      console.log(err);
    })
  }


  onClick() {

    this.post.username = this.username;
    this.post.description = this.newPost.get('description')?.value;
    this.post.path = this.newPost.get('image')?.value;
    this.post.userId = this.userId;
    this.post.timestamp = Date.now();
    this.post.likes = 0;
    console.log(this.post);

    this.postService.newPost(this.post).subscribe(() => {
      alert("Posted successfully");
      this.postService.newPostAdded.emit('New Post added');
      this.matDialog.closeAll();
    },
      (err) => {
        alert("Error" + err);
      }
    );
  }

}

