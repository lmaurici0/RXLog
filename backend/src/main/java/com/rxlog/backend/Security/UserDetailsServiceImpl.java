package com.rxlog.backend.Security;

import com.rxlog.backend.Entity.Usuario;
import com.rxlog.backend.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UsuarioService usuarioService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioService.buscarPorEmail(email);

        if (usuario == null) {
            System.out.println("[DEBUG] Usuário não encontrado com email: " + email);
            throw new UsernameNotFoundException("Usuário não encontrado: " + email);
        }

        System.out.println("[DEBUG] Usuário encontrado:");
        System.out.println("  ID: " + usuario.getId());
        System.out.println("  Nome: " + usuario.getNomeUsuario());
        System.out.println("  Cargo: " + usuario.getCargoUsuario());

        return User.builder()
                .username(usuario.getEmailUsuario())
                .password(usuario.getSenhaUsuario())
                .authorities(usuario.getCargoUsuario().name())
                .build();
    }
}
