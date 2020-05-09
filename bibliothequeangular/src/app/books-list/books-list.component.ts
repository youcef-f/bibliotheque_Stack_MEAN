import {Component, OnInit} from '@angular/core';
import {BooksServiceService} from '../services/books-service.service';
import {BookPage} from '../models/book.model';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  public books: BookPage;
  public keyword = '';
  public currentPage = 1;
  public pageSize = 5;
  public pages: Array<number>;

  constructor(private booksService: BooksServiceService) {
  }

  ngOnInit() {
    this.onSearchBooks();
  }


  private onSearchBooks() {
    this.booksService.searchBooks(
      this.keyword,
      this.currentPage,
      this.pageSize)
      .subscribe(data => {
        this.books = data;
        this.pages = new Array<number>(data.pages);
      }, err => {
        console.log(err);
      });
  }

  onPageBooks(i: number) {
    this.currentPage = i + 1;
    this.onSearchBooks();
  }

  onSearch(data) {
    console.log(data);
    this.keyword = data.keyword;
    this.onSearchBooks();
  }
}
