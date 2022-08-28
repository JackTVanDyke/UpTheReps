package com.vandyke.FitnessJournal.service;

import com.vandyke.FitnessJournal.dao.UserDao;
import com.vandyke.FitnessJournal.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    private final UserDao userDao;

    @Autowired
    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public User getUserById(long userId) {
        return userDao.findUserByUserId(userId);
    }

    @Override
    public User getUserByEmail(String email) {
        return userDao.findUserByEmail(email).get();
    }

    @Override
    public String saveUser(User user) {
        userDao.save(user);
        return "User registered.";
    }

    @Override
    public String updateUser(User user) {
        userDao.save(user);
        return "User updated.";
    }

    @Override
    public String deleteUserByID(long userId) {
        userDao.deleteById(userId);
        return "User deleted.";
    }
}
