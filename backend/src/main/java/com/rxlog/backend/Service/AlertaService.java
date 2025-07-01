package com.rxlog.backend.Service;

import com.rxlog.backend.Entity.Alerta;
import com.rxlog.backend.Entity.Medicamento;
import com.rxlog.backend.Enum.StatusAlerta;
import com.rxlog.backend.Enum.TipoAlerta;
import com.rxlog.backend.Repository.AlertaRepository;
import com.rxlog.backend.Repository.MedicamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AlertaService {
    @Autowired
    private AlertaRepository alertaRepository;

    @Autowired
    private MedicamentoRepository medicamentoRepository;

    public void verificarAlertasParaMedicamento(Medicamento medicamento) {
        LocalDate hoje = LocalDate.now();

        boolean alertaEstoqueJaExiste = alertaRepository.existsByMedicamentoAndTipoAlertaAndStatusAlerta(
                medicamento, TipoAlerta.ESTOQUE_BAIXO, StatusAlerta.Pendente);

        if (medicamento.getQuantidadeMedicamento() < 10 && !alertaEstoqueJaExiste) {
            Alerta alertaEstoque = new Alerta();
            alertaEstoque.setMedicamento(medicamento);
            alertaEstoque.setTipoAlerta(TipoAlerta.ESTOQUE_BAIXO);
            alertaEstoque.setStatusAlerta(StatusAlerta.Pendente);
            alertaEstoque.setDataGeracao(LocalDateTime.now());
            alertaRepository.save(alertaEstoque);
        }

        LocalDate validade = medicamento.getValidadeMedicamento();
        boolean validadeProxima = validade != null
                && validade.isAfter(hoje)
                && validade.isBefore(hoje.plusDays(30));

        boolean alertaValidadeJaExiste = alertaRepository.existsByMedicamentoAndTipoAlertaAndStatusAlerta(
                medicamento, TipoAlerta.VENCIMENTO_PROXIMO, StatusAlerta.Pendente);

        if (validadeProxima && !alertaValidadeJaExiste) {
            Alerta alertaValidade = new Alerta();
            alertaValidade.setMedicamento(medicamento);
            alertaValidade.setTipoAlerta(TipoAlerta.VENCIMENTO_PROXIMO);
            alertaValidade.setStatusAlerta(StatusAlerta.Pendente);
            alertaValidade.setDataGeracao(LocalDateTime.now());
            alertaRepository.save(alertaValidade);
        }

        if (medicamento.getQuantidadeMedicamento() >= 10) {
            List<Alerta> alertasEstoque = alertaRepository.findByMedicamentoAndTipoAlertaAndStatusAlerta(
                    medicamento, TipoAlerta.ESTOQUE_BAIXO, StatusAlerta.Pendente);
            alertasEstoque.forEach(alerta -> {
                alerta.setStatusAlerta(StatusAlerta.Resolvido);
                alertaRepository.save(alerta);
            });
        }
    }
    public List<Alerta> listarTodos() {
        return alertaRepository.findAll();
    }

    public List<Alerta> listarPorStatus(StatusAlerta status) {
        return alertaRepository.findByStatusAlerta(status);
    }

    public List<Alerta> listarPorTipo(TipoAlerta tipo) {
        return alertaRepository.findByTipoAlerta(tipo);
    }

    public List<Alerta> listarPorMedicamento(Long medicamentoId) {
        return alertaRepository.findByMedicamentoId(medicamentoId);
    }

    public void deletar(Long id) {
        if (!alertaRepository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado para deletar");
        }
        alertaRepository.deleteById(id);
    }

    public List<Medicamento> buscarMedicamentosVencidos() {
        return medicamentoRepository.findByValidadeMedicamentoBefore(LocalDate.now());
    }

    public List<Medicamento> buscarMedicamentosProximosVencimento() {
        LocalDate hoje = LocalDate.now();
        LocalDate limite = hoje.plusDays(30);
        return medicamentoRepository.findByValidadeMedicamentoBetween(hoje, limite);
    }
}
