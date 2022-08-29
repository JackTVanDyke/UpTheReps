package com.vandyke.FitnessJournal.service;

import com.vandyke.FitnessJournal.dao.WorkoutDao;
import com.vandyke.FitnessJournal.entity.User;
import com.vandyke.FitnessJournal.entity.Workout;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class WorkoutServiceImplTest {

    @Mock
    private WorkoutDao workoutDao;

    @InjectMocks
    private WorkoutServiceImpl workoutService;

    private Workout workout;

    @Test
    void getWorkoutById() {
        long workoutId = 0;
        final Workout workout = new Workout();
        given(workoutDao.findById(workoutId)).willReturn(Optional.of(workout));
        Workout expected = workoutService.getWorkoutById(workoutId).get();
        assertThat(expected).isNotNull();
        assertEquals(workout.getName(), expected.getName());
    }

    @Test
    void getWorkoutByNameAndUserId() {
        long userId = 0;
        final Workout workout = new Workout();
        workout.setName("Pump");
        workout.setUser(new User());
        given(workoutDao.findWorkoutByNameAndUserUserId(workout.getName(), userId)).willReturn(Optional.of(workout));
        Workout expected = workoutService.getWorkoutByNameAndUserId(workout.getName(), userId).get();
        assertThat(expected).isNotNull();
        assertEquals(workout.getName(), expected.getName());
    }

    @Test
    void getWorkoutByDateAndUserId() {
    }

    @Test
    void saveWorkout() {
        workoutService.saveWorkout(workout);
        verify(workoutDao, times(1)).save(workout);
    }

    @Test
    void updateWorkout() {
        Workout updateWorkout = new Workout();
        given(workoutDao.save(updateWorkout)).willReturn(updateWorkout);
        workoutService.updateWorkout(updateWorkout);
        assertThat(updateWorkout).isNotNull();
        verify(workoutDao).save(any(Workout.class));
    }

    @Test
    void deleteWorkout() {
        Workout deletedWorkout = new Workout();
        workoutService.deleteWorkout(deletedWorkout);
        verify(workoutDao, times(1)).delete(deletedWorkout);
    }

    @Test
    void getWorkoutsByUserId() {
    }
}