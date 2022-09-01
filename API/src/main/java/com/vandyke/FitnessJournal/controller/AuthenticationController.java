package com.vandyke.FitnessJournal.controller;

import com.vandyke.FitnessJournal.entity.LoginRequest;
import com.vandyke.FitnessJournal.entity.LoginResponse;
import com.vandyke.FitnessJournal.entity.User;
import com.vandyke.FitnessJournal.service.UserService;
import com.vandyke.FitnessJournal.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/users/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsService userDetailsService;
    private final UserService userService;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, UserDetailsService userDetailsService, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
        this.userService = userService;

    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = new LoginResponse();
        UserDetails userDetails;
        User user;
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken
                    (loginRequest.getEmail(), loginRequest.getPassword()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body(response);
        }
        userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
        user = userService.getUserByEmail(userDetails.getUsername());
        response.setUserId(user.getUserId());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole().name());
        response.setfName(user.getfName());
        response.setJwt(jwtTokenUtil.generateJwtToken(user));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/refresh")
    public ResponseEntity<?> refreshJwtToken(HttpServletRequest request) {
        LoginResponse response = new LoginResponse();
        String jwtToken = request.getHeader("Authorization");
        final String token = jwtToken.substring(7);
        String email = jwtTokenUtil.getEmailFromToken(token);
        User user = userService.getUserByEmail(email);
        if (jwtTokenUtil.canTokenBeRefreshed(token)) {
            String refreshedToken = jwtTokenUtil.refreshToken(token);
            response.setJwt(refreshedToken);
            response.setUserId(user.getUserId());
            response.setEmail(user.getEmail());
            response.setRole(user.getRole().name());
            response.setfName(user.getfName());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }



}
