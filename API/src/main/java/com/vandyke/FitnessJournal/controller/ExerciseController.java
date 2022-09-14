package com.vandyke.FitnessJournal.controller;

import com.vandyke.FitnessJournal.entity.Exercise;
import com.vandyke.FitnessJournal.entity.Workout;
import com.vandyke.FitnessJournal.service.ExerciseService;
import com.vandyke.FitnessJournal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    private final ExerciseService exerciseService;
    private final UserService userService;

    @Autowired
    public ExerciseController(ExerciseService exerciseService, UserService userService) {
        this.exerciseService = exerciseService;
        this.userService = userService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Exercise>> getExercisesByUserId(@PathVariable String userId) {
        return ResponseEntity.ok().body(exerciseService.getExercisesByUserId(Long.parseLong(userId)));
    }

    @GetMapping("/exercise/{exerciseId}")
    public ResponseEntity<Optional<Exercise>> getExerciseById(@PathVariable String exerciseId) {
        return ResponseEntity.ok().body(exerciseService.getExerciseById(Long.parseLong(exerciseId)));
    }

    @PostMapping("/{userId}/save")
    public ResponseEntity<String> saveExercise(@RequestBody Exercise exercise, @PathVariable String userId) {
        exercise.setUser(userService.getUserById(Long.parseLong(userId)));
        exercise.setWorkouts(new HashSet<>());
        return ResponseEntity.ok().body(exerciseService.saveExercise(exercise));
    }

    @PutMapping("/update/{userId}/{exerciseId}")
    public ResponseEntity<String> updateExercise(@RequestBody Exercise exercise, @PathVariable String exerciseId, @PathVariable String userId) {
        Exercise updatedExercise = exerciseService.getExerciseById(Long.parseLong(exerciseId)).orElseThrow(() -> new RuntimeException("Exercise does not exist with id: " + exerciseId));
        if (updatedExercise.getWorkouts() == null) {
            updatedExercise.setWorkouts(new HashSet<>());
        }
        if (exercise.getWorkouts() != null && !exercise.getWorkouts().isEmpty()) {
           updatedExercise.getWorkouts().clear();
            for (Workout workout : exercise.getWorkouts()) {
                updatedExercise.addWorkout(workout);
            }
        }
        updatedExercise.setName(exercise.getName());
        updatedExercise.setSets(exercise.getSets());
        updatedExercise.setReps(exercise.getReps());
        updatedExercise.setWeight(exercise.getWeight());
        updatedExercise.setBodyPart(exercise.getBodyPart());
        updatedExercise.setUser(userService.getUserById(Long.parseLong(userId)));
        return ResponseEntity.ok().body(exerciseService.updateExercise(updatedExercise));
    }

    @DeleteMapping("/delete/{userId}/{exerciseId}")
    public ResponseEntity<String> deleteExercise(@PathVariable String exerciseId) {
        return ResponseEntity.ok().body(exerciseService.deleteExerciseById(Long.parseLong(exerciseId)));
    }
}


