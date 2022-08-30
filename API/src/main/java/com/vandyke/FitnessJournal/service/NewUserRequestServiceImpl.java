package com.vandyke.FitnessJournal.service;

import com.vandyke.FitnessJournal.email.EmailSender;
import com.vandyke.FitnessJournal.email.config.EmailContext;
import com.vandyke.FitnessJournal.entity.ConfirmationToken;
import com.vandyke.FitnessJournal.entity.NewUserRequest;
import com.vandyke.FitnessJournal.security.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class NewUserRequestServiceImpl implements NewUserRequestService {

    private final UserDetailsServiceImpl userDetailsService;
    private final UserService userService;
    private final ConfTokenService confTokenService;
    private final EmailSender emailSender;

    @Autowired
    public NewUserRequestServiceImpl(UserDetailsServiceImpl userDetailsService, UserService userService, ConfTokenService confTokenService, EmailSender emailSender) {
        this.userDetailsService = userDetailsService;
        this.userService = userService;
        this.confTokenService = confTokenService;
        this.emailSender = emailSender;
    }

    @Override
    public String register(NewUserRequest newUserRequest) {
        EmailContext context = new EmailContext();
        String token = userDetailsService.registerUser(newUserRequest);
        String link = "http://localhost:8080/api/users/register/confirmed?token=" + token;
        context.setToken(token);
        context.setLink(link);
        context.setTo(newUserRequest.getEmail());
        emailSender.send(context);
        return "Verification email sent.";
    }

    @Override
    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confTokenService.
                getConfirmationToken(token).orElseThrow(() -> new IllegalStateException("Token Not Found."));
        if (confirmationToken.getConfirmedAt() != null) throw new IllegalStateException("Email Already Confirmed.");
        LocalDateTime expiredAt = confirmationToken.getExpiresAt();
        if (expiredAt.isBefore(LocalDateTime.now())) throw new IllegalStateException("Token Expired.");
        confTokenService.setConfirmedAt(token);
        userService.getUserByEmail(confirmationToken.getUser().getEmail()).setVerified(true);
        return "Token Confirmed.";
    }
}
