package com.vandyke.FitnessJournal.entity;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.vandyke.FitnessJournal.enums.Roles;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String fName;
    @Column(nullable = false)
    private String lName;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Roles role;
    @Column(nullable = false)
    private boolean verified;
    @OneToOne(mappedBy = "user", cascade = CascadeType.MERGE, orphanRemoval = true)
    private Workout workout;
    @OneToMany(cascade = CascadeType.MERGE, orphanRemoval = true)
    private Set<Exercise> exerciseList;

    public User(long userId, String password, String fName, String lName, String email, Roles role, boolean verified, Workout workout, Set<Exercise> exerciseList) {
        this.userId = userId;
        this.password = password;
        this.fName = fName;
        this.lName = lName;
        this.email = email;
        this.role = role;
        this.verified = verified;
        this.workout = workout;
        this.exerciseList = exerciseList;
    }

    public User(String password, String fName, String lName, String email, Roles role, boolean verified) {
        this.password = password;
        this.fName = fName;
        this.lName = lName;
        this.email = email;
        this.role = role;
        this.verified = verified;
    }

    public User(long userId) {
        this.userId = userId;
    }

    public User() {
    }

    public long getUserId() {
        return userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public String getlName() {
        return lName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Workout getWorkout() {
        return workout;
    }

    public void setWorkout(Workout workout) {
        this.workout = workout;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public Roles getRole() {
        return role;
    }

    public void setRole(Roles role) {
        this.role = role;
    }

    public Set<Exercise> getExerciseList() {
        return exerciseList;
    }

    public void setExerciseList(Set<Exercise> exerciseList) {
        this.exerciseList = exerciseList;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", password='" + password + '\'' +
                ", fName='" + fName + '\'' +
                ", lName='" + lName + '\'' +
                ", email='" + email + '\'' +
                ", role=" + role +
                ", verified=" + verified +
                ", workout=" + workout +
                ", exerciseList=" + exerciseList +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        return userId == user.userId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId);
    }
}
