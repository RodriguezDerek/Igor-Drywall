package com.project.backend.quote;

import com.project.backend.DTO.quote.QuoteDTO;
import com.project.backend.DTO.quote.CreateQuoteRequestDTO;
import com.project.backend.DTO.responses.GenericResponseDTO;
import com.project.backend.exceptions.QuoteNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuoteService {

    private final QuoteRepository quoteRepository;

    public GenericResponseDTO createQuote(CreateQuoteRequestDTO request) {
        Quote quote = Quote.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .propertyAddress(request.getPropertyAddress())
                .phoneNumber(request.getPhoneNumber())
                .serviceType(request.getServiceType())
                .propertyType(request.getPropertyType())
                .projectDescription(request.getProjectDescription())
                .budgetRange(request.getBudgetRange())
                .startDate(request.getStartDate())
                .build();

        quoteRepository.save(quote);

        return GenericResponseDTO.builder()
                .message("Quote created successfully.")
                .status(HttpStatus.CREATED.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public List<QuoteDTO> getAllQuotes() {
        return quoteRepository.findAll().stream().map(this::toQuoteDTO).toList();
    }

    public GenericResponseDTO deleteQuote(Long id) {
        Quote quote = quoteRepository.findById(id)
                .orElseThrow(() -> new QuoteNotFoundException("No Quote was found with the provided ID."));

        quoteRepository.delete(quote);

        return GenericResponseDTO.builder()
                .message("Quote has been deleted.")
                .status(HttpStatus.OK.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    private QuoteDTO toQuoteDTO(Quote quote) {
        return QuoteDTO.builder()
                .id(quote.getId())
                .firstName(quote.getFirstName())
                .lastName(quote.getLastName())
                .email(quote.getEmail())
                .phoneNumber(quote.getPhoneNumber())
                .propertyAddress(quote.getPropertyAddress())
                .serviceType(quote.getServiceType())
                .propertyType(quote.getPropertyType())
                .projectDescription(quote.getProjectDescription())
                .budgetRange(quote.getBudgetRange())
                .startDate(quote.getStartDate())
                .createdAt(quote.getCreatedAt())
                .build();
    }
}
