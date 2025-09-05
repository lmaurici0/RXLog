package com.rxlog.backend.Controller;

import com.rxlog.backend.DTO.UsuarioCadastroRequest;
import com.rxlog.backend.DTO.UsuarioLoginRequest;
import com.rxlog.backend.Entity.Usuario;
import com.rxlog.backend.Security.UserDetailsServiceImpl;
import com.rxlog.backend.Service.UsuarioService;
import com.rxlog.backend.Security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth/usuario")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioAuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    // --- Cadastro ---
    @PostMapping("/signup")
    public ResponseEntity<?> cadastrar(@RequestBody UsuarioCadastroRequest request) {
        Usuario existente = usuarioService.buscarPorEmail(request.getEmailUsuario());
        if (existente != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("erro", "Já existe um usuário com esse email."));
        }

        Usuario usuario = new Usuario();
        usuario.setNomeUsuario(request.getNomeUsuario());
        usuario.setEmailUsuario(request.getEmailUsuario());
        usuario.setSenhaUsuario(passwordEncoder.encode(request.getSenhaUsuario()));
        usuario.setCargoUsuario(request.getCargoUsuario());
        usuario.setInstituicaoUsuario(request.getInstituicaoUsuario());

        Usuario novoUsuario = usuarioService.salvar(usuario);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "id", novoUsuario.getId(),
                "email", novoUsuario.getEmailUsuario(),
                "nome", novoUsuario.getNomeUsuario(),
                "cargo", novoUsuario.getCargoUsuario().name()
        ));
    }

    // --- Login ---
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioLoginRequest request) {
        Usuario usuario = usuarioService.buscarPorEmail(request.getEmail());
        if (usuario == null || !passwordEncoder.matches(request.getSenha(), usuario.getSenhaUsuario())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("erro", "Credenciais inválidas."));
        }

        var userDetails = userDetailsService.loadUserByUsername(usuario.getEmailUsuario());
        String token = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(Map.of(
                "token", token,
                "email", usuario.getEmailUsuario(),
                "cargo", usuario.getCargoUsuario().name()
        ));
    }

    // --- Verificação de login ---
    @GetMapping("/logado")
    public ResponseEntity<?> usuarioLogado(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("erro", "Token ausente"));
        }

        String token = authHeader.substring(7);
        if (!jwtUtil.validateToken(token, userDetailsService.loadUserByUsername(jwtUtil.extractUsername(token)))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("erro", "Token inválido ou expirado"));
        }

        String email = jwtUtil.extractUsername(token);
        Usuario usuario = usuarioService.buscarPorEmail(email);
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("erro", "Usuário não encontrado"));
        }

        return ResponseEntity.ok(Map.of(
                "email", usuario.getEmailUsuario(),
                "nome", usuario.getNomeUsuario(),
                "cargo", usuario.getCargoUsuario().name()
        ));
    }
}
