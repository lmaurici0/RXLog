package com.rxlog.backend.Entity;
import com.rxlog.backend.Enum.TipoMovimentacao;
import jakarta.validation.constraints.Min;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "movimentacoes")
public class Movimentacao {
    @Id
    @Column(name = "id_movimentacao")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Min(value = 1, message = "A quantidade deve ser maior que zero.")
    @Column(name = "quantidade_movimentacao")
    private int quantidadeMovimentacao;

    @Column(name = "data_movimentacao", nullable = false, updatable = false)
    private LocalDateTime dataMovimentacao;

    @Enumerated(EnumType.STRING)
    private TipoMovimentacao tipoMovimentacao;

    @PrePersist
    public void prePersist() {
        dataMovimentacao = LocalDateTime.now();
    }

    @ManyToOne
    @JoinColumn(name = "medicamento_id")
    private Medicamento medicamento;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

}
