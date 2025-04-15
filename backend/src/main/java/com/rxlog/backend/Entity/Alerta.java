package com.rxlog.backend.Entity;

import com.rxlog.backend.Enum.StatusAlerta;
import com.rxlog.backend.Enum.TipoAlerta;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "alertas")
public class Alerta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_alerta")
    private Long id;

    @Column(name = "data_geracao", insertable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime dataGeracao;

    @Column(name = "tipo_alerta")
    @Enumerated(EnumType.STRING)
    private TipoAlerta tipoAlerta;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private StatusAlerta statusAlerta;

    @ManyToOne
    @JoinColumn(
            name = "medicamento_id",
            foreignKey = @ForeignKey(
                    name = "fk_mov_medic",
                    foreignKeyDefinition = "FOREIGN KEY (medicamento_id) REFERENCES medicamentos(id_medicamento) ON DELETE CASCADE"
            )
    )
    private Medicamento medicamento;



    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}

    public LocalDateTime getDataGeracao() {return dataGeracao;}

    public void setDataGeracao(LocalDateTime dataGeracao) {this.dataGeracao = dataGeracao;}

    public TipoAlerta getTipoAlerta() {return tipoAlerta;}

    public void setTipoAlerta(TipoAlerta tipoAlerta) {this.tipoAlerta = tipoAlerta;}

    public StatusAlerta getStatusAlerta() {return statusAlerta;}

    public void setStatusAlerta(StatusAlerta statusAlerta) {this.statusAlerta = statusAlerta;}

    public Medicamento getMedicamento() {return medicamento;}

    public void setMedicamento(Medicamento medicamento) {this.medicamento = medicamento;}
}
