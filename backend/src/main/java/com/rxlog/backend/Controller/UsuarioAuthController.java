package com.rxlog.backend.Controller;

import com.rxlog.backend.DTO.UsuarioCadastroRequest;
import com.rxlog.backend.DTO.UsuarioLoginRequest;
import com.rxlog.backend.Entity.Usuario;
import com.rxlog.backend.Security.UserDetailsServiceImpl;
import com.rxlog.backend.Service.UsuarioService;
import com.rxlog.backend.Security.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth/usuario")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Usuários", description = "Operações relacionadas a usuários do sistema")
public class UsuarioAuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @PostMapping("/signup")
    @Operation(summary = "Cadastra um novo usuário", description = "Cria um usuário com nome, email, senha, cargo e instituição")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Usuário criado com sucesso"),
            @ApiResponse(responseCode = "409", description = "Email já existe"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos")
    })
    public ResponseEntity<?> cadastrar(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Dados do usuário para cadastro",
                    required = true,
                    content = @io.swagger.v3.oas.annotations.media.Content(
                            mediaType = "application/json",
                            examples = @io.swagger.v3.oas.annotations.media.ExampleObject(
                                    value = "{ \"nomeUsuario\": \"Eric Luis\", \"emailUsuario\": \"eric@example.com\", \"senhaUsuario\": \"123456\", \"cargoUsuario\": \"ADMINISTRADOR\", \"instituicaoUsuario\": \"RxLog\" }"
                            )
                    )
            )
            @RequestBody UsuarioCadastroRequest request) {

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

    @PostMapping("/login")
    @Operation(summary = "Realiza login do usuário", description = "Autentica um usuário e retorna o token JWT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login realizado com sucesso"),
            @ApiResponse(responseCode = "401", description = "Credenciais inválidas")
    })
    public ResponseEntity<?> login(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Email e senha do usuário",
                    required = true,
                    content = @io.swagger.v3.oas.annotations.media.Content(
                            mediaType = "application/json",
                            examples = @io.swagger.v3.oas.annotations.media.ExampleObject(
                                    value = "{ \"email\": \"eric@example.com\", \"senha\": \"123456\" }"
                            )
                    )
            )
            @RequestBody UsuarioLoginRequest request) {

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

    @GetMapping("/logado")
    @Operation(summary = "Retorna o usuário logado", description = "Obtém informações do usuário a partir do token JWT enviado no header Authorization")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário encontrado"),
            @ApiResponse(responseCode = "401", description = "Token ausente ou inválido")
    })
    public ResponseEntity<?> usuarioLogado(
            @Parameter(description = "Token JWT no formato Bearer <token>", required = true)
            @RequestHeader("Authorization") String authHeader) {

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
