package com.rxlog.backend.Controller;

import com.rxlog.backend.Entity.Usuario;
import com.rxlog.backend.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> listarTodos() {
        return usuarioService.listarTodos();
    }

    @GetMapping("/{id}")
    public Usuario buscarPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id);
    }

    @PostMapping
    public Usuario criar(@RequestBody Usuario usuario) {
        return usuarioService.salvar(usuario);
    }

    @PutMapping("/{id}")
    public Usuario atualizar(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado) {
        Usuario existente = usuarioService.buscarPorId(id);
        existente.setNomeUsuario(usuarioAtualizado.getNomeUsuario());
        existente.setEmailUsuario(usuarioAtualizado.getEmailUsuario());
        existente.setSenhaUsuario(usuarioAtualizado.getSenhaUsuario());
        existente.setCargoUsuario(usuarioAtualizado.getCargoUsuario());
        return usuarioService.salvar(existente);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        usuarioService.deletar(id);
    }
}
