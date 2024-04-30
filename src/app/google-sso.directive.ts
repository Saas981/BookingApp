import { Directive, HostListener,ElementRef } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { Injectable } from '@angular/core';

@Directive({
  selector: '[googlesSso]',
  standalone: true
})



// @Injectable({ providedIn: 'root' })


export class GoogleSsoDirective {

    // constructor(private elementRef:ElementRef){
    //   console.log("ITS OWRKINS")
    //   this.elementRef.nativeElement.color
    // }
@HostListener("click")
  async onClick() {

    console.log("CLICK DETECTED")
    const auth = getAuth();
    console
    signInWithPopup(auth, new GoogleAuthProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("CREDNETILA ",credential)
        console.log("TOKEN ",token)
        console.log("USER ",user)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    
  }

}
