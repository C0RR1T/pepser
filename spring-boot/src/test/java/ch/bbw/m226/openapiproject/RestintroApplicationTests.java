package ch.bbw.m226.openapiproject;

import java.util.UUID;

import ch.bbw.m226.openapi.generated.dto.Category;
import org.assertj.core.api.WithAssertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.reactive.server.WebTestClient;

@WebFluxTest
@ExtendWith(SpringExtension.class)
class RestintroApplicationTests implements WithAssertions {

	@Autowired
	private WebTestClient webClient;

	@Test
	void getPonies() {
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
	void addPony() {
		var toCreate = new Category().name("C++ Q&A - " + UUID.randomUUID())
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
