package com.rxlog.backend.Repository;

import com.rxlog.backend.Entity.Fornecedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> {
    Fornecedor findByCnpjFornecedorAndEmailFornecedor(String cnpj, String email);
    Fornecedor findByCnpjFornecedor(String cnpj);
    Fornecedor findByEmailFornecedor(String email);
}
