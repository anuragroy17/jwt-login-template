package com.anuragroy.tracker.controller;

import com.anuragroy.tracker.dto.AuthenticationRequest;
import com.anuragroy.tracker.dto.AuthenticationResponse;
import com.anuragroy.tracker.entity.User;
import com.anuragroy.tracker.service.MyUserDetailsService;
import com.anuragroy.tracker.util.API;
import com.anuragroy.tracker.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(API.login)
@CrossOrigin("*")
public class Login {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @PostMapping(API.authenticate)
    public ResponseEntity<?> authenticateUser(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        }
        catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }


        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @PostMapping(API.register)
    public ResponseEntity saveUser(@RequestBody User user) throws Exception {
        User retreivedUser = userDetailsService.getUserByUserName(user.getUserName());
        if(retreivedUser != null){
            return new ResponseEntity("Username Exists",HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.ok(userDetailsService.save(user));
    }

    //Test Authentication - Can be removed
    @RequestMapping({ "/hello" })
    public String firstPage() {
        try {
            return "Hello World";
        }catch(Exception e){
            e.printStackTrace();
            return "error";
        }
    }

}
