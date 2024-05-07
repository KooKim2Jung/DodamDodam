package org.dodam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

import java.util.Properties;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		// 상위 디렉토리의 .env 파일 경로를 명시적으로 지정
//		Dotenv dotenv = Dotenv.configure().directory("/app").load();
//		Properties props = System.getProperties();
//
//		dotenv.entries().forEach(entry -> {
//			props.setProperty(entry.getKey(), entry.getValue());
//		});

		SpringApplication.run(BackendApplication.class, args);
	}

}
