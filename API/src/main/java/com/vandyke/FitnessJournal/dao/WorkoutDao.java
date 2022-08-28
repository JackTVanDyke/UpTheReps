package com.vandyke.FitnessJournal.dao;

import com.vandyke.FitnessJournal.entity.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface WorkoutDao extends JpaRepository<Workout, Long> {
    Workout findWorkoutByNameAndUserUserId(String name, long userId);
    Workout findWorkoutByDateAndUserUserId(Date date, long userId);
    Workout findWorkoutByWorkoutId(long workoutId);
    List<Workout> findWorkoutsByUserUserId(long userId);
}
