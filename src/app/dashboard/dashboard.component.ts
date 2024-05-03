import { Component, OnDestroy } from '@angular/core';
import { NoteComponent } from '../note/note.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteFetchingService } from '../services/note-fetching.service';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClickOutsideDirective } from '../services/click-outside.directive';
import { AuthService } from '../googleAuth/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NoteComponent, CommonModule,FormsModule,ClickOutsideDirective,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnDestroy  {
  currentUser!: User | null;

  dummyData:any = []
  filteredData: any = []; // Array to store filtered data
  searchText: string = ''; // Variable to store search text
  private notesSubscription: Subscription | undefined;

  isDropdownOpen: boolean = false;

  isEditModalOpen = false;   // Property to control the visibility of the edit modal
  isCreateModalOpen = false; // Property to control the visibility of the create modal
  selectedNotes: any[] = []; // Array to store selected notes

  // Property to store the selected note for editing
  selectedNote: any;

  newNote: any = { // Object to store new note data
    owner:this.currentUser?.email,
    recipient: '',
    paymentAmount: '',
    description: ''
  };


  constructor(private noteFetchingService: NoteFetchingService, private authService: AuthService) {
    this.fetchNotes();
    this.subscribeToNotes();
    this.currentUser = this.authService.getCurrentUser();

  }

  ngOnDestroy(): void {
    this.unsubscribeFromNotes();
  }
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    if (this.currentUser) {
      console.log("EMAIL",this.currentUser);
    }
    this.selectedNote = {
      owner:'',
      recipient: '',
      paymentAmount: '',
      description: ''
    }
    this.fetchNotes();
  }


  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
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
      owner:'',
      recipient: '',
      paymentAmount: 0,
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
 
  storeCheckboxValue(event: any, note: any): void {
    // Implement your logic to store the checkbox value here
    if (event.target.checked) {
      //console.log('Checkbox checked for note:', note);
      // Add the note to the selectedNotes array
      this.selectedNotes.push(note);
     // console.log(this.selectedNotes)
    } else {
   //   console.log('Checkbox unchecked for note:', note);

      // Remove the note from the selectedNotes array
      const index = this.selectedNotes.findIndex(selectedNote => selectedNote.id === note.id);
      if (index !== -1) {
        this.selectedNotes.splice(index, 1);
      }
    }
  }

  selectAllNotes(event: any): void {
    const isChecked = event.target.checked;
  
    // Update the isChecked property of each note in filteredData
    this.filteredData.forEach((note: any) => note.isChecked = isChecked);
    this.selectedNotes = [...this.filteredData];

  }
  
  deleteSelectedNotes(): void {
    // Check if there are selected notes
    if (this.selectedNotes.length === 0) {
      console.log('No notes selected for deletion');
      return;
    }
  
    // Implement your logic to delete selected notes
    this.selectedNotes.forEach((note: any) => {
      // Call your delete method here for each selected note
      this.noteFetchingService.deleteNote(note.id).then(
        () => {
          console.log('Note deleted successfully:', note.id);
          // Remove the deleted note from filteredData
          const index = this.filteredData.findIndex((filteredNote: any) => filteredNote.id === note.id);
          if (index !== -1) {
            this.filteredData.splice(index, 1);
          }
        },
        (error) => {
          console.error('Error deleting note:', error);
        }
      );
    });
  
    // Clear the selectedNotes array after deletion
    this.selectedNotes = [];
  }
  
  
  
}
