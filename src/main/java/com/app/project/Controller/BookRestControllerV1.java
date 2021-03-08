package com.app.project.Controller;


import com.app.project.Model.Book;
import com.app.project.Model.Developer;
import com.app.project.Repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins="http://localhost:3000")
public class BookRestControllerV1 {
    private final BookRepository bookRepository;

    public BookRestControllerV1(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @GetMapping
    public List<Book> getAll() {
        return bookRepository.findAll();
    }

    @GetMapping("/{id}")
    public Book getById(@PathVariable Long id) {
        return bookRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Book create(@RequestBody Book book) {
        bookRepository.save(book);
        return book;
    }

    @PutMapping
    public Book update(@RequestBody Book book) {
        bookRepository.save(book);
        return book;
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        bookRepository.deleteById(id);
    }
}
