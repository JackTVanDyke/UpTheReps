package com.vandyke.FitnessJournal.controller;

import com.vandyke.FitnessJournal.entity.*;
import com.vandyke.FitnessJournal.service.UserService;
import com.vandyke.FitnessJournal.util.JwtTokenUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
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
        ResponseCookie refreshTokenCookie = jwtTokenUtil.generateRefreshToken(user);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, String.valueOf(refreshTokenCookie)).body(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<LoginResponse> refreshJwtToken(@RequestBody String email, @CookieValue(name = "refreshToken", required = false) String refreshToken) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            if (!jwtTokenUtil.validateToken(refreshToken, userDetails)) {
                throw new IllegalArgumentException("Refresh Token is invalid!");
            }
            LoginResponse response = new LoginResponse(jwtTokenUtil.generateJwtToken(userService.getUserByEmail(email)));
            return ResponseEntity.ok().body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie nullCookie = jwtTokenUtil.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, nullCookie.toString()).body("Log out successful!");
    }
}
