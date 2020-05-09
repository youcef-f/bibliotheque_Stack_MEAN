import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book, BookPage} from '../models/book.model';

// import {Book, BookPage} from '../model/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksServiceService {

  public host = 'http://localhost:8889';

  constructor(private httpClient: HttpClient) {
  }

  public searchBooks(keyword: string, page: number,
                     size: number): Observable<BookPage> {
    return this.httpClient.get<BookPage>(this.host + '/bookspagination-searchtitle?keyword=' + keyword + '&page=' + page + '&size=' + size);
  }

  public saveBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(this.host + '/books', book);
  }

}
