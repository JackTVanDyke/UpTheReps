package com.vandyke.FitnessJournal.entity;

public class LoginResponse {

    private String jwt;
    private String userEmail;
    private String role;
    private String fName;
    private long userId;

    public LoginResponse(String jwt, String email, String role, String fName, long userId) {
        this.jwt = jwt;
        this.userEmail = email;
        this.role = role;
        this.fName = fName;
        this.userId = userId;
    }

    public LoginResponse() {
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public String getEmail() {
        return userEmail;
    }

    public void setEmail(String email) {
        this.userEmail = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "LoginResponse{" +
                "jwt='" + jwt + '\'' +
                ", email='" + userEmail + '\'' +
                ", role='" + role + '\'' +
                ", fName='" + fName + '\'' +
                ", userId=" + userId +
                '}';
    }
}
