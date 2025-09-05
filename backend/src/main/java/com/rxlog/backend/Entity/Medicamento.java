package com.rxlog.backend.Entity;

import com.rxlog.backend.Enum.TarjaMedicamento;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "medicamentos")
public class Medicamento {
    @Id
    @Column(name = "id_medicamento")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "nome_comercial", length = 100, nullable = false)
    private String nomeComercial;

    @Column(name = "nome_farmaceutico", length = 100, nullable = false)
    private String nomeFarmaceutico;

    @Column(name = "tipo_medicamento", length = 50, nullable = false)
    private String tipoMedicamento;

    @Min(value = 0, message = "A quantidade do medicamento deve ser maior ou igual que 0;")
    @Column(name = "quantidade_medicamento", nullable = false)
    private int quantidadeMedicamento;

    @Column(name = "validade_medicamento", nullable = false)
    private LocalDate validadeMedicamento;

    @Column(name = "lote_medicamento", length = 50, nullable = false)
    private String loteMedicamento;

    @Enumerated(EnumType.STRING)
    private TarjaMedicamento tarjaMedicamento;

    @ManyToOne
    @JoinColumn(name = "fornecedor_id")
    private Fornecedor fornecedor;

}
