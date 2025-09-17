package com.rxlog.backend.Controller;

import com.rxlog.backend.Entity.Usuario;
import com.rxlog.backend.Service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@Tag(name = "Usuários", description = "Operações CRUD de usuários")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    @Operation(summary = "Lista todos os usuários", description = "Retorna uma lista completa de usuários cadastrados")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    })
    public List<Usuario> listarTodos() {
        return usuarioService.listarTodos();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca usuário por ID", description = "Retorna um usuário específico pelo ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Usuário encontrado"),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    })
    public Usuario buscarPorId(@Parameter(description = "ID do usuário") @PathVariable Long id) {
        return usuarioService.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deleta um usuário", description = "Remove um usuário pelo ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Usuário deletado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    })
    public void deletar(@Parameter(description = "ID do usuário") @PathVariable Long id) {
        usuarioService.deletar(id);
    }

    @GetMapping("/instituicao/{nome}")
    @Operation(summary = "Lista usuários por instituição", description = "Retorna todos os usuários de uma instituição específica")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    })
    public List<Usuario> listarPorInstituicao(@Parameter(description = "Nome da instituição") @PathVariable String nome) {
        return usuarioService.buscarPorInstituicao(nome);
    }

    @GetMapping("/profile")
    @Operation(summary = "Retorna usuário logado", description = "Obtém dados do usuário atualmente autenticado")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Usuário retornado com sucesso"),
            @ApiResponse(responseCode = "401", description = "Usuário não autenticado")
    })
    public Usuario getProfile(Authentication authentication) {
        String email = authentication.getName();
        return usuarioService.buscarPorEmail(email);
    }
}
