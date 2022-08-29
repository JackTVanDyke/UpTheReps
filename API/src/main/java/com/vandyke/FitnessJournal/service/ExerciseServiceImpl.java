package com.vandyke.FitnessJournal.service;

import com.vandyke.FitnessJournal.dao.ExerciseDao;
import com.vandyke.FitnessJournal.entity.Exercise;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseDao exerciseDao;

    @Autowired
    public ExerciseServiceImpl(ExerciseDao exerciseDao) {
        this.exerciseDao = exerciseDao;
    }

    @Override
    public List<Exercise> getExercisesByWorkoutId(long workoutId) {
        return exerciseDao.findExercisesByWorkoutWorkoutId(workoutId);
    }

    @Override
    public Optional<Exercise> getExerciseById(long exerciseId) {
        return exerciseDao.findById(exerciseId);
    }

    @Override
    public String saveExercise(Exercise exercise) {
        exerciseDao.save(exercise);
        return "Exercise saved.";
    }

    @Override
    public String updateExercise(Exercise exercise) {
        exerciseDao.save(exercise);
        return "Exercise updated.";
    }

    @Override
    public String deleteExerciseById(long exerciseId) {
        exerciseDao.deleteById(exerciseId);
        return "Exercise deleted.";
    }

    @Override
    public String deleteExercise(Exercise exercise) {
        exerciseDao.delete(exercise);
        return "Exercise deleted.";
    }
}
