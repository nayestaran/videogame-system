package com.adidas;

import software.amazon.awscdk.App;
import software.amazon.awscdk.Environment;
import software.amazon.awscdk.StackProps;

public final class VideoGameApp {
    private static final String REGION = "eu-west-1";

    public static void main(final String[] args) {
        App app = new App();

        Environment env = Environment.builder()
                .region(REGION)
                .build();
        StackProps props = StackProps.builder()
                .env(env)
                .build();

        new MainStack(app, "MainStack", props);

        app.synth();
    }
}
