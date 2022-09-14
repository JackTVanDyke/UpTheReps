package com.vandyke.FitnessJournal.entity;

import java.util.Date;
import java.util.List;

public class NewWorkout {
    private String name;
    private Date date;
    private List<Integer> exerciseIds;

    public NewWorkout(String name, Date date, List<Integer> exerciseIds) {
        this.name = name;
        this.date = date;
        this.exerciseIds = exerciseIds;
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

    public List<Integer> getExerciseIds() {
        return exerciseIds;
    }

    public void setExerciseIds(List<Integer> exerciseIds) {
        this.exerciseIds = exerciseIds;
    }

}
