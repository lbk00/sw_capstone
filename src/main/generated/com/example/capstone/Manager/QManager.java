package com.example.capstone.Manager;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QManager is a Querydsl query type for Manager
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QManager extends EntityPathBase<Manager> {

    private static final long serialVersionUID = 800223458L;

    public static final QManager manager = new QManager("manager");

    public final StringPath mEmail = createString("mEmail");

    public final StringPath mName = createString("mName");

    public final ArrayPath<byte[], Byte> mProfileImage = createArray("mProfileImage", byte[].class);

    public final StringPath mtel = createString("mtel");

    public final StringPath uAdr = createString("uAdr");

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public QManager(String variable) {
        super(Manager.class, forVariable(variable));
    }

    public QManager(Path<? extends Manager> path) {
        super(path.getType(), path.getMetadata());
    }

    public QManager(PathMetadata metadata) {
        super(Manager.class, metadata);
    }

}

