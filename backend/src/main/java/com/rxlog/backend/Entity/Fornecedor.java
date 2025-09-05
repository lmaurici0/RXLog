package com.rxlog.backend.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "fornecedores")
public class Fornecedor {
    @Id
    @Column(name = "id_fornecedor")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "nome_fornecedor", length = 100, nullable = false)
    private String nomeFornecedor;

    @Column(name = "cnpj_fornecedor", length = 18, nullable = false, unique = true)
    private String cnpjFornecedor;

    @Column(name = "email_fornecedor", length = 100, nullable = false, unique = true)
    private String emailFornecedor;

    @Column(name = "telefone_fornecedor", length = 15, nullable = false)
    private String telefoneFornecedor;

    @Column(name = "celular_fornecedor", length = 13, nullable = false)
    private String celularFornecedor;
}

