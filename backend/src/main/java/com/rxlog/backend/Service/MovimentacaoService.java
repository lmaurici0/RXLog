package com.rxlog.backend.Service;

import com.rxlog.backend.Entity.Medicamento;
import com.rxlog.backend.Entity.Movimentacao;
import com.rxlog.backend.Enum.TipoMovimentacao;
import com.rxlog.backend.Repository.MedicamentoRepository;
import com.rxlog.backend.Repository.MovimentacaoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class MovimentacaoService {

    @Autowired
    private MovimentacaoRepository movimentacaoRepository;

    @Autowired
    private MedicamentoRepository medicamentoRepository;

    @Autowired
    private AlertaService alertaService;

    public List<Movimentacao> listarTodos() {
        return movimentacaoRepository.findAll();
    }

    public Movimentacao buscarPorId(Long id) {
        return movimentacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movimentação não encontrada."));
    }

    public Movimentacao salvar(Movimentacao movimentacao) {
        if (movimentacao.getDataMovimentacao() == null) {
            movimentacao.setDataMovimentacao(LocalDateTime.now());
        }
        return movimentacaoRepository.save(movimentacao);
    }

    @Transactional
    public Movimentacao registrarEntrada(Movimentacao movimentacao) {
        if (!movimentacao.getTipoMovimentacao().equals(TipoMovimentacao.ENTRADA)) {
            throw new IllegalArgumentException("Tipo de movimentação deve ser ENTRADA");
        }

        Medicamento medicamento = medicamentoRepository.findById(movimentacao.getMedicamento().getId())
                .orElseThrow(() -> new RuntimeException("Medicamento não encontrado"));

        medicamento.setQuantidadeMedicamento(
                medicamento.getQuantidadeMedicamento() + movimentacao.getQuantidadeMovimentacao()
        );
        medicamentoRepository.save(medicamento);

        movimentacao.setDataMovimentacao(LocalDateTime.now());
        return movimentacaoRepository.save(movimentacao);
    }

    @Transactional
    public Movimentacao registrarSaida(Movimentacao movimentacao) {
        if (!movimentacao.getTipoMovimentacao().equals(TipoMovimentacao.SAIDA)) {
            throw new IllegalArgumentException("Este método só aceita movimentações do tipo SAÍDA.");
        }

        Medicamento medicamento = medicamentoRepository.findById(movimentacao.getMedicamento().getId())
                .orElseThrow(() -> new RuntimeException("Medicamento não encontrado"));

        if (medicamento.getQuantidadeMedicamento() < movimentacao.getQuantidadeMovimentacao()) {
            throw new RuntimeException(String.format(
                    "Quantidade insuficiente em estoque. Disponível: %d, Solicitado: %d",
                    medicamento.getQuantidadeMedicamento(),
                    movimentacao.getQuantidadeMovimentacao()
            ));
        }

        medicamento.setQuantidadeMedicamento(
                medicamento.getQuantidadeMedicamento() - movimentacao.getQuantidadeMovimentacao()
        );
        medicamentoRepository.save(medicamento);

        movimentacao.setDataMovimentacao(LocalDateTime.now());
        Movimentacao movimentacaoSalva = movimentacaoRepository.save(movimentacao);

        alertaService.verificarAlertasParaMedicamento(medicamento);

        return movimentacaoSalva;
    }

    public void deletar(Long id) {
        if (!movimentacaoRepository.existsById(id)) {
            throw new RuntimeException("Movimentação não encontrada para deletar.");
        }
        movimentacaoRepository.deleteById(id);
    }

    public int totalEntradas() {
        return movimentacaoRepository.sumByTipoMovimentacao(TipoMovimentacao.ENTRADA);
    }

    public int totalSaidas() {
        return movimentacaoRepository.sumByTipoMovimentacao(TipoMovimentacao.SAIDA);
    }

    public List<Map<String, Object>> entradasPorCategoria() {
        List<Map<String, Object>> resultado = new ArrayList<>();
        List<Object[]> lista = movimentacaoRepository.entradasPorCategoria(TipoMovimentacao.ENTRADA);
        for(Object[] row : lista) {
            resultado.add(Map.of("categoria", row[0], "quantidade", ((Number)row[1]).intValue()));
        }
        return resultado;
    }

    public List<Map<String, Object>> saidasPorCategoria() {
        List<Map<String, Object>> resultado = new ArrayList<>();
        List<Object[]> lista = movimentacaoRepository.saidasPorCategoria(TipoMovimentacao.SAIDA);
        for(Object[] row : lista) {
            resultado.add(Map.of("categoria", row[0], "quantidade", ((Number)row[1]).intValue()));
        }
        return resultado;
    }

}
