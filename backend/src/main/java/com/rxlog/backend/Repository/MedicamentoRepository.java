package com.rxlog.backend.Repository;

import com.rxlog.backend.Entity.Medicamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public interface MedicamentoRepository extends JpaRepository<Medicamento, Long> {
    @Query("SELECT m.tipoMedicamento AS categoria, SUM(m.quantidadeMedicamento) AS quantidade FROM Medicamento m GROUP BY m.tipoMedicamento")
    List<Map<String, Object>> quantidadePorCategoria();

    List<Medicamento> findByValidadeMedicamentoBefore(LocalDate date);

    List<Medicamento> findByValidadeMedicamentoBetween(LocalDate start, LocalDate end);

}