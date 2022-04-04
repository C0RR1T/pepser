package ch.bbw.m226.openapiproject;

import ch.bbw.m226.openapi.generated.dto.Category;
import org.assertj.core.api.WithAssertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.reactive.server.WebTestClient;

@Import({MessageBoardService.class})
@WebFluxTest
@ExtendWith(SpringExtension.class)
class RestintroApplicationTests implements WithAssertions {

	@Autowired
	private WebTestClient webClient;

	@Test
	void getCategories() {
		var categories = webClient.get()
				.uri("/categories")
				.exchange()
				.expectStatus()
				.isOk()
				.expectBodyList(Category.class)
				.returnResult()
				.getResponseBody();
		assertThat(categories).hasSize(1);
	}

	@Test
	void addCategory() {
		var toCreate = new Category().id(0).name("C++ Q&A")
				.description("what even is provenance");
		var created = webClient.post()
				.uri("/categories")
				.bodyValue(toCreate)
				.exchange()
				.expectStatus()
				.isCreated()
				.expectBody(Category.class)
				.returnResult()
				.getResponseBody();
		assertThat(created).usingRecursiveComparison()
				.ignoringFields("id")
				.isEqualTo(toCreate);
	}
}
