package com.vandyke.FitnessJournal.entity;

public class NewUserRequest {

    private String email;
    private String password;
    private String firstName;
    private String lastName;

    public NewUserRequest() {
    }

    public NewUserRequest(String email, String password, String firstName, String lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public String toString() {
        return "NewUser{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                '}';
    }

    public boolean validateRequest() {
        if(!email.matches("[a-zA-Z\\d._-]+@.+\\..+") ||
                !password.matches(
                "(?=.+[a-z])(?=.+[A-Z])(?=.+\\d)([a-zA-Z\\d]|[`~!@#$%^&*()_+-='\";:,<.>\\/?]){8,32}"
        ) || "".equals(firstName) || "".equals(lastName)) {
            return false;
        }
        return true;
    }

}
