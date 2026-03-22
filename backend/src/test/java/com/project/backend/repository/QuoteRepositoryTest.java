package com.project.backend.repository;

import com.project.backend.quote.QuoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

@DataJpaTest
public class QuoteRepositoryTest {

    @Autowired
    private QuoteRepository quoteRepository;
}
