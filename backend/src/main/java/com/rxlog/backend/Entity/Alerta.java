package com.rxlog.backend.Entity;

import com.rxlog.backend.Enum.StatusAlerta;
import com.rxlog.backend.Enum.TipoAlerta;
import jakarta.persistence.*;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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

}
