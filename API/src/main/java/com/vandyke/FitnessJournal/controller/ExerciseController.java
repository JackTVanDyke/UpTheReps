package com.vandyke.FitnessJournal.controller;

import com.vandyke.FitnessJournal.entity.Exercise;
import com.vandyke.FitnessJournal.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    private final ExerciseService exerciseService;

    @Autowired
    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping("/{workoutId}")
    public ResponseEntity<List<Exercise>> getExercisesByWorkoutId(@PathVariable String workoutId) {
        return ResponseEntity.ok().body(exerciseService.getExercisesByWorkoutId(Long.parseLong(workoutId)));
    }

    @GetMapping("/{exerciseId}")
    public ResponseEntity<Exercise> getExerciseById(@PathVariable String exerciseId) {
        return ResponseEntity.ok().body(exerciseService.getExerciseById(Long.parseLong(exerciseId)));
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveExercise(@RequestBody Exercise exercise) {
        return ResponseEntity.ok().body(exerciseService.saveExercise(exercise));
    }

    @PutMapping("/save")
    public ResponseEntity<String> updateExercise(@RequestBody Exercise exercise) {
        return ResponseEntity.ok().body(exerciseService.saveExercise(exercise));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteExercise(@RequestBody Exercise exercise) {
        return ResponseEntity.ok().body(exerciseService.deleteExercise(exercise));
    }

}


