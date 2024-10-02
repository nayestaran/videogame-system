package com.adidas;

import software.amazon.awscdk.Duration;
import software.amazon.awscdk.RemovalPolicy;
import software.amazon.awscdk.services.dynamodb.*;
import software.amazon.awscdk.services.lambda.Code;
import software.amazon.awscdk.services.lambda.Function;
import software.amazon.awscdk.services.lambda.Runtime;
import software.amazon.awscdk.services.logs.RetentionDays;
import software.constructs.Construct;
import software.amazon.awscdk.Stack;
import software.amazon.awscdk.StackProps;

import java.util.HashMap;
import java.util.Map;

public class MainStack extends Stack {
    public MainStack(final Construct parent, final String id) {
        this(parent, id, null);
    }

    public MainStack(final Construct parent, final String id, final StackProps props) {
        super(parent, id, props);

        String stackBaseName = props.getStackName();

//        Create DynamoDB table
        String dynamoTableNameId = "UsersTable";

        Attribute partitionKey = Attribute.builder().type(AttributeType.STRING).name("username").build();
        TableProps dynamoTableProps = TableProps.builder()
                .tableName(String.join("-", stackBaseName, dynamoTableNameId))
                .partitionKey(partitionKey)
                .billingMode(BillingMode.PAY_PER_REQUEST)
                .removalPolicy(RemovalPolicy.DESTROY)
                .build();
        final Table dynamoTable = new Table(parent, dynamoTableNameId, dynamoTableProps);

//        Create Lambda functions
        String getPs4UsersLambdaId = "getPs4Lambda";
        int timeoutSeconds = 10;

        Map<String, String> getPs4LambdaEnv = new HashMap<>();
        getPs4LambdaEnv.put("DYNAMODB_TABLE_NAME", dynamoTable.getTableName());

        Function getPs4Lambda = Function.Builder.create(this, getPs4UsersLambdaId)
                .runtime(Runtime.NODEJS_18_X)
                .code(Code.fromAsset("lambda-src/get-ps4-users/dist"))
                .handler("index.getPs4UsersHandler")
                .description("Lambda that returns PS4 users from Dynamo table")
                .timeout(Duration.seconds(timeoutSeconds))
                .functionName(String.join("-", stackBaseName, getPs4UsersLambdaId))
                .memorySize(128)
                .logRetention(RetentionDays.THREE_DAYS)
                .environment(getPs4LambdaEnv)
                .build();


        String insertVideogameAdminLambdaId = "insertVideogameAdminLambda";

        Map<String, String> insertVideogameAdminLambdaEnv = new HashMap<>();
        insertVideogameAdminLambdaEnv.put("DYNAMODB_TABLE_NAME", dynamoTable.getTableName());

        Function insertVideogameAdminLambda = Function.Builder.create(this, insertVideogameAdminLambdaId)
                .runtime(Runtime.NODEJS_18_X)
                .code(Code.fromAsset("lambda-src/insert-videogame-admin-lambda/dist"))
                .handler("index.insertVideogameAdminHandler")
                .description("Lambda that inserts videogame into Dynamo table")
                .timeout(Duration.seconds(timeoutSeconds))
                .functionName(String.join("-", stackBaseName, insertVideogameAdminLambdaId))
                .memorySize(128)
                .logRetention(RetentionDays.THREE_DAYS)
                .environment(insertVideogameAdminLambdaEnv)
                .build();

    }
}
