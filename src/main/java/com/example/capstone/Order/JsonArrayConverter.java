package com.example.capstone.Order;

import com.example.capstone.Product.Product;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.io.IOException;
import java.util.List;

//JSON 변환 클래스
@Converter
public class JsonArrayConverter implements AttributeConverter<List<Product>, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<Product> productInfos) {
        try {
            return objectMapper.writeValueAsString(productInfos);
        } catch (IOException e) {
            throw new IllegalArgumentException("Error converting list of products to JSON", e);
        }
    }

    @Override
    public List<Product> convertToEntityAttribute(String dbData) {
        try {
            return objectMapper.readValue(dbData, new TypeReference<List<Product>>() {});
        } catch (IOException e) {
            throw new IllegalArgumentException("Error converting JSON to list of products", e);
        }
    }
}