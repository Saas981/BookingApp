import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getFirestore, collection, getDocs } from 'firebase/firestore';


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
    const notes:any= [];
    querySnapshot.forEach((doc) => {
      notes.push(doc.data());
    });
    
    return notes;
  }

  // Define other methods for CRUD operations like creating, updating, and deleting notes
}
