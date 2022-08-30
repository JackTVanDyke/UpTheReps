package com.vandyke.FitnessJournal.entity;

import javax.persistence.*;

@Entity
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long exerciseId;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "workoutId", referencedColumnName = "workoutId")
    private Workout workout;

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

    public Exercise() {
    }

    public Exercise(long exerciseId, String name, int sets, int reps, int weight, String bodyPart) {
        this.name = name;
        this.sets = sets;
        this.reps = reps;
        this.weight = weight;
        this.bodyPart = bodyPart;
        this.exerciseId = exerciseId;
    }

    public long getExerciseId() {
        return exerciseId;
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
}
