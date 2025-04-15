//classe para liberar todas as portas na fase de desenvolvimento, tirar ela bloqueia todas as portas por padrão, conforme a classe SecurityConfig age.

package com.rxlog.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityDevConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll()
                )
                .csrf(csrf -> csrf.disable()) // desabilita CSRF
                .httpBasic(Customizer.withDefaults()); // usa autenticação básica, se quiser

        return http.build();
    }
}
