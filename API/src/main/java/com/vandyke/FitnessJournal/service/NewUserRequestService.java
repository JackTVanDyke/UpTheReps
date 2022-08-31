package com.vandyke.FitnessJournal.service;

import com.vandyke.FitnessJournal.entity.NewUserRequest;
import com.vandyke.FitnessJournal.entity.User;

import javax.mail.MessagingException;

public interface NewUserRequestService {
    String register (User user) throws MessagingException;
    String saveUser(User user);
}
