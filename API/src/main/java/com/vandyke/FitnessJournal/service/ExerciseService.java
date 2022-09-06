package com.vandyke.FitnessJournal.service;

import com.vandyke.FitnessJournal.entity.Exercise;

import java.util.List;
import java.util.Optional;

public interface ExerciseService {

    List<Exercise> getExercisesByUserId(long userId);
    Optional<Exercise> getExerciseById(long exerciseId);
    String saveExercise(Exercise exercise);
    String updateExercise(Exercise exercise);
    String deleteExerciseById(long exerciseId);

    String deleteExercise(Exercise exercise);
}
