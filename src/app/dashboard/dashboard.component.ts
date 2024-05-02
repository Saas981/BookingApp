import { Component, OnDestroy } from '@angular/core';
import { NoteComponent } from '../note/note.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteFetchingService } from '../services/note-fetching.service';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NoteComponent, CommonModule,FormsModule, ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnDestroy  {

  dummyData:any = []
  filteredData: any = []; // Array to store filtered data
  searchText: string = ''; // Variable to store search text
  private notesSubscription: Subscription | undefined;

  isEditModalOpen = false;   // Property to control the visibility of the edit modal
  isCreateModalOpen = false; // Property to control the visibility of the create modal

  // Property to store the selected note for editing
  selectedNote: any;

  newNote: any = { // Object to store new note data
    recipient: '',
    paymentAmount: '',
    description: ''
  };

  constructor(private noteFetchingService: NoteFetchingService) {
    this.fetchNotes();
    this.subscribeToNotes();
  }

  ngOnDestroy(): void {
    this.unsubscribeFromNotes();
  }
  ngOnInit(): void {
    this.fetchNotes();
  }

  fetchNotes(): void {
    this.noteFetchingService.fetchNotes().then(
      (notes: any[]) => {
        this.dummyData = notes;
        this.filteredData = notes;
        this.selectedNote = notes[0]
      },
      (error) => {
        console.error('Error fetching notes:', error);
      }
    );
  }

  filterNotes(): void {
    this.filteredData = this.dummyData.filter((note: any) =>
      note.recipient.toLowerCase().includes(this.searchText.toLowerCase()) ||
    note.paymentAmount.toString().includes(this.searchText.toLowerCase()) ||
    note.description.toLowerCase().includes(this.searchText.toLowerCase())
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


  openCreateModal(): void {
    this.isCreateModalOpen = true;
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    // Reset new note object when modal is closed
    this.newNote = {
      recipient: '',
      paymentAmount: '',
      description: ''
    };
  }

  saveNewNote(): void {
    // Call the createNote method from the NoteFetchingService
    this.noteFetchingService.createNote(this.newNote).then(
      () => {
        console.log('New note saved successfully!');
        this.closeCreateModal();
      },
      (error) => {
        console.error('Error saving new note:', error);
      }
    );
  }

  private subscribeToNotes(): void {
    this.notesSubscription = this.noteFetchingService.notes$.subscribe(
      (notes: any[]) => {
        this.dummyData = notes;
        this.filteredData = notes;
        this.selectedNote = notes[0];
      },
      (error) => {
        console.error('Error subscribing to notes:', error);
      }
    );
  }

  private unsubscribeFromNotes(): void {
    if (this.notesSubscription) {
      this.notesSubscription.unsubscribe();
    }
  }
 
  
  
}
