package com.vandyke.FitnessJournal.service;

import com.vandyke.FitnessJournal.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciseService {

    List<Exercise> getExercisesByWorkoutId(long workoutId);
    Exercise getExerciseById(long exerciseId);
    String saveExercise(Exercise exercise);
    String updateExercise(Exercise exercise);
    String deleteExerciseById(long exerciseId);

    String deleteExercise(Exercise exercise);
}
