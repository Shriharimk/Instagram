// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { Posts } from '../class/posts';
// import { User } from '../class/user';
// import { AuthService } from '../shared/auth.service';
// import { PostService } from '../shared/post.service';
// import { ProfileService } from '../shared/profile.service';

// @Component({
//   selector: 'app-edit-profile',
//   templateUrl: './edit-profile.component.html',
//   styleUrls: ['./edit-profile.component.css']
// })
// export class EditProfileComponent {
//   selectedFile: File;
//   edit!: FormGroup;

//   post : Posts = new Posts();
//   user : User = new User();
//   userId:string = '';
//   username: string = "";
  

//   constructor(private auth:AuthService, private profileService : ProfileService ,private postService: PostService, private formBuilder: FormBuilder) {
//       this.edit = this.formBuilder.group({
//         description: [''], // Initial value for the description
//         image: [''] // Initial value for the image
//       });
//     }
  
//   ngOnInit(): void {
//      this.userId = this.auth.userId;
//      console.log('userId from auth service: '+this.userId)
//      this.getUserDetails();
//      this.profileService.updateProfile.subscribe(data =>
//       {
//         console.log(data);
//         this.getUserDetails();
//       },err => {
//         alert('Something went wrong');
//       })
//   }

//   getUserDetails()
//   {
//     console.log("getUserDetails before response: "+this.userId)
//     this.auth.getDetails(this.userId).subscribe(res =>{
//       this.user=Object(res);
//       console.log(res+" response in new-post");
//       this.username=this.user.username;
//       console.log('username: ' +this.username)

//     })
//   }
  
//   // onPicSelection(ref: HTMLInputElement){
//   //   this.selectedFile = ref.files[0]
//   //   if(this.selectedFile)return;
//   //   let filereader=new FileReader();
//   //   filereader.readAsDataURL(this.selectedFile);
//   //   filereader.addEventListener(
//   //     "loaded", ev =>{
//   //       let fileString=filereader.result.toString()
//   //       let postPreviewImg = <HTMLImageElement>document.getElementById("post-preview-img");
//   //       postPreviewImg.src =fileString;
//   //     }
//   //   )
//   // }
//   onPicSelection(ref: HTMLInputElement) {
//     this.selectedFile = ref.files[0];
//     if (this.selectedFile) {
//       let fileReader = new FileReader();
//       fileReader.onload = (event) => {
//         const base64String = fileReader.result as string;
//         this.edit.get('image')?.setValue(base64String); 
//         let postPreviewImg = <HTMLImageElement>document.getElementById("post-preview-img");
//         postPreviewImg.src = base64String;
//       };
//       fileReader.readAsDataURL(this.selectedFile);
//     }
//   }

//   //newPost
//   // onClick(){
//   //  this.post.username=this.username;
//   //  this.post.description=this.newPost.get('description')?.value;
//   //  this.post.path=this.newPost.get('image')?.value;
//   //  this.post.userId=this.userId;
//   //  console.log(this.post) ;
//   //   this.postService.newPost(this.post).subscribe(data =>
//   //     {
//   //       console.log("posted successfully");
//   //     },err =>
//   //     {
//   //       console.log("err",err);
//   //     });
//   // }
//   onClick() {
//     console.log('userId recieved')
//     console.log(this.user.userId)
//     this.user.username = this.username;
//     this.user.description = this.edit.get('description')?.value;
//     this.user.profileImage = this.edit.get('image')?.value; // Get the base64 image from the form control
//     console.log('updated user')
//     console.log(this.user);
//     console.log('userId sending')
//     console.log(this.user.userId)
    
//     this.profileService.updateUserProfile(this.user.userId,this.user).subscribe((data) => {
//         alert("updated successfully");
//         this.profileService.updateProfile.emit();
//       },
//       (err) => {
//         alert("Error"+err);
//       }
//     );
//   }
  
// }
// edit-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Posts } from '../class/posts';
import { User } from '../class/user';
import { AuthService } from '../shared/auth.service';0
import { ProfileService } from '../shared/profile.service';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  selectedFile: File;
  edit!: FormGroup;
  user: User = new User();
  userId: string = '';
  previousvalues: User = new User();

  constructor(
    private auth: AuthService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog // Inject MatDialog
  ) {
    this.edit = this.formBuilder.group({
      username: [''],
      description: [''],
      image: [''],
    });
  }

  ngOnInit(): void {
    this.userId = this.auth.userId;
    console.log('global userId stored in edit-profile: '+this.userId);
    this.profileService.updateProfile.subscribe(() => {
      this.getUserDetails();
    }, (err) => {
      alert('Something went wrong');
    });
  }

  getUserDetails() {
    this.auth.getDetails(this.userId).subscribe((res) => {
      this.user = Object(res);
      this.previousvalues = Object(res)
      console.log('response of userDetails stored in global user object in edit-profile: ')
      console.log(this.user)
    });
  }

  onPicSelection(ref: HTMLInputElement) {
    this.selectedFile = ref.files[0];
    if (this.selectedFile) {
      let fileReader = new FileReader();
      fileReader.onload = (event) => {
        const base64String = fileReader.result as string;
        this.edit.get('image')?.setValue(base64String);
      };
      fileReader.readAsDataURL(this.selectedFile);
    }
  }

  // onClick() {
    // if(this.edit.get('description')?.value==""){
    //   this.user.description = this.previousvalues.description;
    // }else{
    //   this.user.description = this.edit.get('description')?.value 
    // }
    // if(this.edit.get('username')?.value==""){
    //   this.user.username = this.previousvalues.username;
    // }else{
    //   this.user.username = this.edit.get('username')?.value 
    // }
    // if(this.edit.get('image')?.value==""){
    //   this.user.profileImage = this.previousvalues.profileImage;
    // }else{
    //   this.user.profileImage = this.edit.get('image')?.value 
  //   // // }
    
  //   // console.log('userId sent to service from edit: '+ this.userId)
  //   // console.log('updated user sending: ')
  //   // console.log(this.user)


  //   this.profileService.updateUserProfile(this.userId, this.user).subscribe((data) => {
  //     alert('Profile updated successfully');
  //     this.profileService.updateProfile.emit();
  //   }, (err) => {
  //     alert('Error: ' + err);
  //   });
  // }
  onClick() {
    const descriptionValue = this.edit.get('description')?.value;
    const usernameValue = this.edit.get('username')?.value;
    const imageValue = this.edit.get('image')?.value;
  
    if (descriptionValue === "") {
      this.user.description = this.previousvalues.description;
    } else {
      this.user.description = descriptionValue;
    }
  
    if (usernameValue === "") {
      this.user.username = this.previousvalues.username;
    } else {
      this.user.username = usernameValue;
    }
  
    if (imageValue === "") {
      this.user.profileImage = this.previousvalues.profileImage;
    } else {
      this.user.profileImage = imageValue;
    }
  
    console.log('userId sent to service from edit: ' + this.userId);
    console.log('updated user sending: ');
    console.log(this.user);
  
    this.profileService.updateUserProfile(this.userId, this.user).subscribe((data) => {
      alert('Profile updated successfully');
      this.profileService.updateProfile.emit();
    }, (err) => {
      alert('Error: ' + err);
    });
  }
  
  
}

