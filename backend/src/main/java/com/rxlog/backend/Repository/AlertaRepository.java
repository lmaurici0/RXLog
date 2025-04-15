package com.rxlog.backend.Repository;

import com.rxlog.backend.Entity.Alerta;
import com.rxlog.backend.Entity.Medicamento;
import com.rxlog.backend.Enum.StatusAlerta;
import com.rxlog.backend.Enum.TipoAlerta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlertaRepository extends JpaRepository<Alerta, Long> {

    boolean existsByMedicamentoAndTipoAlertaAndStatusAlerta(
            Medicamento medicamento,
            TipoAlerta tipoAlerta,
            StatusAlerta statusAlerta
    );

    List<Alerta> findByMedicamentoAndTipoAlertaAndStatusAlerta(
            Medicamento medicamento,
            TipoAlerta tipoAlerta,
            StatusAlerta statusAlerta
    );

    List<Alerta> findByStatusAlerta(StatusAlerta status);

    List<Alerta> findByTipoAlerta(TipoAlerta tipo);

    List<Alerta> findByMedicamentoId(Long medicamentoId);


}
