package com.rxlog.backend.Controller;

import com.rxlog.backend.Entity.Medicamento;
import com.rxlog.backend.Service.MedicamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicamentos")
public class MedicamentoController {
    @Autowired
    private MedicamentoService medicamentoService;

    @GetMapping
    public List<Medicamento> listarTodos(){
        return medicamentoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Medicamento buscarPorId(@PathVariable Long id){
        return medicamentoService.buscarPorId(id);
    }

    @PostMapping
    public Medicamento criar(@RequestBody Medicamento medicamento){
        return medicamentoService.salvar(medicamento);
    }

    @PutMapping("/{id}")
    public Medicamento atualizar(@PathVariable Long id, @RequestBody Medicamento medicamentoAtualizado){
        Medicamento existente = medicamentoService.buscarPorId(id);
        existente.setNomeFarmaceutico(medicamentoAtualizado.getNomeFarmaceutico());
        existente.setTipoMedicamento(medicamentoAtualizado.getTipoMedicamento());
        existente.setTarjaMedicamento(medicamentoAtualizado.getTarjaMedicamento());
        existente.setNomeComercial(medicamentoAtualizado.getNomeComercial());
        existente.setQuantidadeMedicamento(medicamentoAtualizado.getQuantidadeMedicamento());
        existente.setFornecedor(medicamentoAtualizado.getFornecedor());
        existente.setValidadeMedicamento(medicamentoAtualizado.getValidadeMedicamento());
        existente.setLoteMedicamento(medicamentoAtualizado.getLoteMedicamento());
        return medicamentoService.salvar(existente);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        medicamentoService.deletar(id);
    }


}
