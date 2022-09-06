package com.vandyke.FitnessJournal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
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

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Exercise> exerciseList;

    @OneToOne(optional = false, fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
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
}
