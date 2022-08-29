package com.vandyke.FitnessJournal.service;

import com.vandyke.FitnessJournal.entity.Workout;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface WorkoutService {
    Optional<Workout> getWorkoutById(long workoutId);
    Optional<Workout> getWorkoutByNameAndUserId(String name, long userId);
    Optional<Workout> getWorkoutByDateAndUserId(Date date, long userId);
    String saveWorkout(Workout workout);
    String updateWorkout(Workout workout);
    String deleteWorkout(Workout workout);
    List<Optional<Workout>> getWorkoutsByUserId(long userId);
}
