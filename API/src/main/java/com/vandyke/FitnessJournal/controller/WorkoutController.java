package com.vandyke.FitnessJournal.controller;

import com.vandyke.FitnessJournal.entity.Workout;
import com.vandyke.FitnessJournal.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {

    private final WorkoutService workoutService;

    @Autowired
    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @GetMapping("/{workoutId}")
    public ResponseEntity<Optional<Workout>> getWorkoutById(@PathVariable String workoutId) {
        return ResponseEntity.ok().body(workoutService.getWorkoutById(Long.parseLong(workoutId)));
    }

    @GetMapping("/{userId}/{name}")
    public ResponseEntity<Optional<Workout>> getWorkoutByNameAndUserId(@PathVariable String workoutName, @PathVariable String userId) {
        return ResponseEntity.ok().body(workoutService.getWorkoutByNameAndUserId(workoutName, Long.parseLong(userId)));
    }

    @GetMapping("/{userId}/{date}")
    public ResponseEntity<Optional<Workout>> getWorkoutByDateAndUserId(@PathVariable String workoutDate, @PathVariable String userId) {
        return ResponseEntity.ok().body(workoutService.getWorkoutByNameAndUserId(workoutDate, Long.parseLong(userId)));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Optional<Workout>>> getWorkoutsByUserId(@PathVariable String userId) {
        return ResponseEntity.ok().body(workoutService.getWorkoutsByUserId(Long.parseLong(userId)));
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveWorkout(@RequestBody @Valid Workout workout) {
        return ResponseEntity.ok().body(workoutService.saveWorkout(workout));
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateWorkout(@RequestBody @Valid Workout workout) {
        return ResponseEntity.ok().body(workoutService.saveWorkout(workout));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteWorkout(@RequestBody @Valid Workout workout) {
        return ResponseEntity.ok().body(workoutService.deleteWorkout(workout));
    }
}
