package com.rxlog.backend.Entity;
import com.rxlog.backend.Enum.TipoMovimentacao;
import jakarta.validation.constraints.Min;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "movimentacoes")
public class Movimentacao {
    @Id
    @Column(name = "id_movimentacao")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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


    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}

    public int getQuantidadeMovimentacao() {return quantidadeMovimentacao;}

    public void setQuantidadeMovimentacao(int quantidadeMovimentacao) {this.quantidadeMovimentacao = quantidadeMovimentacao;}

    public LocalDateTime getDataMovimentacao() {return dataMovimentacao;}

    public void setDataMovimentacao(LocalDateTime dataMovimentacao) {this.dataMovimentacao = dataMovimentacao;}

    public Medicamento getMedicamento() {return medicamento;}

    public void setMedicamento(Medicamento medicamento) {this.medicamento = medicamento;}

    public Usuario getUsuario() {return usuario;}

    public void setUsuario(Usuario usuario) {this.usuario = usuario;}

    public TipoMovimentacao getTipoMovimentacao() {return tipoMovimentacao;}

    public void setTipoMovimentacao(TipoMovimentacao tipoMovimentacao) {this.tipoMovimentacao = tipoMovimentacao;}
}
