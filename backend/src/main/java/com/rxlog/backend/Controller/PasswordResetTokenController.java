package com.rxlog.backend.Controller;

import com.rxlog.backend.Entity.PasswordResetToken;
import com.rxlog.backend.Entity.Usuario;
import com.rxlog.backend.Service.EmailService;
import com.rxlog.backend.Service.PasswordResetTokenService;
import com.rxlog.backend.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/auth/usuario")
@CrossOrigin(origins = "http://localhost:5173")
public class PasswordResetTokenController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordResetTokenService passwordResetService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/recuperar-senha")
    public ResponseEntity<?> recuperarSenha(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        Usuario usuario = usuarioService.buscarPorEmail(email);

        if (usuario == null) {
            return ResponseEntity.ok(Map.of("mensagem",
                    "Se o email existir, enviaremos um link de recuperação."));
        }

        PasswordResetToken token = passwordResetService.createToken(usuario);

        try {
            emailService.enviarEmailRecuperacao(usuario.getEmailUsuario(), token.getToken());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("erro", "Falha ao enviar email"));
        }

        return ResponseEntity.ok(Map.of("mensagem",
                "Se o email existir, enviaremos um link de recuperação."));
    }

    @PostMapping("/resetar-senha")
    public ResponseEntity<?> resetarSenha(@RequestBody Map<String, String> body) {
        String tokenStr = body.get("token");
        String novaSenha = body.get("senha");

        PasswordResetToken token = passwordResetService.getByToken(tokenStr);
        if (token == null || token.getExpiration().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Token inválido ou expirado"));
        }

        Usuario usuario = token.getUsuario();
        usuario.setSenhaUsuario(novaSenha);
        usuarioService.salvar(usuario);
        passwordResetService.deleteToken(token);

        return ResponseEntity.ok(Map.of("mensagem", "Senha redefinida com sucesso"));
    }
}
