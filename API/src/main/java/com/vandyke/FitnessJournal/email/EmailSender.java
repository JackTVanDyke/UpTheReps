package com.vandyke.FitnessJournal.email;

import com.vandyke.FitnessJournal.email.config.EmailContext;

public interface EmailSender {
    void send(EmailContext emailContext);
}
