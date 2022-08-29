package com.vandyke.FitnessJournal.entity;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

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

    @OneToMany(mappedBy = "workout", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Exercise> exerciseList;

    @OneToOne(optional = false, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
    private User user;

    public Workout() {
    }

    public Workout(String name, Date date, List<Exercise> exerciseList, User user) {
        this.name = name;
        this.date = date;
        this.exerciseList = exerciseList;
        this.user = user;
    }

    public long getWorkoutId() {
        return workoutId;
    }

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

    public List<Exercise> getExerciseList() {
        return exerciseList;
    }

    public void setExerciseList(List<Exercise> exerciseList) {
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
