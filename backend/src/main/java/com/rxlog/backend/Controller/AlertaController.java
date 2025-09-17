package com.rxlog.backend.Controller;

import com.rxlog.backend.Entity.Alerta;
import com.rxlog.backend.Entity.Medicamento;
import com.rxlog.backend.Enum.StatusAlerta;
import com.rxlog.backend.Service.AlertaService;
import com.rxlog.backend.Service.MedicamentoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alertas")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Alertas", description = "Gerenciamento de alertas de medicamentos")
public class AlertaController {

    @Autowired
    private AlertaService alertaService;

    @Autowired
    private MedicamentoService medicamentoService;

    @GetMapping("/vencidos")
    @Operation(summary = "Medicamentos vencidos", description = "Lista medicamentos que já estão vencidos")
    public ResponseEntity<List<Medicamento>> listarMedicamentosVencidos() {
        List<Medicamento> vencidos = alertaService.buscarMedicamentosVencidos();
        return ResponseEntity.ok(vencidos);
    }

    @GetMapping
    @Operation(summary = "Lista todos os alertas", description = "Retorna todos os alertas cadastrados")
    public List<Alerta> listarTodos() {
        return alertaService.listarTodos();
    }

    @GetMapping("/status")
    @Operation(summary = "Alertas por status", description = "Filtra alertas pelo status informado")
    public List<Alerta> listarPorStatus(@RequestParam StatusAlerta status) {
        return alertaService.listarPorStatus(status);
    }

    @GetMapping("/vencimento/proximo")
    @Operation(summary = "Medicamentos próximos do vencimento", description = "Lista medicamentos que irão vencer em breve")
    public ResponseEntity<List<Medicamento>> listarMedicamentosProximosVencimento() {
        List<Medicamento> proximos = alertaService.buscarMedicamentosProximosVencimento();
        return ResponseEntity.ok(proximos);
    }
}
