package ch.bbw.m226.openapiproject;

import ch.bbw.m226.openapi.generated.controller.CategoriesApi;
import ch.bbw.m226.openapi.generated.dto.Category;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;


@Validated
@RestController
public class CategoryController implements CategoriesApi {
    private final MessageBoardService service;

    public CategoryController(MessageBoardService service) {
        this.service = service;
    }

    @Override
    public ResponseEntity<Category> createCategory(Category category) {
        var newCategory = this.service.createCategory(category);

        return ResponseEntity.status(HttpStatus.CREATED).body(newCategory);
    }

    @Override
    public ResponseEntity<List<Category>> getCategories() {
        return ResponseEntity.ok(this.service.getCategories());
    }

    @Override
    public ResponseEntity<Category> getCategoryById(Integer id) {
        return this.service.getCategoryById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
