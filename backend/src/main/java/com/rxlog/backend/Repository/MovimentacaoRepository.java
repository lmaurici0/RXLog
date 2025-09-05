package com.rxlog.backend.Repository;

import com.rxlog.backend.Entity.Movimentacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {
    @Query("SELECT m.tipoMedicamento, SUM(mm.quantidadeMovimentacao) " +
            "FROM Movimentacao mm JOIN mm.medicamento m " +
            "WHERE mm.tipoMovimentacao = 'ENTRADA' " +
            "GROUP BY m.tipoMedicamento")
    List<Object[]> entradasPorCategoria();

    @Query("SELECT COALESCE(SUM(mm.quantidadeMovimentacao), 0) FROM Movimentacao mm WHERE mm.tipoMovimentacao = :tipo")
    int sumByTipoMovimentacao(@Param("tipo") String tipo);


    @Query("SELECT m.tipoMedicamento, SUM(mm.quantidadeMovimentacao) " +
            "FROM Movimentacao mm JOIN mm.medicamento m " +
            "WHERE mm.tipoMovimentacao = 'SAIDA' " +
            "GROUP BY m.tipoMedicamento")
    List<Object[]> saidasPorCategoria();

}
