package com.rxlog.backend.Service;

import com.rxlog.backend.Entity.Fornecedor;
import com.rxlog.backend.Repository.FornecedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FornecedorService {
    @Autowired
    FornecedorRepository fornecedorRepository;

    public List<Fornecedor> listarTodos() {
        return fornecedorRepository.findAll();
    }

    public Fornecedor buscarPorId(Long id) {
        return fornecedorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));
    }

    public Fornecedor salvar(Fornecedor fornecedor) {
        return fornecedorRepository.save(fornecedor);
    }

    public Fornecedor atualizar(Long id, Fornecedor fornecedorAtualizado) {
        Fornecedor existente = buscarPorId(id);

        existente.setNomeFornecedor(fornecedorAtualizado.getNomeFornecedor());
        existente.setCnpjFornecedor(fornecedorAtualizado.getCnpjFornecedor());
        existente.setCelularFornecedor(fornecedorAtualizado.getCelularFornecedor());
        existente.setTelefoneFornecedor(fornecedorAtualizado.getTelefoneFornecedor());

        return fornecedorRepository.save(existente);
    }

    public void deletar(Long id) {
        if (!fornecedorRepository.existsById(id)) {
            throw new RuntimeException("Fornecedor não encontrado para deletar");
        }
        fornecedorRepository.deleteById(id);
    }

    public Fornecedor buscarPorCnpjEEmail(String cnpj, String email) {
        return fornecedorRepository.findByCnpjFornecedorAndEmailFornecedor(cnpj, email);
    }

    public Fornecedor buscarPorCnpj(String cnpj) {
        return fornecedorRepository.findByCnpjFornecedor(cnpj);
    }

    public Fornecedor buscarPorEmail(String email) {
        return fornecedorRepository.findByEmailFornecedor(email);
    }


}
