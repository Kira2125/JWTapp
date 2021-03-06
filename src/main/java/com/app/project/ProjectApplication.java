package com.app.project;

import com.app.project.Model.Book;
import com.app.project.Model.Role;
import com.app.project.Model.Status;
import com.app.project.Model.User;
import com.app.project.Repository.BookRepository;
import com.app.project.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class ProjectApplication {
    private final PasswordEncoder passwordEncoder;

    public ProjectApplication(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public static void main(String[] args) {
        SpringApplication.run(ProjectApplication.class, args);
    }

    @Bean
    public CommandLineRunner runner(BookRepository bookRepository, UserRepository userRepository) {
        return args -> {
            if(userRepository.findAll().isEmpty()) {


                User user1 = new User();
                user1.setFirstName("Admin");
                user1.setLastName("Adminov");
                user1.setPassword(passwordEncoder.encode("admin"));
                user1.setEmail("admin@gmail.com");
                user1.setRole(Role.ADMIN);
                user1.setStatus(Status.ACTIVE);
                userRepository.save(user1);

                User user2 = new User();
                user2.setFirstName("User");
                user2.setLastName("Ordinary");
                user2.setPassword(passwordEncoder.encode("user"));
                user2.setEmail("user@gmail.com");
                user2.setRole(Role.USER);
                user2.setStatus(Status.ACTIVE);
                userRepository.save(user2);
            }

            if(bookRepository.findAll().isEmpty()) {
                for (int i = 0; i < 10; i++) {
                    Book book = new Book();
                    book.setGenre("Adventure");
                    book.setLanguage("English");
                    book.setPrice(225.00 + i);
                    book.setTitle("Grapes of wrath");
                    book.setIsbnNumber(12325L + i);
                    book.setAuthor("J.Steinback");
                    book.setCoverPhotoURL("https://upload.wikimedia.org/wikipedia/commons/a/ad/The_Grapes_of_Wrath_%281939_1st_ed_cover%29.jpg");
                    bookRepository.save(book);
                }
            }

        };
    }

}
