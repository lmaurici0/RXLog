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
import java.util.Map;

@Service
public class MedicamentoService {

    @Autowired
    private MedicamentoRepository medicamentoRepository;

    @Autowired
    private FornecedorService fornecedorService;

    @Autowired
    private AlertaService alertaService;

    @Autowired
    private MovimentacaoRepository movimentacaoRepository; // uso direto do repository

    public List<Medicamento> listarTodos() {
        return medicamentoRepository.findAll();
    }

    public Medicamento buscarPorId(Long id){
        return medicamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicamento não encontrado."));
    }

    @Transactional
    public Medicamento salvar(Medicamento medicamento) {
        if (medicamento.getFornecedor() != null && medicamento.getFornecedor().getId() != null) {
            var fornecedor = fornecedorService.buscarPorId(medicamento.getFornecedor().getId());
            medicamento.setFornecedor(fornecedor);
        } else {
            throw new RuntimeException("Fornecedor é obrigatório e deve ter ID.");
        }

        // Salva o medicamento
        Medicamento salvo = medicamentoRepository.save(medicamento);

        // Cria movimentação de entrada automaticamente
        if (salvo.getQuantidadeMedicamento() > 0) {
            Movimentacao entrada = new Movimentacao();
            entrada.setMedicamento(salvo);
            entrada.setQuantidadeMovimentacao(salvo.getQuantidadeMedicamento());
            entrada.setTipoMovimentacao(TipoMovimentacao.ENTRADA);
            entrada.setDataMovimentacao(LocalDateTime.now());

            movimentacaoRepository.save(entrada);
        }

        alertaService.verificarAlertasParaMedicamento(salvo);

        return salvo;
    }

    @Transactional
    public void darBaixa(Long id, int quantidade) {
        Medicamento medicamento = medicamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicamento não encontrado"));

        if (medicamento.getQuantidadeMedicamento() < quantidade) {
            throw new RuntimeException("Quantidade insuficiente em estoque");
        }

        medicamento.setQuantidadeMedicamento(medicamento.getQuantidadeMedicamento() - quantidade);
        medicamentoRepository.save(medicamento);

        // Cria movimentação de saída automaticamente
        Movimentacao saida = new Movimentacao();
        saida.setMedicamento(medicamento);
        saida.setQuantidadeMovimentacao(quantidade);
        saida.setTipoMovimentacao(TipoMovimentacao.SAIDA);
        saida.setDataMovimentacao(LocalDateTime.now());

        movimentacaoRepository.save(saida);

        alertaService.verificarAlertasParaMedicamento(medicamento);
    }

    @Transactional
    public Medicamento atualizar(Long id, Medicamento medicamentoAtualizado){
        Medicamento existente = buscarPorId(id);

        existente.setFornecedor(medicamentoAtualizado.getFornecedor());
        existente.setLoteMedicamento(medicamentoAtualizado.getLoteMedicamento());
        existente.setQuantidadeMedicamento(medicamentoAtualizado.getQuantidadeMedicamento());
        existente.setTipoMedicamento(medicamentoAtualizado.getTipoMedicamento());
        existente.setNomeComercial(medicamentoAtualizado.getNomeComercial());
        existente.setTarjaMedicamento(medicamentoAtualizado.getTarjaMedicamento());
        existente.setNomeFarmaceutico(medicamentoAtualizado.getNomeFarmaceutico());

        return medicamentoRepository.save(existente);
    }

    public void deletar(Long id){
        if(!medicamentoRepository.existsById(id)){
            throw new RuntimeException("Medicamento não encontrado pelo id");
        }
        medicamentoRepository.deleteById(id);
    }

    public List<Map<String, Object>> quantidadePorCategoria() {
        return medicamentoRepository.quantidadePorCategoria();
    }
}
