package com.vandyke.FitnessJournal.service;

import com.vandyke.FitnessJournal.entity.ConfirmationToken;

import java.util.Optional;

public interface ConfTokenService {

    String saveConfirmationToken(ConfirmationToken token);
    Optional<ConfirmationToken> getConfirmationToken(String token);
    int setConfirmedAt(String token);
    String removeToken(ConfirmationToken token);

}
