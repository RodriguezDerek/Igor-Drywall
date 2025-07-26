package com.igordrywall.backend.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;

import static org.mockito.Mockito.*;

public class EmailServiceTest {

    @Mock
    private JavaMailSender mailSender;

    @InjectMocks
    private EmailService emailService;

    @Mock
    private MimeMessage mimeMessage;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
    }

    @Test
    void sendEmail_shouldSendMimeMessage() throws Exception {
        // Act
        emailService.sendEmail("test@example.com", "Subject", "<h1>Hello</h1>");

        // Assert
        verify(mailSender).createMimeMessage();
        verify(mailSender).send(mimeMessage);
    }

    @Test
    void sendEmail_whenMailSendException_shouldThrow() throws Exception {
        doThrow(new MailSendException("fail")).when(mailSender).send(mimeMessage);

        // Act & Assert
        org.junit.jupiter.api.Assertions.assertThrows(MailSendException.class, () ->
                emailService.sendEmail("test@example.com", "Subject", "<h1>Hello</h1>")
        );
    }

}
