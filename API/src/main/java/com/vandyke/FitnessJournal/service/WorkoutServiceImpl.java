package com.vandyke.FitnessJournal.service;

import com.vandyke.FitnessJournal.dao.WorkoutDao;
import com.vandyke.FitnessJournal.entity.Workout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class WorkoutServiceImpl implements WorkoutService {

    private final WorkoutDao workoutDao;

    @Autowired
    public WorkoutServiceImpl(WorkoutDao workoutDao) {
        this.workoutDao = workoutDao;
    }

    @Override
    public Optional<Workout> getWorkoutById(long workoutId) {
        return workoutDao.findById(workoutId);
    }

    @Override
    public Optional<Workout> getWorkoutByNameAndUserId(String name, long userId) {
        return workoutDao.findWorkoutByNameAndUserUserId(name, userId);
    }

    @Override
    public Optional<Workout> getWorkoutByDateAndUserId(Date date, long userId) {
        return workoutDao.findWorkoutByDateAndUserUserId(date, userId);
    }

    @Override
    public String saveWorkout(Workout workout) {
        workoutDao.save(workout);
        return "Workout saved.";
    }

    @Override
    public String updateWorkout(Workout workout) {
        workoutDao.save(workout);
        return "Workout updated.";
    }

    @Override
    public String deleteWorkout(Workout workout) {
        workoutDao.delete(workout);
        return "Workout deleted.";
    }

    @Override
    public List<Optional<Workout>> getWorkoutsByUserId(long userId) {
        return workoutDao.findWorkoutsByUserUserId(userId);
    }

    @Override
    public String deleteWorkoutById(long workoutId) {
        workoutDao.deleteById(workoutId);
        return "Workout deleted.";
    }
}
