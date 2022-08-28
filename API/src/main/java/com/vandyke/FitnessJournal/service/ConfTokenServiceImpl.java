package com.vandyke.FitnessJournal.service;

import com.vandyke.FitnessJournal.dao.ConfTokenDao;
import com.vandyke.FitnessJournal.entity.ConfirmationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ConfTokenServiceImpl implements ConfTokenService {

    private final ConfTokenDao confTokenDao;

    @Autowired
    public ConfTokenServiceImpl(ConfTokenDao confTokenDao) {
        this.confTokenDao = confTokenDao;
    }

    @Override
    public String saveConfirmationToken(ConfirmationToken token) {
        confTokenDao.save(token);
        return "Token saved.";
    }

    @Override
    @Transactional
    public String removeToken(ConfirmationToken token) {
        confTokenDao.delete(token);
        return "Token deleted.";
    }

    @Override
    public Optional<ConfirmationToken> getConfirmationToken(String token) {
        return confTokenDao.findByToken(token);
    }

    @Override
    public int setConfirmedAt(String token) {
        return confTokenDao.updateConfirmedAt(token, LocalDateTime.now());
    }
}
