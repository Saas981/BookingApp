import { Component } from '@angular/core';
import { NoteComponent } from '../note/note.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteFetchingService } from '../services/note-fetching.service';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NoteComponent, CommonModule,FormsModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit  {

  // dummyData = [
  //   { recipient: 'Mark', paymentAmount: '$50', description: 'Lorem ipsum dolor sit amet.' },
  //   { recipient: 'Cole', paymentAmount: '$100', description: 'Consectetur adipiscing elit.' },
  //   { recipient: 'Mark', paymentAmount: '$50', description: 'Lorem ipsum dolor sit amet.' },
  //   { recipient: 'Cole', paymentAmount: '$100', description: 'Consectetur adipiscing elit.' },
  //   // Add more dummy data as needed
  // ];
  dummyData:any = []

  // Property to control the visibility of the edit modal
  isEditModalOpen = false;

  // Property to store the selected note for editing
  selectedNote: any;

  constructor(private noteFetchingService: NoteFetchingService) { }

  ngOnInit(): void {
    this.fetchNotes();
  }

  fetchNotes(): void {
    this.noteFetchingService.fetchNotes().then(
      (notes: any[]) => {
        this.dummyData = notes;
        console.log("DATA ",notes)
        this.selectedNote = notes[0]
      },
      (error) => {
        console.error('Error fetching notes:', error);
      }
    );
  }

  // Method to open the edit modal and pass the selected note data
  openEditModal(note: any) {
    this.selectedNote = note;
    this.isEditModalOpen = true;
  }

  // Method to close the edit modal
  closeEditModal(): void {
    if (!this.selectedNote || !this.selectedNote.id) {
      console.error('Error: Selected note or its id is undefined');
      return;
    }
  
    // Save the updated note to Firestore
    this.noteFetchingService.updateNote(this.selectedNote).then(
      () => {
        console.log('Note updated successfully!');
        this.isEditModalOpen = false; // Close the modal after saving
      },
      (error) => {
        console.error('Error updating note:', error);
      }
    );
  }
  
}
