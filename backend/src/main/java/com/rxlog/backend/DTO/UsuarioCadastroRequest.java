package com.rxlog.backend.DTO;

import com.rxlog.backend.Enum.CargoUsuario;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UsuarioCadastroRequest {

    private String nomeUsuario;
    private String emailUsuario;
    private String senhaUsuario;
    private String instituicaoUsuario;
    private CargoUsuario cargoUsuario;

}
