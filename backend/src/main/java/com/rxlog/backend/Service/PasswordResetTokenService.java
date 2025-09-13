package com.rxlog.backend.Service;

import com.rxlog.backend.Entity.PasswordResetToken;
import com.rxlog.backend.Entity.Usuario;
import com.rxlog.backend.Repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetTokenService {

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    public PasswordResetToken createToken(Usuario usuario) {
        PasswordResetToken token = new PasswordResetToken();
        token.setToken(UUID.randomUUID().toString());
        token.setUsuario(usuario);
        token.setExpiration(LocalDateTime.now().plusHours(1));
        return tokenRepository.save(token);
    }

    public PasswordResetToken getByToken(String token) {
        return tokenRepository.findByToken(token).orElse(null);
    }

    public void deleteToken(PasswordResetToken token) {
        tokenRepository.delete(token);
    }
}
