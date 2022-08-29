package com.vandyke.FitnessJournal.dao;

import com.vandyke.FitnessJournal.entity.User;
import com.vandyke.FitnessJournal.enums.Roles;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserDaoTest {
    @Autowired
    private UserDao userDao;

    private static User testUser;

    @BeforeAll
    static void createUser() {
        testUser = new User("Test123!", "Test", "Test", "test@test.com", Roles.USER, false);
    }

    @Test
    void findUserByEmail() {
        final String email = "test.find@test.com";
        testUser.setEmail(email);
        userDao.save(testUser);
        Optional<User> foundUser = userDao.findUserByEmail(email);
        assertTrue(foundUser.isPresent());
        assertEquals(email, foundUser.get().getEmail());

    }

    @Test
    void saveUser() {
        userDao.save(testUser);
        assertTrue(testUser.getUserId() > 0);
    }

    @Test
    void updateUser() {
        Optional<User> updateUser;
        userDao.save(testUser);
        testUser.setEmail("test.update@test.com");
        userDao.save(testUser);
        updateUser = userDao.findUserByEmail(testUser.getEmail());
        assertTrue(updateUser.isPresent());
        assertEquals("test.update@test.com", updateUser.get().getEmail());
    }

    @Test
    void deleteUser() {
        Optional<User> deleteUser;
        userDao.save(testUser);
        userDao.delete(testUser);
        deleteUser = userDao.findById(testUser.getUserId());
        assertTrue(deleteUser.isEmpty());
    }
}