package org.dodam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

import java.util.Properties;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {

		// .env 파일에서 환경 변수를 읽어와 시스템 프로퍼티로 설정
		Dotenv dotenv = Dotenv.load();
		Properties props = System.getProperties();

		dotenv.entries().forEach(entry -> {
			props.setProperty(entry.getKey(), entry.getValue());
		});

		SpringApplication.run(BackendApplication.class, args);
	}

}
