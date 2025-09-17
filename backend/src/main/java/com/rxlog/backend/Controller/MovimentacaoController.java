package com.rxlog.backend.Controller;

import com.rxlog.backend.Entity.Movimentacao;
import com.rxlog.backend.Enum.TipoMovimentacao;
import com.rxlog.backend.Service.MovimentacaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/movimentacoes")
@Tag(name = "Movimentações", description = "Gerenciamento de entradas e saídas de medicamentos")
public class MovimentacaoController {

    @Autowired
    private MovimentacaoService movimentacaoService;

    @GetMapping
    @Operation(summary = "Lista todas as movimentações", description = "Retorna todas as entradas e saídas de medicamentos")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    })
    public List<Movimentacao> listarTodos() {
        return movimentacaoService.listarTodos();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca movimentação por ID", description = "Retorna uma movimentação específica")
    public Movimentacao buscarPorId(@PathVariable Long id) {
        return movimentacaoService.buscarPorId(id);
    }

    @PostMapping("/entrada")
    @Operation(summary = "Registra entrada de medicamento", description = "Cria uma movimentação do tipo ENTRADA")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Entrada registrada com sucesso")
    })
    public ResponseEntity<Movimentacao> registrarEntrada(@RequestBody Movimentacao movimentacao) {
        movimentacao.setTipoMovimentacao(TipoMovimentacao.ENTRADA);
        Movimentacao entrada = movimentacaoService.registrarEntrada(movimentacao);
        return ResponseEntity.status(HttpStatus.CREATED).body(entrada);
    }

    @PostMapping("/saida")
    @Operation(summary = "Registra saída de medicamento", description = "Cria uma movimentação do tipo SAÍDA")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Saída registrada com sucesso")
    })
    public ResponseEntity<Movimentacao> registrarSaida(@RequestBody Movimentacao movimentacao) {
        movimentacao.setTipoMovimentacao(TipoMovimentacao.SAIDA);
        Movimentacao saida = movimentacaoService.registrarSaida(movimentacao);
        return ResponseEntity.status(HttpStatus.CREATED).body(saida);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza movimentação", description = "Atualiza os dados de uma movimentação existente")
    public Movimentacao atualizar(@PathVariable Long id, @RequestBody Movimentacao movimentacaoAtualizada) {
        Movimentacao existente = buscarPorId(id);
        existente.setDataMovimentacao(movimentacaoAtualizada.getDataMovimentacao());
        existente.setQuantidadeMovimentacao(movimentacaoAtualizada.getQuantidadeMovimentacao());
        existente.setUsuario(movimentacaoAtualizada.getUsuario());
        existente.setMedicamento(movimentacaoAtualizada.getMedicamento());
        return movimentacaoService.salvar(existente);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deleta movimentação", description = "Remove uma movimentação pelo ID")
    public void deletar(@PathVariable Long id) {
        movimentacaoService.deletar(id);
    }

    @GetMapping("/total")
    @Operation(summary = "Total de movimentações", description = "Retorna o total de entradas e saídas")
    public Map<String, Integer> totalMovimentacoes() {
        int totalEntradas = movimentacaoService.totalEntradas();
        int totalSaidas = movimentacaoService.totalSaidas();
        return Map.of("entradas", totalEntradas, "saidas", totalSaidas);
    }

    @GetMapping("/entradas-por-categoria")
    @Operation(summary = "Entradas por categoria", description = "Retorna total de entradas agrupadas por categoria")
    public List<Map<String, Object>> entradasPorCategoria() {
        return movimentacaoService.entradasPorCategoria();
    }

    @GetMapping("/saidas-por-categoria")
    @Operation(summary = "Saídas por categoria", description = "Retorna total de saídas agrupadas por categoria")
    public List<Map<String, Object>> saidasPorCategoria() {
        return movimentacaoService.saidasPorCategoria();
    }
}
