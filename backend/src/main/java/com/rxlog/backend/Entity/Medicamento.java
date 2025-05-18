package com.rxlog.backend.Entity;

import com.rxlog.backend.Enum.TarjaMedicamento;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;

import java.time.LocalDate;

@Entity
@Table(name = "medicamentos")
public class Medicamento {
    @Id
    @Column(name = "id_medicamento")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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



    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}

    public String getNomeComercial() {return nomeComercial;}

    public void setNomeComercial(String nomeComercial) {this.nomeComercial = nomeComercial;}

    public String getNomeFarmaceutico() {return nomeFarmaceutico;}

    public void setNomeFarmaceutico(String nomeFarmaceutico) {this.nomeFarmaceutico = nomeFarmaceutico;}

    public String getTipoMedicamento() {return tipoMedicamento;}

    public void setTipoMedicamento(String tipoMedicamento) {this.tipoMedicamento = tipoMedicamento;}

    public int getQuantidadeMedicamento() {return quantidadeMedicamento;}

    public void setQuantidadeMedicamento(int quantidadeMedicamento) {this.quantidadeMedicamento = quantidadeMedicamento;}

    public LocalDate getValidadeMedicamento() {return validadeMedicamento;}

    public void setValidadeMedicamento(LocalDate validadeMedicamento) {this.validadeMedicamento = validadeMedicamento;}

    public String getLoteMedicamento() {return loteMedicamento;}

    public void setLoteMedicamento(String loteMedicamento) {this.loteMedicamento = loteMedicamento;}

    public Fornecedor getFornecedor() {return fornecedor;}

    public void setFornecedor(Fornecedor fornecedor) {this.fornecedor = fornecedor;}

    public TarjaMedicamento getTarjaMedicamento() {return tarjaMedicamento;}

    public void setTarjaMedicamento(TarjaMedicamento tarjaMedicamento) {this.tarjaMedicamento = tarjaMedicamento;}
}
