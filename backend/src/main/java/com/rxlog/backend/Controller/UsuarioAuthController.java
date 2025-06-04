package com.rxlog.backend.Controller;

import com.rxlog.backend.DTO.UsuarioLoginRequest;
import com.rxlog.backend.DTO.UsuarioCadastroRequest;
import com.rxlog.backend.Entity.Usuario;
import com.rxlog.backend.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/auth/usuario")
public class UsuarioAuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> cadastrar(@RequestBody UsuarioCadastroRequest request) {
        Usuario usuario = new Usuario();
        usuario.setNomeUsuario(request.getNomeUsuario());
        usuario.setEmailUsuario(request.getEmailUsuario());

        // Criptografa senha aqui
        usuario.setSenhaUsuario(passwordEncoder.encode(request.getSenhaUsuario()));

        usuario.setCargoUsuario(request.getCargoUsuario());

        Usuario novoUsuario = usuarioService.salvar(usuario);
        return ResponseEntity.status(201).body(novoUsuario);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioLoginRequest loginRequest) {
        Usuario usuario = usuarioService.buscarPorEmail(loginRequest.getEmail());

        if (usuario == null || !passwordEncoder.matches(loginRequest.getSenha(), usuario.getSenhaUsuario())) {
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }

        return ResponseEntity.ok("Login realizado com sucesso");
    }

    @DeleteMapping("/deletar/{email}")
    public ResponseEntity<?> deletarConta(@PathVariable String email) {
        Usuario usuario = usuarioService.buscarPorEmail(email);
        if (usuario == null) {
            return ResponseEntity.status(404).body("Usuário não encontrado");
        }
        usuarioService.deletar(usuario.getId());
        return ResponseEntity.ok("Conta de usuário deletada com sucesso");
    }
}
