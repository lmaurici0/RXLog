package com.rxlog.backend.Entity;

import com.rxlog.backend.Enum.CargoUsuario;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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

    @Column(nullable = false)
    private String instituicaoUsuario;

}
