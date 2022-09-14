package com.vandyke.FitnessJournal.controller;

import com.vandyke.FitnessJournal.entity.Exercise;
import com.vandyke.FitnessJournal.entity.NewWorkout;
import com.vandyke.FitnessJournal.entity.Workout;
import com.vandyke.FitnessJournal.service.ExerciseService;
import com.vandyke.FitnessJournal.service.UserService;
import com.vandyke.FitnessJournal.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {

    private final WorkoutService workoutService;
    private final UserService userService;
    private final ExerciseService exerciseService;

    @Autowired
    public WorkoutController(WorkoutService workoutService, UserService userService, ExerciseService exerciseService) {
        this.workoutService = workoutService;
        this.userService = userService;
        this.exerciseService = exerciseService;
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
    public ResponseEntity<String> saveWorkout(@RequestBody NewWorkout workoutRequest, @PathVariable String userId) {
        Workout newWorkout = new Workout();
        newWorkout.setUser(userService.getUserById(Long.parseLong(userId)));
        newWorkout.setName(workoutRequest.getName());
        newWorkout.setDate(workoutRequest.getDate());
        newWorkout.setExerciseList(new HashSet<>());
        for (long id : workoutRequest.getExerciseIds()) {
            if (exerciseService.getExerciseById(id).isPresent()) {
                newWorkout.addExercise(exerciseService.getExerciseById(id).get());
            }
        }
        return ResponseEntity.ok().body(workoutService.saveWorkout(newWorkout));
    }

    @PutMapping("/update/{userId}/{workoutId}")
    public ResponseEntity<String> updateWorkout(@RequestBody NewWorkout workoutUpdateRequest, @PathVariable String workoutId, @PathVariable String userId) {
        Workout updatedWorkout = workoutService.getWorkoutById(Long.parseLong(workoutId)).get();
        updatedWorkout.getExerciseList().clear();
        for (long id : workoutUpdateRequest.getExerciseIds()) {
            if (exerciseService.getExerciseById(id).isPresent()) {
                updatedWorkout.addExercise(exerciseService.getExerciseById(id).get());
            }
        }
        updatedWorkout.setName(workoutUpdateRequest.getName());
        updatedWorkout.setDate(workoutUpdateRequest.getDate());
        updatedWorkout.setUser(userService.getUserById(Long.parseLong(userId)));
        return ResponseEntity.ok().body(workoutService.saveWorkout(updatedWorkout));
    }

    @DeleteMapping("/delete/{userId}/{workoutId}")
    public ResponseEntity<String> deleteWorkout(@PathVariable String workoutId) {
        return ResponseEntity.ok().body(workoutService.deleteWorkoutById(Long.parseLong(workoutId)));
    }
}
