import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { getFirestore, collection, getDocs,setDoc,doc,deleteDoc } from 'firebase/firestore';
import { onSnapshot,Unsubscribe } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class NoteFetchingService {
  private db;
  private notesSubject: Subject<any[]> = new Subject<any[]>();
  public notes$: Observable<any[]> = this.notesSubject.asObservable();
  private unsubscribe: Unsubscribe | null = null;

  constructor() { 
    this.db = getFirestore();
    this.listenForNotes();

  }
  
  private listenForNotes(): void {
    this.unsubscribe = onSnapshot(collection(this.db, 'notes'), (snapshot) => {
      const notes: any[] = [];
      snapshot.forEach((doc) => {
        notes.push({ id: doc.id, ...doc.data() });
      });
      this.notesSubject.next(notes);
    });
  }

  unsubscribeFromNotes(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  // Define a method to fetch notes from an API or any data source
  // For example, fetching notes from a REST API
  async fetchNotes(): Promise<any[]> {
    const notesCollection = collection(this.db, 'notes');
    const querySnapshot = await getDocs(notesCollection);
    const notes: any[] = [];
    
    querySnapshot.forEach((doc) => {
      // Include the document ID as part of the note object
      const note = { id: doc.id, ...doc.data() };
      notes.push(note);
    });
  
    return notes;
  }
  

  async updateNote(note: any): Promise<void> {
    console.log("NOTE UPDATIGN ",note)
    const noteRef = doc(this.db, 'notes', note.id); // Assuming 'id' is the unique identifier of the note
    await setDoc(noteRef, note);
  }

  async createNote(noteData: any): Promise<void> {
    try {
      const notesCollection = collection(this.db, 'notes');
      await setDoc(doc(notesCollection), noteData);
      console.log('Note created successfully!');
    } catch (error) {
      console.error('Error creating note:', error);
    }
  }

  async deleteNote(noteId: string): Promise<void> {
    try {
      const noteRef = doc(this.db, 'notes', noteId);
      await deleteDoc(noteRef);
      console.log('Note deleted successfully!');
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }

  // Define other methods for CRUD operations like creating, updating, and deleting notes
}
