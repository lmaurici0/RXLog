package com.rxlog.backend.Entity;

import com.rxlog.backend.Enum.CargoUsuario;
import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @Column(name = "id_usuario")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_usuario", length = 100, nullable = false)
    private String nomeUsuario;

    @Column(name = "email_usuario", length = 100, nullable = false)
    private String emailUsuario;

    @Column(name = "senha_usuario", length = 255, nullable = false)
    private String senhaUsuario;

    @Enumerated(EnumType.STRING)
    private CargoUsuario cargoUsuario;

    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}

    public String getNomeUsuario() {return nomeUsuario;}

    public void setNomeUsuario(String nomeUsuario) {this.nomeUsuario = nomeUsuario;}

    public String getEmailUsuario() {return emailUsuario;}

    public void setEmailUsuario(String emailUsuario) {this.emailUsuario = emailUsuario;}

    public String getSenhaUsuario() {return senhaUsuario;}

    public void setSenhaUsuario(String senhaUsuario) {this.senhaUsuario = senhaUsuario;}

    public CargoUsuario getCargoUsuario() {return cargoUsuario;}

    public void setCargoUsuario(CargoUsuario cargoUsuario) {this.cargoUsuario = cargoUsuario;}

}
