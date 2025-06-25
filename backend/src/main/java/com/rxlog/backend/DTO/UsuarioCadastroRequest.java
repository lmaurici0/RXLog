package com.rxlog.backend.DTO;

import com.rxlog.backend.Enum.CargoUsuario;

public class UsuarioCadastroRequest {

    private String nomeUsuario;
    private String emailUsuario;
    private String senhaUsuario;
    private CargoUsuario cargoUsuario;

    public String getNomeUsuario() {return nomeUsuario;}
    public void setNomeUsuario(String nomeUsuario) {this.nomeUsuario = nomeUsuario;}
    public String getEmailUsuario() {return emailUsuario;}
    public void setEmailUsuario(String emailUsuario) {this.emailUsuario = emailUsuario;}
    public String getSenhaUsuario() {return senhaUsuario;}
    public void setSenhaUsuario(String senhaUsuario) {this.senhaUsuario = senhaUsuario;}
    public CargoUsuario getCargoUsuario() {return cargoUsuario;}
    public void setCargoUsuario(CargoUsuario cargoUsuario) {this.cargoUsuario = cargoUsuario;}
}
