package com.anuragroy.tracker.service;

import com.anuragroy.tracker.dto.MyUserDetails;
import com.anuragroy.tracker.entity.User;
import com.anuragroy.tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String userName) {
//        System.out.println("hey" + userName);
        Optional<User> user = userRepository.findByUserName(userName);
//        System.out.println(user.get().toString());
        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + userName));

        MyUserDetails myUserDetails = user.map(MyUserDetails::new).get();
//        System.out.println(myUserDetails.toString());
        return new org.springframework.security.core.userdetails.User(myUserDetails.getUsername(),myUserDetails.getPassword(),
                myUserDetails.getAuthorities());
    }

    public User save(User user) {
        user.setActive(true);
        user.setPassWord(bcryptEncoder.encode(user.getPassWord()));
        return userRepository.save(user);
    }

    public User getUserByUserName(String userName) {
        Optional<User> user = userRepository.findByUserName(userName);
        return user.isPresent()? user.get() : null;
    }
}
