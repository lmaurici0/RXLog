package com.rxlog.backend.Controller;

import com.rxlog.backend.Entity.Medicamento;
import com.rxlog.backend.Service.MedicamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/medicamentos")
public class MedicamentoController {

    @Autowired
    private MedicamentoService medicamentoService;

    @GetMapping
    public List<Medicamento> listarTodos() {
        return medicamentoService.listarTodos();
    }

    @PostMapping("/cadastrar")
    public Medicamento criar(@RequestBody Medicamento medicamento) {
        return medicamentoService.salvar(medicamento);
    }

    @PostMapping("/baixa")
    public void darBaixa(@RequestBody Map<String, Object> payload) {
        Long medicamentoId = Long.valueOf(payload.get("medicamentoId").toString());
        int quantidade = Integer.parseInt(payload.get("quantidade").toString());
        medicamentoService.darBaixa(medicamentoId, quantidade);
    }

    @GetMapping("/disponibilidade")
    public List<Map<String, Object>> getQuantidadePorCategoria() {
        return medicamentoService.quantidadePorCategoria();
    }


    @GetMapping("/estoque-vencido-vs-regular")
    public List<Map<String, Object>> estoqueVencidoVsRegular() {
        List<Medicamento> todos = medicamentoService.listarTodos();
        int vencidos = 0;
        int regulares = 0;
        LocalDate hoje = LocalDate.now();

        for (Medicamento m : todos) {
            if (m.getValidadeMedicamento().isBefore(hoje)) {
                vencidos++;
            } else {
                regulares++;
            }
        }

        List<Map<String, Object>> resultado = new ArrayList<>();
        resultado.add(Map.of("nome", "Regular", "valor", regulares));
        resultado.add(Map.of("nome", "Vencido", "valor", vencidos));

        return resultado;
    }
}
