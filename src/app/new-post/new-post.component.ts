import { Component, OnInit } from '@angular/core';
import { Posts } from '../class/posts';
import { User } from '../class/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { switchMap } from 'rxjs/operators';
import { PostService } from '../shared/post.service';
import { UserService } from '../shared/user.service';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit{
  selectedFile: File;
  newPost!: FormGroup;

  post : Posts = new Posts();
  user : User = new User();
  userId:string = '';
  username: string = "";

  constructor(
    private auth:AuthService,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private userService: UserService)
    {
      this.newPost = this.formBuilder.group({
        description: [''], // Initial value for the description
        image: [''] // Initial value for the image
      });
    }
  
  ngOnInit(): void {
    this.userId = this.auth.userId;
    console.log('userId from auth service: '+this.userId)

     this.getUserDetails();
  }

  getUserDetails()
  {
    this.userService.getDetails(this.userId).subscribe(res =>{
      this.user=Object(res);
      this.username=this.user.username;
    })
    this.userService.getDetails(this.userId).subscribe(res =>{
      this.user=Object(res);
      //this.username=this.user.username;
    })
  }
  
  onPicSelection(ref: HTMLInputElement) {
    this.selectedFile = ref.files[0];
    if (this.selectedFile) {
      let fileReader = new FileReader();
      //when file is read successfully, it emits an event called onLoad
      fileReader.onload = (event) => {

        //storing the image as a base64 string- reading the imahe as a string.
        const base64String = fileReader.result as string;

        //here we are setting the input value from the form for the controlname: image to a base64 string
        this.newPost.get('image')?.setValue(base64String); 

        //trial to get a preview of the image being uploaded
        let postPreviewImg = <HTMLImageElement>document.getElementById("post-preview-img");
        postPreviewImg.src = base64String;
      };

      //triggers the onload event when file is selected.
      fileReader.readAsDataURL(this.selectedFile);
    }
  }

  onClick() {

    this.post.username = this.username;
    this.post.description = this.newPost.get('description')?.value;
    this.post.path = this.newPost.get('image')?.value; 
    this.post.userId = this.userId;
    this.post.timestamp = Date.now();
    this.post.likes = 0;
    console.log(this.post);
    
    this.postService.newPost(this.post).subscribe( () => {
        alert("Posted successfully");
        this.postService.newPostAdded.emit('New Post added');
      },
      (err) => {
        alert("Error"+err);
      }
    );
  }
  
}

