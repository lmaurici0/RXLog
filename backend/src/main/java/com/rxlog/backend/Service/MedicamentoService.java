package com.rxlog.backend.Service;

import com.rxlog.backend.Entity.Medicamento;
import com.rxlog.backend.Repository.MedicamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<Medicamento> listarTodos(){
        return medicamentoRepository.findAll();
    }

    public Medicamento buscarPorId(Long id){
        return medicamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicamento não encontrado."));
    }

    public Medicamento salvar(Medicamento medicamento) {
        if (medicamento.getFornecedor() != null && medicamento.getFornecedor().getId() != null) {
            var fornecedor = fornecedorService.buscarPorId(medicamento.getFornecedor().getId());
            medicamento.setFornecedor(fornecedor);
        } else {
            throw new RuntimeException("Fornecedor é obrigatório e deve ter ID.");
        }

        Medicamento salvo = medicamentoRepository.save(medicamento);

        alertaService.verificarAlertasParaMedicamento(salvo);

        return salvo;
    }


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

    public void darBaixa(Long id, int quantidade) {
        Medicamento medicamento = medicamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicamento não encontrado"));

        if (medicamento.getQuantidadeMedicamento() < quantidade) {
            throw new RuntimeException("Quantidade insuficiente em estoque");
        }

        medicamento.setQuantidadeMedicamento(medicamento.getQuantidadeMedicamento() - quantidade);
        medicamentoRepository.save(medicamento);
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