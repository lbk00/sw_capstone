package com.example.capstone.Supplier;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QSupplier is a Querydsl query type for Supplier
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSupplier extends EntityPathBase<Supplier> {

    private static final long serialVersionUID = -2064190236L;

    public static final QSupplier supplier = new QSupplier("supplier");

    public final StringPath sAdr = createString("sAdr");

    public final StringPath sEmail = createString("sEmail");

    public final StringPath sName = createString("sName");

    public final ArrayPath<byte[], Byte> sProfileImage = createArray("sProfileImage", byte[].class);

    public final StringPath stel = createString("stel");

    public final NumberPath<Long> supplierId = createNumber("supplierId", Long.class);

    public QSupplier(String variable) {
        super(Supplier.class, forVariable(variable));
    }

    public QSupplier(Path<? extends Supplier> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSupplier(PathMetadata metadata) {
        super(Supplier.class, metadata);
    }

}

