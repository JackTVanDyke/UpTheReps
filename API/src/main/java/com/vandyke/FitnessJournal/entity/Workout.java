package com.vandyke.FitnessJournal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
public class Workout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long workoutId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date date;

    @ManyToMany(cascade = {CascadeType.REFRESH}, fetch = FetchType.LAZY)
    @JoinTable(
            name = "exercises_used",
            joinColumns = @JoinColumn(name = "workoutId"),
            inverseJoinColumns = @JoinColumn(name = "exerciseId")
    )
    private Set<Exercise> exerciseList;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", referencedColumnName = "userid", nullable = false)
    @JsonIgnore
    private User user;

    public Workout() {
    }

    public Workout(long workoutId, String name, Date date, Set<Exercise> exerciseList, User user) {
        this.workoutId = workoutId;
        this.name = name;
        this.date = date;
        this.exerciseList = exerciseList;
        this.user = user;
    }

    public Workout(String name, Date date, Set<Exercise> exerciseList, User user) {
        this.name = name;
        this.date = date;
        this.exerciseList = exerciseList;
        this.user = user;
    }

    public long getWorkoutId() {
        return workoutId;
    }

    public void setWorkoutId(long workoutId) { this.workoutId = workoutId; }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Set<Exercise> getExerciseList() {
        return exerciseList;
    }

    public void setExerciseList(Set<Exercise> exerciseList) {
        this.exerciseList = exerciseList;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void addExercise(Exercise exercise) {
        this.exerciseList.add(exercise);
        exercise.getWorkouts().add(this);
    }

    public void removeExercise(long exerciseId) {
        Exercise exercise = this.exerciseList.stream().filter(exer -> exer.getExerciseId() == exerciseId).findFirst().orElse(null);
        if (exercise != null) {
            this.exerciseList.remove(exercise);
            exercise.getWorkouts().remove(this);
        }
    }
    @Override
    public String toString() {
        return "Workout{" +
                "workoutId=" + workoutId +
                ", name='" + name + '\'' +
                ", date=" + date +
                ", exerciseList=" + exerciseList +
                ", user=" + user +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Workout workout = (Workout) o;

        if (workoutId != workout.workoutId) return false;
        if (!name.equals(workout.name)) return false;
        if (!date.equals(workout.date)) return false;
        if (!exerciseList.equals(workout.exerciseList)) return false;
        return user.equals(workout.user);
    }

    @Override
    public int hashCode() {
        int result = (int) (workoutId ^ (workoutId >>> 32));
        result = 31 * result + name.hashCode();
        result = 31 * result + date.hashCode();
        result = 31 * result + exerciseList.hashCode();
        result = 31 * result + user.hashCode();
        return result;
    }
}
