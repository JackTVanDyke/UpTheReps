package com.vandyke.FitnessJournal.email;

import com.vandyke.FitnessJournal.email.config.EmailContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;


@Service
public class EmailService implements EmailSender {

    private final static Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine template;

    @Autowired
    public EmailService(JavaMailSender javaMailSender, SpringTemplateEngine template) {
        this.javaMailSender = javaMailSender;
        this.template = template;
    }

    @Override
    public void send(EmailContext emailContext) {
        try {
            final Context context = new Context();
            context.setVariables(emailContext.getContext());
            context.setVariable("link", emailContext.getLink());
            String emailContent = template.process("emailTemplate.html", context);
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
            helper.setText(emailContent, true);
            helper.setTo(emailContext.getTo());
            helper.setSubject("Confirm Your Email To Get Started");
            helper.setFrom(emailContext.getFrom());
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            LOGGER.error("Failed To Send Email.", e);
            throw new IllegalStateException("Failed To Send Email");
        }
    }
}
