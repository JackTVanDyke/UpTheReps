package com.vandyke.FitnessJournal.service;

import com.vandyke.FitnessJournal.entity.User;

public interface UserService {
    User getUserById(long userId);
    User getUserByEmail(String email);
    String saveUser(User user);
    String updateUser(User user);
    String deleteUserByID(long userID);
}
