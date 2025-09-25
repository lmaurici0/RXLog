package com.rxlog.backend.Controller;

import com.rxlog.backend.Entity.Medicamento;
import com.rxlog.backend.Service.MedicamentoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/medicamentos")
@CrossOrigin(origins = "*")
@Tag(name = "Medicamentos", description = "Gerenciamento de medicamentos")
public class MedicamentoController {

    @Autowired
    private MedicamentoService medicamentoService;

    @GetMapping
    @Operation(summary = "Lista todos os medicamentos", description = "Retorna a lista completa de medicamentos cadastrados")
    public List<Medicamento> listarTodos() {
        return medicamentoService.listarTodos();
    }

    @PostMapping("/cadastrar")
    @Operation(summary = "Cadastra novo medicamento", description = "Cria um novo medicamento no sistema")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Medicamento criado com sucesso")
    })
    public Medicamento criar(@RequestBody Medicamento medicamento) {
        return medicamentoService.salvar(medicamento);
    }

    @PostMapping("/baixa")
    @Operation(summary = "Dar baixa em medicamento", description = "Diminui a quantidade de um medicamento no estoque")
    public void darBaixa(@RequestBody Map<String, Object> payload) {
        Long medicamentoId = Long.valueOf(payload.get("medicamentoId").toString());
        int quantidade = Integer.parseInt(payload.get("quantidade").toString());
        medicamentoService.darBaixa(medicamentoId, quantidade);
    }

    @GetMapping("/disponibilidade")
    @Operation(summary = "Quantidade por categoria", description = "Retorna quantidade de medicamentos agrupados por categoria")
    public List<Map<String, Object>> getQuantidadePorCategoria() {
        return medicamentoService.quantidadePorCategoria();
    }

    @GetMapping("/estoque-vencido-vs-regular")
    @Operation(summary = "Estoque vencido vs regular", description = "Retorna quantidade de medicamentos vencidos e regulares")
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

    @GetMapping("/menor-estoque")
    @Operation(summary = "Medicamentos com menor estoque", description = "Retorna os 5 medicamentos com menor quantidade no estoque")
    public List<Map<String, Object>> menorEstoque() {
        List<Medicamento> todos = medicamentoService.listarTodos();
        todos.sort(Comparator.comparingInt(Medicamento::getQuantidadeMedicamento));
        List<Medicamento> menores = todos.size() > 5 ? todos.subList(0, 5) : todos;
        List<Map<String, Object>> resultado = new ArrayList<>();
        for (Medicamento m : menores) {
            resultado.add(Map.of(
                    "nome", m.getNomeComercial(),
                    "quantidade", m.getQuantidadeMedicamento()
            ));
        }

        return resultado;
    }

}
