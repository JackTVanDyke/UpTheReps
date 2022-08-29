package com.vandyke.FitnessJournal.dao;

import com.vandyke.FitnessJournal.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseDao extends JpaRepository<Exercise, Long> {
    List<Exercise> findExercisesByWorkoutWorkoutId(long workoutId);

}
