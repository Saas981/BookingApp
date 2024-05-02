import { Component } from '@angular/core';
import { NoteComponent } from '../note/note.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NoteComponent, CommonModule,FormsModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  dummyData = [
    { recipient: 'Mark', paymentAmount: '$50', description: 'Lorem ipsum dolor sit amet.' },
    { recipient: 'Cole', paymentAmount: '$100', description: 'Consectetur adipiscing elit.' },
    { recipient: 'Mark', paymentAmount: '$50', description: 'Lorem ipsum dolor sit amet.' },
    { recipient: 'Cole', paymentAmount: '$100', description: 'Consectetur adipiscing elit.' },
    // Add more dummy data as needed
  ];

  // Property to control the visibility of the edit modal
  isEditModalOpen = false;

  // Property to store the selected note for editing
  selectedNote: any;

  constructor() { }

  // Method to open the edit modal and pass the selected note data
  openEditModal(note: any) {
    this.selectedNote = note;
    this.isEditModalOpen = true;
  }

  // Method to close the edit modal
  closeEditModal() {
    this.isEditModalOpen = false;
  }
}
