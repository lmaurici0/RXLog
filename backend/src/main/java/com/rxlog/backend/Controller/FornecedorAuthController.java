package com.rxlog.backend.Controller;

import com.rxlog.backend.DTO.FornecedorCadastroRequest;
import com.rxlog.backend.DTO.FornecedorLoginRequest;
import com.rxlog.backend.Entity.Fornecedor;
import com.rxlog.backend.Service.FornecedorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/fornecedor")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Autenticação de Fornecedor", description = "Cadastro e login de fornecedores")
public class FornecedorAuthController {

    @Autowired
    private FornecedorService fornecedorService;

    @PostMapping("/signup")
    @Operation(summary = "Cadastra um novo fornecedor", description = "Cria um fornecedor com nome, CNPJ, email e telefone")
    public ResponseEntity<?> cadastrar(@RequestBody FornecedorCadastroRequest cadastroRequest) {
        if (fornecedorService.buscarPorCnpj(cadastroRequest.getCnpjFornecedor()) != null) {
            return ResponseEntity.status(400).body("CNPJ já cadastrado");
        }
        if (fornecedorService.buscarPorEmail(cadastroRequest.getEmailFornecedor()) != null) {
            return ResponseEntity.status(400).body("Email já cadastrado");
        }

        Fornecedor fornecedor = new Fornecedor();
        fornecedor.setNomeFornecedor(cadastroRequest.getNomeFornecedor());
        fornecedor.setCnpjFornecedor(cadastroRequest.getCnpjFornecedor());
        fornecedor.setEmailFornecedor(cadastroRequest.getEmailFornecedor());
        fornecedor.setTelefoneFornecedor(cadastroRequest.getTelefoneFornecedor());
        fornecedor.setCelularFornecedor(cadastroRequest.getCelularFornecedor());

        fornecedorService.salvar(fornecedor);
        return ResponseEntity.status(201).body("Fornecedor cadastrado com sucesso");
    }

    @PostMapping("/login")
    @Operation(summary = "Login do fornecedor", description = "Realiza autenticação do fornecedor")
    public ResponseEntity<?> login(@RequestBody FornecedorLoginRequest loginRequest) {
        Fornecedor fornecedor = fornecedorService.buscarPorCnpjEEmail(loginRequest.getCnpj(), loginRequest.getEmail());
        if (fornecedor == null) {
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }
        return ResponseEntity.ok("Login realizado com sucesso");
    }

    @GetMapping("/perfil/{cnpj}")
    @Operation(summary = "Obter perfil do fornecedor", description = "Retorna os dados de um fornecedor pelo CNPJ")
    public ResponseEntity<?> obterPerfil(@PathVariable String cnpj) {
        Fornecedor fornecedor = fornecedorService.buscarPorCnpj(cnpj);
        if (fornecedor == null) {
            return ResponseEntity.status(404).body("Fornecedor não encontrado");
        }
        return ResponseEntity.ok(fornecedor);
    }

    @DeleteMapping("/deletar/{cnpj}")
    @Operation(summary = "Deletar conta do fornecedor", description = "Remove um fornecedor pelo CNPJ")
    public ResponseEntity<?> deletarConta(@PathVariable String cnpj) {
        Fornecedor fornecedor = fornecedorService.buscarPorCnpj(cnpj);
        if (fornecedor == null) {
            return ResponseEntity.status(404).body("Fornecedor não encontrado");
        }

        fornecedorService.deletar(fornecedor.getId());
        return ResponseEntity.ok("Conta de fornecedor deletada com sucesso");
    }
}
