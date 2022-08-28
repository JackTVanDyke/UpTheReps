package com.vandyke.FitnessJournal.service;

import com.vandyke.FitnessJournal.entity.NewUserRequest;

public interface NewUserRequestService {
    String register (NewUserRequest newUserRequest);
    String confirmToken(String token);
}
