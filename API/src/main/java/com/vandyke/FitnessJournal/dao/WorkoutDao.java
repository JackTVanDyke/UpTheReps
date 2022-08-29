package com.vandyke.FitnessJournal.dao;

import com.vandyke.FitnessJournal.entity.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface WorkoutDao extends JpaRepository<Workout, Long> {
    Optional<Workout> findWorkoutByNameAndUserUserId(String name, long userId);
    Optional<Workout> findWorkoutByDateAndUserUserId(Date date, long userId);
    List<Optional<Workout>> findWorkoutsByUserUserId(long userId);
}
