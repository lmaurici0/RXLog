package com.rxlog.backend.Controller;

import com.rxlog.backend.Entity.Fornecedor;
import com.rxlog.backend.Service.FornecedorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fornecedores")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Fornecedores", description = "Gerenciamento de fornecedores")
public class FornecedorController {

    @Autowired
    private FornecedorService fornecedorService;

    @GetMapping
    @Operation(summary = "Lista todos os fornecedores", description = "Retorna a lista completa de fornecedores")
    public List<Fornecedor> listarTodos() {
        return fornecedorService.listarTodos();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca fornecedor por ID", description = "Retorna um fornecedor específico")
    public Fornecedor buscarPorId(@PathVariable Long id) {
        return fornecedorService.buscarPorId(id);
    }

    @PostMapping("/cadastrar")
    @Operation(summary = "Cadastra novo fornecedor", description = "Cria um novo fornecedor no sistema")
    public Fornecedor criar(@RequestBody Fornecedor fornecedor) {
        return fornecedorService.salvar(fornecedor);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza fornecedor", description = "Atualiza os dados de um fornecedor existente")
    public Fornecedor atualizar(@PathVariable Long id, @RequestBody Fornecedor fornecedorAtualizado) {
        Fornecedor existente = fornecedorService.buscarPorId(id);
        existente.setNomeFornecedor(fornecedorAtualizado.getNomeFornecedor());
        existente.setCelularFornecedor(fornecedorAtualizado.getCelularFornecedor());
        existente.setTelefoneFornecedor(fornecedorAtualizado.getTelefoneFornecedor());
        existente.setCnpjFornecedor(fornecedorAtualizado.getCnpjFornecedor());
        return fornecedorService.salvar(existente);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deleta fornecedor", description = "Remove um fornecedor pelo ID")
    public void deletar(@PathVariable Long id) {
        fornecedorService.deletar(id);
    }
}
