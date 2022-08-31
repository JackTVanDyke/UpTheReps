package com.vandyke.FitnessJournal.service;

import com.vandyke.FitnessJournal.entity.User;

import java.util.Optional;

public interface UserService {
    User getUserById(long userId);
    User getUserByEmail(String email);
    String updateUser(User user);
    String deleteUserByID(long userID);
}
