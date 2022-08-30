package com.vandyke.FitnessJournal.security;

import com.vandyke.FitnessJournal.dao.UserDao;
import com.vandyke.FitnessJournal.entity.ConfirmationToken;
import com.vandyke.FitnessJournal.entity.NewUserRequest;
import com.vandyke.FitnessJournal.entity.User;
import com.vandyke.FitnessJournal.enums.Roles;
import com.vandyke.FitnessJournal.service.ConfTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@EnableWebSecurity
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserDao userDao;
    private final ConfTokenService confTokenService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserDetailsServiceImpl(UserDao userDao, ConfTokenService confTokenService, @Lazy BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userDao = userDao;
        this.confTokenService = confTokenService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserDetails userDetails;
        User user;
        List<GrantedAuthority> roles = new ArrayList<>();
        if (userDao.findUserByEmail(email).isEmpty()) throw new UsernameNotFoundException("User not found.");
        user = userDao.findUserByEmail(email).get();
        roles.add(new SimpleGrantedAuthority(user.getRole().toString()));
        userDetails = org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail()).password(user.getPassword())
                .authorities(roles).disabled(!user.isVerified()).build();
        return userDetails;
    }

    public String registerUser(NewUserRequest user) {
        if(!user.validateRequest()) throw new IllegalArgumentException("User Data Invalid.");
        boolean userExists = userDao.findUserByEmail(user.getEmail()).isPresent();
        if (userExists && userDao.findUserByEmail(user.getEmail()).get().isVerified()) throw new IllegalStateException("Email Already Taken");
        User newUser = new User(bCryptPasswordEncoder.encode(user.getPassword()), user.getEmail(), user.getFirstName(), user.getLastName(), Roles.USER, false);
        userDao.save(newUser);
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(token, LocalDateTime.now(), LocalDateTime.now().plusHours(1), newUser);
        confTokenService.saveConfirmationToken(confirmationToken);
        return token;
    }
}
