package com.rxlog.backend.Controller;

import com.rxlog.backend.Entity.Movimentacao;
import com.rxlog.backend.Enum.TipoMovimentacao;
import com.rxlog.backend.Service.MovimentacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movimentacoes")
public class MovimentacaoController {
    @Autowired
    private MovimentacaoService movimentacaoService;

    @GetMapping
    public List<Movimentacao> listarTodos(){
        return movimentacaoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Movimentacao buscarPorId(@PathVariable Long id){
        return movimentacaoService.buscarPorId(id);
    }

    @PostMapping
    public Movimentacao criar(@RequestBody Movimentacao movimentacao){
        return movimentacaoService.salvar(movimentacao);
    }

    @PostMapping("/entrada")
    public ResponseEntity<Movimentacao> registrarEntrada(@RequestBody Movimentacao movimentacao) {
        movimentacao.setTipoMovimentacao(TipoMovimentacao.ENTRADA); // Força tipo ENTRADA
        Movimentacao entrada = movimentacaoService.registrarEntrada(movimentacao);
        return ResponseEntity.status(HttpStatus.CREATED).body(entrada);
    }

    @PostMapping("/saida")
    public ResponseEntity<Movimentacao> registrarSaida(@RequestBody Movimentacao movimentacao) {
        movimentacao.setTipoMovimentacao(TipoMovimentacao.SAIDA); // Força tipo SAÍDA
        Movimentacao saida = movimentacaoService.registrarSaida(movimentacao);
        return ResponseEntity.status(HttpStatus.CREATED).body(saida);
    }

    @PutMapping("/{id}")
    public Movimentacao atualizar(@PathVariable Long id, @RequestBody Movimentacao movimentacaoAtualizada){
        Movimentacao existente = buscarPorId(id);

        existente.setDataMovimentacao(movimentacaoAtualizada.getDataMovimentacao());
        existente.setQuantidadeMovimentacao(movimentacaoAtualizada.getQuantidadeMovimentacao());
        existente.setUsuario(movimentacaoAtualizada.getUsuario());
        existente.setMedicamento(movimentacaoAtualizada.getMedicamento());
        return movimentacaoService.salvar(existente);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        movimentacaoService.deletar(id);
    }


}
