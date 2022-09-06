package com.vandyke.FitnessJournal.controller;

import com.vandyke.FitnessJournal.entity.Exercise;
import com.vandyke.FitnessJournal.service.ExerciseService;
import com.vandyke.FitnessJournal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return ResponseEntity.ok().body(exerciseService.saveExercise(exercise));
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateExercise(@RequestBody Exercise exercise) {
        return ResponseEntity.ok().body(exerciseService.saveExercise(exercise));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteExercise(@RequestBody Exercise exercise) {
        return ResponseEntity.ok().body(exerciseService.deleteExercise(exercise));
    }

}


