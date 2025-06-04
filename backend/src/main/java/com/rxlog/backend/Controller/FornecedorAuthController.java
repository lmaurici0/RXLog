package com.rxlog.backend.Controller;

import com.rxlog.backend.DTO.FornecedorCadastroRequest;
import com.rxlog.backend.DTO.FornecedorLoginRequest;
import com.rxlog.backend.Entity.Fornecedor;
import com.rxlog.backend.Service.FornecedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/fornecedor")
public class FornecedorAuthController {

    @Autowired
    private FornecedorService fornecedorService;

    @PostMapping("/signup")
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
    public ResponseEntity<?> login(@RequestBody FornecedorLoginRequest loginRequest) {
        Fornecedor fornecedor = fornecedorService.buscarPorCnpjEEmail(loginRequest.getCnpj(), loginRequest.getEmail());

        if (fornecedor == null) {
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }
        return ResponseEntity.ok("Login realizado com sucesso");
    }

    @GetMapping("/perfil/{cnpj}")
    public ResponseEntity<?> obterPerfil(@PathVariable String cnpj) {
        Fornecedor fornecedor = fornecedorService.buscarPorCnpj(cnpj);
        if (fornecedor == null) {
            return ResponseEntity.status(404).body("Fornecedor não encontrado");
        }
        return ResponseEntity.ok(fornecedor);
    }

    @DeleteMapping("/deletar/{cnpj}")
    public ResponseEntity<?> deletarConta(@PathVariable String cnpj) {
        Fornecedor fornecedor = fornecedorService.buscarPorCnpj(cnpj);
        if (fornecedor == null) {
            return ResponseEntity.status(404).body("Fornecedor não encontrado");
        }

        fornecedorService.deletar(fornecedor.getId());
        return ResponseEntity.ok("Conta de fornecedor deletada com sucesso");
    }
}
