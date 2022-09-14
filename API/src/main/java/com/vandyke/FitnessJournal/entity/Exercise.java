package com.vandyke.FitnessJournal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long exerciseId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int sets;

    @Column(nullable = false)
    private int reps;

    @Column(nullable = false)
    private int weight;

    @Column(nullable = false)
    private String bodyPart;

    @ManyToMany(mappedBy = "exerciseList", fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JsonIgnore
    private Set<Workout> workouts;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", referencedColumnName = "userid", nullable = false)
    @JsonIgnore
    private User user;

    public Exercise() {
    }

    public Exercise(String name, int sets, int reps, int weight, String bodyPart, User user) {
        this.name = name;
        this.sets = sets;
        this.reps = reps;
        this.weight = weight;
        this.bodyPart = bodyPart;
        this.user = user;
    }

    public Exercise(long exerciseId, String name, int sets, int reps, int weight, String bodyPart, User user) {
        this.name = name;
        this.sets = sets;
        this.reps = reps;
        this.weight = weight;
        this.bodyPart = bodyPart;
        this.exerciseId = exerciseId;
        this.user = user;
    }

    public Exercise(long exerciseId, String name, int sets, int reps, int weight, String bodyPart, Set<Workout> workouts, User user) {
        this.exerciseId = exerciseId;
        this.name = name;
        this.sets = sets;
        this.reps = reps;
        this.weight = weight;
        this.bodyPart = bodyPart;
        this.workouts = workouts;
        this.user = user;
    }

    public long getExerciseId() {
        return exerciseId;
    }

    public void setExerciseId(long exerciseId) {
        this.exerciseId = exerciseId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getSets() {
        return sets;
    }

    public void setSets(int sets) {
        this.sets = sets;
    }

    public int getReps() {
        return reps;
    }

    public void setReps(int reps) {
        this.reps = reps;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public String getBodyPart() {
        return bodyPart;
    }

    public void setBodyPart(String bodyPart) {
        this.bodyPart = bodyPart;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Exercise{" +
                "exerciseId=" + exerciseId +
                ", name='" + name + '\'' +
                ", sets=" + sets +
                ", reps=" + reps +
                ", weight=" + weight +
                ", bodypart='" + bodyPart + '\'' +
                '}';
    }

    public Set<Workout> getWorkouts() {
        return workouts;
    }

    public void setWorkouts(Set<Workout> workouts) {
        this.workouts = workouts;
    }

    public void addWorkout(Workout workout) {
        this.workouts.add(workout);
        workout.getExerciseList().add(this);
    }

    public void removeWorkout(long workoutId) {
        Workout workout = this.workouts.stream().filter(work -> work.getWorkoutId() == workoutId).findFirst().orElse(null);
        if (workout != null) {
            this.workouts.remove(workout);
            workout.getExerciseList().remove(this);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Exercise exercise = (Exercise) o;

        if (exerciseId != exercise.exerciseId) return false;
        if (sets != exercise.sets) return false;
        if (reps != exercise.reps) return false;
        if (weight != exercise.weight) return false;
        if (!name.equals(exercise.name)) return false;
        if (!bodyPart.equals(exercise.bodyPart)) return false;
        return user.equals(exercise.user);
    }

    @Override
    public int hashCode() {
        int result = (int) (exerciseId ^ (exerciseId >>> 32));
        result = 31 * result + name.hashCode();
        result = 31 * result + sets;
        result = 31 * result + reps;
        result = 31 * result + weight;
        result = 31 * result + bodyPart.hashCode();
        result = 31 * result + user.hashCode();
        return result;
    }
}
