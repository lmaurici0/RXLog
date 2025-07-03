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

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/alertas")
public class AlertaController {

    @Autowired
    private AlertaService alertaService;

    @Autowired
    private MedicamentoService medicamentoService;

    @GetMapping("/vencidos")
    public ResponseEntity<List<Medicamento>> listarMedicamentosVencidos() {
        List<Medicamento> vencidos = alertaService.buscarMedicamentosVencidos();
        return ResponseEntity.ok(vencidos);
    }

    @GetMapping
    public List<Alerta> listarTodos() {
        return alertaService.listarTodos();
    }

    @GetMapping("/status")
    public List<Alerta> listarPorStatus(@RequestParam StatusAlerta status) {
        return alertaService.listarPorStatus(status);
    }

    @GetMapping("/vencimento/proximo")
    public ResponseEntity<List<Medicamento>> listarMedicamentosProximosVencimento() {
        List<Medicamento> proximos = alertaService.buscarMedicamentosProximosVencimento();
        return ResponseEntity.ok(proximos);
    }
}