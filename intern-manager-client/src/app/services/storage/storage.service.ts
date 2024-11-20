import { Injectable } from "@angular/core";

// my-data.service.ts
@Injectable({
    providedIn: 'root',
  })
    export class StorageService {
      private storage = localStorage; // or sessionStorage
    
      setItem(key: string, value: string): void {
        this.storage.setItem(key, value);
      }
    
      getItem(key: string): string | null {
        return this.storage.getItem(key);
      }
    
      removeItem(key: string): void {
        this.storage.removeItem(key);
      }
  }
  
  