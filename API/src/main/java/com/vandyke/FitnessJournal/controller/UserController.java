package com.vandyke.FitnessJournal.controller;

import com.vandyke.FitnessJournal.dao.UserDao;
import com.vandyke.FitnessJournal.entity.ConfirmationToken;
import com.vandyke.FitnessJournal.entity.NewUserRequest;
import com.vandyke.FitnessJournal.entity.User;
import com.vandyke.FitnessJournal.enums.Roles;
import com.vandyke.FitnessJournal.service.ConfTokenService;
import com.vandyke.FitnessJournal.service.NewUserRequestService;
import com.vandyke.FitnessJournal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;

@RestController
@Validated
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final NewUserRequestService newUserRequestService;
    private final UserDao userDao;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfTokenService confTokenService;


    @Autowired
    public UserController(UserService userService, NewUserRequestService newUserRequestService, UserDao userDao, BCryptPasswordEncoder bCryptPasswordEncoder, ConfTokenService confTokenService) {
        this.userService = userService;
        this.newUserRequestService = newUserRequestService;
        this.userDao = userDao;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.confTokenService = confTokenService;
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
    public ResponseEntity<String> registerUser(@RequestBody NewUserRequest user) throws URISyntaxException {
        if(!user.validateRequest()) return ResponseEntity.badRequest().body("Invalid user data.");
        if(userDao.findUserByEmail(user.getEmail()).isPresent()) return ResponseEntity.badRequest().body("User already exists.");
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        newUser.setfName(user.getFirstName());
        newUser.setlName(user.getLastName());
        newUser.setVerified(false);
        newUser.setRole(Roles.USER);
        newUserRequestService.saveUser(newUser);
        return ResponseEntity.created(new URI("/register")).body("");
    }

    @GetMapping("/confirmed/{token}")
    public void confirmUser(@PathVariable String token) {
        ConfirmationToken confToken = confTokenService.getConfirmationToken(token).get();
        User user = confToken.getUser();
        LocalDateTime now = LocalDateTime.now();
        if(confToken.getExpiresAt().isBefore(now)) return;
        user.setVerified(true);
        userService.updateUser(user);
        confTokenService.removeToken(confToken);
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
