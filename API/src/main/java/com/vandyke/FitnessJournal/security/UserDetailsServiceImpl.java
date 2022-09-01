package com.vandyke.FitnessJournal.security;

import com.vandyke.FitnessJournal.dao.UserDao;
import com.vandyke.FitnessJournal.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@EnableWebSecurity
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserDao userDao;

    @Autowired
    public UserDetailsServiceImpl(UserDao userDao) {
        this.userDao = userDao;
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
}
