package com.rxlog.backend.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarEmailRecuperacao(String destinatario, String token) throws MessagingException {
        String linkRecuperacao = "http://localhost:5173/reset-password?token=" + token;

        MimeMessage mensagem = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mensagem, true);

        helper.setTo(destinatario);
        helper.setSubject("RXLog - Redefinição de Senha");
        helper.setFrom("rxlogenterprise@gmail.com");

        String corpo = "<!DOCTYPE html>"
                + "<html>"
                + "<body style='font-family:Poppins,sans-serif;color:#333;background-color:#f9f9f9;padding:20px;'>"
                + "<div style='max-width:600px;margin:auto;background-color:#fff;padding:30px;border-radius:10px;'>"
                + "<h2 style='color:#00968a;'>Olá!</h2>"
                + "<p>Recebemos uma solicitação para redefinir sua senha <b>RXLog</b>.</p>"
                + "<p>Clique no botão abaixo para criar uma nova senha:</p>"
                + "<a href='" + linkRecuperacao + "' "
                + "style='display:inline-block;padding:12px 25px;background-color:#00968a;color:#fff;text-decoration:none;border-radius:5px;font-weight:bold;'>"
                + "Redefinir Senha</a>"
                + "<p style='margin-top:20px;color:#777;'>Se você não solicitou a redefinição, apenas ignore este e-mail.</p>"
                + "<hr style='margin:20px 0;border:none;border-top:1px solid #eee;'>"
                + "<p style='text-align:center;color:#aaa;font-size:0.9rem;'>Equipe RXLog</p>"
                + "</div>"
                + "</body>"
                + "</html>";

        helper.setText(corpo, true); // true = HTML
        mailSender.send(mensagem);
    }

}
