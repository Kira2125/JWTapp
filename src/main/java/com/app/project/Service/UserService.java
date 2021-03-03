package com.app.project.Service;

import com.app.project.Controller.RegistryRequestDTO;
import com.app.project.Exceptions.EmailExistsException;
import com.app.project.Model.Role;
import com.app.project.Model.Status;
import com.app.project.Model.User;
import com.app.project.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void createUser(RegistryRequestDTO registryRequestDTO) {
        if(userRepository.findByEmail(registryRequestDTO.getEmail()) != null) {
            try {
                throw new EmailExistsException(
                        "There is an account with that email adress:" + registryRequestDTO.getEmail());
            } catch (EmailExistsException e) {
                e.printStackTrace();
            }
        }
        User user = new User();
        user.setEmail(registryRequestDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registryRequestDTO.getPassword()));
        user.setFirstName(registryRequestDTO.getName());
        user.setLastName(registryRequestDTO.getLastname());
        user.setRole(Role.USER);
        user.setStatus(Status.ACTIVE);
        userRepository.save(user);
    }
}
