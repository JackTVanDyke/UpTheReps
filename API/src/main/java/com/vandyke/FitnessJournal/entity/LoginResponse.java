package com.vandyke.FitnessJournal.entity;

public class LoginResponse {

    private String jwt;
    private User user;

    public LoginResponse() {
    }

    public LoginResponse(String jwt, User user) {
        this.jwt = jwt;
        this.user = user;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "NewUserResponse{" +
                "jwt='" + jwt + '\'' +
                ", user=" + user +
                '}';
    }
}
