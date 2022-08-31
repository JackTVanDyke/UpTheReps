package com.vandyke.FitnessJournal.service;

import com.vandyke.FitnessJournal.dao.UserDao;
import com.vandyke.FitnessJournal.email.EmailSender;
import com.vandyke.FitnessJournal.email.config.EmailContext;
import com.vandyke.FitnessJournal.entity.ConfirmationToken;
import com.vandyke.FitnessJournal.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class NewUserRequestServiceImpl implements NewUserRequestService {

    private final UserService userService;
    private final ConfTokenService confTokenService;
    private final EmailSender emailSender;
    private final String from;
    private final UserDao userDao;

    @Autowired
    public NewUserRequestServiceImpl(UserService userService, ConfTokenService confTokenService, EmailSender emailSender, @Value("${spring.mail.username}") String from, UserDao userDao) {

        this.userService = userService;
        this.confTokenService = confTokenService;
        this.emailSender = emailSender;
        this.from = from;
        this.userDao = userDao;
    }

    @Override
    public String saveUser(User user) {
        userDao.save(user);
        new Thread(() -> {
            try {
                register(user);
            } catch (MessagingException e) {
                System.err.println(e.getMessage());
            }
        }).start();
        return "User registered.";
    }

    @Override
    public String register(User user) throws MessagingException {
        EmailContext context = new EmailContext();
        String token = UUID.randomUUID().toString();
        String link = "http://localhost:8080/api/users/confirmed/" + token;
        context.setToken(token);
        context.setLink(link);
        context.setTo(user.getEmail());
        context.setFrom(from);
        ConfirmationToken confirmationToken = new ConfirmationToken(token, LocalDateTime.now(), LocalDateTime.now().plusMinutes(30), user);
        confTokenService.saveConfirmationToken(confirmationToken);
        emailSender.send(context);
        return "Verification email sent.";
    }
}
