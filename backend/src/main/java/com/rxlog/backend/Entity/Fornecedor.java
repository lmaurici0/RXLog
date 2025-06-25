package com.rxlog.backend.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "fornecedores")
public class Fornecedor {
    @Id
    @Column(name = "id_fornecedor")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeFornecedor() {
        return nomeFornecedor;
    }

    public void setNomeFornecedor(String nomeFornecedor) {
        this.nomeFornecedor = nomeFornecedor;
    }

    public String getCnpjFornecedor() {
        return cnpjFornecedor;
    }

    public void setCnpjFornecedor(String cnpjFornecedor) {
        this.cnpjFornecedor = cnpjFornecedor;
    }

    public String getEmailFornecedor() {
        return emailFornecedor;
    }

    public void setEmailFornecedor(String emailFornecedor) {
        this.emailFornecedor = emailFornecedor;
    }

    public String getTelefoneFornecedor() {
        return telefoneFornecedor;
    }

    public void setTelefoneFornecedor(String telefoneFornecedor) {
        this.telefoneFornecedor = telefoneFornecedor;
    }

    public String getCelularFornecedor() {
        return celularFornecedor;
    }

    public void setCelularFornecedor(String celularFornecedor) {
        this.celularFornecedor = celularFornecedor;
    }
}

