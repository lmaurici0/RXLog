package com.rxlog.backend.Service;

import com.rxlog.backend.Entity.Usuario;
import com.rxlog.backend.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario atualizar(Long id, Usuario usuarioAtualizado) {
        Usuario existente = buscarPorId(id);

        existente.setNomeUsuario(usuarioAtualizado.getNomeUsuario());
        existente.setEmailUsuario(usuarioAtualizado.getEmailUsuario());

        existente.setSenhaUsuario(usuarioAtualizado.getSenhaUsuario());

        existente.setCargoUsuario(usuarioAtualizado.getCargoUsuario());

        return usuarioRepository.save(existente);
    }

    public void deletar(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado para deletar");
        }
        usuarioRepository.deleteById(id);
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmailUsuario(email).orElse(null);
    }
}
