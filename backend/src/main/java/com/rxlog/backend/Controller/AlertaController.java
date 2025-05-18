package com.rxlog.backend.Controller;

import com.rxlog.backend.Entity.Alerta;
import com.rxlog.backend.Entity.Medicamento;
import com.rxlog.backend.Enum.StatusAlerta;
import com.rxlog.backend.Enum.TipoAlerta;
import com.rxlog.backend.Service.AlertaService;
import com.rxlog.backend.Service.MedicamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alertas")
public class AlertaController {

    @Autowired
    private AlertaService alertaService;

    @Autowired
    private MedicamentoService medicamentoService;

    @PostMapping("/verificar/{medicamentoId}")
    public ResponseEntity<String> verificarAlertasParaMedicamento(@PathVariable Long medicamentoId) {
        Medicamento medicamento = medicamentoService.buscarPorId(medicamentoId);
        if (medicamento == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Medicamento não encontrado.");
        }

        alertaService.verificarAlertasParaMedicamento(medicamento);
        return ResponseEntity.ok("Verificação de alertas realizada com sucesso.");
    }

    @GetMapping
    public List<Alerta> listarTodos() {
        return alertaService.listarTodos();
    }

    @GetMapping("/status")
    public List<Alerta> listarPorStatus(@RequestParam StatusAlerta status) {
        return alertaService.listarPorStatus(status);
    }

    @GetMapping("/tipo")
    public List<Alerta> listarPorTipo(@RequestParam TipoAlerta tipo) {
        return alertaService.listarPorTipo(tipo);
    }

    @GetMapping("/medicamento/{medicamentoId}")
    public List<Alerta> listarPorMedicamento(@PathVariable Long medicamentoId) {
        return alertaService.listarPorMedicamento(medicamentoId);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        alertaService.deletar(id);
    }
}

