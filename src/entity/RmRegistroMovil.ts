import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn, OneToOne, JoinColumn, OneToMany, JoinTable, ManyToMany, CreateDateColumn, UpdateDateColumn, VersionColumn, Generated} from "typeorm";


@Entity({ name:"rmregistromovil", synchronize: true })
export class RmRegistroMovil {   

    @PrimaryGeneratedColumn()
    keyx: number;

    @Column({ default: () => `now()`, nullable: false })
    @CreateDateColumn()
    fechaalta:  Date = new Date();

    @Column({length: 18 })
    curpahorrador :string = "";

    @Column({length: 18 })
    curptutor :string = "";

    @Column({length: 15 })
    nickname :string = "";

    @Column({length: 11 })
    nss :string = "";
    
    @Column({ length: 40 })
    nombre :string = "";

    @Column({length: 40 })
    apellidopaterno :string = "";

    @Column({ length: 40 })
    noapellidomaternombre :string = "";

    @Column({length: 2 })
    entidadnacimiento :string = "";

    @Column({ length: 1 })
    sexo :string = "";

    @Column({ length: 10 })
    fechanacimiento :string = "";

    @Column({ length: 3 })
    nacionalidad :string = "";

    @Column({ length: 10 })
    telefonofijo :string = "";

    @Column({ length: 10 })
    telefonocelular :string = "";

    @Column({ length: 50 })
    correoelectronico :string = "";

    @Column({ length: 65 })
    calle :string = "";

    @Column({ length: 15 })
    numeroexterior :string = "";

    @Column({ length: 15 })
    numerointerior :string = "";

    @Column({ length: 65 })
    colonia :string = "";

    @Column({ length: 65 })
    ciudadpoblacion :string = "";

    @Column({ length: 3 })
    pais :string = "";

    @Column({ length: 65 })
    entidadfederativa :string = "";
    
    @Column({ length: 65 })
    municipiodelegacion :string = "";

    @Column({ length: 5 })
    codigopostal :string = "";

    @Column({ length: 10 })
    codigopromocional :string = "";

    @Column({ length: 5 })
    actividadeconomicaahorrador :string = "";

    @Column({ length: 1 })
    aplicacionorigen :string = "";

    @Column({ type: "integer"})
    idprocesoexpediente :number = 0;

    @Column({ length: 15 })
    fechaenvio :string = "";

    @Column({ type: "integer"})
    calificacionimagen :number = 0;
    
    @Column({ length: 2 })
    tipoafiliacion :string = "";

    @Column({ length: 3 })
    folio :string = "";

    @Column({type: "integer", nullable: false})
    foliosolicitud :number = 0;

    @Column({type: "integer"})
    estatusproceso :number = 0;

}