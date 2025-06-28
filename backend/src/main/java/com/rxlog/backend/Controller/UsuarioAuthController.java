package com.rxlog.backend.Controller;

import com.rxlog.backend.DTO.UsuarioCadastroRequest;
import com.rxlog.backend.DTO.UsuarioLoginRequest;
import com.rxlog.backend.Entity.Usuario;
import com.rxlog.backend.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/auth/usuario")
@CrossOrigin(origins = "http://localhost:5173") // Libera acesso do React
public class UsuarioAuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Cadastrar novo usuário
    @PostMapping("/signup")
    public ResponseEntity<?> cadastrar(@RequestBody UsuarioCadastroRequest request) {
        System.out.println("Recebido cadastro para email: " + request.getEmailUsuario());

        // Verifica se email já está em uso
        Usuario existente = usuarioService.buscarPorEmail(request.getEmailUsuario());
        if (existente != null) {
            System.out.println("Tentativa de cadastro com email já existente: " + request.getEmailUsuario());
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Já existe um usuário com esse email.");
        }

        // Cria novo usuário
        Usuario usuario = new Usuario();
        usuario.setNomeUsuario(request.getNomeUsuario());
        usuario.setEmailUsuario(request.getEmailUsuario());
        usuario.setSenhaUsuario(passwordEncoder.encode(request.getSenhaUsuario())); // Criptografada
        usuario.setCargoUsuario(request.getCargoUsuario());

        System.out.println("Novo usuário será salvo: " + usuario.getEmailUsuario());
        Usuario novoUsuario = usuarioService.salvar(usuario);
        System.out.println("Usuário salvo com id: " + novoUsuario.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
    }

    // Fazer login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioLoginRequest loginRequest) {
        Usuario usuario = usuarioService.buscarPorEmail(loginRequest.getEmail());

        if (usuario == null || !passwordEncoder.matches(loginRequest.getSenha(), usuario.getSenhaUsuario())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas.");
        }

        return ResponseEntity.ok("Login realizado com sucesso.");
    }

    // Deletar conta por email
    @DeleteMapping("/deletar/{email}")
    public ResponseEntity<?> deletarConta(@PathVariable String email) {
        Usuario usuario = usuarioService.buscarPorEmail(email);
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado.");
        }

        usuarioService.deletar(usuario.getId());
        return ResponseEntity.ok("Conta de usuário deletada com sucesso.");
    }
}
