package com.project.backend.quote;

import com.project.backend.DTO.quote.QuoteDTO;
import com.project.backend.DTO.quote.CreateQuoteRequestDTO;
import com.project.backend.DTO.quote.QuoteTableDTO;
import com.project.backend.DTO.responses.GenericResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/quotes")
public class QuoteController {

    private final QuoteService quoteService;

    @PostMapping("/quote")
    public ResponseEntity<GenericResponseDTO> createQuote(@Valid @RequestBody CreateQuoteRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(quoteService.createQuote(request));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<QuoteDTO>> getAllQuotes() {
        return ResponseEntity.status(HttpStatus.OK).body(quoteService.getAllQuotes());
    }

    @GetMapping("/table")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<QuoteTableDTO>> getTableQuotes() {
        return ResponseEntity.status(HttpStatus.OK).body(quoteService.getTableQuotes());
    }

    @DeleteMapping("/quote/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GenericResponseDTO> deleteQuote(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(quoteService.deleteQuote(id));
    }
}
