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
            throw new UsernameNotFoundException("Usuário não encontrado: " + email);
        }

        return User.builder()
                .username(usuario.getEmailUsuario())
                .password(usuario.getSenhaUsuario())
                .authorities(usuario.getCargoUsuario().name())
                .build();
    }
}
