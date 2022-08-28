package com.vandyke.FitnessJournal.controller;

import com.vandyke.FitnessJournal.entity.NewUserRequest;
import com.vandyke.FitnessJournal.entity.User;
import com.vandyke.FitnessJournal.enums.Roles;
import com.vandyke.FitnessJournal.service.NewUserRequestService;
import com.vandyke.FitnessJournal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@RestController
@Validated
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final NewUserRequestService newUserRequestService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, NewUserRequestService newUserRequestService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.newUserRequestService = newUserRequestService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId) {
        return ResponseEntity.ok().body(userService.getUserById(Long.parseLong(userId)));
    }

    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.ok().body(userService.getUserByEmail(email));
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody @Valid NewUserRequest user) throws URISyntaxException {
        if (!user.validateRequest()) return ResponseEntity.badRequest().body("Bad user data :(");
        newUserRequestService.register(user);
        User newUser = new User(passwordEncoder.encode(user.getPassword()), user.getEmail(), user.getFirstName(), user.getLastName(), Roles.USER, false);
        userService.saveUser(newUser);
        return ResponseEntity.created(new URI("/api/users/register")).body("");
    }

    @GetMapping("/register/confirmed?token={token}")
    public ResponseEntity<String> confirmUser(@PathVariable String token) {
        return ResponseEntity.ok().body(newUserRequestService.confirmToken(token));
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody User user) {
        return ResponseEntity.ok().body(userService.updateUser(user));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable String userId) {
        return ResponseEntity.ok().body(userService.deleteUserByID(Integer.parseInt(userId)));
    }



}
