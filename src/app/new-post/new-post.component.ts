import { Component, OnInit } from '@angular/core';
import { Posts } from '../class/posts';
import { User } from '../class/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { switchMap } from 'rxjs/operators';
import { PostService } from '../shared/post.service';


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

  constructor(private auth:AuthService, private postService: PostService, private formBuilder: FormBuilder) {
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
    console.log("getUserDetails before response: "+this.userId)
    this.auth.getDetails(this.userId).subscribe(res =>{
      this.user=Object(res);
      console.log(res+" response in new-post");
      this.username=this.user.username;
      console.log('username: ' +this.username)

    })
  }
  
  // onPicSelection(ref: HTMLInputElement){
  //   this.selectedFile = ref.files[0]
  //   if(this.selectedFile)return;
  //   let filereader=new FileReader();
  //   filereader.readAsDataURL(this.selectedFile);
  //   filereader.addEventListener(
  //     "loaded", ev =>{
  //       let fileString=filereader.result.toString()
  //       let postPreviewImg = <HTMLImageElement>document.getElementById("post-preview-img");
  //       postPreviewImg.src =fileString;
  //     }
  //   )
  // }
  onPicSelection(ref: HTMLInputElement) {
    this.selectedFile = ref.files[0];
    if (this.selectedFile) {
      let fileReader = new FileReader();
      fileReader.onload = (event) => {
        const base64String = fileReader.result as string;
        this.newPost.get('image')?.setValue(base64String); 
        let postPreviewImg = <HTMLImageElement>document.getElementById("post-preview-img");
        postPreviewImg.src = base64String;
      };
      fileReader.readAsDataURL(this.selectedFile);
    }
  }

  //newPost
  // onClick(){
  //  this.post.username=this.username;
  //  this.post.description=this.newPost.get('description')?.value;
  //  this.post.path=this.newPost.get('image')?.value;
  //  this.post.userId=this.userId;
  //  console.log(this.post) ;
  //   this.postService.newPost(this.post).subscribe(data =>
  //     {
  //       console.log("posted successfully");
  //     },err =>
  //     {
  //       console.log("err",err);
  //     });
  // }
  onClick() {

    this.post.username = this.username;
    this.post.description = this.newPost.get('description')?.value;
    this.post.path = this.newPost.get('image')?.value; // Get the base64 image from the form control
    this.post.userId = this.userId;
    this.post.timestamp = Date.now();
    this.post.likes = 0;
    console.log(this.post);
    
    this.postService.newPost(this.post).subscribe((data) => {
        alert("Posted successfully");
        this.postService.newPostAdded.emit('New Post added');
      },
      (err) => {
        alert("Error"+err);
      }
    );
  }
  
}

