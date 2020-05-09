import {Component, OnInit} from '@angular/core';
import {BooksServiceService} from '../services/books-service.service';
import {Book} from '../models/book.model';

@Component({
  selector: 'app-books-new',
  templateUrl: './books-new.component.html',
  styleUrls: ['./books-new.component.css']
})
export class BooksNewComponent implements OnInit {
  public book: Book;
  public mode = 0;

  constructor(private booksService: BooksServiceService) {
  }

  ngOnInit() {
    this.initBook();
  }

  private initBook() {
    this.book = {
      title: '',
      author: '',
      price: 0,
      publishingDate: new Date(),
      available: true,
      quantity: 0
    };
  }

  onSaveBook(data: Book) {
    this.booksService.saveBook(data)
      .subscribe(res => {
        this.book = res;
        this.mode = 1;
      }, err => {
        console.log(err);
      });
  }

  onNewBook() {
    this.initBook();
    this.mode = 0;
  }
}
