package com.vandyke.FitnessJournal.dao;

import com.vandyke.FitnessJournal.entity.Exercise;
import com.vandyke.FitnessJournal.entity.User;
import com.vandyke.FitnessJournal.entity.Workout;
import com.vandyke.FitnessJournal.enums.Roles;
import org.junit.jupiter.api.BeforeAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.*;

@DataJpaTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class WorkoutDaoTest {
    @Autowired
    private WorkoutDao workoutDao;
    private static Workout testWorkout;

//    @BeforeAll
//    static void createWorkout() {
//        Workout workout = new Workout();
//        User user = new User("Test123!", "Test", "Test", "test@test.com", Roles.USER, false);
//        workout.setDate(new Date(2022, 7, 27));
//        workout.setName("Pump");
//        workout.setExerciseList(new HashSet<Exercise>());
//        testWorkout = workout;
//        user.setWorkoutList(testWorkout);
//        testWorkout.setUser(user);
//    }

    //need to add stupid test data I hate these tests
//    @Test
//    void findWorkoutByDateAndUserUserId() {
//        workoutDao.save(testWorkout);
//        Optional<Workout> foundWorkout
//                = workoutDao.findWorkoutByDateAndUserUserId(testWorkout.getDate(), testWorkout.getUser().getUserId());
//        assertEquals(foundWorkout.get().getName(), testWorkout.getName());
//    }
//
//    @Test
//    void findWorkoutsByUserUserId() {
//        workoutDao.save(testWorkout);
//        User user = new User("Test123!", "Test", "Test", "test@test.com", Roles.USER, false);
//        user.setWorkout(testWorkout);
//        List<Optional<Workout>> foundWorkouts = workoutDao.findWorkoutsByUserUserId(user.getUserId());
//        assertFalse(foundWorkouts.isEmpty());
//    }
}