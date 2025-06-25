package com.rxlog.backend.DTO;

public class FornecedorLoginRequest {
    private String cnpj;
    private String email;

    public String getCnpj() {return cnpj;}

    public void setCnpj(String cnpj) {this.cnpj = cnpj;}

    public String getEmail() {return email;}

    public void setEmail(String email) {this.email = email;}
}
