package com.vandyke.FitnessJournal.controller;

import com.vandyke.FitnessJournal.entity.User;
import com.vandyke.FitnessJournal.entity.Workout;
import com.vandyke.FitnessJournal.service.UserService;
import com.vandyke.FitnessJournal.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {

    private final WorkoutService workoutService;
    private final UserService userService;

    @Autowired
    public WorkoutController(WorkoutService workoutService, UserService userService) {
        this.workoutService = workoutService;
        this.userService = userService;
    }

    @GetMapping("/workout/{workoutId}")
    public ResponseEntity<Optional<Workout>> getWorkoutById(@PathVariable String workoutId) {
        return ResponseEntity.ok().body(workoutService.getWorkoutById(Long.parseLong(workoutId)));
    }

    @GetMapping("/user/name/{userId}/{name}")
    public ResponseEntity<Optional<Workout>> getWorkoutByNameAndUserId(@PathVariable String workoutName, @PathVariable String userId) {
        return ResponseEntity.ok().body(workoutService.getWorkoutByNameAndUserId(workoutName, Long.parseLong(userId)));
    }

    @GetMapping("/user/date/{userId}/{date}")
    public ResponseEntity<Optional<Workout>> getWorkoutByDateAndUserId(@PathVariable String workoutDate, @PathVariable String userId) {
        return ResponseEntity.ok().body(workoutService.getWorkoutByNameAndUserId(workoutDate, Long.parseLong(userId)));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Optional<Workout>>> getWorkoutsByUserId(@PathVariable String userId) {
        return ResponseEntity.ok().body(workoutService.getWorkoutsByUserId(Long.parseLong(userId)));
    }

    @PostMapping("/{userId}/save")
    public ResponseEntity<String> saveWorkout(@RequestBody Workout workout, @PathVariable String userId) {
        workout.setUser(userService.getUserById(Long.parseLong(userId)));
        return ResponseEntity.ok().body(workoutService.saveWorkout(workout));
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateWorkout(@RequestBody Workout workout) {
        return ResponseEntity.ok().body(workoutService.saveWorkout(workout));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteWorkout(@RequestBody Workout workout) {
        return ResponseEntity.ok().body(workoutService.deleteWorkout(workout));
    }
}
