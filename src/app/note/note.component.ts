import { Component,Input  } from '@angular/core';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {
  color: string = 'lightblue'; // Default color
  @Input() buttonText: string = 'Note';
  fontSize: number = 16; // Initial font size
  changeColor(){
    console.log("CHANGING")

    if(this.color == "lightblue"){
      this.color = "red"
      this.fontSize+=5;
    }
    else{
      this.color = "lightblue"

    }
  }
}
