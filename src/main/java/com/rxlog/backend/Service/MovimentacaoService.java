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
import java.util.List;

@Service
public class MovimentacaoService {

    @Autowired
    private MovimentacaoRepository movimentacaoRepository;

    @Autowired
    private MedicamentoRepository medicamentoRepository;

    @Autowired
    private MedicamentoService medicamentoService;

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
        return movimentacaoRepository.save(movimentacao);
    }

    public Movimentacao atualizar(Long id, Movimentacao movimentacaoAtualizada) {
        Movimentacao existente = buscarPorId(id);

        existente.setDataMovimentacao(movimentacaoAtualizada.getDataMovimentacao());
        existente.setQuantidadeMovimentacao(movimentacaoAtualizada.getQuantidadeMovimentacao());
        existente.setUsuario(movimentacaoAtualizada.getUsuario());
        existente.setMedicamento(movimentacaoAtualizada.getMedicamento());
        existente.setTipoMovimentacao(movimentacaoAtualizada.getTipoMovimentacao());

        return movimentacaoRepository.save(existente);
    }

    public Movimentacao registrarEntrada(Movimentacao movimentacao) {
        if (!movimentacao.getTipoMovimentacao().equals(TipoMovimentacao.ENTRADA)) {
            throw new IllegalArgumentException("Tipo de movimentação deve ser ENTRADA");
        }

        if (movimentacao.getMedicamento() == null || movimentacao.getMedicamento().getId() == null) {
            throw new IllegalArgumentException("Medicamento é obrigatório");
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

        Medicamento medicamento = medicamentoService.buscarPorId(movimentacao.getMedicamento().getId());

        if (medicamento.getQuantidadeMedicamento() < movimentacao.getQuantidadeMovimentacao()) {
            throw new RuntimeException(String.format(
                    "Quantidade insuficiente em estoque. Disponível: %d, Solicitado: %d",
                    medicamento.getQuantidadeMedicamento(),
                    movimentacao.getQuantidadeMovimentacao()
            ));
        }

        int novaQuantidade = medicamento.getQuantidadeMedicamento() - movimentacao.getQuantidadeMovimentacao();
        medicamento.setQuantidadeMedicamento(novaQuantidade);
        medicamentoService.salvar(medicamento);

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
}
