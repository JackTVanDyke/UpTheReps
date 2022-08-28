package com.vandyke.FitnessJournal.service;

import com.vandyke.FitnessJournal.entity.Workout;
import org.hibernate.jdbc.Work;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface WorkoutService {
    Workout getWorkoutById(long workoutId);
    Workout getWorkoutByNameAndUserId(String name, long userId);
    Workout getWorkoutByDateAndUserId(Date date, long userId);
    String saveWorkout(Workout workout);
    String updateWorkout(Workout workout);
    String deleteWorkout(Workout workout);
    List<Workout> getWorkoutsByUserId(long userId);
}
