import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Posts } from '../class/posts';
import { User } from '../class/user';
import { AuthService } from '../shared/auth.service';0
import { ProfileService } from '../shared/profile.service';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { UserService } from '../shared/user.service';

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
    private userService: UserService,
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
    this.profileService.updateProfile.subscribe(() => {
      this.getUserDetails();
    }, () => {
      alert('Something went wrong');
    });
  }

  getUserDetails() {
    this.userService.getDetails(this.userId).subscribe((res) => {
      this.user = Object(res);
      this.previousvalues = Object(res);
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
    
    this.profileService.updateUserProfile(this.userId, this.user).subscribe((data) => {
      alert('Profile updated successfully');
      this.profileService.updateProfile.emit();
    }, (err) => {
      alert('Error: ' + err);
    });
  }
  
  
}

