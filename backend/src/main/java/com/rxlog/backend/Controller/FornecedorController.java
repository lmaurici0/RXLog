package com.rxlog.backend.Controller;

import com.rxlog.backend.Entity.Fornecedor;
import com.rxlog.backend.Service.FornecedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/fornecedores")
public class FornecedorController {

    @Autowired
    private FornecedorService fornecedorService;

    @GetMapping
    public List<Fornecedor> listarTodos() {
        return fornecedorService.listarTodos(); // corrig   ido
    }

    @GetMapping("/{id}")
    public Fornecedor buscarPorId(@PathVariable Long id) {
        return fornecedorService.buscarPorId(id); // corrigido
    }

    @PostMapping("/cadastrar")
    public Fornecedor criar(@RequestBody Fornecedor fornecedor) {
        return fornecedorService.salvar(fornecedor); // corrigido
    }

    @PutMapping("/{id}")
    public Fornecedor atualizar(@PathVariable Long id, @RequestBody Fornecedor fornecedorAtualizado) {
        Fornecedor existente = fornecedorService.buscarPorId(id);
        existente.setNomeFornecedor(fornecedorAtualizado.getNomeFornecedor());
        existente.setCelularFornecedor(fornecedorAtualizado.getCelularFornecedor());
        existente.setTelefoneFornecedor(fornecedorAtualizado.getTelefoneFornecedor());
        existente.setCnpjFornecedor(fornecedorAtualizado.getCnpjFornecedor());
        return fornecedorService.salvar(existente);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        fornecedorService.deletar(id);
    }
}
