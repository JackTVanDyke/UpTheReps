package com.vandyke.FitnessJournal.controller;

import com.vandyke.FitnessJournal.entity.LoginRequest;
import com.vandyke.FitnessJournal.entity.LoginResponse;
import com.vandyke.FitnessJournal.entity.User;
import com.vandyke.FitnessJournal.security.UserDetailsServiceImpl;
import com.vandyke.FitnessJournal.service.NewUserRequestService;
import com.vandyke.FitnessJournal.service.UserService;
import com.vandyke.FitnessJournal.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/users/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsServiceImpl userDetailsService;
    private final UserService userService;
    private final NewUserRequestService newUserRequestService;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, UserDetailsServiceImpl userDetailsService, UserService userService, NewUserRequestService newUserRequestService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
        this.userService = userService;
        this.newUserRequestService = newUserRequestService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = new LoginResponse();
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken
                    (loginRequest.getEmail(), loginRequest.getPassword()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body(response);
        }
        User user = userService.getUserByEmail(loginRequest.getEmail());
        response.setUser(user);
        response.setJwt(jwtTokenUtil.generateJwtToken(user));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/refresh")
    public ResponseEntity<?> refreshJwtToken(HttpServletRequest request) {
        LoginResponse response = new LoginResponse();
        String jwtToken = request.getHeader("api/users/auth");
        final String token = jwtToken.substring(7);
        String email = jwtTokenUtil.getEmailFromToken(token);
        User user = userService.getUserByEmail(email);
        if (jwtTokenUtil.canTokenBeRefreshed(token)) {
            String refreshedToken = jwtTokenUtil.refreshToken(token);
            response.setJwt(refreshedToken);
            response.setUser(user);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }



}
