package com.example.capstone.User;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 700195652L;

    public static final QUser user = new QUser("user");

    public final StringPath cAdr = createString("cAdr");

    public final DateTimePath<java.util.Date> cbirthDate = createDateTime("cbirthDate", java.util.Date.class);

    public final StringPath cEmail = createString("cEmail");

    public final StringPath cGender = createString("cGender");

    public final StringPath cID = createString("cID");

    public final StringPath cName = createString("cName");

    public final ArrayPath<byte[], Byte> cProfileImage = createArray("cProfileImage", byte[].class);

    public final StringPath cPW = createString("cPW");

    public final DateTimePath<java.sql.Timestamp> createDate = createDateTime("createDate", java.sql.Timestamp.class);

    public final StringPath ctel = createString("ctel");

    public final StringPath role = createString("role");

    public final NumberPath<Long> user_Id = createNumber("user_Id", Long.class);

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

