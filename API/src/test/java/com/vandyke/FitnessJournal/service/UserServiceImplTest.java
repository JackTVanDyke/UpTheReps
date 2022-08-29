package com.vandyke.FitnessJournal.service;

import com.vandyke.FitnessJournal.dao.UserDao;
import com.vandyke.FitnessJournal.entity.User;
import com.vandyke.FitnessJournal.enums.Roles;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserDao userDao;

    @InjectMocks
    private UserServiceImpl userService;

    private User user;

    @Test
    void getUserById() {
        final long userId = 0;
        final User user = new User("Test123!", "Test", "Test", "test@test.com", Roles.USER, false);
        given(userDao.findById(userId)).willReturn(Optional.of(user));
        User expected = userService.getUserById(user.getUserId());
        assertThat(expected).isNotNull();
        assertEquals(user.getEmail(), expected.getEmail());
    }

    @Test
    void getUserByEmail() {
        final User user = new User("Test123!", "Test", "Test", "test@test.com", Roles.USER, false);
        String email = "test@test.com";
        given(userDao.findUserByEmail(email)).willReturn(Optional.of(user));
        User expected = userService.getUserByEmail(user.getEmail());
        assertThat(expected).isNotNull();
        assertEquals(expected.getfName(), user.getfName());
    }

    @Test
    void saveUser() {
        userService.saveUser(new User("Test123!", "Test", "Test", "test@test.com", Roles.USER, false));
        verify(userDao, times(1)).save(new User("Test123!", "Test", "Test", "test@test.com", Roles.USER, false));
    }

    @Test
    void updateUser() {
        User updatedUser = new User("Test123!", "Test", "Test", "test@test.com", Roles.USER, false);
        given(userDao.save(updatedUser)).willReturn(updatedUser);
        userService.updateUser(updatedUser);
        assertThat(updatedUser).isNotNull();
        verify(userDao).save(any(User.class));
    }

    @Test
    void deleteUserByID() {
        final long userId = 1;
        userService.deleteUserByID(userId);
        verify(userDao, times(1)).deleteById(userId);
    }
}