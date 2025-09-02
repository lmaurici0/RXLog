package com.rxlog.backend.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class FornecedorCadastroRequest {

    private String nomeFornecedor;
    private String cnpjFornecedor;
    private String emailFornecedor;
    private String telefoneFornecedor;
    private String celularFornecedor;

}
