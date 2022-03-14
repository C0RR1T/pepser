package ch.bbw.m226.openapiproject;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import javax.annotation.PostConstruct;

import ch.bbw.m226.openapi.generated.controller.PoniesApi;
import ch.bbw.m226.openapi.generated.dto.PonyDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
public class PonyController implements PoniesApi {

	private final Map<Integer, PonyDto> ponies = new HashMap<>();

	private final Random random = new Random();

	@PostConstruct
	public void someInitialHorses() {
		addPony(new PonyDto().name("Thunder")
				.birthday(LocalDate.parse("2010-01-31")));
		addPony(new PonyDto().name("Le Brun")
				.birthday(LocalDate.parse("2008-02-28")));
		addPony(new PonyDto().name("Prestige")
				.birthday(LocalDate.parse("2019-10-01")));
	}

	@Override
	public ResponseEntity<PonyDto> addPony(PonyDto newPony) {
		newPony.setId(random.nextInt(Integer.MAX_VALUE));
		ponies.put(newPony.getId(), newPony); // yolo ignoring conflicts
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(newPony);
	}

	@Override
	public ResponseEntity<List<PonyDto>> getPonies(Integer limit) {
		return ResponseEntity.ok(ponies.values()
				.stream()
				.sorted(Comparator.comparing(PonyDto::getId))
				.limit(limit == null ? 100 : limit)
				.toList());
	}
}
