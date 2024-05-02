import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getFirestore, collection, getDocs,setDoc,doc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class NoteFetchingService {
  private db;

  constructor() { 
    this.db = getFirestore();

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

  // Define other methods for CRUD operations like creating, updating, and deleting notes
}
