package ch.bbw.m226.openapiproject;

import java.time.LocalDate;
import java.util.UUID;

import ch.bbw.m226.openapi.generated.dto.PonyDto;
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
		var ponies = webClient.get()
				.uri("/ponies")
				.exchange()
				.expectStatus()
				.isOk()
				.expectBodyList(PonyDto.class)
				.returnResult()
				.getResponseBody();
		assertThat(ponies).hasSizeGreaterThanOrEqualTo(3);
	}

	@Test
	void addPony() {
		var toCreate = new PonyDto().name("Willy" + UUID.randomUUID())
				.birthday(LocalDate.now());
		var created = webClient.post()
				.uri("/ponies")
				.bodyValue(toCreate)
				.exchange()
				.expectStatus()
				.isCreated()
				.expectBody(PonyDto.class)
				.returnResult()
				.getResponseBody();
		assertThat(created).usingRecursiveComparison()
				.ignoringFields("id")
				.isEqualTo(toCreate);
	}
}
