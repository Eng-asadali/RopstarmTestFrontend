import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SwalAlert } from 'src/app/Shared/swalAlerts';
import { ProductService } from '../../Services/product.service';


@Component({
  selector: 'app-addgallery',
  templateUrl: './addgallery.component.html',
  styleUrls: ['./addgallery.component.css']
})
export class AddgalleryComponent implements OnInit {

  images = [];
  selectedImage : any
  imageslist = []
  galleryForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(private router: Router,private productService: ProductService) { }

  ngOnInit() {
  }
  get f(){
    return this.galleryForm.controls;
  }
  // onFileChange(event) {
  //   this.imagesList.push(event.target.files[0])
  //   if (event.target.files && event.target.files[0]) {
  //       var filesAmount = event.target.files.length;
  //       for (let i = 0; i < filesAmount; i++) {
  //               var reader = new FileReader();
   
  //               reader.onload = (event:any) => {
  //                 console.log(event.target.result);
  //                  this.images.push(event.target.result); 
   
  //                  this.galleryForm.patchValue({
  //                     fileSource: this.images
  //                  });
  //               }
  
  //               reader.readAsDataURL(event.target.files[i]);
  //       }
  //   }
  // }
  onFileChange(event) {
    var selectedFile: File;
    selectedFile = event.target.files[0];
    this.galleryForm.value['image'] = selectedFile;
    var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          this.imageslist.push(event.target.files[i])
        }
    this.readImageURL(event.target);
  }

  readImageURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target['result']
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
  onSubmit(value){
    console.log("submited", value)
    this.productService.addGalleryPhoto(value).subscribe(
      result => {
        if (!result['error']) {
          SwalAlert.sucessAlert('', 'Photo Added Sucesssfully!')
        }
        else {
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
        }
        console.log(result);
      },
      err => {
        console.log(err);
        SwalAlert.errorAlert('', 'Server Error');
      }
    );
  }
  navigateToListing() {
    let url = this.router.url.split('/');
    this.router.navigate([url[0]+"/"+url[1]+"/"+url[2]]);
  }

}
